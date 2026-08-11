/**
 * The gamification engine.
 *
 * One pure function turns the account plus a small blob of stored preferences
 * into everything the UI renders. Nothing here accumulates: streaks, badges,
 * XP and quest progress are all recomputed from the statement, so they cannot
 * drift out of sync with the data and they survive a reload for free.
 *
 * The only genuinely stored facts are the ones no amount of arithmetic can
 * recover — what was bought, what was opted into, and which celebrations have
 * already been shown.
 */

import { evaluateBadges } from "./badges";
import { savingsRate as monthlySavingsRate } from "./leaderboard";
import { spentOn } from "./marketplace";
import { evaluateQuest } from "./quest";
import { computeStreak } from "./streak";
import { computeRewards, levelFromXp } from "./xp";

export * from "./badges";
export * from "./leaderboard";
export * from "./marketplace";
export * from "./quest";
export * from "./streak";
export * from "./xp";

/** The stored half — everything else is derived. */
export const EMPTY_STATE = {
	purchases: [],
	activeTheme: "default",
	leaderboardOptIn: false,
	celebratedBadges: [],
};

/**
 * @param account `{ transactions, budgets, goals, wallets }`.
 * @param state   The stored preferences blob.
 * @param now     Injected so the streak's clock stays testable.
 */
export function buildGamificationProfile({
	transactions = [],
	budgets = [],
	goals = [],
	wallets = [],
	state = EMPTY_STATE,
	now = new Date(),
} = {}) {
	const streak = computeStreak(transactions, now);
	const quest = evaluateQuest({ transactions, budgets, goals, wallets });
	const savingsRate = monthlySavingsRate(transactions, now);

	const badges = evaluateBadges({
		transactions,
		budgets,
		goals,
		wallets,
		streak,
		quest,
		savingsRate,
	});

	const rewards = computeRewards({
		transactions,
		budgets,
		goals,
		streak,
		quest,
		badges,
	});

	const spent = spentOn(state.purchases);

	return {
		streak,
		quest,
		badges,
		rewards,
		savingsRate,
		level: levelFromXp(rewards.totalXp),
		tokens: {
			earned: rewards.totalTokens,
			spent,
			balance: rewards.totalTokens - spent,
		},
		unlockedCount: badges.filter((badge) => badge.unlocked).length,
		totalBadges: badges.length,
	};
}
