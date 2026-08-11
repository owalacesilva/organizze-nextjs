/**
 * "Financial Launchpad" — the three-step setup quest a new account starts on.
 *
 * Each task is answered by looking at the account, not by a flag someone has to
 * remember to set: a user who already had a budget before the quest existed is
 * credited for it, and a deleted budget takes the tick back.
 */

export const QUEST_TASKS = [
	{
		key: "income",
		href: "/wallets",
		/** A wallet stands in for a linked account; income covers typing it in. */
		isDone: ({ wallets = [], transactions = [] }) =>
			wallets.length > 0 ||
			transactions.some((transaction) => Number(transaction?.amount) > 0),
	},
	{
		key: "budget",
		href: "/budgets",
		isDone: ({ budgets = [] }) => budgets.length > 0,
	},
	{
		key: "goal",
		href: "/goals",
		isDone: ({ goals = [] }) => goals.length > 0,
	},
];

/**
 * @returns `tasks` with a `done` flag each, plus the counts the progress
 *          tracker renders and whether the whole quest has landed.
 */
export function evaluateQuest(context = {}) {
	const tasks = QUEST_TASKS.map((task) => ({
		key: task.key,
		href: task.href,
		done: Boolean(task.isDone(context)),
	}));

	const doneCount = tasks.filter((task) => task.done).length;

	return {
		tasks,
		doneCount,
		total: tasks.length,
		completed: doneCount === tasks.length,
		percent: (doneCount / tasks.length) * 100,
	};
}
