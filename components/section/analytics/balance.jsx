"use client";

import { useGetWallets } from "@/app/api/wallets/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Scale, TrendingDown, TrendingUp } from "lucide-react";
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
import { StatCard } from "./stat-card";
import { useAnalyticsData } from "./use-analytics-data";

export function Balance() {
	const { t, formatCurrency, formatDate } = useTranslation();
	const { months, totals } = useAnalyticsData();
	const walletsQuery = useGetWallets();

	const currentBalance = (walletsQuery.data?.wallets ?? []).reduce(
		(total, wallet) => total + wallet.balance,
		0,
	);

	const series = useMemo(() => {
		const net = months.map((month) => month.income - month.expenses);
		const balances = [];
		let running = currentBalance;

		for (let index = net.length - 1; index >= 0; index--) {
			balances[index] = Math.round(running * 100) / 100;
			running -= net[index];
		}

		return months.map((month, index) => ({
			label: formatDate(month.date, { month: "short" }),
			balance: balances[index],
		}));
	}, [months, currentBalance, formatDate]);

	return (
		<div className="space-y-3">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<StatCard
					label={t("wallets.totalBalance")}
					value={formatCurrency(currentBalance)}
					icon={Scale}
				/>
				<StatCard
					label={t("analytics.totalIncome")}
					value={formatCurrency(totals.income)}
					icon={TrendingUp}
					tone="positive"
				/>
				<StatCard
					label={t("analytics.totalExpenses")}
					value={formatCurrency(totals.expenses)}
					icon={TrendingDown}
					tone="negative"
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("analytics.balanceEvolution")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-72">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={series}
								margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
							>
								<defs>
									<linearGradient
										id="analyticsBalance"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
									>
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
									fill="url(#analyticsBalance)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default Balance;
