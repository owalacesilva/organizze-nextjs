import { buildSeedTransactions } from "@/lib/simulation/seed";
import {
	resetSimulation,
	simulatedBudgets,
	simulatedImports,
	simulatedTags,
	simulatedTransactions,
	simulatedWallets,
} from "@/lib/simulation";

beforeEach(() => {
	resetSimulation();
});

describe("seed data", () => {
	it("is deterministic across runs", () => {
		const reference = new Date("2026-08-06T00:00:00Z");

		expect(buildSeedTransactions(reference)).toEqual(
			buildSeedTransactions(reference),
		);
	});

	it("stores expenses as negative amounts and income as positive", () => {
		const transactions = buildSeedTransactions(new Date("2026-08-06T00:00:00Z"));
		const salary = transactions.find(
			(transaction) => transaction.category.id === 7,
		);
		const groceries = transactions.find(
			(transaction) => transaction.category.id === 1,
		);

		expect(salary.amount).toBeGreaterThan(0);
		expect(groceries.amount).toBeLessThan(0);
	});
});

describe("simulatedTransactions", () => {
	it("creates, reads back and deletes an entry", async () => {
		const { transactions: before } = await simulatedTransactions.list();

		const { id } = await simulatedTransactions.create({
			amount: -42.5,
			description: "Padaria",
			date: "2026-08-01",
			categoryId: 1,
		});

		const created = await simulatedTransactions.get(id);
		expect(created).toMatchObject({
			amount: -42.5,
			description: "Padaria",
			category: { id: 1 },
		});

		await simulatedTransactions.remove(id);

		const { transactions: after } = await simulatedTransactions.list();
		expect(after).toHaveLength(before.length);
	});

	it("applies a partial update and leaves the rest untouched", async () => {
		const { transactions } = await simulatedTransactions.list();
		const target = transactions[0];

		await simulatedTransactions.update(target.id, { description: "Ajustado" });
		const updated = await simulatedTransactions.get(target.id);

		expect(updated.description).toBe("Ajustado");
		expect(updated.amount).toBe(target.amount);
	});

	it("rejects an unknown id", async () => {
		await expect(simulatedTransactions.get(999999)).rejects.toThrow();
	});
});

describe("simulatedWallets", () => {
	it("derives the available balance of a credit wallet from its limit", async () => {
		const { id } = await simulatedWallets.create({
			name: "Cartão",
			type: "credit",
			balance: -200,
			currency: "BRL",
			creditLimit: 1000,
		});

		expect(await simulatedWallets.get(id)).toMatchObject({
			availableBalance: 800,
		});
	});
});

describe("simulatedBudgets", () => {
	it("reports the amount spent in the current month per category", async () => {
		const today = new Date().toISOString().slice(0, 10);

		await simulatedTransactions.create({
			amount: -100,
			description: "Mercado",
			date: today,
			categoryId: 1,
		});

		const { budgets } = await simulatedBudgets.list();
		const groceries = budgets.find((budget) => budget.categoryId === 1);

		expect(groceries.spent).toBeGreaterThanOrEqual(100);
		expect(groceries.category).toMatchObject({ id: 1 });
	});
});

describe("resetSimulation", () => {
	it("drops writes made by the tests", async () => {
		const { tags: before } = await simulatedTags.list();
		await simulatedTags.create({ name: "Temporária" });

		resetSimulation();

		const { tags: after } = await simulatedTags.list();
		expect(after).toHaveLength(before.length);
	});
});

describe("simulatedImports", () => {
	it("lists the seeded uploads newest first", async () => {
		const { imports } = await simulatedImports.list();

		expect(imports.length).toBeGreaterThan(0);

		const dates = imports.map((upload) => new Date(upload.createdAt).getTime());
		expect(dates).toEqual([...dates].sort((a, b) => b - a));
	});

	it("records a run as processing, then closes it out", async () => {
		const { id } = await simulatedImports.create({
			fileName: "extrato.csv",
			totalRows: 10,
		});

		const started = await simulatedImports.get(id);
		expect(started).toMatchObject({
			fileName: "extrato.csv",
			totalRows: 10,
			importedRows: 0,
			status: "processing",
		});
		expect(started.finishedAt).toBeNull();

		await simulatedImports.update(id, {
			importedRows: 8,
			failedRows: 2,
			status: "partial",
		});

		const finished = await simulatedImports.get(id);
		expect(finished).toMatchObject({
			importedRows: 8,
			failedRows: 2,
			status: "partial",
		});
		expect(finished.finishedAt).not.toBeNull();
	});

	it("drops an upload from the history", async () => {
		const { imports: before } = await simulatedImports.list();
		const { id } = await simulatedImports.create({
			fileName: "temp.csv",
			totalRows: 1,
		});

		await simulatedImports.remove(id);

		const { imports: after } = await simulatedImports.list();
		expect(after).toHaveLength(before.length);
	});
});
