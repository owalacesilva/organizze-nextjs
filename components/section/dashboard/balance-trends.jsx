"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { monthlyTotals } from "@/lib/transactions";
import { useMemo } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useDashboardData } from "./use-dashboard-data";

/** Running balance across the last six months, rebuilt from the statement. */
export function BalanceTrends() {
	const { t, formatCurrency, formatDate } = useTranslation();
	const { transactions, totalBalance } = useDashboardData();

	const data = useMemo(() => {
		const months = monthlyTotals(transactions, 6);
		const net = months.map((month) => month.income - month.expenses);

		// Walk backwards from today's balance so the last point matches the wallets.
		const balances = [];
		let running = totalBalance;
		for (let index = net.length - 1; index >= 0; index--) {
			balances[index] = Math.round(running * 100) / 100;
			running -= net[index];
		}

		return months.map((month, index) => ({
			label: formatDate(month.date, { month: "short" }),
			balance: balances[index],
		}));
	}, [transactions, totalBalance, formatDate]);

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0">
				<CardTitle>{t("dashboard.balanceTrends")}</CardTitle>
				<span className="text-sm font-semibold tabular-nums text-primary">
					{formatCurrency(totalBalance)}
				</span>
			</CardHeader>
			<CardContent>
				<div className="h-64 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={data}
							margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
						>
							<defs>
								<linearGradient id="balanceTrend" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0.3}
									/>
									<stop
										offset="95%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
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
							<Area
								type="monotone"
								dataKey="balance"
								name={t("transactions.summary.balance")}
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								fill="url(#balanceTrend)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
