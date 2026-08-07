/**
 * Pure helpers behind the transactions page: filtering, summarising and
 * normalising API payloads. Kept free of React so they can be unit tested.
 */

export const DEFAULT_FILTERS = {
	search: "",
	type: "all",
	period: "all",
	categoryId: "all",
	minAmount: "",
	maxAmount: "",
};

/** Rolling windows offered by the period filter, in days. */
export const PERIOD_DAYS = {
	week: 7,
	month: 30,
	quarter: 90,
	year: 365,
};

/**
 * Parse a transaction date.
 *
 * `new Date("2026-03-01")` is midnight **UTC**, which in a negative-offset zone
 * reads back as February — so a plain `YYYY-MM-DD` is built as a local date
 * instead. Anything else (a full timestamp) is left to the Date constructor.
 */
export function parseTransactionDate(value) {
	if (value instanceof Date) return value;

	const text = String(value ?? "");
	const dateOnly = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (dateOnly) {
		return new Date(
			Number(dateOnly[1]),
			Number(dateOnly[2]) - 1,
			Number(dateOnly[3]),
		);
	}

	return new Date(text);
}

/** The API has no explicit type; the sign of the amount carries it. */
export function getTransactionType(transaction) {
	return Number(transaction?.amount) < 0 ? "expense" : "income";
}

/**
 * Flatten an API transaction into the shape the table renders, tolerating the
 * optional `wallet` / `walletId` fields some endpoints include.
 */
export function normalizeTransaction(transaction) {
	const amount = Number(transaction?.amount) || 0;

	return {
		...transaction,
		amount,
		type: getTransactionType(transaction),
		categoryId: transaction?.category?.id ?? transaction?.categoryId ?? null,
		categoryName: transaction?.category?.name ?? "",
		walletName: transaction?.wallet?.name ?? "",
	};
}

function withinPeriod(transaction, period, now) {
	if (period === "all") return true;

	const days = PERIOD_DAYS[period];
	if (!days) return true;

	const date = parseTransactionDate(transaction.date);
	if (Number.isNaN(date.getTime())) return false;

	const cutoff = new Date(now);
	cutoff.setDate(cutoff.getDate() - days);
	return date >= cutoff;
}

/**
 * @param {Array} transactions Normalised transactions.
 * @param {object} filters     Same shape as DEFAULT_FILTERS.
 * @param {Date} [now]         Injected for deterministic tests.
 */
export function filterTransactions(
	transactions = [],
	filters = DEFAULT_FILTERS,
	now = new Date(),
) {
	const search = filters.search?.trim().toLowerCase() ?? "";
	// Amounts are compared on magnitude: "over 100" should match -150 too.
	const min = filters.minAmount === "" ? null : Number(filters.minAmount);
	const max = filters.maxAmount === "" ? null : Number(filters.maxAmount);

	return transactions.filter((transaction) => {
		if (filters.type !== "all" && transaction.type !== filters.type) {
			return false;
		}

		if (
			filters.categoryId !== "all" &&
			String(transaction.categoryId) !== String(filters.categoryId)
		) {
			return false;
		}

		if (!withinPeriod(transaction, filters.period, now)) return false;

		const magnitude = Math.abs(transaction.amount);
		if (min !== null && !Number.isNaN(min) && magnitude < min) return false;
		if (max !== null && !Number.isNaN(max) && magnitude > max) return false;

		if (search) {
			const haystack =
				`${transaction.description ?? ""} ${transaction.categoryName} ${transaction.walletName}`.toLowerCase();
			if (!haystack.includes(search)) return false;
		}

		return true;
	});
}

/** How many panel filters differ from their default (search is excluded — it has its own input). */
export function countActiveFilters(filters = DEFAULT_FILTERS) {
	return Object.entries(filters).filter(
		([key, value]) => key !== "search" && value !== DEFAULT_FILTERS[key],
	).length;
}

export function summarizeTransactions(transactions = []) {
	return transactions.reduce(
		(totals, transaction) => {
			if (transaction.amount < 0) {
				totals.expenses += Math.abs(transaction.amount);
			} else {
				totals.income += transaction.amount;
			}
			totals.balance = totals.income - totals.expenses;
			return totals;
		},
		{ income: 0, expenses: 0, balance: 0 },
	);
}

/**
 * Income and expense totals for the last `months` calendar months, oldest
 * first. Months without activity are still present (zeroed) so charts keep an
 * even x-axis.
 *
 * @param {Array} transactions Normalised transactions.
 * @param {number} [months=6]
 * @param {Date} [now]         Injected for deterministic tests.
 * @returns {Array<{key: string, date: Date, income: number, expenses: number}>}
 */
export function monthlyTotals(transactions = [], months = 6, now = new Date()) {
	const buckets = new Map();

	for (let offset = months - 1; offset >= 0; offset--) {
		const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
		buckets.set(monthKey(date), { key: monthKey(date), date, income: 0, expenses: 0 });
	}

	for (const transaction of transactions) {
		const date = parseTransactionDate(transaction.date);
		if (Number.isNaN(date.getTime())) continue;

		const bucket = buckets.get(monthKey(date));
		if (!bucket) continue;

		if (transaction.amount < 0) {
			bucket.expenses += Math.abs(transaction.amount);
		} else {
			bucket.income += transaction.amount;
		}
	}

	return [...buckets.values()];
}

function monthKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/** Every entry that falls in the same calendar month as `reference`. */
export function inMonth(transactions = [], reference = new Date()) {
	const wanted = monthKey(reference);

	return transactions.filter((transaction) => {
		const date = parseTransactionDate(transaction.date);
		if (Number.isNaN(date.getTime())) return false;
		return monthKey(date) === wanted;
	});
}

/**
 * The `limit` largest expenses of `reference`'s month, biggest first, each with
 * its share of everything spent that month.
 *
 * @returns {{items: Array, total: number}} `total` covers the whole month, not
 *          just the returned slice, so the shares add up honestly.
 */
export function topExpenses(transactions = [], limit = 5, reference = new Date()) {
	const expenses = inMonth(transactions, reference).filter(
		(transaction) => Number(transaction.amount) < 0,
	);

	const total = expenses.reduce(
		(sum, transaction) => sum + Math.abs(transaction.amount),
		0,
	);

	const items = [...expenses]
		.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
		.slice(0, limit)
		.map((transaction) => ({
			...transaction,
			magnitude: Math.abs(transaction.amount),
			share: total > 0 ? (Math.abs(transaction.amount) / total) * 100 : 0,
		}));

	return { items, total };
}

/** Most recent first; entries with unparseable dates sink to the bottom. */
export function sortByDateDesc(transactions = []) {
	return [...transactions].sort((a, b) => {
		const timeA = parseTransactionDate(a.date).getTime();
		const timeB = parseTransactionDate(b.date).getTime();

		if (Number.isNaN(timeA)) return 1;
		if (Number.isNaN(timeB)) return -1;
		return timeB - timeA;
	});
}
