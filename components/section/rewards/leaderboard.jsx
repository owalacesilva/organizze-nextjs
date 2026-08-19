"use client";

import { useUpdateGamification } from "@/app/api/gamification/hooks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { buildLeaderboard } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

/**
 * Anonymous savings-rate leaderboard.
 *
 * Opting out is not a display filter — `buildLeaderboard` never ranks a rate
 * that was not opted in, so there is no hidden row to leak. Rows carry a handle
 * and a percentage and nothing else; see `lib/gamification/leaderboard.js`.
 */
export function Leaderboard({ profile, state, peers }) {
	const { t, formatNumber } = useTranslation();
	const update = useUpdateGamification();

	const optedIn = state.leaderboardOptIn;

	const board = buildLeaderboard({
		peers,
		rate: profile.savingsRate,
		optedIn,
	});

	const handleToggle = async (checked) => {
		try {
			await update.mutateAsync({ leaderboardOptIn: checked });
			toast.success(
				checked
					? t("gamification.leaderboard.optedIn")
					: t("gamification.leaderboard.optedOut"),
			);
		} catch (error) {
			toast.error(t("gamification.leaderboard.optError"), {
				description: error.message,
			});
		}
	};

	return (
		<Card>
			<CardHeader className="gap-2 space-y-0">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<CardTitle>{t("gamification.leaderboard.title")}</CardTitle>
						<p className="text-xs text-muted-foreground">
							{t("gamification.leaderboard.subtitle")}
						</p>
					</div>

					<div className="flex shrink-0 items-center gap-2">
						<Label htmlFor="leaderboard-opt-in" className="text-xs">
							{t("gamification.leaderboard.participate")}
						</Label>
						<Switch
							id="leaderboard-opt-in"
							checked={optedIn}
							disabled={update.isPending}
							onCheckedChange={handleToggle}
						/>
					</div>
				</div>

				<p className="flex items-start gap-1.5 rounded-md bg-muted/60 p-2 text-[11px] text-muted-foreground">
					<ShieldCheck
						className="mt-px h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
						aria-hidden="true"
					/>
					{t("gamification.leaderboard.privacyNote")}
				</p>
			</CardHeader>

			<CardContent>
				{!optedIn && (
					<div className="mb-2 flex items-center gap-2 rounded-md border border-dashed p-2.5 text-[11px] text-muted-foreground">
						<EyeOff className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
						{t("gamification.leaderboard.optedOutHint")}
					</div>
				)}

				<div className="overflow-x-auto rounded-md border">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-14">
									{t("gamification.leaderboard.rank")}
								</TableHead>
								<TableHead>{t("gamification.leaderboard.member")}</TableHead>
								<TableHead className="text-right">
									{t("gamification.leaderboard.savingsRate")}
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{board.rows.map((row) => (
								<TableRow
									key={row.isYou ? "you" : row.handle}
									className={cn(row.isYou && "bg-primary/5")}
								>
									<TableCell className="tabular-nums">{row.rank}</TableCell>
									<TableCell>
										{row.isYou ? (
											<Badge variant="secondary">
												{t("gamification.leaderboard.you")}
											</Badge>
										) : (
											<span className="text-xs">{row.handle}</span>
										)}
									</TableCell>
									<TableCell className="text-right tabular-nums">
										{formatNumber(row.rate, {
											minimumFractionDigits: 1,
											maximumFractionDigits: 1,
										})}
										%
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{optedIn && board.myRank && (
					<p className="mt-2 text-[11px] text-muted-foreground">
						{t("gamification.leaderboard.yourRank", {
							rank: formatNumber(board.myRank),
							total: formatNumber(board.total),
						})}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
