"use client";

import { StreakFlame } from "@/components/elements/streak-flame";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGamification } from "@/hooks/useGamification";
import { useTranslation } from "@/hooks/useTranslation";
import { STREAK_MILESTONES } from "@/lib/gamification";
import { AlertTriangle, Check } from "lucide-react";

/** The next milestone the run is working towards, or `null` once all are past. */
function nextMilestone(current) {
	return STREAK_MILESTONES.find((milestone) => milestone > current) ?? null;
}

export function StreakCard() {
	const { t, formatNumber } = useTranslation();
	const { profile, isPending, isError } = useGamification();

	if (isError) return null;

	if (isPending) {
		return (
			<Card>
				<CardContent className="space-y-2 p-3">
					<Skeleton className="h-2.5 w-24" />
					<Skeleton className="h-8 w-20" />
					<Skeleton className="h-1.5 w-full" />
				</CardContent>
			</Card>
		);
	}

	const { streak } = profile;
	const target = nextMilestone(streak.current);
	const percent = target ? (streak.current / target) * 100 : 100;

	return (
		<Card>
			<CardContent className="space-y-2 p-3">
				<div className="flex items-start justify-between gap-2">
					<p className="text-[11px] uppercase tracking-wide text-muted-foreground">
						{t("gamification.streak.title")}
					</p>

					{streak.loggedToday ? (
						<Badge className="gap-1 border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
							<Check className="h-2.5 w-2.5" />
							{t("gamification.streak.loggedToday")}
						</Badge>
					) : streak.atRisk ? (
						<Badge className="gap-1 border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400">
							<AlertTriangle className="h-2.5 w-2.5" />
							{t("gamification.streak.atRisk")}
						</Badge>
					) : null}
				</div>

				<StreakFlame days={streak.current} atRisk={streak.atRisk} size="large" />

				{/* The flame already announces the count; only the empty state
				    has something extra to say. */}
				{streak.current === 0 && (
					<p className="text-[11px] text-muted-foreground">
						{t("gamification.streak.empty")}
					</p>
				)}

				<Progress value={Math.min(100, percent)} className="h-1.5" />

				<p className="text-[11px] text-muted-foreground">
					{target
						? t("gamification.streak.nextMilestone", {
								days: formatNumber(target - streak.current),
								target: formatNumber(target),
							})
						: t("gamification.streak.allMilestones")}
					{streak.longest > streak.current &&
						` · ${t("gamification.streak.best", { count: streak.longest })}`}
				</p>
			</CardContent>
		</Card>
	);
}
