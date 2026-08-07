import { detectDelimiter, isCsvFileName, parseCsv } from "@/lib/csv";

describe("detectDelimiter", () => {
	it("picks the most frequent separator", () => {
		expect(detectDelimiter("a,b,c\n1,2,3")).toBe(",");
		expect(detectDelimiter("a;b;c\n1;2;3")).toBe(";");
		expect(detectDelimiter("a\tb\tc")).toBe("\t");
	});

	it("ignores separators inside quotes", () => {
		expect(detectDelimiter('"a;b;c;d";x\n"e;f";y')).toBe(";");
		expect(detectDelimiter('"a;b;c;d",x')).toBe(",");
	});

	it("falls back to a comma when there is nothing to count", () => {
		expect(detectDelimiter("single")).toBe(",");
	});
});

describe("parseCsv", () => {
	it("reads rows and trims cells", () => {
		expect(parseCsv("date, amount\n2026-01-02, 10.50")).toEqual([
			["date", "amount"],
			["2026-01-02", "10.50"],
		]);
	});

	it("keeps separators and newlines inside quoted fields", () => {
		const rows = parseCsv('a,"one, two",c\nd,"line\nbreak",f');

		expect(rows[0]).toEqual(["a", "one, two", "c"]);
		expect(rows[1]).toEqual(["d", "line\nbreak", "f"]);
	});

	it("unescapes doubled quotes", () => {
		expect(parseCsv('a,"say ""hi""",c')).toEqual([["a", 'say "hi"', "c"]]);
	});

	it("handles CRLF, a BOM and trailing blank lines", () => {
		expect(parseCsv('﻿a;b\r\n1;2\r\n\r\n')).toEqual([
			["a", "b"],
			["1", "2"],
		]);
	});

	it("returns nothing for empty input", () => {
		expect(parseCsv("")).toEqual([]);
		expect(parseCsv("   ")).toEqual([]);
		expect(parseCsv(null)).toEqual([]);
	});
});

describe("isCsvFileName", () => {
	it("accepts only a .csv extension", () => {
		expect(isCsvFileName("statement.csv")).toBe(true);
		expect(isCsvFileName("STATEMENT.CSV")).toBe(true);
		expect(isCsvFileName("statement.csv ")).toBe(true);

		expect(isCsvFileName("statement.xlsx")).toBe(false);
		expect(isCsvFileName("statement.csv.exe")).toBe(false);
		expect(isCsvFileName("csv")).toBe(false);
		expect(isCsvFileName(undefined)).toBe(false);
	});
});
