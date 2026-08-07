import {
	DEFAULT_FILTERS,
	countActiveFilters,
	filterTransactions,
	getTransactionType,
	inMonth,
	monthlyTotals,
	normalizeTransaction,
	sortByDateDesc,
	summarizeTransactions,
	topExpenses,
} from "@/lib/transactions";

const NOW = new Date("2026-03-01T12:00:00Z");

const raw = [
	{
		id: 1,
		amount: -50,
		description: "Supermercado",
		date: "2026-02-28",
		category: { id: 10, name: "Alimentação" },
	},
	{
		id: 2,
		amount: 3000,
		description: "Salário",
		date: "2026-02-01",
		category: { id: 20, name: "Renda" },
	},
	{
		id: 3,
		amount: -1200,
		description: "Aluguel",
		date: "2025-12-05",
		category: { id: 30, name: "Moradia" },
	},
];

const transactions = raw.map(normalizeTransaction);

describe("normalizeTransaction", () => {
	it("flattens the category and derives the type from the amount sign", () => {
		expect(normalizeTransaction(raw[0])).toMatchObject({
			amount: -50,
			type: "expense",
			categoryId: 10,
			categoryName: "Alimentação",
		});
		expect(normalizeTransaction(raw[1]).type).toBe("income");
	});

	it("tolerates a missing category and a non-numeric amount", () => {
		expect(normalizeTransaction({ id: 9 })).toMatchObject({
			amount: 0,
			type: "income",
			categoryId: null,
			categoryName: "",
		});
	});

	it("falls back to a flat categoryId when there is no nested category", () => {
		expect(normalizeTransaction({ id: 9, categoryId: 7 }).categoryId).toBe(7);
	});
});

describe("getTransactionType", () => {
	it("treats zero as income rather than an expense", () => {
		expect(getTransactionType({ amount: 0 })).toBe("income");
		expect(getTransactionType({ amount: -0.01 })).toBe("expense");
	});
});

describe("filterTransactions", () => {
	it("returns everything with the default filters", () => {
		expect(filterTransactions(transactions, DEFAULT_FILTERS, NOW)).toHaveLength(
			3,
		);
	});

	it("filters by type", () => {
		const result = filterTransactions(
			transactions,
			{ ...DEFAULT_FILTERS, type: "income" },
			NOW,
		);
		expect(result.map((item) => item.id)).toEqual([2]);
	});

	it("filters by category, comparing ids as strings", () => {
		const result = filterTransactions(
			transactions,
			{ ...DEFAULT_FILTERS, categoryId: "30" },
			NOW,
		);
		expect(result.map((item) => item.id)).toEqual([3]);
	});

	it("filters by rolling period relative to the injected date", () => {
		const lastWeek = filterTransactions(
			transactions,
			{ ...DEFAULT_FILTERS, period: "week" },
			NOW,
		);
		expect(lastWeek.map((item) => item.id)).toEqual([1]);

		// 30 days back is 2026-01-30, so the December rent falls outside.
		const lastMonth = filterTransactions(
			transactions,
			{ ...DEFAULT_FILTERS, period: "month" },
			NOW,
		);
		expect(lastMonth.map((item) => item.id)).toEqual([1, 2]);

		// 90 days back is 2025-12-01, which takes the rent back in.
		const lastQuarter = filterTransactions(
			transactions,
			{ ...DEFAULT_FILTERS, period: "quarter" },
			NOW,
		);
		expect(lastQuarter.map((item) => item.id)).toEqual([1, 2, 3]);
	});

	it("compares the amount range on magnitude, so expenses match too", () => {
		const result = filterTransactions(
			transactions,
			{ ...DEFAULT_FILTERS, minAmount: "100" },
			NOW,
		);
		expect(result.map((item) => item.id)).toEqual([2, 3]);
	});

	it("searches description and category, case-insensitively", () => {
		expect(
			filterTransactions(
				transactions,
				{ ...DEFAULT_FILTERS, search: "  SALÁRIO " },
				NOW,
			).map((item) => item.id),
		).toEqual([2]);

		expect(
			filterTransactions(
				transactions,
				{ ...DEFAULT_FILTERS, search: "moradia" },
				NOW,
			).map((item) => item.id),
		).toEqual([3]);
	});

	it("combines filters conjunctively", () => {
		const result = filterTransactions(
			transactions,
			{ ...DEFAULT_FILTERS, type: "expense", maxAmount: "100" },
			NOW,
		);
		expect(result.map((item) => item.id)).toEqual([1]);
	});

	it("drops rows with an unparseable date when a period is set", () => {
		const withBadDate = [...transactions, normalizeTransaction({ id: 4, amount: 1, date: "nope" })];
		const result = filterTransactions(
			withBadDate,
			{ ...DEFAULT_FILTERS, period: "year" },
			NOW,
		);
		expect(result.map((item) => item.id)).not.toContain(4);
	});
});

describe("countActiveFilters", () => {
	it("ignores search, which has its own input", () => {
		expect(countActiveFilters({ ...DEFAULT_FILTERS, search: "abc" })).toBe(0);
	});

	it("counts each non-default panel filter", () => {
		expect(
			countActiveFilters({
				...DEFAULT_FILTERS,
				type: "income",
				minAmount: "10",
			}),
		).toBe(2);
	});
});

describe("summarizeTransactions", () => {
	it("reports expenses as a positive magnitude and nets the balance", () => {
		expect(summarizeTransactions(transactions)).toEqual({
			income: 3000,
			expenses: 1250,
			balance: 1750,
		});
	});

	it("returns zeroes for an empty list", () => {
		expect(summarizeTransactions([])).toEqual({
			income: 0,
			expenses: 0,
			balance: 0,
		});
	});
});

describe("sortByDateDesc", () => {
	it("orders most recent first without mutating the input", () => {
		const input = [...transactions];
		expect(sortByDateDesc(input).map((item) => item.id)).toEqual([1, 2, 3]);
		expect(input.map((item) => item.id)).toEqual([1, 2, 3]);
	});

	it("pushes unparseable dates to the end", () => {
		const result = sortByDateDesc([
			normalizeTransaction({ id: 4, amount: 1, date: "nope" }),
			...transactions,
		]);
		expect(result.at(-1).id).toBe(4);
	});
});

describe("monthlyTotals", () => {
	const now = new Date("2026-03-15T12:00:00Z");

	it("returns one bucket per month, oldest first", () => {
		const result = monthlyTotals([], 3, now);

		expect(result.map((bucket) => bucket.key)).toEqual([
			"2026-01",
			"2026-02",
			"2026-03",
		]);
	});

	it("splits income and expenses into the right month", () => {
		const entries = [
			{ amount: 1000, date: "2026-03-02" },
			{ amount: -250, date: "2026-03-10" },
			{ amount: -100, date: "2026-02-20" },
		].map(normalizeTransaction);

		const [january, february, march] = monthlyTotals(entries, 3, now);

		expect(january).toMatchObject({ income: 0, expenses: 0 });
		expect(february).toMatchObject({ income: 0, expenses: 100 });
		expect(march).toMatchObject({ income: 1000, expenses: 250 });
	});

	it("ignores entries outside the window and unparseable dates", () => {
		const entries = [
			{ amount: -500, date: "2025-11-01" },
			{ amount: -25, date: "not-a-date" },
		].map(normalizeTransaction);

		const totals = monthlyTotals(entries, 3, now);

		expect(totals.every((bucket) => bucket.expenses === 0)).toBe(true);
	});
});

describe("inMonth", () => {
	const reference = new Date("2026-03-15T12:00:00Z");

	it("keeps only the reference month", () => {
		const entries = [
			{ id: 1, amount: -10, date: "2026-03-01" },
			{ id: 2, amount: -20, date: "2026-02-28" },
			{ id: 3, amount: -30, date: "2026-03-31" },
			{ id: 4, amount: -40, date: "nope" },
		].map(normalizeTransaction);

		expect(inMonth(entries, reference).map((entry) => entry.id)).toEqual([1, 3]);
	});
});

describe("topExpenses", () => {
	const reference = new Date("2026-03-15T12:00:00Z");

	const entries = [
		{ id: 1, amount: -300, date: "2026-03-02", description: "Aluguel" },
		{ id: 2, amount: -100, date: "2026-03-05", description: "Mercado" },
		{ id: 3, amount: -600, date: "2026-03-09", description: "Notebook" },
		{ id: 4, amount: 5000, date: "2026-03-05", description: "Salário" },
		{ id: 5, amount: -900, date: "2026-02-20", description: "Mês passado" },
	].map(normalizeTransaction);

	it("ranks the month's expenses, largest first", () => {
		const { items } = topExpenses(entries, 5, reference);

		expect(items.map((item) => item.id)).toEqual([3, 1, 2]);
		expect(items[0].magnitude).toBe(600);
	});

	it("reports each share against the whole month", () => {
		const { items, total } = topExpenses(entries, 2, reference);

		expect(total).toBe(1000);
		// Only two rows are returned, but the shares still divide by the month total.
		expect(items.map((item) => Math.round(item.share))).toEqual([60, 30]);
	});

	it("honours the limit and ignores income", () => {
		const { items } = topExpenses(entries, 1, reference);

		expect(items).toHaveLength(1);
		expect(items[0].description).toBe("Notebook");
	});

	it("returns nothing for a month without expenses", () => {
		expect(topExpenses(entries, 5, new Date("2026-01-15T12:00:00Z"))).toEqual({
			items: [],
			total: 0,
		});
	});
});
