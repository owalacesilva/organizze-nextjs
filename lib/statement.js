/**
 * Turning a parsed bank statement into transactions the API accepts.
 *
 * Banks disagree on everything — date order, decimal separator, whether an
 * expense is negative or lives in its own column — so every value goes through
 * a tolerant parser and rows that still don't make sense are reported rather
 * than silently dropped.
 */

/** Columns the importer knows how to fill, in the order the UI shows them. */
export const STATEMENT_FIELDS = ["date", "description", "amount", "category"];

/** Header names seen in the wild, lowercased and accent-free. */
const HEADER_HINTS = {
	date: ["data", "date", "datalancamento", "datamovimento", "posteddate"],
	description: [
		"descricao",
		"description",
		"historico",
		"lancamento",
		"memo",
		"detalhes",
		"details",
		"title",
	],
	amount: ["valor", "amount", "montante", "value", "quantia", "vlr"],
	category: ["categoria", "category", "tipo", "classificacao"],
};

function normalizeHeader(value) {
	return String(value ?? "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "");
}

/**
 * A first row is treated as a header when it has no parseable amount and at
 * least one cell matches a known column name.
 */
export function looksLikeHeader(row = []) {
	const normalized = row.map(normalizeHeader);
	const known = Object.values(HEADER_HINTS).flat();

	const matches = normalized.some((cell) =>
		known.some((hint) => cell === hint || cell.includes(hint)),
	);
	const hasAmount = row.some((cell) => parseAmount(cell) !== null);

	return matches && !hasAmount;
}

/**
 * Best-effort column mapping from a header row.
 *
 * @returns {{date: number|null, description: number|null, amount: number|null, category: number|null}}
 */
export function guessColumns(header = []) {
	const normalized = header.map(normalizeHeader);
	const mapping = { date: null, description: null, amount: null, category: null };

	for (const field of STATEMENT_FIELDS) {
		const exact = normalized.findIndex((cell) =>
			HEADER_HINTS[field].includes(cell),
		);
		const partial = normalized.findIndex((cell) =>
			HEADER_HINTS[field].some((hint) => cell.includes(hint)),
		);

		const index = exact !== -1 ? exact : partial;
		// Never point two fields at the same column.
		if (index !== -1 && !Object.values(mapping).includes(index)) {
			mapping[field] = index;
		}
	}

	return mapping;
}

/**
 * Parse a monetary cell.
 *
 * Handles `1.234,56` (pt-BR), `1,234.56` (en), a leading currency symbol, a
 * trailing minus and accounting parentheses. Returns `null` when there is no
 * number in there at all.
 */
export function parseAmount(raw) {
	if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
	if (typeof raw !== "string") return null;

	let text = raw.trim();
	if (text === "") return null;

	const parenthesised = /^\((.*)\)$/.test(text);
	if (parenthesised) text = text.slice(1, -1);

	const trailingMinus = /-\s*$/.test(text);
	// Drop currency symbols, spaces and the trailing sign.
	text = text.replace(/[^\d,.\-]/g, "").replace(/-\s*$/, "");

	const negative =
		parenthesised || trailingMinus || text.trim().startsWith("-");
	text = text.replace(/-/g, "");
	if (text === "") return null;

	const lastComma = text.lastIndexOf(",");
	const lastDot = text.lastIndexOf(".");

	if (lastComma !== -1 && lastDot !== -1) {
		// Whichever separator comes last is the decimal one.
		const decimal = lastComma > lastDot ? "," : ".";
		const thousands = decimal === "," ? "." : ",";
		text = text.split(thousands).join("").replace(decimal, ".");
	} else if (lastComma !== -1) {
		// A lone comma is decimal unless it groups thousands (1,234).
		const decimals = text.length - lastComma - 1;
		text = decimals === 3 ? text.split(",").join("") : text.replace(",", ".");
	} else if (lastDot !== -1) {
		const decimals = text.length - lastDot - 1;
		if (decimals === 3 && text.split(".").length > 1) {
			text = text.split(".").join("");
		}
	}

	const value = Number(text);
	if (!Number.isFinite(value)) return null;

	return negative ? -value : value;
}

/**
 * Parse a date cell into `YYYY-MM-DD`.
 *
 * Accepts ISO plus day-first `DD/MM/YYYY`, `DD-MM-YYYY` and `DD.MM.YYYY`. Two
 * digit years are read as 2000+. Returns `null` when the date is unusable.
 */
export function parseDate(raw) {
	if (typeof raw !== "string") return null;

	const text = raw.trim();
	if (text === "") return null;

	const iso = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
	if (iso) return toIso(Number(iso[1]), Number(iso[2]), Number(iso[3]));

	const dayFirst = text.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})/);
	if (dayFirst) {
		const year = Number(dayFirst[3]);
		return toIso(
			year < 100 ? 2000 + year : year,
			Number(dayFirst[2]),
			Number(dayFirst[1]),
		);
	}

	return null;
}

function toIso(year, month, day) {
	if (month < 1 || month > 12 || day < 1 || day > 31) return null;

	const date = new Date(Date.UTC(year, month - 1, day));
	// Rejects the likes of 31/02 that would otherwise roll into March.
	if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;

	return date.toISOString().slice(0, 10);
}

/**
 * Apply a column mapping to the data rows.
 *
 * @param {string[][]} rows    Data rows (header already removed).
 * @param {object} mapping     Column index per field, as `guessColumns` returns.
 * @returns {Array<{index: number, date: string|null, description: string,
 *   amount: number|null, category: string, errors: string[], valid: boolean}>}
 */
export function buildStatementEntries(rows = [], mapping = {}) {
	return rows.map((row, index) => {
		const cell = (field) =>
			mapping[field] === null || mapping[field] === undefined
				? ""
				: (row[mapping[field]] ?? "");

		const date = parseDate(cell("date"));
		const description = String(cell("description")).trim();
		const amount = parseAmount(cell("amount"));
		const category = String(cell("category")).trim();

		const errors = [];
		if (!date) errors.push("date");
		if (!description) errors.push("description");
		if (amount === null || amount === 0) errors.push("amount");

		return {
			index,
			date,
			description,
			amount,
			category,
			errors,
			valid: errors.length === 0,
		};
	});
}

/** Income/expense/total summary for the rows that are importable. */
export function summarizeEntries(entries = []) {
	return entries
		.filter((entry) => entry.valid)
		.reduce(
			(totals, entry) => {
				if (entry.amount < 0) totals.expenses += Math.abs(entry.amount);
				else totals.income += entry.amount;
				totals.count += 1;
				return totals;
			},
			{ income: 0, expenses: 0, count: 0 },
		);
}

/**
 * Match an entry's category text against the existing categories by name,
 * falling back to the id the user picked for unmatched rows.
 */
export function resolveCategoryId(entry, categories = [], fallbackId = null) {
	if (entry.category) {
		const wanted = normalizeHeader(entry.category);
		const match = categories.find(
			(category) => normalizeHeader(category.name) === wanted,
		);
		if (match) return match.id;
	}

	return fallbackId;
}
