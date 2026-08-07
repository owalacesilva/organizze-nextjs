"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { monthlyTotals } from "@/lib/transactions";
import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useDashboardData } from "./use-dashboard-data";

export function IncomeExpensesChart() {
	const { t, formatCurrency, formatDate } = useTranslation();
	const { transactions } = useDashboardData();

	const data = useMemo(
		() =>
			monthlyTotals(transactions, 6).map((month) => ({
				label: formatDate(month.date, { month: "short" }),
				income: Math.round(month.income * 100) / 100,
				expenses: Math.round(month.expenses * 100) / 100,
			})),
		[transactions, formatDate],
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("dashboard.incomeVsExpenses")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-64 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={data}
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
							<Bar
								dataKey="income"
								name={t("transactions.summary.income")}
								fill="hsl(var(--primary))"
								barSize={10}
							/>
							<Bar
								dataKey="expenses"
								name={t("transactions.summary.expenses")}
								fill="hsl(var(--muted-foreground))"
								barSize={10}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
