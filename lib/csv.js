/**
 * Minimal RFC 4180 CSV reader.
 *
 * Bank exports are messy — semicolon separators, BOMs, CRLF, quoted fields with
 * embedded separators — so parsing is done here rather than with a split(),
 * and kept free of React so it can be unit tested.
 */

const DELIMITERS = [",", ";", "\t", "|"];

/** Strip the UTF-8 BOM Excel likes to prepend. */
function stripBom(text) {
	return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

/**
 * Guess the separator by counting candidates outside quoted sections on the
 * first few lines; the most frequent one wins, comma breaks ties.
 */
export function detectDelimiter(text) {
	const sample = stripBom(text).split(/\r?\n/).slice(0, 5).join("\n");
	let best = ",";
	let bestCount = 0;

	for (const delimiter of DELIMITERS) {
		let count = 0;
		let inQuotes = false;

		for (const char of sample) {
			if (char === '"') inQuotes = !inQuotes;
			else if (char === delimiter && !inQuotes) count++;
		}

		if (count > bestCount) {
			best = delimiter;
			bestCount = count;
		}
	}

	return best;
}

/**
 * Parse CSV text into rows of raw string cells.
 *
 * @param {string} text
 * @param {object} [options]
 * @param {string} [options.delimiter] Detected when omitted.
 * @returns {string[][]} Blank lines are dropped; cells keep their order.
 */
export function parseCsv(text, options = {}) {
	if (typeof text !== "string" || text.trim() === "") return [];

	const content = stripBom(text);
	const delimiter = options.delimiter ?? detectDelimiter(content);

	const rows = [];
	let row = [];
	let field = "";
	let inQuotes = false;

	const endField = () => {
		row.push(field.trim());
		field = "";
	};

	const endRow = () => {
		endField();
		// A trailing newline produces a single empty cell — not a real row.
		if (row.some((cell) => cell !== "")) rows.push(row);
		row = [];
	};

	for (let index = 0; index < content.length; index++) {
		const char = content[index];

		if (inQuotes) {
			if (char === '"') {
				// A doubled quote inside a quoted field is a literal quote.
				if (content[index + 1] === '"') {
					field += '"';
					index++;
				} else {
					inQuotes = false;
				}
			} else {
				field += char;
			}
			continue;
		}

		if (char === '"') {
			inQuotes = true;
		} else if (char === delimiter) {
			endField();
		} else if (char === "\r") {
			// Swallow it; the \n that follows closes the row.
		} else if (char === "\n") {
			endRow();
		} else {
			field += char;
		}
	}

	if (field !== "" || row.length > 0) endRow();

	return rows;
}

/** True when the file name ends in `.csv`, case-insensitively. */
export function isCsvFileName(name) {
	return typeof name === "string" && /\.csv$/i.test(name.trim());
}
