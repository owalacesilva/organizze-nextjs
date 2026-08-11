"use client";

import { useGetBudgets } from "@/app/api/budgets/hooks";
import { useGetGamification } from "@/app/api/gamification/hooks";
import { useGetGoals } from "@/app/api/goals/hooks";
import { useGetTransactions } from "@/app/api/transactions/hooks";
import { useGetWallets } from "@/app/api/wallets/hooks";
import { EMPTY_STATE, buildGamificationProfile } from "@/lib/gamification";
import { normalizeTransaction } from "@/lib/transactions";
import { useEffect, useMemo, useState } from "react";

/** Slow enough to be free, fast enough to notice the last-3-hours window. */
const CLOCK_TICK_MS = 60_000;

/**
 * A clock that advances on its own.
 *
 * The streak warning turns on when midnight comes within three hours, which
 * nothing else on the page would ever trigger a re-render for.
 */
function useTickingClock(intervalMs = CLOCK_TICK_MS) {
	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), intervalMs);
		return () => clearInterval(id);
	}, [intervalMs]);

	return now;
}

/**
 * The whole gamification profile for the signed-in user.
 *
 * Every widget calls this; React Query dedupes by key, so the extra cards cost
 * one request per resource no matter how many of them ask.
 */
export function useGamification() {
	const gamificationQuery = useGetGamification();
	const transactionsQuery = useGetTransactions();
	const budgetsQuery = useGetBudgets();
	const goalsQuery = useGetGoals();
	const walletsQuery = useGetWallets();

	const now = useTickingClock();

	const transactions = useMemo(
		() => (transactionsQuery.data?.transactions ?? []).map(normalizeTransaction),
		[transactionsQuery.data],
	);

	const state = gamificationQuery.data?.state ?? EMPTY_STATE;
	const budgets = budgetsQuery.data?.budgets ?? [];
	const goals = goalsQuery.data?.goals ?? [];
	const wallets = walletsQuery.data?.wallets ?? [];

	const profile = useMemo(
		() =>
			buildGamificationProfile({
				transactions,
				budgets,
				goals,
				wallets,
				state,
				now,
			}),
		[transactions, budgets, goals, wallets, state, now],
	);

	return {
		profile,
		state,
		peers: gamificationQuery.data?.peers ?? [],
		isPending:
			gamificationQuery.isPending ||
			transactionsQuery.isPending ||
			budgetsQuery.isPending ||
			goalsQuery.isPending ||
			walletsQuery.isPending,
		isError:
			gamificationQuery.isError ||
			transactionsQuery.isError ||
			budgetsQuery.isError ||
			goalsQuery.isError ||
			walletsQuery.isError,
	};
}

export default useGamification;
