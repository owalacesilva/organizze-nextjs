"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

const FLAT_THRESHOLD = 0.005;

export function changeTone(percent) {
	if (Math.abs(percent) < FLAT_THRESHOLD) return "flat";
	return percent > 0 ? "up" : "down";
}

const TONE_CLASS = {
	up: "text-emerald-600 dark:text-emerald-400",
	down: "text-destructive",
	flat: "text-muted-foreground",
};

const TONE_ICON = {
	up: ArrowUpRight,
	down: ArrowDownRight,
	flat: Minus,
};

export function ChangeIndicator({ percent, className }) {
	const { formatNumber } = useTranslation();
	const tone = changeTone(percent);
	const Icon = TONE_ICON[tone];
	const value = tone === "flat" ? 0 : percent;

	return (
		<span
			className={cn(
				"inline-flex items-center justify-end gap-0.5 font-medium tabular-nums",
				TONE_CLASS[tone],
				className,
			)}
		>
			<Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
			{formatNumber(value, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
				signDisplay: "exceptZero",
			})}
			%
		</span>
	);
}
