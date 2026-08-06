/**
 * Locale configuration.
 *
 * Adding a language means: create `lib/i18n/dictionaries/<code>.js`, register it in
 * `lib/i18n/dictionaries/index.js` and add an entry here.
 */
export const locales = [
	{ code: "pt-BR", label: "Português", flag: "🇧🇷", currency: "BRL" },
	{ code: "en", label: "English", flag: "🇺🇸", currency: "USD" },
];

export const defaultLocale = "pt-BR";

export const localeCodes = locales.map((locale) => locale.code);

export const STORAGE_KEY = "organizze.locale";

export function isSupportedLocale(code) {
	return localeCodes.includes(code);
}

export function getLocaleConfig(code) {
	return locales.find((locale) => locale.code === code) ?? locales[0];
}

/**
 * Best-effort match of a browser language tag (`pt`, `pt-br`, `en-GB`) to a
 * supported locale. Returns `null` when nothing matches so callers can fall
 * back to `defaultLocale`.
 */
export function resolveLocale(candidate) {
	if (!candidate) return null;

	const normalized = String(candidate).toLowerCase();
	const exact = localeCodes.find((code) => code.toLowerCase() === normalized);
	if (exact) return exact;

	const language = normalized.split("-")[0];
	return (
		localeCodes.find((code) => code.toLowerCase().split("-")[0] === language) ??
		null
	);
}
