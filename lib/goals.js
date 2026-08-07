/**
 * Goal maths shared by the goals page, its details panel and the insights page.
 */

import { parseTransactionDate } from "./transactions";

const MS_PER_DAY = 86_400_000;

/**
 * Progress and pacing for a savings goal.
 *
 * `monthlyNeeded` is what has to be put aside every month to hit the target by
 * the deadline; it is `null` when there is no deadline to pace against, and
 * equal to the whole remainder when the deadline is already here.
 *
 * @param {{target: number, saved?: number, deadline?: string|null}} goal
 * @param {Date} [reference]
 */
export function goalProgress(goal, reference = new Date()) {
	const target = Number(goal?.target) || 0;
	const saved = Number(goal?.saved) || 0;

	const percent = target > 0 ? (saved / target) * 100 : 0;
	const remaining = Math.max(0, target - saved);
	const isComplete = target > 0 && saved >= target;

	if (!goal?.deadline) {
		return {
			target,
			saved,
			percent,
			remaining,
			isComplete,
			deadline: null,
			daysLeft: null,
			monthsLeft: null,
			monthlyNeeded: null,
			isOverdue: false,
		};
	}

	const deadline = parseTransactionDate(goal.deadline);
	const daysLeft = Math.ceil((deadline - reference) / MS_PER_DAY);
	const monthsLeft = daysLeft / 30.44;
	const isOverdue = !isComplete && daysLeft < 0;

	return {
		target,
		saved,
		percent,
		remaining,
		isComplete,
		deadline,
		daysLeft,
		monthsLeft: Math.max(0, monthsLeft),
		monthlyNeeded:
			isComplete || monthsLeft <= 0 ? remaining : remaining / monthsLeft,
		isOverdue,
	};
}

/** Goals that will miss their deadline at the current rate, nearest first. */
export function goalsOffTrack(goals = [], reference = new Date()) {
	return goals
		.map((goal) => ({ goal, progress: goalProgress(goal, reference) }))
		.filter(({ progress }) => progress.isOverdue)
		.sort((a, b) => a.progress.daysLeft - b.progress.daysLeft);
}
