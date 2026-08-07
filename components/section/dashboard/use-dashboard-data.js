"use client";

import { useGetTransactions } from "@/app/api/transactions/hooks";
import { useGetWallets } from "@/app/api/wallets/hooks";
import { normalizeTransaction, sortByDateDesc } from "@/lib/transactions";
import { useMemo } from "react";

/**
 * Shared dashboard dataset.
 *
 * Every widget calls this; React Query dedupes by key, so the page still makes
 * one request per resource no matter how many cards ask for it.
 */
export function useDashboardData() {
	const transactionsQuery = useGetTransactions();
	const walletsQuery = useGetWallets();

	const transactions = useMemo(
		() =>
			sortByDateDesc(
				(transactionsQuery.data?.transactions ?? []).map(normalizeTransaction),
			),
		[transactionsQuery.data],
	);

	const wallets = walletsQuery.data?.wallets ?? [];

	const totalBalance = useMemo(
		() => wallets.reduce((total, wallet) => total + wallet.balance, 0),
		[wallets],
	);

	return {
		transactions,
		wallets,
		totalBalance,
		isPending: transactionsQuery.isPending || walletsQuery.isPending,
		isError: transactionsQuery.isError || walletsQuery.isError,
	};
}

/** Totals for the last `days` days and for the `days` before that. */
export function comparePeriods(transactions, days = 30, now = new Date()) {
	const currentStart = new Date(now);
	currentStart.setDate(currentStart.getDate() - days);

	const previousStart = new Date(now);
	previousStart.setDate(previousStart.getDate() - days * 2);

	const empty = () => ({ income: 0, expenses: 0, net: 0 });
	const current = empty();
	const previous = empty();

	for (const transaction of transactions) {
		const date = new Date(transaction.date);
		if (Number.isNaN(date.getTime())) continue;

		const bucket =
			date >= currentStart ? current : date >= previousStart ? previous : null;
		if (!bucket) continue;

		if (transaction.amount < 0) {
			bucket.expenses += Math.abs(transaction.amount);
		} else {
			bucket.income += transaction.amount;
		}
		bucket.net = bucket.income - bucket.expenses;
	}

	return { current, previous };
}

/** Percentage change, guarding against a zero baseline. */
export function percentChange(current, previous) {
	if (!previous) return current ? 100 : 0;
	return ((current - previous) / Math.abs(previous)) * 100;
}
