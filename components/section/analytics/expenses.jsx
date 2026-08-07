"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { ArrowDownRight, CalendarRange, Receipt } from "lucide-react";
import { useMemo } from "react";
import { CategoryBreakdown } from "./category-breakdown";
import { StatCard } from "./stat-card";
import { biggest, groupByCategory, useAnalyticsData } from "./use-analytics-data";

export function Expenses() {
	const { t, formatCurrency } = useTranslation();
	const { transactions, months, totals } = useAnalyticsData();

	const rows = useMemo(
		() => groupByCategory(transactions, "expense", t("dashboard.uncategorized")),
		[transactions, t],
	);

	const largest = useMemo(() => biggest(transactions, "expense"), [transactions]);
	const average = months.length
		? months.reduce((sum, month) => sum + month.expenses, 0) / months.length
		: 0;

	return (
		<div className="space-y-3">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<StatCard
					label={t("analytics.totalExpenses")}
					value={formatCurrency(totals.expenses)}
					icon={Receipt}
					tone="negative"
				/>
				<StatCard
					label={t("analytics.averagePerMonth")}
					value={formatCurrency(average)}
					icon={CalendarRange}
				/>
				<StatCard
					label={t("analytics.biggestExpense")}
					value={formatCurrency(Math.abs(largest?.amount ?? 0))}
					hint={largest?.description}
					icon={ArrowDownRight}
					tone="negative"
				/>
			</div>

			<CategoryBreakdown title={t("analytics.byCategory")} rows={rows} />
		</div>
	);
}

export default Expenses;
