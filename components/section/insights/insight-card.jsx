"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
	AlertTriangle,
	CheckCircle2,
	Info,
	OctagonAlert,
} from "lucide-react";

const TONES = {
	critical: {
		icon: OctagonAlert,
		card: "border-destructive/40",
		badge: "bg-destructive/10 text-destructive",
	},
	warning: {
		icon: AlertTriangle,
		card: "border-amber-500/40",
		badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	},
	positive: {
		icon: CheckCircle2,
		card: "border-emerald-500/40",
		badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	},
	neutral: {
		icon: Info,
		card: "",
		badge: "bg-muted text-muted-foreground",
	},
};

const CURRENCY_VALUES = [
	"amount",
	"average",
	"current",
	"gap",
	"previous",
	"projected",
	"saved",
];

const WEEKDAY_EPOCH = new Date(2024, 0, 7);

export function InsightCard({ insight }) {
	const { t, formatCurrency, formatDate } = useTranslation();

	const tone = TONES[insight.tone] ?? TONES.neutral;
	const Icon = tone.icon;

	const values = Object.fromEntries(
		Object.entries(insight.values ?? {}).map(([key, value]) => {
			if (CURRENCY_VALUES.includes(key)) return [key, formatCurrency(value)];

			if (key === "weekday") {
				const date = new Date(WEEKDAY_EPOCH);
				date.setDate(date.getDate() + value);
				return [key, formatDate(date, { weekday: "long" })];
			}

			return [key, value];
		}),
	);

	return (
		<Card className={cn(tone.card)}>
			<CardContent className="flex items-start gap-2 p-3">
				<span className={cn("shrink-0 rounded-full p-1.5", tone.badge)}>
					<Icon className="h-3.5 w-3.5" />
				</span>

				<div className="min-w-0 space-y-0.5">
					<p className="text-xs font-medium">
						{t(`insights.items.${insight.id}.title`, values)}
					</p>
					<p className="text-[11px] leading-relaxed text-muted-foreground">
						{t(`insights.items.${insight.id}.body`, values)}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
