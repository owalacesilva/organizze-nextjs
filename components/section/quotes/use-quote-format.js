"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useMemo } from "react";

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
