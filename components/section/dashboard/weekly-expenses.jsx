"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useDashboardData } from "./use-dashboard-data";

export function WeeklyExpenses() {
	const { t, formatCurrency, formatDate } = useTranslation();
	const { transactions } = useDashboardData();

	const data = useMemo(() => {
		const days = [];
		const today = new Date();

		for (let offset = 6; offset >= 0; offset--) {
			const date = new Date(today);
			date.setDate(date.getDate() - offset);
			days.push({
				key: date.toISOString().slice(0, 10),
				label: formatDate(date, { weekday: "short" }),
				expenses: 0,
			});
		}

		const index = new Map(days.map((day) => [day.key, day]));

		for (const transaction of transactions) {
			if (transaction.amount >= 0) continue;
			const day = index.get(String(transaction.date).slice(0, 10));
			if (day) day.expenses += Math.abs(transaction.amount);
		}

		return days.map((day) => ({
			...day,
			expenses: Math.round(day.expenses * 100) / 100,
		}));
	}, [transactions, formatDate]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("dashboard.weeklyExpenses")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-48 w-full">
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
							<Bar
								dataKey="expenses"
								name={t("transactions.summary.expenses")}
								fill="hsl(var(--primary))"
								barSize={16}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
