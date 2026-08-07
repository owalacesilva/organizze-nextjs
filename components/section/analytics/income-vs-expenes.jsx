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
import { cn } from "@/lib/utils";
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
import { useAnalyticsData } from "./use-analytics-data";

export function IncomeVsExpenses() {
	const { t, formatCurrency, formatDate } = useTranslation();
	const { months } = useAnalyticsData();

	const rows = useMemo(
		() =>
			months.map((month) => ({
				key: month.key,
				label: formatDate(month.date, { month: "short", year: "numeric" }),
				short: formatDate(month.date, { month: "short" }),
				income: Math.round(month.income * 100) / 100,
				expenses: Math.round(month.expenses * 100) / 100,
				balance: Math.round((month.income - month.expenses) * 100) / 100,
			})),
		[months, formatDate],
	);

	return (
		<div className="space-y-3">
			<Card>
				<CardHeader>
					<CardTitle>{t("analytics.tabs.incomeVsExpenses")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-72">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={rows}
								margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									vertical={false}
									className="stroke-border"
								/>
								<XAxis
									dataKey="short"
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
									fill="hsl(var(--success))"
									barSize={12}
								/>
								<Bar
									dataKey="expenses"
									name={t("transactions.summary.expenses")}
									fill="hsl(var(--destructive))"
									barSize={12}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("analytics.byMonth")}</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="pl-3">
									{t("transactions.periods.label")}
								</TableHead>
								<TableHead className="text-right">
									{t("transactions.summary.income")}
								</TableHead>
								<TableHead className="text-right">
									{t("transactions.summary.expenses")}
								</TableHead>
								<TableHead className="pr-3 text-right">
									{t("transactions.summary.balance")}
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.key}>
									<TableCell className="pl-3 capitalize">{row.label}</TableCell>
									<TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
										{formatCurrency(row.income)}
									</TableCell>
									<TableCell className="text-right tabular-nums text-red-600 dark:text-red-400">
										{formatCurrency(row.expenses)}
									</TableCell>
									<TableCell
										className={cn(
											"pr-3 text-right font-medium tabular-nums",
											row.balance < 0
												? "text-red-600 dark:text-red-400"
												: "text-emerald-600 dark:text-emerald-400",
										)}
									>
										{formatCurrency(row.balance)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}

export default IncomeVsExpenses;
