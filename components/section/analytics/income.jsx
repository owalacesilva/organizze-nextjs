"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { ArrowUpRight, CalendarRange, Wallet } from "lucide-react";
import { useMemo } from "react";
import { CategoryBreakdown } from "./category-breakdown";
import { StatCard } from "./stat-card";
import { biggest, groupByCategory, useAnalyticsData } from "./use-analytics-data";

export function Income() {
	const { t, formatCurrency } = useTranslation();
	const { transactions, months, totals } = useAnalyticsData();

	const rows = useMemo(
		() => groupByCategory(transactions, "income", t("dashboard.uncategorized")),
		[transactions, t],
	);

	const largest = useMemo(() => biggest(transactions, "income"), [transactions]);
	const average = months.length
		? months.reduce((sum, month) => sum + month.income, 0) / months.length
		: 0;

	return (
		<div className="space-y-3">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<StatCard
					label={t("analytics.totalIncome")}
					value={formatCurrency(totals.income)}
					icon={Wallet}
					tone="positive"
				/>
				<StatCard
					label={t("analytics.averagePerMonth")}
					value={formatCurrency(average)}
					icon={CalendarRange}
				/>
				<StatCard
					label={t("analytics.biggestIncome")}
					value={formatCurrency(Math.abs(largest?.amount ?? 0))}
					hint={largest?.description}
					icon={ArrowUpRight}
					tone="positive"
				/>
			</div>

			<CategoryBreakdown title={t("analytics.byCategory")} rows={rows} />
		</div>
	);
}

export default Income;
