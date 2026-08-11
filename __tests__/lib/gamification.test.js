import {
	BADGES,
	QUEST_BONUS,
	XP_PER_LEVEL,
	XP_RULES,
	anonymousHandle,
	buildGamificationProfile,
	buildLeaderboard,
	catalogue,
	computeRewards,
	computeStreak,
	evaluateBadges,
	evaluateQuest,
	levelFromXp,
	newlyUnlocked,
	reachedMilestones,
	savingsRate,
	spentOn,
} from "@/lib/gamification";

/** Local `YYYY-MM-DD`, matching how the app reads transaction dates. */
const NOW = new Date(2026, 7, 7, 12, 0, 0); // 7 Aug 2026, midday

function daysBefore(offset, reference = NOW) {
	const date = new Date(reference);
	date.setDate(date.getDate() - offset);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const logOn = (offsets) =>
	offsets.map((offset, index) => ({
		id: index + 1,
		amount: -10,
		date: daysBefore(offset),
	}));

describe("computeStreak", () => {
	it("counts consecutive days up to today", () => {
		const streak = computeStreak(logOn([0, 1, 2, 3]), NOW);

		expect(streak.current).toBe(4);
		expect(streak.loggedToday).toBe(true);
	});

	it("counts several entries on one day once", () => {
		const transactions = [
			{ amount: -1, date: daysBefore(0) },
			{ amount: -2, date: daysBefore(0) },
			{ amount: -3, date: daysBefore(1) },
		];

		expect(computeStreak(transactions, NOW).current).toBe(2);
	});

	it("keeps a streak alive while today is still open", () => {
		// Nothing logged today, but yesterday and before are covered: the day
		// has not passed yet, so the run is intact.
		const streak = computeStreak(logOn([1, 2, 3]), NOW);

		expect(streak.current).toBe(3);
		expect(streak.loggedToday).toBe(false);
	});

	it("resets to zero once a whole day has passed unlogged", () => {
		const streak = computeStreak(logOn([2, 3, 4]), NOW);

		expect(streak.current).toBe(0);
	});

	it("ignores a gap when measuring the longest run", () => {
		const streak = computeStreak(logOn([0, 1, 5, 6, 7, 8, 9]), NOW);

		expect(streak.current).toBe(2);
		expect(streak.longest).toBe(5);
	});

	it("warns only inside the last three hours before midnight", () => {
		const transactions = logOn([1, 2]);

		const midday = computeStreak(transactions, new Date(2026, 7, 7, 12, 0));
		expect(midday.atRisk).toBe(false);

		const late = computeStreak(transactions, new Date(2026, 7, 7, 21, 30));
		expect(late.atRisk).toBe(true);
		expect(late.hoursToMidnight).toBeCloseTo(2.5, 5);
	});

	it("does not warn when today is already logged", () => {
		const late = computeStreak(logOn([0, 1]), new Date(2026, 7, 7, 23, 0));

		expect(late.atRisk).toBe(false);
	});

	it("has nothing to warn about without a streak", () => {
		expect(computeStreak([], new Date(2026, 7, 7, 23, 0)).atRisk).toBe(false);
	});

	it("reports the milestones a run has passed", () => {
		expect(reachedMilestones(0)).toEqual([]);
		expect(reachedMilestones(7)).toEqual([7]);
		expect(reachedMilestones(95)).toEqual([7, 30, 90]);
	});
});

describe("savingsRate", () => {
	it("is what was left of the month's income", () => {
		const transactions = [
			{ amount: 1000, date: daysBefore(1) },
			{ amount: -400, date: daysBefore(2) },
		];

		expect(savingsRate(transactions, NOW)).toBeCloseTo(60, 5);
	});

	it("goes negative when the month overspends", () => {
		const transactions = [
			{ amount: 1000, date: daysBefore(1) },
			{ amount: -1500, date: daysBefore(2) },
		];

		expect(savingsRate(transactions, NOW)).toBeCloseTo(-50, 5);
	});

	it("is zero when there was no income to save out of", () => {
		expect(savingsRate([{ amount: -50, date: daysBefore(1) }], NOW)).toBe(0);
	});

	it("only counts the reference month", () => {
		const transactions = [
			{ amount: 1000, date: daysBefore(1) },
			{ amount: -400, date: daysBefore(1) },
			{ amount: -5000, date: "2026-01-15" },
		];

		expect(savingsRate(transactions, NOW)).toBeCloseTo(60, 5);
	});
});

describe("leaderboard", () => {
	const PEERS = [
		{ handle: "User1234", rate: 45 },
		{ handle: "User5678", rate: 12 },
	];

	it("mints a stable pseudonym that carries nothing personal", () => {
		expect(anonymousHandle("demo@organizze.app")).toMatch(/^User\d{4}$/);
		expect(anonymousHandle("demo@organizze.app")).toBe(
			anonymousHandle("demo@organizze.app"),
		);
		expect(anonymousHandle("a")).not.toBe(anonymousHandle("b"));
	});

	it("ranks the viewer among peers when opted in", () => {
		const board = buildLeaderboard({ peers: PEERS, rate: 30, optedIn: true });

		expect(board.rows.map((row) => row.rank)).toEqual([1, 2, 3]);
		expect(board.myRank).toBe(2);
		expect(board.total).toBe(3);
	});

	it("leaves the viewer off the board entirely when opted out", () => {
		const board = buildLeaderboard({ peers: PEERS, rate: 99, optedIn: false });

		expect(board.myRank).toBeNull();
		expect(board.total).toBe(2);
		expect(board.rows.some((row) => row.isYou)).toBe(false);
	});

	it("never carries an amount or a name on a row", () => {
		const board = buildLeaderboard({ peers: PEERS, rate: 30, optedIn: true });

		for (const row of board.rows) {
			expect(Object.keys(row).sort()).toEqual([
				"handle",
				"isYou",
				"rank",
				"rate",
			]);
		}
	});
});

describe("evaluateQuest", () => {
	it("starts empty", () => {
		const quest = evaluateQuest({});

		expect(quest.doneCount).toBe(0);
		expect(quest.total).toBe(3);
		expect(quest.completed).toBe(false);
	});

	it("credits setup the account already had", () => {
		const quest = evaluateQuest({
			wallets: [{ id: 1 }],
			budgets: [{ id: 1 }],
			goals: [],
		});

		expect(quest.doneCount).toBe(2);
		expect(quest.percent).toBeCloseTo(66.666, 2);
		expect(quest.completed).toBe(false);
	});

	it("accepts logged income in place of a linked wallet", () => {
		const quest = evaluateQuest({
			transactions: [{ amount: 2500, date: daysBefore(1) }],
			budgets: [{ id: 1 }],
			goals: [{ id: 1 }],
		});

		expect(quest.completed).toBe(true);
	});
});

describe("evaluateBadges", () => {
	const base = {
		transactions: [],
		budgets: [],
		goals: [],
		streak: { longest: 0 },
		quest: { completed: false, doneCount: 0, total: 3 },
		savingsRate: 0,
	};

	const badge = (badges, id) => badges.find((entry) => entry.id === id);

	it("locks everything for an empty account", () => {
		const badges = evaluateBadges(base);

		expect(badges).toHaveLength(BADGES.length);
		expect(badges.every((entry) => !entry.unlocked)).toBe(true);
	});

	it("unlocks streak tiers as the run grows", () => {
		const badges = evaluateBadges({ ...base, streak: { longest: 30 } });

		expect(badge(badges, "weekStreak").unlocked).toBe(true);
		expect(badge(badges, "monthStreak").unlocked).toBe(true);
		expect(badge(badges, "quarterStreak").unlocked).toBe(false);
	});

	it("reports how far a locked badge has to go", () => {
		const badges = evaluateBadges({ ...base, streak: { longest: 45 } });
		const quarter = badge(badges, "quarterStreak");

		expect(quarter.progress).toMatchObject({ current: 45, target: 90 });
		expect(quarter.percent).toBeCloseTo(50, 5);
	});

	it("does not hand out budgetKeeper to an account with no budgets", () => {
		expect(badge(evaluateBadges(base), "budgetKeeper").unlocked).toBe(false);
	});

	it("unlocks budgetKeeper only while every budget holds", () => {
		const within = evaluateBadges({
			...base,
			budgets: [
				{ amount: 100, spent: 80 },
				{ amount: 200, spent: 200 },
			],
		});
		expect(badge(within, "budgetKeeper").unlocked).toBe(true);

		const over = evaluateBadges({
			...base,
			budgets: [
				{ amount: 100, spent: 80 },
				{ amount: 200, spent: 201 },
			],
		});
		expect(badge(over, "budgetKeeper").unlocked).toBe(false);
	});

	it("counts completed goals for the collector tiers", () => {
		const goals = [
			{ target: 100, saved: 100 },
			{ target: 100, saved: 120 },
			{ target: 100, saved: 10 },
		];
		const badges = evaluateBadges({ ...base, goals });

		expect(badge(badges, "goalAchiever").unlocked).toBe(true);
		expect(badge(badges, "goalCollector").unlocked).toBe(false);
		expect(badge(badges, "goalCollector").progress.current).toBe(2);
	});

	it("keeps the founding emblem free of tokens so the bonus stays exactly 500", () => {
		expect(badge(evaluateBadges(base), "foundingMember").tokens).toBe(0);
		expect(QUEST_BONUS.tokens).toBe(500);
	});
});

describe("newlyUnlocked", () => {
	it("returns unlocked badges that have not been celebrated", () => {
		const badges = [
			{ id: "a", unlocked: true },
			{ id: "b", unlocked: true },
			{ id: "c", unlocked: false },
		];

		expect(newlyUnlocked(badges, ["a"]).map((entry) => entry.id)).toEqual(["b"]);
		expect(newlyUnlocked(badges, ["a", "b"])).toEqual([]);
	});
});

describe("computeRewards", () => {
	it("pays per distinct logged day, not per transaction", () => {
		const transactions = [
			{ amount: -1, date: daysBefore(0) },
			{ amount: -2, date: daysBefore(0) },
			{ amount: -3, date: daysBefore(1) },
		];

		const rewards = computeRewards({ transactions });
		const daily = rewards.entries.find((entry) => entry.key === "dailyLog");

		expect(daily.count).toBe(2);
		expect(daily.xp).toBe(2 * XP_RULES.dailyLog.xp);
	});

	it("adds the launchpad bonus once the quest lands", () => {
		const before = computeRewards({ quest: { completed: false } });
		const after = computeRewards({ quest: { completed: true } });

		expect(after.totalTokens - before.totalTokens).toBe(QUEST_BONUS.tokens);
		expect(after.totalXp - before.totalXp).toBe(QUEST_BONUS.xp);
	});

	it("takes tokens from badges but never XP", () => {
		const badges = [
			{ id: "a", unlocked: true, tokens: 40 },
			{ id: "b", unlocked: false, tokens: 999 },
		];
		const rewards = computeRewards({ badges });

		expect(rewards.totalTokens).toBe(40);
		expect(rewards.totalXp).toBe(0);
	});

	it("is idempotent — the same account never pays twice", () => {
		const account = {
			transactions: [{ amount: -1, date: daysBefore(0) }],
			budgets: [{ id: 1 }],
			goals: [{ id: 1, target: 100, saved: 100 }],
			streak: { longest: 9 },
			quest: { completed: true },
			badges: [{ id: "a", unlocked: true, tokens: 10 }],
		};

		expect(computeRewards(account)).toEqual(computeRewards(account));
	});
});

describe("levelFromXp", () => {
	it("starts at level one", () => {
		expect(levelFromXp(0)).toMatchObject({ level: 1, xpIntoLevel: 0, percent: 0 });
	});

	it("advances a level per full bar", () => {
		expect(levelFromXp(XP_PER_LEVEL).level).toBe(2);
		expect(levelFromXp(XP_PER_LEVEL * 3 + 100)).toMatchObject({
			level: 4,
			xpIntoLevel: 100,
		});
	});

	it("treats rubbish input as zero", () => {
		expect(levelFromXp(undefined).level).toBe(1);
		expect(levelFromXp(-500).level).toBe(1);
	});
});

describe("marketplace", () => {
	it("gives everyone the default theme and charges for the rest", () => {
		const items = catalogue({ purchases: [], balance: 350 });
		const byId = Object.fromEntries(items.map((item) => [item.id, item]));

		expect(byId.default.owned).toBe(true);
		expect(byId.emerald.owned).toBe(false);
		expect(byId.emerald.affordable).toBe(true);
		expect(byId.violet.affordable).toBe(false);
	});

	it("keeps an owned item affordable whatever the balance", () => {
		const items = catalogue({ purchases: ["violet"], balance: 0 });
		const violet = items.find((item) => item.id === "violet");

		expect(violet.owned).toBe(true);
		expect(violet.affordable).toBe(true);
	});

	it("derives what was spent from what was bought", () => {
		expect(spentOn([])).toBe(0);
		expect(spentOn(["emerald", "amber"])).toBe(700);
	});
});

describe("buildGamificationProfile", () => {
	const account = {
		transactions: [
			{ amount: 3000, date: daysBefore(0) },
			{ amount: -900, date: daysBefore(1) },
			{ amount: -300, date: daysBefore(2) },
		],
		budgets: [{ id: 1, amount: 1000, spent: 400 }],
		goals: [{ id: 1, target: 500, saved: 500 }],
		wallets: [{ id: 1 }],
	};

	it("assembles the whole profile from the account", () => {
		const profile = buildGamificationProfile({ ...account, now: NOW });

		expect(profile.streak.current).toBe(3);
		expect(profile.quest.completed).toBe(true);
		expect(profile.savingsRate).toBeCloseTo(60, 5);
		expect(profile.level.level).toBeGreaterThanOrEqual(1);
		expect(profile.unlockedCount).toBeGreaterThan(0);
		expect(profile.totalBadges).toBe(BADGES.length);
	});

	it("nets purchases off the token balance", () => {
		const plain = buildGamificationProfile({ ...account, now: NOW });
		const spender = buildGamificationProfile({
			...account,
			state: {
				purchases: ["emerald"],
				activeTheme: "emerald",
				leaderboardOptIn: false,
				celebratedBadges: [],
			},
			now: NOW,
		});

		expect(spender.tokens.earned).toBe(plain.tokens.earned);
		expect(spender.tokens.spent).toBe(300);
		expect(spender.tokens.balance).toBe(plain.tokens.balance - 300);
	});

	it("survives an empty account without throwing", () => {
		const profile = buildGamificationProfile({ now: NOW });

		expect(profile.streak.current).toBe(0);
		expect(profile.tokens.balance).toBe(0);
		expect(profile.quest.doneCount).toBe(0);
	});
});
