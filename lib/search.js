/**
 * Matching for the global feature search.
 *
 * Kept free of React so the ranking rules can be unit tested, and separate
 * from the feature list itself, which lives with the dialog because it carries
 * icons.
 */

/**
 * Lower-case and strip diacritics, so "orcamento" finds "Orçamento" and
 * "ACOES" finds "Ações" — nobody types accents into a search box.
 */
export function normalize(text) {
	return String(text ?? "")
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase()
		.trim();
}

/**
 * Every whitespace-separated term in `query` has to appear somewhere in
 * `haystack`. Requiring all of them lets "meta viagem" narrow, rather than
 * widening the way an any-term match would.
 */
export function matchesSearch(haystack, query) {
	const terms = normalize(query).split(/\s+/).filter(Boolean);
	if (terms.length === 0) return true;

	const target = normalize(haystack);
	return terms.every((term) => target.includes(term));
}

/**
 * Filter `entries` against `query`, scoring so the most direct hit leads.
 *
 * A label that starts with what was typed beats one that merely contains it,
 * which beats a hit that only came from the keywords or the description.
 *
 * @param entries `{ label, description, keywords }` plus whatever the caller
 *                needs carried through.
 */
export function searchFeatures(entries, query) {
	const trimmed = normalize(query);
	if (!trimmed) return [];

	return entries
		.map((entry) => {
			const label = normalize(entry.label);
			const haystack = [entry.label, entry.description, entry.keywords]
				.filter(Boolean)
				.join(" ");

			if (!matchesSearch(haystack, query)) return null;

			let score = 0;
			if (label === trimmed) score = 3;
			else if (label.startsWith(trimmed)) score = 2;
			else if (label.includes(trimmed)) score = 1;

			return { entry, score };
		})
		.filter(Boolean)
		.sort((a, b) => b.score - a.score)
		.map((hit) => hit.entry);
}
