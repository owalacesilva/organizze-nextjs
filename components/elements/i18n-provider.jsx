"use client";

import {
	createContext,
	useCallback,
	useContext,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import {
	STORAGE_KEY,
	createFormatters,
	createTranslator,
	defaultLocale,
	getLocaleConfig,
	isSupportedLocale,
	locales,
	resolveLocale,
} from "@/lib/i18n";

const I18nContext = createContext(null);

// `useLayoutEffect` warns during SSR; fall back to a no-op on the server.
const useIsomorphicLayoutEffect =
	typeof window === "undefined" ? () => {} : useLayoutEffect;

function readStoredLocale() {
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (isSupportedLocale(stored)) return stored;
	} catch {
		// Storage can be unavailable (private mode, blocked cookies).
	}

	return resolveLocale(window.navigator?.language) ?? defaultLocale;
}

export function I18nProvider({ children, initialLocale = defaultLocale }) {
	// Server and first client render agree on `initialLocale`; the stored
	// preference is applied in a layout effect, before the browser paints, so
	// there is neither a hydration mismatch nor a visible flash of the wrong
	// language.
	const [locale, setLocaleState] = useState(initialLocale);

	useIsomorphicLayoutEffect(() => {
		const stored = readStoredLocale();
		if (stored !== locale) setLocaleState(stored);
		// Only on mount: later changes go through `setLocale`.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useIsomorphicLayoutEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	const setLocale = useCallback((next) => {
		if (!isSupportedLocale(next)) return;

		setLocaleState(next);
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Persisting is best-effort; the in-memory locale still switches.
		}
	}, []);

	const value = useMemo(
		() => ({
			locale,
			setLocale,
			locales,
			localeConfig: getLocaleConfig(locale),
			t: createTranslator(locale),
			...createFormatters(locale),
		}),
		[locale, setLocale],
	);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
	const context = useContext(I18nContext);

	if (!context) {
		throw new Error("useI18n must be used inside an <I18nProvider>");
	}

	return context;
}
