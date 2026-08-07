"use client";

import { useGetTransactions } from "@/app/api/transactions/hooks";
import {
	monthlyTotals,
	normalizeTransaction,
	summarizeTransactions,
} from "@/lib/transactions";
import { useMemo } from "react";

const MONTHS = 6;

/**
 * Everything the analytics tabs chart, derived from the statement so the
 * numbers agree with the transactions page.
 */
export function useAnalyticsData() {
	const transactionsQuery = useGetTransactions();

	const transactions = useMemo(
		() =>
			(transactionsQuery.data?.transactions ?? []).map(normalizeTransaction),
		[transactionsQuery.data],
	);

	const months = useMemo(
		() => monthlyTotals(transactions, MONTHS),
		[transactions],
	);

	const totals = useMemo(
		() => summarizeTransactions(transactions),
		[transactions],
	);

	return {
		transactions,
		months,
		totals,
		isPending: transactionsQuery.isPending,
		isError: transactionsQuery.isError,
		refetch: transactionsQuery.refetch,
	};
}

/**
 * Group by category name for one side of the ledger.
 *
 * @param {"income"|"expense"} type
 * @returns {Array<{name: string, amount: number, percentage: number}>} sorted desc
 */
export function groupByCategory(transactions, type, fallbackName) {
	const byCategory = new Map();
	let total = 0;

	for (const transaction of transactions) {
		if (transaction.type !== type) continue;

		const name = transaction.categoryName || fallbackName;
		const amount = Math.abs(transaction.amount);
		byCategory.set(name, (byCategory.get(name) ?? 0) + amount);
		total += amount;
	}

	return [...byCategory.entries()]
		.sort(([, a], [, b]) => b - a)
		.map(([name, amount]) => ({
			name,
			amount,
			percentage: total > 0 ? (amount / total) * 100 : 0,
		}));
}

/** Largest single entry of a given type, or `null` when there is none. */
export function biggest(transactions, type) {
	return transactions
		.filter((transaction) => transaction.type === type)
		.reduce(
			(best, transaction) =>
				!best || Math.abs(transaction.amount) > Math.abs(best.amount)
					? transaction
					: best,
			null,
		);
}
