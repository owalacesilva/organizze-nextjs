"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useMemo } from "react";

/**
 * `useTranslation()` plus `formatBRL`.
 *
 * B3, Tesouro Direto and the BRL side of every pair on this page are priced in
 * reais — the UI locale changes the notation, never the currency. Binding it
 * here keeps the table, the cards and the details dialog in agreement.
 */
export function useQuoteFormat() {
	const translation = useTranslation();
	const { formatCurrency } = translation;

	return useMemo(
		() => ({
			...translation,
			formatBRL: (value, options) =>
				formatCurrency(value, { currency: "BRL", ...options }),
		}),
		[translation, formatCurrency],
	);
}
