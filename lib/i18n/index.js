import { dictionaries } from "./dictionaries";
import { defaultLocale, getLocaleConfig } from "./config";

export * from "./config";
export { dictionaries };

/** Resolve a dot-separated path (`transactions.fields.amount`) inside a dictionary. */
export function lookup(dictionary, key) {
	if (!dictionary || typeof key !== "string") return undefined;

	const value = key
		.split(".")
		.reduce(
			(node, part) =>
				node && typeof node === "object" ? node[part] : undefined,
			dictionary,
		);

	return typeof value === "string" ? value : undefined;
}

/** Replace `{{token}}` placeholders with values from `params`. */
export function interpolate(template, params) {
	if (!params) return template;

	return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, token) =>
		params[token] === undefined || params[token] === null
			? match
			: String(params[token]),
	);
}

/**
 * Pick the plural variant of a key. Uses `Intl.PluralRules` when available and
 * accepts both CLDR-style suffixes (`key_one`, `key_other`) and the shorthand
 * `key_plural` used across the dictionaries.
 */
function pluralKey(dictionary, key, locale, count) {
	let category = count === 1 ? "one" : "other";

	try {
		category = new Intl.PluralRules(locale).select(count);
	} catch {
		// Locale unknown to the runtime — the count-based guess above is fine.
	}

	if (lookup(dictionary, `${key}_${category}`) !== undefined) {
		return `${key}_${category}`;
	}
	if (category !== "one" && lookup(dictionary, `${key}_plural`) !== undefined) {
		return `${key}_plural`;
	}
	return key;
}

/**
 * Build a `t(key, params)` function for a locale.
 *
 * Resolution order: current locale → default locale → the key itself, so a
 * missing translation degrades to something visible instead of blank UI.
 */
export function createTranslator(locale) {
	const dictionary = dictionaries[locale] ?? dictionaries[defaultLocale];
	const fallback = dictionaries[defaultLocale];

	return function t(key, params) {
		const resolvedKey =
			params && typeof params.count === "number"
				? pluralKey(dictionary, key, locale, params.count)
				: key;

		const template =
			lookup(dictionary, resolvedKey) ??
			lookup(fallback, resolvedKey) ??
			lookup(dictionary, key) ??
			lookup(fallback, key);

		if (template === undefined) {
			if (process.env.NODE_ENV === "development") {
				console.warn(`[i18n] Missing translation for "${key}" (${locale})`);
			}
			return key;
		}

		return interpolate(template, params);
	};
}

/** Locale-aware `Intl` helpers shared by the provider and by server-side code. */
export function createFormatters(locale) {
	const { currency: defaultCurrency } = getLocaleConfig(locale);

	return {
		formatNumber: (value, options) =>
			new Intl.NumberFormat(locale, options).format(Number(value) || 0),

		formatCurrency: (value, options = {}) => {
			const { currency = defaultCurrency, ...rest } = options;
			return new Intl.NumberFormat(locale, {
				style: "currency",
				currency,
				...rest,
			}).format(Number(value) || 0);
		},

		formatDate: (value, options = { dateStyle: "medium" }) => {
			const date = value instanceof Date ? value : new Date(value);
			if (Number.isNaN(date.getTime())) return "";
			return new Intl.DateTimeFormat(locale, options).format(date);
		},
	};
}
