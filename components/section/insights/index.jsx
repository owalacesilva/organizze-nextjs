"use client";

import { useGetBudgets } from "@/app/api/budgets/hooks";
import { useGetGoals } from "@/app/api/goals/hooks";
import { useGetTransactions } from "@/app/api/transactions/hooks";
import { useGetWallets } from "@/app/api/wallets/hooks";
import { TopExpenses } from "@/components/elements/top-expenses";
import { InsightsSkeleton } from "@/components/section/insights/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { buildInsights, insightSummary, recurringExpenses } from "@/lib/insights";
import { normalizeTransaction } from "@/lib/transactions";
import { cn } from "@/lib/utils";
import { AlertCircle, Lightbulb, Repeat } from "lucide-react";
import { useMemo } from "react";
import { InsightCard } from "./insight-card";

function SummaryTile({ label, value, tone = "default" }) {
	return (
		<Card>
			<CardContent className="p-3">
				<p className="text-[11px] uppercase tracking-wide text-muted-foreground">
					{label}
				</p>
				<p
					className={cn(
						"mt-1 text-lg font-semibold tabular-nums",
						tone === "positive" && "text-emerald-600 dark:text-emerald-400",
						tone === "negative" && "text-red-600 dark:text-red-400",
					)}
				>
					{value}
				</p>
			</CardContent>
		</Card>
	);
}

export default function InsightsSection() {
	const { t, formatCurrency, formatDate } = useTranslation();

	const transactionsQuery = useGetTransactions();
	const budgetsQuery = useGetBudgets();
	const goalsQuery = useGetGoals();
	const walletsQuery = useGetWallets();

	const transactions = useMemo(
		() =>
			(transactionsQuery.data?.transactions ?? []).map(normalizeTransaction),
		[transactionsQuery.data],
	);

	const budgets = budgetsQuery.data?.budgets ?? [];
	const goals = goalsQuery.data?.goals ?? [];
	const wallets = walletsQuery.data?.wallets ?? [];

	const insights = useMemo(
		() => buildInsights({ transactions, budgets, goals, wallets }),
		[transactions, budgets, goals, wallets],
	);

	const summary = useMemo(() => insightSummary(transactions), [transactions]);
	const recurring = useMemo(
		() => recurringExpenses(transactions).slice(0, 6),
		[transactions],
	);

	const isPending =
		transactionsQuery.isPending ||
		budgetsQuery.isPending ||
		goalsQuery.isPending ||
		walletsQuery.isPending;

	if (isPending) {
		return (
			<div role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<InsightsSkeleton />
			</div>
		);
	}

	if (transactionsQuery.isError) {
		return (
			<div className="flex flex-col items-center gap-3 py-10 text-center">
				<AlertCircle className="h-6 w-6 text-destructive" />
				<p className="text-sm font-medium">{t("transactions.loadError")}</p>
				<Button variant="outline" onClick={() => transactionsQuery.refetch()}>
					{t("common.retry")}
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<p className="text-[11px] uppercase tracking-wide text-muted-foreground">
				{t("insights.refreshed", {
					month: formatDate(new Date(), { month: "long", year: "numeric" }),
				})}
			</p>

			<div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
				<SummaryTile
					label={t("insights.summary.income")}
					value={formatCurrency(summary.income)}
					tone="positive"
				/>
				<SummaryTile
					label={t("insights.summary.expenses")}
					value={formatCurrency(summary.expenses)}
					tone="negative"
				/>
				<SummaryTile
					label={t("insights.summary.net")}
					value={formatCurrency(summary.net)}
					tone={summary.net < 0 ? "negative" : "positive"}
				/>
				<SummaryTile
					label={t("insights.summary.savingsRate")}
					value={`${Math.round(summary.savingsRate)}%`}
				/>
			</div>

			{insights.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center gap-2 py-10 text-center">
						<Lightbulb className="h-6 w-6 text-muted-foreground" />
						<p className="text-sm font-medium">{t("insights.empty")}</p>
						<p className="text-xs text-muted-foreground">
							{t("insights.emptyHint")}
						</p>
					</CardContent>
				</Card>
			) : (
				<section className="space-y-2">
					<h2 className="text-xs font-semibold">
						{t("insights.sections.whatMatters")}
					</h2>
					<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
						{insights.map((insight) => (
							<InsightCard key={insight.id} insight={insight} />
						))}
					</div>
				</section>
			)}

			<section className="space-y-2">
				<h2 className="text-xs font-semibold">
					{t("insights.sections.whereItGoes")}
				</h2>

				<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
					<TopExpenses transactions={transactions} limit={5} />

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-1.5">
								<Repeat className="h-3.5 w-3.5" />
								{t("insights.recurringTitle")}
							</CardTitle>
						</CardHeader>
						<CardContent>
							{recurring.length === 0 ? (
								<p className="py-6 text-center text-xs text-muted-foreground">
									{t("insights.recurringEmpty")}
								</p>
							) : (
								<ul className="divide-y">
									{recurring.map((entry) => (
										<li
											key={entry.description}
											className="flex items-center justify-between gap-2 py-1.5"
										>
											<span className="truncate text-xs">
												{entry.description}
											</span>
											<span className="shrink-0 text-xs font-medium tabular-nums">
												{t("insights.recurringMonthly", {
													amount: formatCurrency(entry.average),
												})}
											</span>
										</li>
									))}
								</ul>
							)}
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
