import { matchesSearch, normalize, searchFeatures } from "@/lib/search";

describe("normalize", () => {
	it("lower-cases and strips diacritics", () => {
		expect(normalize("Orçamentos")).toBe("orcamentos");
		expect(normalize("AÇÕES")).toBe("acoes");
		expect(normalize("  Metas  ")).toBe("metas");
	});

	it("tolerates nullish input", () => {
		expect(normalize(undefined)).toBe("");
		expect(normalize(null)).toBe("");
	});
});

describe("matchesSearch", () => {
	it("ignores accents in both directions", () => {
		expect(matchesSearch("Orçamentos", "orcamento")).toBe(true);
		expect(matchesSearch("Orcamentos", "orçamento")).toBe(true);
	});

	it("requires every term, so extra words narrow the search", () => {
		expect(matchesSearch("Metas de viagem", "meta viagem")).toBe(true);
		expect(matchesSearch("Metas de viagem", "meta carro")).toBe(false);
	});

	it("treats an empty query as matching everything", () => {
		expect(matchesSearch("anything", "   ")).toBe(true);
	});
});

describe("searchFeatures", () => {
	const ENTRIES = [
		{ href: "/quotes", label: "Cotações", description: "Preços de mercado", keywords: "ações, bitcoin, dólar" },
		{ href: "/budgets", label: "Orçamentos", description: "Limites por categoria", keywords: "teto de gastos" },
		{ href: "/transactions", label: "Movimentações", description: "Acompanhe seus gastos", keywords: "despesas, receitas" },
	];

	it("returns nothing until something is typed", () => {
		expect(searchFeatures(ENTRIES, "")).toEqual([]);
		expect(searchFeatures(ENTRIES, "   ")).toEqual([]);
	});

	it("finds a page by its title, ignoring accents", () => {
		expect(searchFeatures(ENTRIES, "cotacoes").map((e) => e.href)).toEqual([
			"/quotes",
		]);
	});

	it("finds a page by a keyword that is nowhere in its title", () => {
		expect(searchFeatures(ENTRIES, "bitcoin").map((e) => e.href)).toEqual([
			"/quotes",
		]);
	});

	it("finds a page by its description", () => {
		expect(searchFeatures(ENTRIES, "categoria").map((e) => e.href)).toEqual([
			"/budgets",
		]);
	});

	it("ranks a title hit above a hit that only came from the keywords", () => {
		const entries = [
			{ href: "/a", label: "Relatórios", description: "", keywords: "" },
			{ href: "/b", label: "Análises", description: "", keywords: "relatórios" },
		];

		expect(searchFeatures(entries, "relatorio").map((e) => e.href)).toEqual([
			"/a",
			"/b",
		]);
	});

	it("returns an empty list when nothing matches", () => {
		expect(searchFeatures(ENTRIES, "zzz")).toEqual([]);
	});
});
