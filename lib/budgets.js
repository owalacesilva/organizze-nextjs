/**
 * Budget maths shared by the budgets page, its details panel and the insights
 * page. Pure and date-injectable so the projections can be tested.
 */

/** Days in the calendar month `reference` falls in. */
export function daysInMonth(reference = new Date()) {
	return new Date(
		reference.getFullYear(),
		reference.getMonth() + 1,
		0,
	).getDate();
}

/**
 * How a budget is tracking against its limit.
 *
 * `projected` extrapolates the current daily rate to the end of the month, so a
 * budget can be flagged before it is actually blown. `pace` is the ratio of
 * spending to elapsed time: 1 means exactly on track, >1 means too fast.
 *
 * @param {{amount: number, spent?: number}} budget
 * @param {Date} [reference]
 */
export function budgetUsage(budget, reference = new Date()) {
	const limit = Number(budget?.amount) || 0;
	const spent = Number(budget?.spent) || 0;

	const total = daysInMonth(reference);
	const elapsed = Math.min(reference.getDate(), total);
	const daysLeft = Math.max(0, total - elapsed);

	const percent = limit > 0 ? (spent / limit) * 100 : 0;
	const dailyAverage = elapsed > 0 ? spent / elapsed : 0;
	const projected = dailyAverage * total;
	const expectedByNow = limit * (elapsed / total);

	return {
		limit,
		spent,
		percent,
		remaining: limit - spent,
		isOver: spent > limit,
		daysLeft,
		dailyAverage,
		projected,
		// Guard the first day of the month, when `expectedByNow` is still tiny.
		pace: expectedByNow > 0 ? spent / expectedByNow : 0,
		willExceed: limit > 0 && projected > limit,
	};
}

/** Budgets whose projection breaks the limit, worst first. */
export function budgetsAtRisk(budgets = [], reference = new Date()) {
	return budgets
		.map((budget) => ({ budget, usage: budgetUsage(budget, reference) }))
		.filter(({ usage }) => usage.isOver || usage.willExceed)
		.sort((a, b) => b.usage.percent - a.usage.percent);
}
