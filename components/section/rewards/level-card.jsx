"use client";

import { StreakFlame } from "@/components/elements/streak-flame";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { Coins, Sparkles, Trophy } from "lucide-react";

function Stat({ icon: Icon, label, value, tone }) {
	return (
		<div className="flex items-center gap-2 rounded-lg border p-2.5">
			<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
				<Icon className={`h-4 w-4 ${tone}`} aria-hidden="true" />
			</span>
			<div className="min-w-0">
				<p className="text-[10px] uppercase tracking-wide text-muted-foreground">
					{label}
				</p>
				<p className="truncate text-sm font-semibold tabular-nums">{value}</p>
			</div>
		</div>
	);
}

/** Level, XP bar and the three headline counters. */
export function LevelCard({ profile }) {
	const { t, formatNumber } = useTranslation();
	const { level, tokens, streak, unlockedCount, totalBadges } = profile;

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
				<div>
					<CardTitle>
						{t("gamification.level.title", { level: formatNumber(level.level) })}
					</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t("gamification.level.toNext", {
							xp: formatNumber(level.xpToNext),
						})}
					</p>
				</div>

				<span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
					{t("gamification.level.xpTotal", { xp: formatNumber(level.xp) })}
				</span>
			</CardHeader>

			<CardContent className="space-y-3">
				<Progress value={level.percent} />

				<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
					<Stat
						icon={Coins}
						tone="text-amber-500"
						label={t("gamification.tokens.label")}
						value={formatNumber(tokens.balance)}
					/>
					<Stat
						icon={Trophy}
						tone="text-yellow-500"
						label={t("gamification.trophyRoom.label")}
						value={`${formatNumber(unlockedCount)} / ${formatNumber(totalBadges)}`}
					/>
					<div className="flex items-center gap-2 rounded-lg border p-2.5">
						<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
							<Sparkles className="h-4 w-4 text-orange-500" aria-hidden="true" />
						</span>
						<div className="min-w-0">
							<p className="text-[10px] uppercase tracking-wide text-muted-foreground">
								{t("gamification.streak.title")}
							</p>
							<StreakFlame days={streak.current} atRisk={streak.atRisk} />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
