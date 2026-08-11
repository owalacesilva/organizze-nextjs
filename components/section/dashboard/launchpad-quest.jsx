"use client";

import { Confetti } from "@/components/elements/confetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGamification } from "@/hooks/useGamification";
import { useTranslation } from "@/hooks/useTranslation";
import { QUEST_BONUS } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Circle, Coins, Rocket } from "lucide-react";
import Link from "next/link";

/**
 * The "Financial Launchpad" onboarding quest.
 *
 * Disappears from the dashboard once complete rather than sitting there ticked
 * forever — the Trophy Room keeps the Founding Member badge, which is the part
 * worth keeping.
 */
export function LaunchpadQuest() {
	const { t, formatNumber } = useTranslation();
	const { profile, isPending, isError } = useGamification();

	if (isPending || isError) return null;

	const { quest } = profile;
	if (quest.completed) return null;

	return (
		<Card className="relative overflow-hidden">
			<Confetti active={quest.completed} runKey="launchpad" />

			<CardHeader className="flex-row items-start justify-between gap-2 space-y-0">
				<div className="flex items-start gap-2">
					<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
						<Rocket className="h-4 w-4" />
					</span>
					<div>
						<CardTitle>{t("gamification.quest.title")}</CardTitle>
						<p className="text-xs text-muted-foreground">
							{t("gamification.quest.subtitle")}
						</p>
					</div>
				</div>

				<Badge variant="secondary" className="shrink-0 tabular-nums">
					{t("gamification.quest.progress", {
						done: formatNumber(quest.doneCount),
						total: formatNumber(quest.total),
					})}
				</Badge>
			</CardHeader>

			<CardContent className="space-y-3">
				<Progress value={quest.percent} className="h-1.5" />

				<ul className="space-y-1">
					{quest.tasks.map((task) => (
						<li
							key={task.key}
							className="flex items-center gap-2 rounded-md border px-2 py-1.5"
						>
							{task.done ? (
								<Check
									className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
									aria-hidden="true"
								/>
							) : (
								<Circle
									className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							)}

							<span
								className={cn(
									"min-w-0 flex-1 truncate text-xs",
									task.done && "text-muted-foreground line-through",
								)}
							>
								{t(`gamification.quest.tasks.${task.key}`)}
							</span>

							{!task.done && (
								<Button
									asChild
									variant="ghost"
									size="xs"
									className="shrink-0 gap-1"
								>
									<Link href={task.href}>
										{t("gamification.quest.go")}
										<ArrowRight />
									</Link>
								</Button>
							)}
						</li>
					))}
				</ul>

				<p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
					<Coins className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
					{t("gamification.quest.reward", {
						tokens: formatNumber(QUEST_BONUS.tokens),
					})}
				</p>
			</CardContent>
		</Card>
	);
}
