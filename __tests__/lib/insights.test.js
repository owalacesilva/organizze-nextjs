import { budgetUsage, budgetsAtRisk, daysInMonth } from "@/lib/budgets";
import { goalProgress, goalsOffTrack } from "@/lib/goals";
import {
	buildInsights,
	expensesByCategory,
	insightSummary,
	monthToDate,
	recurringExpenses,
} from "@/lib/insights";
import { normalizeTransaction } from "@/lib/transactions";

// The 15th of a 31-day month: half elapsed, so projections are easy to reason about.
const NOW = new Date(2026, 2, 15, 12, 0, 0);

const tx = (amount, date, description = "x", category = null) =>
	normalizeTransaction({
		id: `${date}-${description}-${amount}`,
		amount,
		date,
		description,
		category,
	});

describe("daysInMonth", () => {
	it("counts the days of the reference month", () => {
		expect(daysInMonth(new Date(2026, 1, 10))).toBe(28);
		expect(daysInMonth(new Date(2024, 1, 10))).toBe(29);
		expect(daysInMonth(new Date(2026, 2, 10))).toBe(31);
	});
});

describe("budgetUsage", () => {
	it("projects the month from the rate so far", () => {
		// 300 over 15 of 31 days → 20/day → ~620 by month end.
		const usage = budgetUsage({ amount: 500, spent: 300 }, NOW);

		expect(usage.percent).toBe(60);
		expect(usage.remaining).toBe(200);
		expect(usage.daysLeft).toBe(16);
		expect(usage.dailyAverage).toBe(20);
		expect(Math.round(usage.projected)).toBe(620);
		expect(usage.willExceed).toBe(true);
		expect(usage.isOver).toBe(false);
	});

	it("reports a budget that is already over", () => {
		const usage = budgetUsage({ amount: 100, spent: 150 }, NOW);

		expect(usage.isOver).toBe(true);
		expect(usage.remaining).toBe(-50);
	});

	it("keeps a steady budget off the risk list", () => {
		const usage = budgetUsage({ amount: 1000, spent: 400 }, NOW);

		expect(usage.willExceed).toBe(false);
		expect(usage.pace).toBeLessThan(1);
	});

	it("survives a zero limit", () => {
		expect(budgetUsage({ amount: 0, spent: 0 }, NOW)).toMatchObject({
			percent: 0,
			willExceed: false,
		});
	});
});

describe("budgetsAtRisk", () => {
	it("returns the blown and soon-to-blow budgets, worst first", () => {
		const risky = budgetsAtRisk(
			[
				{ id: 1, name: "Safe", amount: 1000, spent: 100 },
				{ id: 2, name: "Fast", amount: 500, spent: 300 },
				{ id: 3, name: "Over", amount: 100, spent: 150 },
			],
			NOW,
		);

		expect(risky.map(({ budget }) => budget.name)).toEqual(["Over", "Fast"]);
	});
});

describe("goalProgress", () => {
	it("paces a goal against its deadline", () => {
		const progress = goalProgress(
			{ target: 1000, saved: 400, deadline: "2026-09-15" },
			NOW,
		);

		expect(progress.remaining).toBe(600);
		expect(Math.round(progress.percent)).toBe(40);
		// 184 days out, so a shade under six months of 30.44 days.
		expect(progress.monthlyNeeded).toBeCloseTo(99.25, 1);
		expect(progress.isOverdue).toBe(false);
	});

	it("has nothing to pace without a deadline", () => {
		const progress = goalProgress({ target: 1000, saved: 400 }, NOW);

		expect(progress.monthlyNeeded).toBeNull();
		expect(progress.monthsLeft).toBeNull();
		expect(progress.isOverdue).toBe(false);
	});

	it("flags a missed deadline, but not for a finished goal", () => {
		expect(
			goalProgress({ target: 1000, saved: 400, deadline: "2026-01-01" }, NOW)
				.isOverdue,
		).toBe(true);

		expect(
			goalProgress({ target: 1000, saved: 1000, deadline: "2026-01-01" }, NOW),
		).toMatchObject({ isComplete: true, isOverdue: false });
	});
});

describe("goalsOffTrack", () => {
	it("lists only the overdue goals", () => {
		const off = goalsOffTrack(
			[
				{ id: 1, name: "Late", target: 100, saved: 10, deadline: "2026-01-01" },
				{ id: 2, name: "Fine", target: 100, saved: 10, deadline: "2026-12-01" },
			],
			NOW,
		);

		expect(off).toHaveLength(1);
		expect(off[0].goal.name).toBe("Late");
	});
});

describe("monthToDate", () => {
	it("compares like with like across months", () => {
		const transactions = [
			tx(-100, "2026-03-05"),
			tx(-50, "2026-03-14"),
			tx(2000, "2026-03-01"),
			tx(-80, "2026-02-10"),
			// After the 15th of last month, so outside the comparable slice.
			tx(-500, "2026-02-25"),
		];

		expect(monthToDate(transactions, NOW)).toEqual({
			current: { income: 2000, expenses: 150 },
			previous: { income: 0, expenses: 80 },
		});
	});
});

describe("expensesByCategory", () => {
	it("totals and ranks the month's categories", () => {
		const transactions = [
			tx(-100, "2026-03-02", "a", { id: 1, name: "Food" }),
			tx(-40, "2026-03-04", "b", { id: 1, name: "Food" }),
			tx(-200, "2026-03-06", "c", { id: 2, name: "Rent" }),
			tx(-900, "2026-02-06", "d", { id: 2, name: "Rent" }),
		];

		expect(expensesByCategory(transactions, NOW)).toEqual([
			{ name: "Rent", amount: 200 },
			{ name: "Food", amount: 140 },
		]);
	});
});

describe("recurringExpenses", () => {
	it("finds charges present in all of the last three months", () => {
		const transactions = [
			tx(-30, "2026-03-03", "Streaming"),
			tx(-30, "2026-02-03", "Streaming"),
			tx(-30, "2026-01-03", "Streaming"),
			tx(-99, "2026-03-04", "One off"),
			tx(-15, "2026-03-05", "Gym"),
			tx(-15, "2026-02-05", "Gym"),
		];

		const recurring = recurringExpenses(transactions, NOW);

		expect(recurring).toHaveLength(1);
		expect(recurring[0]).toMatchObject({ description: "Streaming", average: 30 });
	});
});

describe("buildInsights", () => {
	const base = {
		transactions: [
			tx(3000, "2026-03-01", "Salary"),
			tx(-600, "2026-03-05", "Rent", { id: 1, name: "Home" }),
			tx(-100, "2026-03-08", "Market", { id: 2, name: "Food" }),
			tx(-200, "2026-02-05", "Rent", { id: 1, name: "Home" }),
		],
		budgets: [],
		goals: [],
		wallets: [],
	};

	const ids = (insights) => insights.map((insight) => insight.id);

	it("flags spending that grew against the same point last month", () => {
		const insights = buildInsights(base, NOW);
		const spending = insights.find((insight) => insight.id === "spendingUp");

		expect(spending).toBeDefined();
		expect(spending.tone).toBe("warning");
		expect(spending.values.current).toBe(700);
	});

	it("praises a healthy savings rate", () => {
		const savings = buildInsights(base, NOW).find(
			(insight) => insight.id === "savingsRate",
		);

		expect(savings).toMatchObject({ tone: "positive" });
		expect(savings.values.percent).toBe(77);
	});

	it("escalates when the month is spending more than it earns", () => {
		const insights = buildInsights(
			{
				...base,
				transactions: [tx(1000, "2026-03-01", "Salary"), tx(-1500, "2026-03-02", "Car")],
			},
			NOW,
		);

		expect(ids(insights)).toContain("spendingOverIncome");
		expect(insights[0].tone).toBe("critical");
	});

	it("names the category taking the biggest bite", () => {
		const top = buildInsights(base, NOW).find(
			(insight) => insight.id === "topCategory",
		);

		expect(top.values).toMatchObject({ category: "Home", amount: 600 });
	});

	it("reports a blown budget as critical and a healthy set as positive", () => {
		const exceeded = buildInsights(
			{ ...base, budgets: [{ id: 1, name: "Food", amount: 50, spent: 100 }] },
			NOW,
		);
		expect(ids(exceeded)).toContain("budgetExceeded");

		const healthy = buildInsights(
			{ ...base, budgets: [{ id: 1, name: "Food", amount: 5000, spent: 100 }] },
			NOW,
		);
		expect(ids(healthy)).toContain("budgetsHealthy");
	});

	it("warns about an overdue goal and paces the nearest one otherwise", () => {
		const overdue = buildInsights(
			{
				...base,
				goals: [{ id: 1, name: "Trip", target: 100, saved: 0, deadline: "2026-01-01" }],
			},
			NOW,
		);
		expect(ids(overdue)).toContain("goalOverdue");

		const pacing = buildInsights(
			{
				...base,
				goals: [{ id: 1, name: "Trip", target: 100, saved: 0, deadline: "2026-09-15" }],
			},
			NOW,
		);
		expect(ids(pacing)).toContain("goalPace");
	});

	it("calls out a credit card near its limit", () => {
		const insights = buildInsights(
			{
				...base,
				wallets: [
					{ id: 1, name: "Card", type: "credit", balance: -900, creditLimit: 1000 },
				],
			},
			NOW,
		);

		const credit = insights.find((insight) => insight.id === "creditUsage");
		expect(credit).toMatchObject({ tone: "critical" });
		expect(credit.values.percent).toBe(90);
	});

	it("orders the list by how much it matters", () => {
		const insights = buildInsights(
			{
				...base,
				budgets: [{ id: 1, name: "Food", amount: 50, spent: 100 }],
				goals: [{ id: 1, name: "Trip", target: 100, saved: 0, deadline: "2026-01-01" }],
			},
			NOW,
		);

		const tones = insights.map((insight) => insight.tone);
		const rank = { critical: 0, warning: 1, positive: 2, neutral: 3 };

		expect(tones.map((tone) => rank[tone])).toEqual(
			[...tones.map((tone) => rank[tone])].sort((a, b) => a - b),
		);
	});

	it("returns nothing when there is no data at all", () => {
		expect(buildInsights({}, NOW)).toEqual([]);
	});
});

describe("insightSummary", () => {
	it("reports the month's headline numbers", () => {
		const summary = insightSummary(
			[tx(1000, "2026-03-01"), tx(-250, "2026-03-02"), tx(-100, "2026-02-01")],
			NOW,
		);

		expect(summary).toMatchObject({ income: 1000, expenses: 250, net: 750 });
		expect(Math.round(summary.savingsRate)).toBe(75);
		expect(Math.round(summary.expensesChange)).toBe(150);
	});
});
