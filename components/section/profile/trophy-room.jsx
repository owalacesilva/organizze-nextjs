"use client";

import { BadgeMedal } from "@/components/elements/badge-medal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGamification } from "@/hooks/useGamification";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

/** Unlocked first — a trophy room should lead with the trophies. */
function byUnlockedThenProgress(a, b) {
	if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
	return b.percent - a.percent;
}

function BadgeTile({ badge }) {
	const { t, formatNumber } = useTranslation();

	const name = t(`gamification.badges.${badge.id}.name`);
	const description = t(`gamification.badges.${badge.id}.description`);
	const howTo = t(`gamification.badges.${badge.id}.howTo`);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div
					tabIndex={0}
					className={cn(
						"flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						badge.unlocked ? "bg-card" : "bg-muted/30",
					)}
				>
					<BadgeMedal id={badge.id} tier={badge.tier} unlocked={badge.unlocked} />

					<p
						className={cn(
							"truncate text-xs font-medium",
							!badge.unlocked && "text-muted-foreground",
						)}
					>
						{name}
					</p>

					{badge.unlocked ? (
						badge.tokens > 0 && (
							<span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
								<Coins className="h-2.5 w-2.5 text-amber-500" aria-hidden="true" />
								{formatNumber(badge.tokens)}
							</span>
						)
					) : (
						<span className="w-full space-y-1">
							<Progress value={badge.percent} className="h-1" />
							{badge.progress && (
								<span className="block text-[10px] tabular-nums text-muted-foreground">
									{formatNumber(Math.floor(badge.progress.current))} /{" "}
									{formatNumber(badge.progress.target)}
									{badge.progress.unit === "percent" && "%"}
								</span>
							)}
						</span>
					)}
				</div>
			</TooltipTrigger>

			{/* Locked badges have to say plainly what unlocks them. */}
			<TooltipContent side="top" className="max-w-56 text-center">
				<p className="font-medium">{name}</p>
				<p className="text-[11px] opacity-90">
					{badge.unlocked ? description : howTo}
				</p>
			</TooltipContent>
		</Tooltip>
	);
}

export function TrophyRoom() {
	const { t, formatNumber } = useTranslation();
	const { profile, isPending, isError } = useGamification();

	if (isError) {
		return (
			<Card>
				<CardContent className="py-8 text-center text-xs text-muted-foreground">
					{t("gamification.loadError")}
				</CardContent>
			</Card>
		);
	}

	if (isPending) {
		return (
			<Card>
				<CardContent className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-6">
					{Array.from({ length: 12 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<Skeleton key={index} className="h-28" />
					))}
				</CardContent>
			</Card>
		);
	}

	const badges = [...profile.badges].sort(byUnlockedThenProgress);

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
				<div>
					<CardTitle>{t("gamification.trophyRoom.title")}</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t("gamification.trophyRoom.subtitle")}
					</p>
				</div>

				<span className="shrink-0 text-xs font-medium tabular-nums">
					{t("gamification.trophyRoom.count", {
						unlocked: formatNumber(profile.unlockedCount),
						total: formatNumber(profile.totalBadges),
					})}
				</span>
			</CardHeader>

			<CardContent>
				<TooltipProvider delayDuration={200}>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
						{badges.map((badge) => (
							<BadgeTile key={badge.id} badge={badge} />
						))}
					</div>
				</TooltipProvider>
			</CardContent>
		</Card>
	);
}
