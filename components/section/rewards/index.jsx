"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGamification } from "@/hooks/useGamification";
import { useTranslation } from "@/hooks/useTranslation";
import { AlertCircle } from "lucide-react";
import { LevelCard } from "./level-card";
import { Leaderboard } from "./leaderboard";
import { Marketplace } from "./marketplace";
import { RewardLedger } from "./reward-ledger";

export default function RewardsSection() {
	const { t } = useTranslation();
	const { profile, state, peers, isPending, isError } = useGamification();

	if (isPending) {
		return (
			<div className="space-y-3" role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<Skeleton className="h-40 w-full" />
				<Skeleton className="h-64 w-full" />
				<Skeleton className="h-72 w-full" />
			</div>
		);
	}

	if (isError) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center gap-3 py-10 text-center">
					<AlertCircle className="h-6 w-6 text-destructive" />
					<p className="text-sm font-medium">{t("gamification.loadError")}</p>
					<Button variant="outline" onClick={() => window.location.reload()}>
						{t("common.retry")}
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-3">
			<LevelCard profile={profile} />

			<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
				<RewardLedger profile={profile} />
				<Marketplace profile={profile} state={state} />
			</div>

			<Leaderboard profile={profile} state={state} peers={peers} />
		</div>
	);
}
