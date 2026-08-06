"use client";

import { useI18n } from "@/components/elements/i18n-provider";

/**
 * Access the current locale, the `t()` translator and the locale-aware
 * `Intl` formatters.
 *
 * @example
 * const { t, formatCurrency } = useTranslation();
 * t("transactions.summary.count", { count: 3 }); // "3 movimentações"
 */
export function useTranslation() {
	return useI18n();
}

export default useTranslation;
