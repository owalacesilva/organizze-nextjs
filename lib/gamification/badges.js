/**
 * Milestone badges.
 *
 * A badge is a predicate over the account plus, where it makes sense, a
 * `progress` reading so a locked badge can say how far off it is instead of
 * just sitting there greyed out.
 *
 * Badges pay tokens, never XP — see the note in `xp.js` about keeping the
 * reward graph acyclic.
 */

const goalIsComplete = (goal) =>
	Number(goal?.target) > 0 && Number(goal?.saved) >= Number(goal?.target);

/** `id` doubles as the dictionary key under `gamification.badges`. */
export const BADGES = [
	{
		id: "firstStep",
		tier: "bronze",
		tokens: 20,
		unlocked: ({ transactions = [] }) => transactions.length > 0,
		progress: ({ transactions = [] }) => ({
			current: Math.min(transactions.length, 1),
			target: 1,
		}),
	},
	{
		id: "weekStreak",
		tier: "bronze",
		tokens: 40,
		unlocked: ({ streak }) => (streak?.longest ?? 0) >= 7,
		progress: ({ streak }) => ({
			current: Math.min(streak?.longest ?? 0, 7),
			target: 7,
		}),
	},
	{
		id: "monthStreak",
		tier: "silver",
		tokens: 120,
		unlocked: ({ streak }) => (streak?.longest ?? 0) >= 30,
		progress: ({ streak }) => ({
			current: Math.min(streak?.longest ?? 0, 30),
			target: 30,
		}),
	},
	{
		id: "quarterStreak",
		tier: "gold",
		tokens: 300,
		unlocked: ({ streak }) => (streak?.longest ?? 0) >= 90,
		progress: ({ streak }) => ({
			current: Math.min(streak?.longest ?? 0, 90),
			target: 90,
		}),
	},
	{
		id: "firstBudget",
		tier: "bronze",
		tokens: 25,
		unlocked: ({ budgets = [] }) => budgets.length > 0,
		progress: ({ budgets = [] }) => ({
			current: Math.min(budgets.length, 1),
			target: 1,
		}),
	},
	{
		id: "budgetKeeper",
		tier: "silver",
		tokens: 100,
		// Vacuously true with no budgets, so require at least one.
		unlocked: ({ budgets = [] }) =>
			budgets.length > 0 &&
			budgets.every((budget) => (budget.spent ?? 0) <= budget.amount),
		progress: ({ budgets = [] }) => ({
			current: budgets.filter((budget) => (budget.spent ?? 0) <= budget.amount)
				.length,
			target: Math.max(1, budgets.length),
		}),
	},
	{
		id: "firstGoal",
		tier: "bronze",
		tokens: 25,
		unlocked: ({ goals = [] }) => goals.length > 0,
		progress: ({ goals = [] }) => ({
			current: Math.min(goals.length, 1),
			target: 1,
		}),
	},
	{
		id: "goalAchiever",
		tier: "silver",
		tokens: 100,
		unlocked: ({ goals = [] }) => goals.some(goalIsComplete),
		progress: ({ goals = [] }) => ({
			current: Math.min(goals.filter(goalIsComplete).length, 1),
			target: 1,
		}),
	},
	{
		id: "goalCollector",
		tier: "gold",
		tokens: 250,
		unlocked: ({ goals = [] }) => goals.filter(goalIsComplete).length >= 3,
		progress: ({ goals = [] }) => ({
			current: Math.min(goals.filter(goalIsComplete).length, 3),
			target: 3,
		}),
	},
	{
		id: "saver",
		tier: "bronze",
		tokens: 50,
		unlocked: ({ savingsRate = 0 }) => savingsRate >= 20,
		progress: ({ savingsRate = 0 }) => ({
			current: Math.max(0, Math.min(savingsRate, 20)),
			target: 20,
			unit: "percent",
		}),
	},
	{
		id: "superSaver",
		tier: "gold",
		tokens: 200,
		unlocked: ({ savingsRate = 0 }) => savingsRate >= 40,
		progress: ({ savingsRate = 0 }) => ({
			current: Math.max(0, Math.min(savingsRate, 40)),
			target: 40,
			unit: "percent",
		}),
	},
	{
		id: "foundingMember",
		tier: "gold",
		// The launchpad's own 500-token bonus is the reward; this is the emblem.
		tokens: 0,
		unlocked: ({ quest }) => Boolean(quest?.completed),
		progress: ({ quest }) => ({
			current: quest?.doneCount ?? 0,
			target: quest?.total ?? 3,
		}),
	},
];

/**
 * Resolve every badge against the account.
 *
 * @returns One row per badge with `unlocked`, its `progress` reading and a
 *          `percent` for the meter shown on locked entries.
 */
export function evaluateBadges(context = {}) {
	return BADGES.map((badge) => {
		const unlocked = Boolean(badge.unlocked(context));
		const progress = badge.progress?.(context) ?? null;

		return {
			id: badge.id,
			tier: badge.tier,
			tokens: badge.tokens,
			unlocked,
			progress,
			percent: progress?.target
				? Math.min(100, (progress.current / progress.target) * 100)
				: unlocked
					? 100
					: 0,
		};
	});
}

/** Unlocked badges the user has not been shown the celebration for yet. */
export function newlyUnlocked(badges = [], celebrated = []) {
	const seen = new Set(celebrated);
	return badges.filter((badge) => badge.unlocked && !seen.has(badge.id));
}
