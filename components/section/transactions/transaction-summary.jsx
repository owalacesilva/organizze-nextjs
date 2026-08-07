"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

/** Totals for the currently filtered set, so the numbers track the table. */
export function TransactionSummary({ summary, count, className }) {
	const { t, formatCurrency } = useTranslation();

	const cards = [
		{
			key: "income",
			label: t("transactions.summary.income"),
			value: summary.income,
			icon: ArrowUpRight,
			tone: "text-emerald-600 dark:text-emerald-400",
			iconTone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
		},
		{
			key: "expenses",
			label: t("transactions.summary.expenses"),
			value: summary.expenses,
			icon: ArrowDownLeft,
			tone: "text-red-600 dark:text-red-400",
			iconTone: "bg-red-500/10 text-red-600 dark:text-red-400",
		},
		{
			key: "balance",
			label: t("transactions.summary.balance"),
			value: summary.balance,
			icon: Wallet,
			tone:
				summary.balance < 0
					? "text-red-600 dark:text-red-400"
					: "text-foreground",
			iconTone: "bg-primary/10 text-primary",
		},
	];

	return (
		<div className={cn("grid gap-3 sm:grid-cols-3", className)}>
			{cards.map((card) => (
				<Card key={card.key} className="shadow-none">
					<CardContent className="flex items-center gap-3 p-3">
						<div className={cn("rounded-lg p-2", card.iconTone)}>
							<card.icon className="h-4 w-4" />
						</div>
						<div className="min-w-0">
							<p className="text-[11px] uppercase tracking-wide text-muted-foreground">
								{card.label}
							</p>
							<p
								className={cn(
									"truncate text-base font-semibold tabular-nums",
									card.tone,
								)}
							>
								{formatCurrency(card.value)}
							</p>
						</div>
					</CardContent>
				</Card>
			))}

			<p className="sr-only">
				{t("transactions.summary.count", { count })}
			</p>
		</div>
	);
}
