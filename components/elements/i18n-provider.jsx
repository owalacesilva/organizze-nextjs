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

const useIsomorphicLayoutEffect =
	typeof window === "undefined" ? () => {} : useLayoutEffect;

function readStoredLocale() {
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (isSupportedLocale(stored)) return stored;
	} catch {}

	return resolveLocale(window.navigator?.language) ?? defaultLocale;
}

export function I18nProvider({ children, initialLocale = defaultLocale }) {
	const [locale, setLocaleState] = useState(initialLocale);

	useIsomorphicLayoutEffect(() => {
		const stored = readStoredLocale();
		if (stored !== locale) setLocaleState(stored);
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
		} catch {}
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
