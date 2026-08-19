/**
 * XP and token economy.
 *
 * Rewards are *recomputed* from what the account actually contains rather than
 * incremented on each action. That makes them idempotent — replaying the same
 * data twice cannot double-pay — and means the only thing worth storing is what
 * the user has spent.
 *
 * Badges pay tokens but never XP, which keeps the graph acyclic: XP is a
 * function of activity, badges are a function of activity and XP, and nothing
 * reads back into XP.
 */

import { reachedMilestones } from "./streak";

/** Award matrix. `xp` and `tokens` are per occurrence. */
export const XP_RULES = {
	dailyLog: { xp: 10, tokens: 2 },
	budgetCreated: { xp: 50, tokens: 25 },
	goalCreated: { xp: 40, tokens: 20 },
	goalCompleted: { xp: 100, tokens: 50 },
	streakMilestone: { xp: 25, tokens: 10 },
};

/** The "Financial Launchpad" welcome bonus. */
export const QUEST_BONUS = { xp: 200, tokens: 500 };

export const XP_PER_LEVEL = 250;

/**
 * Every reward the account has earned, itemised.
 *
 * @param context `{ transactions, budgets, goals, streak, quest, badges }`,
 *                where `badges` is the evaluated list and `quest` the
 *                evaluated onboarding quest.
 * @returns `entries` one row per rule that paid out, plus `totalXp` and
 *          `totalTokens` (earned — spending is applied by the caller).
 */
export function computeRewards({
	transactions = [],
	budgets = [],
	goals = [],
	streak = { longest: 0 },
	quest = { completed: false },
	badges = [],
} = {}) {
	const loggedDayCount = new Set(
		transactions.map((transaction) => String(transaction?.date ?? "").slice(0, 10)),
	);
	loggedDayCount.delete("");

	const counts = {
		dailyLog: loggedDayCount.size,
		budgetCreated: budgets.length,
		goalCreated: goals.length,
		goalCompleted: goals.filter(
			(goal) => Number(goal?.target) > 0 && Number(goal?.saved) >= Number(goal?.target),
		).length,
		streakMilestone: reachedMilestones(streak.longest).length,
	};

	const entries = Object.entries(XP_RULES)
		.filter(([key]) => counts[key] > 0)
		.map(([key, rule]) => ({
			key,
			count: counts[key],
			xp: rule.xp * counts[key],
			tokens: rule.tokens * counts[key],
		}));

	const unlockedBadges = badges.filter((badge) => badge.unlocked);
	const badgeTokens = unlockedBadges.reduce(
		(total, badge) => total + (badge.tokens ?? 0),
		0,
	);

	if (badgeTokens > 0) {
		entries.push({
			key: "badges",
			count: unlockedBadges.length,
			xp: 0,
			tokens: badgeTokens,
		});
	}

	if (quest.completed) {
		entries.push({ key: "quest", count: 1, ...QUEST_BONUS });
	}

	return {
		entries,
		totalXp: entries.reduce((total, entry) => total + entry.xp, 0),
		totalTokens: entries.reduce((total, entry) => total + entry.tokens, 0),
	};
}

/** Flat curve — every level costs the same, so the bar reads honestly. */
export function levelFromXp(xp = 0) {
	const safeXp = Math.max(0, Number(xp) || 0);
	const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
	const xpIntoLevel = safeXp % XP_PER_LEVEL;

	return {
		level,
		xp: safeXp,
		xpIntoLevel,
		xpForLevel: XP_PER_LEVEL,
		xpToNext: XP_PER_LEVEL - xpIntoLevel,
		percent: (xpIntoLevel / XP_PER_LEVEL) * 100,
	};
}
