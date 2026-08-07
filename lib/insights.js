/**
 * Turns the raw data into a list of things worth telling the user.
 *
 * Each observation comes from a small generator that receives a prepared
 * context and returns a plain descriptor — `{ id, tone, values }` — or `null`
 * when it has nothing to say. Generators never build sentences: the copy lives
 * in the dictionaries under `insights.items`, so insights stay translatable and
 * this module stays testable.
 *
 * Tones: `critical` (needs action), `warning` (watch it), `positive` (good
 * news), `neutral` (just context).
 */

import { budgetUsage, daysInMonth } from "./budgets";
import { goalProgress } from "./goals";
import { inMonth, monthlyTotals, parseTransactionDate } from "./transactions";

const MS_PER_DAY = 86_400_000;

/** Change beyond which a month-over-month move is worth mentioning. */
const SIGNIFICANT_CHANGE = 10;
/** A savings rate at or above this is praised, below zero is flagged. */
const HEALTHY_SAVINGS_RATE = 20;
/** Credit usage past this share of the limit gets called out. */
const HIGH_CREDIT_USAGE = 80;
/** How many of the last three months a description must appear in to count as recurring. */
const RECURRING_MONTHS = 3;
/** Months of history a category is compared against. */
const CATEGORY_HISTORY_MONTHS = 3;
/** A category has to move this much against its own average to be a spike. */
const CATEGORY_SPIKE = 40;
/** …and be at least this share of the month, so noise stays quiet. */
const MATERIAL_SHARE = 8;
/** Projections need a few days of data before they mean anything. */
const MIN_DAYS_FOR_PROJECTION = 5;
/** Two identical charges this close together look like a double charge. */
const DUPLICATE_WINDOW_DAYS = 3;
/** Budget slack is only news once most of the month has gone by. */
const LATE_MONTH = 0.6;
/** A budget under this much of its limit late in the month has room to spare. */
const UNDERSPEND = 60;
/** Months of expenses covered by liquid balances: comfortable vs thin. */
const COVERAGE_COMFORTABLE = 3;
const COVERAGE_THIN = 1;
/** Patterns need a minimum sample before they are worth reporting. */
const MIN_ROWS_FOR_PATTERN = 8;
/** A weekday or wallet has to carry this share of the month to stand out. */
const CONCENTRATION_SHARE = 35;
/** "Small" is this fraction of the month's average charge. */
const SMALL_CHARGE_RATIO = 0.25;
const MIN_SMALL_CHARGES = 5;
const SMALL_CHARGE_SHARE = 10;
/** A single charge taking this share of the month gets its own card. */
const DOMINANT_EXPENSE_SHARE = 20;

function totals(transactions) {
	return transactions.reduce(
		(acc, transaction) => {
			if (transaction.amount < 0) acc.expenses += Math.abs(transaction.amount);
			else acc.income += transaction.amount;
			return acc;
		},
		{ income: 0, expenses: 0 },
	);
}

function percentChange(current, previous) {
	if (!previous) return current ? 100 : 0;
	return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Month-to-date figures for this month and the same slice of last month, so a
 * comparison on the 5th isn't measured against a full previous month.
 */
export function monthToDate(transactions = [], reference = new Date()) {
	const day = reference.getDate();
	const previousReference = new Date(
		reference.getFullYear(),
		reference.getMonth() - 1,
		1,
	);

	const current = inMonth(transactions, reference);
	const previous = inMonth(transactions, previousReference).filter(
		(transaction) => parseTransactionDate(transaction.date).getDate() <= day,
	);

	return { current: totals(current), previous: totals(previous) };
}

/**
 * Expense totals per category name for a month, optionally only counting the
 * first `maxDay` days so partial months can be compared with whole ones.
 */
export function expensesByCategory(
	transactions = [],
	reference = new Date(),
	maxDay = null,
) {
	const byCategory = new Map();

	for (const transaction of inMonth(transactions, reference)) {
		if (transaction.amount >= 0) continue;
		if (
			maxDay !== null &&
			parseTransactionDate(transaction.date).getDate() > maxDay
		) {
			continue;
		}

		const name = transaction.categoryName || "";
		byCategory.set(
			name,
			(byCategory.get(name) ?? 0) + Math.abs(transaction.amount),
		);
	}

	return [...byCategory.entries()]
		.map(([name, amount]) => ({ name, amount }))
		.sort((a, b) => b.amount - a.amount);
}

/**
 * Descriptions that show up every month for the last `RECURRING_MONTHS`, with
 * the average charge — a rough subscription detector.
 */
export function recurringExpenses(transactions = [], reference = new Date()) {
	const months = [];
	for (let offset = 0; offset < RECURRING_MONTHS; offset++) {
		months.push(
			new Date(reference.getFullYear(), reference.getMonth() - offset, 1),
		);
	}

	const seen = new Map();

	months.forEach((month, index) => {
		for (const transaction of inMonth(transactions, month)) {
			if (transaction.amount >= 0) continue;

			const key = String(transaction.description ?? "")
				.trim()
				.toLowerCase();
			if (!key) continue;

			const entry = seen.get(key) ?? {
				description: transaction.description,
				months: new Set(),
				total: 0,
				count: 0,
			};

			entry.months.add(index);
			entry.total += Math.abs(transaction.amount);
			entry.count += 1;
			seen.set(key, entry);
		}
	});

	return [...seen.values()]
		.filter((entry) => entry.months.size === RECURRING_MONTHS)
		.map((entry) => ({
			description: entry.description,
			average: entry.total / entry.count,
			total: entry.total,
		}))
		.sort((a, b) => b.average - a.average);
}

/** Average expenses across the whole months before `reference`. */
function averageMonthlyExpenses(transactions, reference, months = 3) {
	// `monthlyTotals` ends on the current month, which is still in progress.
	const history = monthlyTotals(transactions, months + 1, reference).slice(
		0,
		months,
	);
	const withActivity = history.filter((month) => month.expenses > 0);
	if (withActivity.length === 0) return 0;

	return (
		withActivity.reduce((sum, month) => sum + month.expenses, 0) /
		withActivity.length
	);
}

/** How far into the month we are, and how much of it is left. */
function monthProgress(reference) {
	const total = daysInMonth(reference);
	const elapsed = Math.min(reference.getDate(), total);

	return { total, elapsed, fraction: elapsed / total };
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

/** Are we spending more than at this point last month? */
function spendingTrend({ current, previous }) {
	if (current.expenses <= 0 && previous.expenses <= 0) return null;

	const change = percentChange(current.expenses, previous.expenses);
	const values = {
		percent: Math.abs(Math.round(change)),
		current: current.expenses,
		previous: previous.expenses,
	};

	if (Math.abs(change) < SIGNIFICANT_CHANGE) {
		return { id: "spendingSteady", tone: "neutral", values };
	}

	return {
		id: change > 0 ? "spendingUp" : "spendingDown",
		tone: change > 0 ? "warning" : "positive",
		values,
	};
}

/** Did the money coming in move? Needs both months to have income. */
function incomeTrend({ current, previous }) {
	if (current.income <= 0 || previous.income <= 0) return null;

	const change = percentChange(current.income, previous.income);
	if (Math.abs(change) < SIGNIFICANT_CHANGE) return null;

	return {
		id: change > 0 ? "incomeUp" : "incomeDown",
		tone: change > 0 ? "positive" : "warning",
		values: {
			percent: Math.abs(Math.round(change)),
			current: current.income,
			previous: previous.income,
		},
	};
}

/** How much of this month's income is still unspent. */
function savings({ current }) {
	if (current.income <= 0) return null;

	const rate = ((current.income - current.expenses) / current.income) * 100;

	return {
		id: rate < 0 ? "spendingOverIncome" : "savingsRate",
		tone:
			rate < 0
				? "critical"
				: rate >= HEALTHY_SAVINGS_RATE
					? "positive"
					: "neutral",
		values: {
			percent: Math.round(Math.abs(rate)),
			saved: current.income - current.expenses,
		},
	};
}

/** Where the month lands if the current rate holds. */
function projectedSpending({ current, reference }) {
	if (current.expenses <= 0) return null;

	const { total, elapsed } = monthProgress(reference);
	if (elapsed < MIN_DAYS_FOR_PROJECTION || elapsed >= total) return null;

	const projected = (current.expenses / elapsed) * total;

	if (current.income > 0 && projected > current.income) {
		return {
			id: "projectedOverIncome",
			tone: "warning",
			values: { projected, gap: projected - current.income },
		};
	}

	return { id: "projectedSpending", tone: "neutral", values: { projected } };
}

/** Which category is eating the month. */
function topCategory({ transactions, reference, current }) {
	if (current.expenses <= 0) return null;

	// Skip the unnamed bucket — `uncategorized` reports that separately.
	const top = expensesByCategory(transactions, reference).find(
		(category) => category.name,
	);
	if (!top) return null;

	return {
		id: "topCategory",
		tone: "neutral",
		values: {
			category: top.name,
			amount: top.amount,
			percent: Math.round((top.amount / current.expenses) * 100),
		},
	};
}

/**
 * A category well above (or below) its own recent average. Both sides are
 * measured month-to-date so a partial month isn't compared with whole ones.
 */
function categoryShift({ transactions, reference, current }) {
	if (current.expenses <= 0) return null;

	const day = reference.getDate();
	const thisMonth = expensesByCategory(transactions, reference, day);
	if (thisMonth.length === 0) return null;

	const averages = new Map();
	for (let offset = 1; offset <= CATEGORY_HISTORY_MONTHS; offset++) {
		const month = new Date(
			reference.getFullYear(),
			reference.getMonth() - offset,
			1,
		);

		for (const { name, amount } of expensesByCategory(
			transactions,
			month,
			day,
		)) {
			const entry = averages.get(name) ?? { total: 0, months: 0 };
			entry.total += amount;
			entry.months += 1;
			averages.set(name, entry);
		}
	}

	let spike = null;
	let drop = null;

	for (const { name, amount } of thisMonth) {
		if (!name) continue;

		const history = averages.get(name);
		if (!history || history.months === 0) continue;

		// Too small a slice of the month to be worth a card.
		if ((amount / current.expenses) * 100 < MATERIAL_SHARE) continue;

		const average = history.total / history.months;
		const change = percentChange(amount, average);
		const candidate = { name, amount, average, change };

		if (change >= CATEGORY_SPIKE && (!spike || change > spike.change)) {
			spike = candidate;
		}
		if (change <= -CATEGORY_SPIKE && (!drop || change < drop.change)) {
			drop = candidate;
		}
	}

	const winner = spike ?? drop;
	if (!winner) return null;

	return {
		id: spike ? "categorySpike" : "categoryDrop",
		tone: spike ? "warning" : "positive",
		values: {
			category: winner.name,
			percent: Math.abs(Math.round(winner.change)),
			amount: winner.amount,
			average: winner.average,
		},
	};
}

/** Budgets that are blown, or will be at the current rate. */
function budgetHealth({ budgets, reference }) {
	if (budgets.length === 0) return null;

	const risky = budgets
		.map((budget) => ({ budget, usage: budgetUsage(budget, reference) }))
		.filter(({ usage }) => usage.isOver || usage.willExceed)
		.sort((a, b) => b.usage.percent - a.usage.percent);

	if (risky.length === 0) {
		return {
			id: "budgetsHealthy",
			tone: "positive",
			values: { count: budgets.length },
		};
	}

	const over = risky.filter(({ usage }) => usage.isOver);
	const [worst] = risky;

	return {
		id: over.length > 0 ? "budgetExceeded" : "budgetAtRisk",
		tone: over.length > 0 ? "critical" : "warning",
		values: {
			name: worst.budget.name,
			count: risky.length,
			percent: Math.round(worst.usage.percent),
			projected: worst.usage.projected,
		},
	};
}

/** A budget with room left, once most of the month has gone. */
function budgetSlack({ budgets, reference }) {
	if (budgets.length === 0) return null;
	if (monthProgress(reference).fraction < LATE_MONTH) return null;

	const roomy = budgets
		.map((budget) => ({ budget, usage: budgetUsage(budget, reference) }))
		.filter(
			({ usage }) =>
				usage.limit > 0 && usage.remaining > 0 && usage.percent <= UNDERSPEND,
		)
		.sort((a, b) => b.usage.remaining - a.usage.remaining);

	if (roomy.length === 0) return null;

	const [{ budget, usage }] = roomy;

	return {
		id: "budgetRoom",
		tone: "positive",
		values: {
			name: budget.name,
			amount: usage.remaining,
			percent: Math.round(usage.percent),
		},
	};
}

/** Goals that will not land on time, or the nearest one's required pace. */
function goalPacing({ goals, reference }) {
	if (goals.length === 0) return null;

	const tracked = goals.map((goal) => ({
		goal,
		progress: goalProgress(goal, reference),
	}));

	const overdue = tracked
		.filter(({ progress }) => progress.isOverdue)
		.sort((a, b) => a.progress.daysLeft - b.progress.daysLeft);

	if (overdue.length > 0) {
		return {
			id: "goalOverdue",
			tone: "warning",
			values: { name: overdue[0].goal.name, count: overdue.length },
		};
	}

	const nearest = tracked
		.filter(({ progress }) => !progress.isComplete && progress.monthlyNeeded)
		.sort((a, b) => a.progress.daysLeft - b.progress.daysLeft)[0];

	if (!nearest) return null;

	return {
		id: "goalPace",
		tone: "neutral",
		values: {
			name: nearest.goal.name,
			amount: nearest.progress.monthlyNeeded,
			percent: Math.round(nearest.progress.percent),
		},
	};
}

/** A goal that made it. */
function goalWins({ goals, reference }) {
	const done = goals.filter((goal) => goalProgress(goal, reference).isComplete);
	if (done.length === 0) return null;

	return {
		id: "goalCompleted",
		tone: "positive",
		values: { name: done[0].name, count: done.length },
	};
}

/** Credit cards close to their limit. */
function creditUsage({ wallets }) {
	for (const wallet of wallets) {
		if (wallet.type !== "credit" || !wallet.creditLimit) continue;

		const usage =
			(Math.abs(Math.min(0, wallet.balance)) / wallet.creditLimit) * 100;

		if (usage >= HIGH_CREDIT_USAGE) {
			return {
				id: "creditUsage",
				tone: "critical",
				values: { name: wallet.name, percent: Math.round(usage) },
			};
		}
	}

	return null;
}

/** How many months of spending the liquid balances would cover. */
function emergencyCoverage({ wallets, transactions, reference }) {
	const liquid = wallets
		.filter((wallet) => wallet.type !== "credit")
		.reduce((sum, wallet) => sum + Math.max(0, wallet.balance), 0);

	if (liquid <= 0) return null;

	const average = averageMonthlyExpenses(transactions, reference);
	if (average <= 0) return null;

	const months = liquid / average;
	const values = { months: Math.round(months * 10) / 10, amount: liquid };

	if (months < COVERAGE_THIN) {
		return { id: "emergencyThin", tone: "warning", values };
	}
	if (months >= COVERAGE_COMFORTABLE) {
		return { id: "emergencyStrong", tone: "positive", values };
	}

	return { id: "emergencyCoverage", tone: "neutral", values };
}

/** What is being paid every single month. */
function recurring({ transactions, reference }) {
	const found = recurringExpenses(transactions, reference);
	if (found.length === 0) return null;

	return {
		id: "recurring",
		tone: "neutral",
		values: {
			count: found.length,
			amount: found.reduce((sum, entry) => sum + entry.average, 0),
			top: found[0].description,
		},
	};
}

/** The single charge that stands out. */
function dominantExpense({ monthExpenses, current }) {
	if (current.expenses <= 0 || monthExpenses.length === 0) return null;

	const biggest = [...monthExpenses].sort(
		(a, b) => Math.abs(b.amount) - Math.abs(a.amount),
	)[0];

	const share = (Math.abs(biggest.amount) / current.expenses) * 100;
	if (share < DOMINANT_EXPENSE_SHARE) return null;

	return {
		id: "biggestExpense",
		tone: "neutral",
		values: {
			description: biggest.description,
			amount: Math.abs(biggest.amount),
			percent: Math.round(share),
		},
	};
}

/**
 * The same description and amount charged twice within a few days — the shape
 * of a double charge. A monthly subscription is a month apart, so it won't trip
 * this.
 */
function possibleDuplicates({ monthExpenses }) {
	const groups = new Map();

	for (const transaction of monthExpenses) {
		const description = String(transaction.description ?? "")
			.trim()
			.toLowerCase();
		if (!description) continue;

		const key = `${description}|${Math.abs(transaction.amount).toFixed(2)}`;
		const group = groups.get(key) ?? [];
		group.push(transaction);
		groups.set(key, group);
	}

	const suspects = [];

	for (const group of groups.values()) {
		if (group.length < 2) continue;

		const sorted = [...group].sort(
			(a, b) => parseTransactionDate(a.date) - parseTransactionDate(b.date),
		);

		for (let index = 1; index < sorted.length; index++) {
			const gap =
				(parseTransactionDate(sorted[index].date) -
					parseTransactionDate(sorted[index - 1].date)) /
				MS_PER_DAY;

			if (gap <= DUPLICATE_WINDOW_DAYS) {
				suspects.push(sorted[index]);
				break;
			}
		}
	}

	if (suspects.length === 0) return null;

	return {
		id: "possibleDuplicate",
		tone: "warning",
		values: {
			description: suspects[0].description,
			amount: Math.abs(suspects[0].amount),
			count: suspects.length,
		},
	};
}

/** Rows with no category — they quietly break every other number. */
function uncategorized({ monthTransactions }) {
	const rows = monthTransactions.filter(
		(transaction) => !transaction.categoryName,
	);
	if (rows.length === 0) return null;

	return {
		id: "uncategorized",
		tone: "warning",
		values: {
			count: rows.length,
			amount: rows.reduce(
				(sum, transaction) => sum + Math.abs(transaction.amount),
				0,
			),
		},
	};
}

/** The weekday that carries most of the month's spending. */
function weekdayPattern({ monthExpenses, current }) {
	if (monthExpenses.length < MIN_ROWS_FOR_PATTERN || current.expenses <= 0) {
		return null;
	}

	const byWeekday = new Array(7).fill(0);
	for (const transaction of monthExpenses) {
		byWeekday[parseTransactionDate(transaction.date).getDay()] += Math.abs(
			transaction.amount,
		);
	}

	const amount = Math.max(...byWeekday);
	const share = (amount / current.expenses) * 100;
	if (share < CONCENTRATION_SHARE) return null;

	return {
		id: "weekdayPattern",
		tone: "neutral",
		values: {
			weekday: byWeekday.indexOf(amount),
			percent: Math.round(share),
			amount,
		},
	};
}

/** Lots of little charges quietly adding up. */
function smallCharges({ monthExpenses, current }) {
	if (monthExpenses.length < MIN_ROWS_FOR_PATTERN || current.expenses <= 0) {
		return null;
	}

	const mean = current.expenses / monthExpenses.length;
	const small = monthExpenses.filter(
		(transaction) => Math.abs(transaction.amount) <= mean * SMALL_CHARGE_RATIO,
	);

	if (small.length < MIN_SMALL_CHARGES) return null;

	const amount = small.reduce(
		(sum, transaction) => sum + Math.abs(transaction.amount),
		0,
	);
	const share = (amount / current.expenses) * 100;
	if (share < SMALL_CHARGE_SHARE) return null;

	return {
		id: "smallCharges",
		tone: "neutral",
		values: { count: small.length, amount, percent: Math.round(share) },
	};
}

/** The wallet most of the spending flows through. */
function walletConcentration({ monthExpenses, current }) {
	if (current.expenses <= 0) return null;

	const byWallet = new Map();
	for (const transaction of monthExpenses) {
		if (!transaction.walletName) continue;
		byWallet.set(
			transaction.walletName,
			(byWallet.get(transaction.walletName) ?? 0) + Math.abs(transaction.amount),
		);
	}

	// With a single wallet there is no concentration to report.
	if (byWallet.size < 2) return null;

	const [name, amount] = [...byWallet.entries()].sort((a, b) => b[1] - a[1])[0];
	const share = (amount / current.expenses) * 100;
	if (share < CONCENTRATION_SHARE) return null;

	return {
		id: "walletConcentration",
		tone: "neutral",
		values: { name, percent: Math.round(share), amount },
	};
}

/** Order matters only as a tiebreaker; `buildInsights` sorts by tone after. */
const GENERATORS = [
	spendingTrend,
	savings,
	projectedSpending,
	incomeTrend,
	topCategory,
	categoryShift,
	budgetHealth,
	budgetSlack,
	goalPacing,
	goalWins,
	creditUsage,
	emergencyCoverage,
	possibleDuplicates,
	uncategorized,
	recurring,
	dominantExpense,
	weekdayPattern,
	smallCharges,
	walletConcentration,
];

const TONE_ORDER = { critical: 0, warning: 1, positive: 2, neutral: 3 };

/**
 * Build the insight list, most actionable first.
 *
 * @param {object} data
 * @param {Array} data.transactions Normalised transactions.
 * @param {Array} data.budgets
 * @param {Array} data.goals
 * @param {Array} data.wallets
 * @param {Date}  [reference]
 * @returns {Array<{id: string, tone: string, values: object}>}
 */
export function buildInsights(data = {}, reference = new Date()) {
	const { transactions = [], budgets = [], goals = [], wallets = [] } = data;

	const monthTransactions = inMonth(transactions, reference);
	const context = {
		transactions,
		budgets,
		goals,
		wallets,
		reference,
		monthTransactions,
		monthExpenses: monthTransactions.filter(
			(transaction) => transaction.amount < 0,
		),
		...monthToDate(transactions, reference),
	};

	return GENERATORS.map((generate) => generate(context))
		.filter(Boolean)
		.sort((a, b) => TONE_ORDER[a.tone] - TONE_ORDER[b.tone]);
}

/** Split the list into the three buckets the page renders. */
export function groupInsights(insights = []) {
	return {
		attention: insights.filter((insight) =>
			["critical", "warning"].includes(insight.tone),
		),
		context: insights.filter((insight) => insight.tone === "neutral"),
		wins: insights.filter((insight) => insight.tone === "positive"),
	};
}

/** Headline numbers shown above the insight list. */
export function insightSummary(transactions = [], reference = new Date()) {
	const { current, previous } = monthToDate(transactions, reference);
	const net = current.income - current.expenses;

	return {
		income: current.income,
		expenses: current.expenses,
		net,
		savingsRate: current.income > 0 ? (net / current.income) * 100 : 0,
		expensesChange: percentChange(current.expenses, previous.expenses),
	};
}
