/**
 * Daily logging streak.
 *
 * Derived from the transactions themselves rather than counted up in stored
 * state: a streak is a fact about the statement, so recomputing it can never
 * drift, and it survives a reload without anything being persisted.
 *
 * Days are local — "before midnight in their own time zone" is the rule, and
 * `parseTransactionDate` already reads `YYYY-MM-DD` as a local date.
 */

import { parseTransactionDate } from "@/lib/transactions";

const MS_PER_HOUR = 3_600_000;

/** How long before midnight a live streak starts warning. */
export const REMINDER_HOURS = 3;

/** Streak lengths worth celebrating. */
export const STREAK_MILESTONES = [7, 30, 90];

const pad = (value) => String(value).padStart(2, "0");

/** Local `YYYY-MM-DD` for a date or date-like string, or `null` if unparseable. */
export function dayKey(value) {
	const date = parseTransactionDate(value);
	if (Number.isNaN(date.getTime())) return null;
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** The distinct local days that carry at least one transaction. */
export function loggedDays(transactions = []) {
	const days = new Set();

	for (const transaction of transactions) {
		const key = dayKey(transaction?.date);
		if (key) days.add(key);
	}

	return days;
}

function isDayAfter(previousKey, key) {
	const previous = parseTransactionDate(previousKey);
	const next = new Date(previous);
	next.setDate(next.getDate() + 1);
	return dayKey(next) === key;
}

/**
 * @param transactions Anything with a `date`.
 * @param now          Injected so the clock-sensitive parts stay testable.
 *
 * @returns `current`   consecutive days up to today.
 *          `longest`   best run ever recorded.
 *          `atRisk`    a live streak with no entry yet and midnight closing in.
 *
 * A day with no entry does not break the streak until it is actually over, so
 * `current` counts back from yesterday while today is still open.
 */
export function computeStreak(transactions = [], now = new Date()) {
	const days = loggedDays(transactions);
	const loggedToday = days.has(dayKey(now));

	const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	if (!loggedToday) cursor.setDate(cursor.getDate() - 1);

	let current = 0;
	while (days.has(dayKey(cursor))) {
		current += 1;
		cursor.setDate(cursor.getDate() - 1);
	}

	let longest = 0;
	let run = 0;
	let previous = null;
	for (const key of [...days].sort()) {
		run = previous && isDayAfter(previous, key) ? run + 1 : 1;
		longest = Math.max(longest, run);
		previous = key;
	}

	const midnight = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() + 1,
	);
	const hoursToMidnight = (midnight - now) / MS_PER_HOUR;

	return {
		current,
		longest,
		loggedToday,
		lastLoggedOn: previous,
		hoursToMidnight,
		atRisk: !loggedToday && current > 0 && hoursToMidnight <= REMINDER_HOURS,
	};
}

/** Milestones a streak of `length` has passed. */
export function reachedMilestones(length = 0) {
	return STREAK_MILESTONES.filter((milestone) => length >= milestone);
}
