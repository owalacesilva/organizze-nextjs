/**
 * Turns the raw data into a short list of things worth telling the user.
 *
 * Every generator returns a plain descriptor — `{ id, tone, values }` — and
 * never a sentence: the copy lives in the dictionaries under `insights.items`,
 * so insights stay translatable and this module stays testable.
 *
 * Tones: `critical` (needs action), `warning` (watch it), `positive` (good
 * news), `neutral` (just context).
 */

import { budgetUsage } from "./budgets";
import { goalProgress } from "./goals";
import { inMonth, parseTransactionDate } from "./transactions";

/** Change beyond which a month-over-month move is worth mentioning. */
const SIGNIFICANT_CHANGE = 10;
/** A savings rate at or above this is praised, below zero is flagged. */
const HEALTHY_SAVINGS_RATE = 20;
/** Credit usage past this share of the limit gets called out. */
const HIGH_CREDIT_USAGE = 80;
/** How many of the last three months a description must appear in to count as recurring. */
const RECURRING_MONTHS = 3;

function startOfMonth(reference) {
	return new Date(reference.getFullYear(), reference.getMonth(), 1);
}

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

function percentChange(current, previous) {
	if (!previous) return current ? 100 : 0;
	return ((current - previous) / Math.abs(previous)) * 100;
}

/** Expense totals per category name for the given month. */
export function expensesByCategory(transactions = [], reference = new Date()) {
	const byCategory = new Map();

	for (const transaction of inMonth(transactions, reference)) {
		if (transaction.amount >= 0) continue;

		const name = transaction.categoryName || "";
		byCategory.set(name, (byCategory.get(name) ?? 0) + Math.abs(transaction.amount));
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

			const key = String(transaction.description ?? "").trim().toLowerCase();
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
	const {
		transactions = [],
		budgets = [],
		goals = [],
		wallets = [],
	} = data;

	const insights = [];
	const { current, previous } = monthToDate(transactions, reference);

	// 1. Are we spending more than at this point last month?
	if (previous.expenses > 0 || current.expenses > 0) {
		const change = percentChange(current.expenses, previous.expenses);

		if (Math.abs(change) >= SIGNIFICANT_CHANGE) {
			insights.push({
				id: change > 0 ? "spendingUp" : "spendingDown",
				tone: change > 0 ? "warning" : "positive",
				values: {
					percent: Math.abs(Math.round(change)),
					current: current.expenses,
					previous: previous.expenses,
				},
			});
		} else {
			insights.push({
				id: "spendingSteady",
				tone: "neutral",
				values: { current: current.expenses },
			});
		}
	}

	// 2. How much of this month's income is still unspent?
	if (current.income > 0) {
		const rate = ((current.income - current.expenses) / current.income) * 100;

		insights.push({
			id: rate < 0 ? "spendingOverIncome" : "savingsRate",
			tone:
				rate < 0 ? "critical" : rate >= HEALTHY_SAVINGS_RATE ? "positive" : "neutral",
			values: {
				percent: Math.round(Math.abs(rate)),
				saved: current.income - current.expenses,
			},
		});
	}

	// 3. Which category is eating the month.
	const categories = expensesByCategory(transactions, reference);
	if (categories.length > 0 && current.expenses > 0) {
		const [top] = categories;

		insights.push({
			id: "topCategory",
			tone: "neutral",
			values: {
				category: top.name,
				amount: top.amount,
				percent: Math.round((top.amount / current.expenses) * 100),
			},
		});
	}

	// 4. Budgets that are blown, or will be at the current rate.
	const risky = budgets
		.map((budget) => ({ budget, usage: budgetUsage(budget, reference) }))
		.filter(({ usage }) => usage.isOver || usage.willExceed);

	if (risky.length > 0) {
		const over = risky.filter(({ usage }) => usage.isOver);
		const worst = risky.sort((a, b) => b.usage.percent - a.usage.percent)[0];

		insights.push({
			id: over.length > 0 ? "budgetExceeded" : "budgetAtRisk",
			tone: over.length > 0 ? "critical" : "warning",
			values: {
				name: worst.budget.name,
				count: risky.length,
				percent: Math.round(worst.usage.percent),
				projected: worst.usage.projected,
			},
		});
	} else if (budgets.length > 0) {
		insights.push({
			id: "budgetsHealthy",
			tone: "positive",
			values: { count: budgets.length },
		});
	}

	// 5. Goals that will not land on time.
	const offTrack = goals
		.map((goal) => ({ goal, progress: goalProgress(goal, reference) }))
		.filter(({ progress }) => progress.isOverdue);

	if (offTrack.length > 0) {
		insights.push({
			id: "goalOverdue",
			tone: "warning",
			values: { name: offTrack[0].goal.name, count: offTrack.length },
		});
	} else {
		const nearest = goals
			.map((goal) => ({ goal, progress: goalProgress(goal, reference) }))
			.filter(({ progress }) => !progress.isComplete && progress.monthlyNeeded)
			.sort((a, b) => a.progress.daysLeft - b.progress.daysLeft)[0];

		if (nearest) {
			insights.push({
				id: "goalPace",
				tone: "neutral",
				values: {
					name: nearest.goal.name,
					amount: nearest.progress.monthlyNeeded,
					percent: Math.round(nearest.progress.percent),
				},
			});
		}
	}

	// 6. Credit cards close to their limit, or accounts in the red.
	for (const wallet of wallets) {
		const usage =
			wallet.type === "credit" && wallet.creditLimit
				? (Math.abs(Math.min(0, wallet.balance)) / wallet.creditLimit) * 100
				: 0;

		if (usage >= HIGH_CREDIT_USAGE) {
			insights.push({
				id: "creditUsage",
				tone: "critical",
				values: { name: wallet.name, percent: Math.round(usage) },
			});
			break;
		}
	}

	// 7. What is being paid every single month.
	const recurring = recurringExpenses(transactions, reference);
	if (recurring.length > 0) {
		const monthly = recurring.reduce((sum, entry) => sum + entry.average, 0);

		insights.push({
			id: "recurring",
			tone: "neutral",
			values: {
				count: recurring.length,
				amount: monthly,
				top: recurring[0].description,
			},
		});
	}

	// 8. The single charge that stands out.
	const biggest = inMonth(transactions, reference)
		.filter((transaction) => transaction.amount < 0)
		.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))[0];

	if (biggest && current.expenses > 0) {
		const share = (Math.abs(biggest.amount) / current.expenses) * 100;

		if (share >= 20) {
			insights.push({
				id: "biggestExpense",
				tone: "neutral",
				values: {
					description: biggest.description,
					amount: Math.abs(biggest.amount),
					percent: Math.round(share),
				},
			});
		}
	}

	const order = { critical: 0, warning: 1, positive: 2, neutral: 3 };
	return insights.sort((a, b) => order[a.tone] - order[b.tone]);
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
