"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

/**
 * The streak flame and its day count.
 *
 * Goes cold and grey at zero rather than disappearing, so the streak has a
 * visible place to come back to.
 */
export function StreakFlame({ days = 0, atRisk = false, size = "default" }) {
	const { t, formatNumber } = useTranslation();
	const alight = days > 0;
	const large = size === "large";

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5",
				large ? "text-2xl font-bold" : "text-xs font-semibold",
			)}
		>
			<Flame
				className={cn(
					"shrink-0",
					large ? "h-7 w-7" : "h-4 w-4",
					!alight && "text-muted-foreground",
					alight && !atRisk && "fill-orange-400 text-orange-500",
					alight && atRisk && "fill-amber-200 text-amber-500",
				)}
				aria-hidden="true"
			/>
			<span className="tabular-nums">{formatNumber(days)}</span>
			<span className="sr-only">{t("gamification.streak.days", { count: days })}</span>
		</span>
	);
}
