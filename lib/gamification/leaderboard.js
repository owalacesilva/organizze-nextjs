/**
 * Anonymous savings-rate leaderboard.
 *
 * The privacy rule is enforced by the shape of the data, not by remembering to
 * redact: a row is a handle and a percentage, and there is nowhere in it to put
 * a name, an income or an amount. Nothing that reaches this module can leak,
 * because nothing that could leak is ever passed in.
 */

import { inMonth, summarizeTransactions } from "@/lib/transactions";

/**
 * `(Total Saved / Total Income) * 100` for the calendar month of `reference`,
 * where what is saved is whatever income was not spent.
 *
 * Returns `0` for a month with no income — a rate against nothing is not a
 * meaningful zero, but it is the only honest thing to rank.
 */
export function savingsRate(transactions = [], reference = new Date()) {
	const { income, expenses } = summarizeTransactions(
		inMonth(transactions, reference),
	);

	if (income <= 0) return 0;
	return ((income - expenses) / income) * 100;
}

/** Stable pseudonym for a seed, e.g. `User8492`. Never derived from a name. */
export function anonymousHandle(seed) {
	let hash = 0;
	for (const character of String(seed ?? "")) {
		hash = (hash * 31 + character.codePointAt(0)) >>> 0;
	}
	return `User${1000 + (hash % 9000)}`;
}

/**
 * Rank `peers` — each `{ handle, rate }` — against the viewer's own rate.
 *
 * Opting out removes the viewer from the board entirely rather than hiding them
 * client-side, so an opted-out rate is never ranked in the first place.
 *
 * @returns `rows` ordered best first, each with `rank` and `isYou`, plus
 *          `myRank` (`null` when opted out) and the board `total`.
 */
export function buildLeaderboard({ peers = [], rate = 0, optedIn = false } = {}) {
	const board = peers.map((peer) => ({
		handle: peer.handle,
		rate: peer.rate,
		isYou: false,
	}));

	if (optedIn) {
		board.push({ handle: null, rate, isYou: true });
	}

	board.sort((a, b) => b.rate - a.rate);

	const rows = board.map((row, index) => ({ ...row, rank: index + 1 }));

	return {
		rows,
		total: rows.length,
		myRank: rows.find((row) => row.isYou)?.rank ?? null,
	};
}
