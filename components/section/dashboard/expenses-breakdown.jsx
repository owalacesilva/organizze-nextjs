"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useDashboardData } from "./use-dashboard-data";

const COLORS = [
	"bg-indigo-500",
	"bg-sky-500",
	"bg-amber-500",
	"bg-emerald-500",
	"bg-rose-500",
	"bg-violet-500",
	"bg-slate-400",
];

export function ExpensesBreakdown() {
	const { t, formatCurrency } = useTranslation();
	const { transactions } = useDashboardData();

	const { rows, total } = useMemo(() => {
		const startOfMonth = new Date();
		startOfMonth.setDate(1);

		const byCategory = new Map();
		let sum = 0;

		for (const transaction of transactions) {
			if (transaction.amount >= 0) continue;
			if (new Date(transaction.date) < startOfMonth) continue;

			const name = transaction.categoryName || t("dashboard.uncategorized");
			const amount = Math.abs(transaction.amount);
			byCategory.set(name, (byCategory.get(name) ?? 0) + amount);
			sum += amount;
		}

		const sorted = [...byCategory.entries()]
			.sort(([, a], [, b]) => b - a)
			.map(([name, amount], index) => ({
				name,
				amount,
				percentage: sum > 0 ? (amount / sum) * 100 : 0,
				color: COLORS[index % COLORS.length],
			}));

		return { rows: sorted, total: sum };
	}, [transactions, t]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("dashboard.expensesByCategory")}</CardTitle>
				<p className="text-xs text-muted-foreground">
					{formatCurrency(total)}
				</p>
			</CardHeader>
			<CardContent>
				{rows.length === 0 ? (
					<p className="py-6 text-center text-xs text-muted-foreground">
						{t("dashboard.empty")}
					</p>
				) : (
					<>
						<div className="mb-3 flex h-1.5 w-full overflow-hidden rounded-full">
							{rows.map((row) => (
								<div
									key={row.name}
									className={cn(row.color)}
									style={{ width: `${row.percentage}%` }}
								/>
							))}
						</div>

						<ul className="divide-y">
							{rows.map((row) => (
								<li
									key={row.name}
									className="flex items-center justify-between gap-2 py-1.5"
								>
									<span className="flex min-w-0 items-center gap-1.5">
										<span className={cn("h-2 w-2 shrink-0 rounded-full", row.color)} />
										<span className="truncate text-xs text-muted-foreground">
											{row.name}
										</span>
									</span>
									<span className="flex shrink-0 items-center gap-2">
										<span className="text-xs font-medium tabular-nums">
											{formatCurrency(row.amount)}
										</span>
										<span className="w-8 text-right text-[11px] text-muted-foreground">
											{Math.round(row.percentage)}%
										</span>
									</span>
								</li>
							))}
						</ul>
					</>
				)}
			</CardContent>
		</Card>
	);
}
