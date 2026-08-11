"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { Coins, Sparkles } from "lucide-react";

/**
 * Where the XP and tokens came from.
 *
 * Worth showing because the numbers are derived rather than banked: if the
 * matrix says 10 XP a day, the user can check the arithmetic against their own
 * statement.
 */
export function RewardLedger({ profile }) {
	const { t, formatNumber } = useTranslation();
	const { entries } = profile.rewards;

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("gamification.ledger.title")}</CardTitle>
				<p className="text-xs text-muted-foreground">
					{t("gamification.ledger.subtitle")}
				</p>
			</CardHeader>

			<CardContent>
				{entries.length === 0 ? (
					<p className="py-8 text-center text-xs text-muted-foreground">
						{t("gamification.ledger.empty")}
					</p>
				) : (
					<div className="overflow-x-auto rounded-md border">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead>{t("gamification.ledger.source")}</TableHead>
									<TableHead className="text-right">
										{t("gamification.ledger.count")}
									</TableHead>
									<TableHead className="text-right">
										<span className="inline-flex items-center gap-1">
											<Sparkles className="h-3 w-3" aria-hidden="true" />
											{t("gamification.ledger.xp")}
										</span>
									</TableHead>
									<TableHead className="text-right">
										<span className="inline-flex items-center gap-1">
											<Coins className="h-3 w-3 text-amber-500" aria-hidden="true" />
											{t("gamification.ledger.tokens")}
										</span>
									</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{entries.map((entry) => (
									<TableRow key={entry.key}>
										<TableCell className="text-xs">
											{t(`gamification.ledger.sources.${entry.key}`)}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{formatNumber(entry.count)}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{formatNumber(entry.xp)}
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{formatNumber(entry.tokens)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}

				{profile.tokens.spent > 0 && (
					<p className="mt-2 text-right text-[11px] text-muted-foreground">
						{t("gamification.ledger.spent", {
							tokens: formatNumber(profile.tokens.spent),
						})}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
