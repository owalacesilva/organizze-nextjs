import { dictionaries } from "@/lib/i18n/dictionaries";
import {
	createFormatters,
	createTranslator,
	interpolate,
	localeCodes,
	lookup,
	resolveLocale,
} from "@/lib/i18n";

describe("lookup", () => {
	it("resolves dot paths to strings only", () => {
		expect(lookup({ a: { b: "hit" } }, "a.b")).toBe("hit");
		expect(lookup({ a: { b: "hit" } }, "a")).toBeUndefined();
		expect(lookup({ a: { b: "hit" } }, "a.b.c")).toBeUndefined();
		expect(lookup(null, "a")).toBeUndefined();
	});
});

describe("interpolate", () => {
	it("replaces tokens and tolerates surrounding whitespace", () => {
		expect(interpolate("Hi {{name}} and {{ other }}", { name: "A", other: "B" })).toBe(
			"Hi A and B",
		);
	});

	it("leaves unknown tokens untouched", () => {
		expect(interpolate("Hi {{name}}", {})).toBe("Hi {{name}}");
	});

	it("interpolates zero rather than dropping it", () => {
		expect(interpolate("{{count}} items", { count: 0 })).toBe("0 items");
	});
});

describe("resolveLocale", () => {
	it("matches exactly, then by language, and gives up otherwise", () => {
		expect(resolveLocale("pt-BR")).toBe("pt-BR");
		expect(resolveLocale("PT-br")).toBe("pt-BR");
		expect(resolveLocale("pt")).toBe("pt-BR");
		expect(resolveLocale("en-GB")).toBe("en");
		expect(resolveLocale("de")).toBeNull();
		expect(resolveLocale(undefined)).toBeNull();
	});
});

describe("createTranslator", () => {
	it("translates per locale", () => {
		expect(createTranslator("pt-BR")("nav.transactions")).toBe("Movimentações");
		expect(createTranslator("en")("nav.transactions")).toBe("Transactions");
	});

	it("interpolates parameters", () => {
		expect(
			createTranslator("en")("pagination.showing", {
				from: 1,
				to: 10,
				total: 42,
			}),
		).toBe("Showing 1–10 of 42");
	});

	it("selects the plural variant from count", () => {
		const t = createTranslator("pt-BR");
		expect(t("transactions.summary.count", { count: 1 })).toBe(
			"1 movimentação",
		);
		expect(t("transactions.summary.count", { count: 3 })).toBe(
			"3 movimentações",
		);
	});

	it("returns the key itself when nothing matches", () => {
		expect(createTranslator("en")("does.not.exist")).toBe("does.not.exist");
	});

	it("falls back to the default locale for an unknown locale", () => {
		expect(createTranslator("de")("nav.transactions")).toBe("Movimentações");
	});
});

describe("createFormatters", () => {
	it("formats currency using the locale default", () => {
		// Intl inserts a non-breaking space; assert on the parts that matter.
		expect(createFormatters("pt-BR").formatCurrency(1234.5)).toContain("R$");
		expect(createFormatters("en").formatCurrency(1234.5)).toBe("$1,234.50");
	});

	it("honours a currency override", () => {
		expect(
			createFormatters("en").formatCurrency(10, { currency: "EUR" }),
		).toBe("€10.00");
	});

	it("returns an empty string for an invalid date", () => {
		expect(createFormatters("en").formatDate("not-a-date")).toBe("");
	});

	it("coerces non-numeric amounts to zero instead of NaN", () => {
		expect(createFormatters("en").formatCurrency(undefined)).toBe("$0.00");
	});
});

describe("dictionaries", () => {
	const flatten = (node, prefix = "") =>
		Object.entries(node).flatMap(([key, value]) =>
			typeof value === "string"
				? [`${prefix}${key}`]
				: flatten(value, `${prefix}${key}.`),
		);

	it("covers every configured locale", () => {
		expect(Object.keys(dictionaries).sort()).toEqual([...localeCodes].sort());
	});

	it("keeps the same keys across locales", () => {
		const [reference, ...rest] = Object.values(dictionaries).map((dictionary) =>
			flatten(dictionary).sort(),
		);
		for (const keys of rest) {
			expect(keys).toEqual(reference);
		}
	});
});
