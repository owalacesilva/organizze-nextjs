import {
	buildStatementEntries,
	guessColumns,
	looksLikeHeader,
	parseAmount,
	parseDate,
	resolveCategoryId,
	summarizeEntries,
} from "@/lib/statement";

describe("parseAmount", () => {
	it("reads the pt-BR format", () => {
		expect(parseAmount("1.234,56")).toBe(1234.56);
		expect(parseAmount("R$ 1.234,56")).toBe(1234.56);
		expect(parseAmount("-1.234,56")).toBe(-1234.56);
		expect(parseAmount("0,99")).toBe(0.99);
	});

	it("reads the en format", () => {
		expect(parseAmount("1,234.56")).toBe(1234.56);
		expect(parseAmount("$1,234.56")).toBe(1234.56);
		expect(parseAmount("1234.56")).toBe(1234.56);
	});

	it("treats a comma grouping thousands as a separator, not a decimal", () => {
		expect(parseAmount("1,234")).toBe(1234);
		expect(parseAmount("12,34")).toBe(12.34);
	});

	it("understands trailing minus and accounting parentheses", () => {
		expect(parseAmount("1.234,56-")).toBe(-1234.56);
		expect(parseAmount("(1.234,56)")).toBe(-1234.56);
	});

	it("returns null when there is no number", () => {
		expect(parseAmount("")).toBeNull();
		expect(parseAmount("   ")).toBeNull();
		expect(parseAmount("n/a")).toBeNull();
		expect(parseAmount(undefined)).toBeNull();
	});
});

describe("parseDate", () => {
	it("accepts ISO and day-first formats", () => {
		expect(parseDate("2026-03-09")).toBe("2026-03-09");
		expect(parseDate("09/03/2026")).toBe("2026-03-09");
		expect(parseDate("09-03-2026")).toBe("2026-03-09");
		expect(parseDate("09.03.2026")).toBe("2026-03-09");
	});

	it("expands a two-digit year", () => {
		expect(parseDate("09/03/26")).toBe("2026-03-09");
	});

	it("ignores a trailing time", () => {
		expect(parseDate("2026-03-09 14:32")).toBe("2026-03-09");
	});

	it("rejects impossible and unparseable dates", () => {
		expect(parseDate("31/02/2026")).toBeNull();
		expect(parseDate("09/13/2026")).toBeNull();
		expect(parseDate("last tuesday")).toBeNull();
		expect(parseDate("")).toBeNull();
	});
});

describe("looksLikeHeader", () => {
	it("recognises a header row", () => {
		expect(looksLikeHeader(["Data", "Descrição", "Valor"])).toBe(true);
		expect(looksLikeHeader(["Date", "Memo", "Amount"])).toBe(true);
	});

	it("does not mistake a data row for a header", () => {
		expect(looksLikeHeader(["09/03/2026", "Padaria", "-12,50"])).toBe(false);
	});
});

describe("guessColumns", () => {
	it("maps pt-BR headers", () => {
		expect(guessColumns(["Data", "Histórico", "Valor", "Categoria"])).toEqual({
			date: 0,
			description: 1,
			amount: 2,
			category: 3,
		});
	});

	it("maps en headers in any order", () => {
		expect(guessColumns(["Amount", "Description", "Date"])).toEqual({
			date: 2,
			description: 1,
			amount: 0,
			category: null,
		});
	});

	it("never assigns the same column twice", () => {
		const mapping = guessColumns(["Data", "Data lançamento"]);
		const used = Object.values(mapping).filter((index) => index !== null);

		expect(new Set(used).size).toBe(used.length);
	});

	it("leaves unknown headers unmapped", () => {
		expect(guessColumns(["col1", "col2"])).toEqual({
			date: null,
			description: null,
			amount: null,
			category: null,
		});
	});
});

describe("buildStatementEntries", () => {
	const mapping = { date: 0, description: 1, amount: 2, category: 3 };

	it("normalises every mapped cell", () => {
		const [entry] = buildStatementEntries(
			[["09/03/2026", " Padaria ", "-12,50", "Alimentação"]],
			mapping,
		);

		expect(entry).toMatchObject({
			date: "2026-03-09",
			description: "Padaria",
			amount: -12.5,
			category: "Alimentação",
			valid: true,
		});
	});

	it("flags each unusable field instead of dropping the row", () => {
		const [entry] = buildStatementEntries([["nope", "", "abc"]], mapping);

		expect(entry.valid).toBe(false);
		expect(entry.errors).toEqual(["date", "description", "amount"]);
	});

	it("treats a zero amount as invalid", () => {
		const [entry] = buildStatementEntries(
			[["09/03/2026", "Estorno", "0,00"]],
			mapping,
		);

		expect(entry.errors).toContain("amount");
	});

	it("copes with an unmapped column", () => {
		const [entry] = buildStatementEntries(
			[["09/03/2026", "Padaria", "-12,50"]],
			{ ...mapping, category: null },
		);

		expect(entry.category).toBe("");
		expect(entry.valid).toBe(true);
	});
});

describe("summarizeEntries", () => {
	it("totals only the importable rows", () => {
		const entries = buildStatementEntries(
			[
				["01/03/2026", "Salário", "3000,00"],
				["02/03/2026", "Mercado", "-250,00"],
				["bad", "", "x"],
			],
			{ date: 0, description: 1, amount: 2, category: null },
		);

		expect(summarizeEntries(entries)).toEqual({
			income: 3000,
			expenses: 250,
			count: 2,
		});
	});
});

describe("resolveCategoryId", () => {
	const categories = [
		{ id: 1, name: "Alimentação" },
		{ id: 2, name: "Transporte" },
	];

	it("matches by name, ignoring case and accents", () => {
		expect(resolveCategoryId({ category: "alimentacao" }, categories, 9)).toBe(1);
		expect(resolveCategoryId({ category: "TRANSPORTE" }, categories, 9)).toBe(2);
	});

	it("falls back when the category is unknown or absent", () => {
		expect(resolveCategoryId({ category: "Outros" }, categories, 9)).toBe(9);
		expect(resolveCategoryId({ category: "" }, categories, 9)).toBe(9);
	});
});
