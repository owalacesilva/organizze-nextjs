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

	const date = new Date(transaction.date);
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

/** Most recent first; entries with unparseable dates sink to the bottom. */
export function sortByDateDesc(transactions = []) {
	return [...transactions].sort((a, b) => {
		const timeA = new Date(a.date).getTime();
		const timeB = new Date(b.date).getTime();

		if (Number.isNaN(timeA)) return 1;
		if (Number.isNaN(timeB)) return -1;
		return timeB - timeA;
	});
}
