"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { FileBarChart2, FileText, PieChart, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { StatCard } from "./stat-card";
import { useAnalyticsData } from "./use-analytics-data";

export function Analytics() {
	const { t, formatCurrency, formatDate } = useTranslation();
	const { transactions, months, totals } = useAnalyticsData();

	const series = useMemo(
		() =>
			months.map((month) => ({
				label: formatDate(month.date, { month: "short" }),
				income: Math.round(month.income * 100) / 100,
				expenses: Math.round(month.expenses * 100) / 100,
				savings: Math.round((month.income - month.expenses) * 100) / 100,
			})),
		[months, formatDate],
	);

	const categoryCount = useMemo(
		() =>
			new Set(
				transactions
					.map((transaction) => transaction.categoryName)
					.filter(Boolean),
			).size,
		[transactions],
	);

	// Share of income that was not spent.
	const savingsRate =
		totals.income > 0 ? (totals.balance / totals.income) * 100 : 0;

	return (
		<div className="space-y-3">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label={t("analytics.totalIncome")}
					value={formatCurrency(totals.income)}
					icon={TrendingUp}
					tone="positive"
				/>
				<StatCard
					label={t("analytics.totalExpenses")}
					value={formatCurrency(totals.expenses)}
					icon={FileText}
					tone="negative"
				/>
				<StatCard
					label={t("analytics.savingsRate")}
					value={`${savingsRate.toFixed(1)}%`}
					hint={formatCurrency(totals.balance)}
					icon={FileBarChart2}
				/>
				<StatCard
					label={t("analytics.activeCategories")}
					value={String(categoryCount)}
					icon={PieChart}
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("analytics.byMonth")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-72">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={series}
								margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									vertical={false}
									className="stroke-border"
								/>
								<XAxis
									dataKey="label"
									tickLine={false}
									axisLine={false}
									tick={{ fontSize: 10 }}
									stroke="currentColor"
									className="text-muted-foreground"
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									width={56}
									tick={{ fontSize: 10 }}
									stroke="currentColor"
									className="text-muted-foreground"
								/>
								<Tooltip
									formatter={(value) => formatCurrency(value)}
									contentStyle={{
										backgroundColor: "hsl(var(--card))",
										borderColor: "hsl(var(--border))",
										borderRadius: 0,
										fontSize: 12,
										color: "hsl(var(--foreground))",
									}}
								/>
								<Legend wrapperStyle={{ fontSize: 11 }} />
								<Line
									type="monotone"
									dataKey="income"
									name={t("transactions.summary.income")}
									stroke="hsl(var(--success))"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="expenses"
									name={t("transactions.summary.expenses")}
									stroke="hsl(var(--destructive))"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="savings"
									name={t("analytics.savings")}
									stroke="hsl(var(--primary))"
									strokeWidth={2}
									dot={false}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default Analytics;
