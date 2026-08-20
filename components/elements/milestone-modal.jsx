"use client";

import { useCelebrateBadge } from "@/app/api/gamification/hooks";
import { Confetti } from "@/components/elements/confetti";
import { BadgeMedal } from "@/components/elements/badge-medal";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useGamification } from "@/hooks/useGamification";
import { useTranslation } from "@/hooks/useTranslation";
import { Coins } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MilestoneModal() {
	const { t, formatNumber } = useTranslation();
	const { profile, state, isPending } = useGamification();
	const celebrate = useCelebrateBadge();

	const seen = useRef(null);
	const [queue, setQueue] = useState([]);

	useEffect(() => {
		if (isPending) return;

		const unlocked = profile.badges
			.filter((badge) => badge.unlocked)
			.map((badge) => badge.id);

		if (seen.current === null) {
			seen.current = new Set([...state.celebratedBadges, ...unlocked]);
			return;
		}

		const fresh = unlocked.filter((id) => !seen.current.has(id));
		if (fresh.length === 0) return;

		for (const id of fresh) seen.current.add(id);
		setQueue((pending) => [...pending, ...fresh]);
	}, [isPending, profile.badges, state.celebratedBadges]);

	const current = queue[0];
	const badge = profile.badges.find((entry) => entry.id === current);

	const dismiss = () => {
		if (current) celebrate.mutate(current);
		setQueue((pending) => pending.slice(1));
	};

	if (!current || !badge) return null;

	return (
		<Dialog open onOpenChange={(open) => !open && dismiss()}>
			<DialogContent
				className="overflow-hidden text-center"
				closeLabel={t("common.close")}
			>
				<Confetti active runKey={current} />

				<DialogHeader className="items-center">
					<DialogTitle>{t("gamification.milestone.title")}</DialogTitle>
					<DialogDescription>
						{t(`gamification.badges.${badge.id}.name`)}
					</DialogDescription>
				</DialogHeader>

				<DialogBody className="flex flex-col items-center gap-3">
					<BadgeMedal tier={badge.tier} id={badge.id} size="large" unlocked />

					<p className="text-xs text-muted-foreground">
						{t(`gamification.badges.${badge.id}.description`)}
					</p>

					{badge.tokens > 0 && (
						<p className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
							<Coins className="h-3.5 w-3.5" aria-hidden="true" />
							{t("gamification.milestone.reward", {
								tokens: formatNumber(badge.tokens),
							})}
						</p>
					)}
				</DialogBody>

				<DialogFooter className="sm:justify-center">
					<Button onClick={dismiss}>{t("gamification.milestone.confirm")}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
