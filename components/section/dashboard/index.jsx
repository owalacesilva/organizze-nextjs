"use client";

import { TopExpenses } from "@/components/elements/top-expenses";
import { DashboardSkeleton } from "@/components/section/dashboard/skeleton";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { AlertCircle } from "lucide-react";
import { useMemo } from "react";
import { BalanceTrends } from "./balance-trends";
import { ExpensesBreakdown } from "./expenses-breakdown";
import { IncomeExpensesChart } from "./income-expenses-chart";
import { LaunchpadQuest } from "./launchpad-quest";
import { MetricCard } from "./metric-card";
import { MonthlyBudgets } from "./monthly-budgets";
import { SavingGoals } from "./saving-goals";
import { StreakCard } from "./streak-card";
import { TransactionHistory } from "./transaction-history";
import {
	comparePeriods,
	percentChange,
	useDashboardData,
} from "./use-dashboard-data";
import { WeeklyExpenses } from "./weekly-expenses";

export default function DashboardSection() {
	const { t, formatCurrency } = useTranslation();
	const { transactions, totalBalance, isPending, isError } = useDashboardData();

	const metrics = useMemo(() => {
		const { current, previous } = comparePeriods(transactions);

		return {
			income: {
				value: current.income,
				change: percentChange(current.income, previous.income),
			},
			expenses: {
				value: current.expenses,
				change: percentChange(current.expenses, previous.expenses),
			},
			net: {
				value: current.net,
				change: percentChange(current.net, previous.net),
			},
		};
	}, [transactions]);

	if (isPending) {
		return (
			<div role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<DashboardSkeleton />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center gap-3 py-10 text-center">
				<AlertCircle className="h-6 w-6 text-destructive" />
				<p className="text-sm font-medium">{t("transactions.loadError")}</p>
				<Button variant="outline" onClick={() => window.location.reload()}>
					{t("common.retry")}
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-2 sm:space-y-3">
			<p className="text-[11px] uppercase tracking-wide text-muted-foreground">
				{t("dashboard.periodLabel")}
			</p>

			<LaunchpadQuest />

			{/* Five across once there is room: the streak earns a place beside the
			    headline figures, but not at the cost of one of them. */}
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				<StreakCard />
				<MetricCard
					title={t("dashboard.totalBalance")}
					value={formatCurrency(totalBalance)}
					change={metrics.net.change}
				/>
				<MetricCard
					title={t("dashboard.periodIncome")}
					value={formatCurrency(metrics.income.value)}
					change={metrics.income.change}
				/>
				<MetricCard
					title={t("dashboard.periodExpenses")}
					value={formatCurrency(metrics.expenses.value)}
					change={metrics.expenses.change}
					inverted
				/>
				<MetricCard
					title={t("dashboard.periodChange")}
					value={formatCurrency(metrics.net.value)}
					change={metrics.net.change}
				/>
			</div>

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
				<div className="lg:col-span-3">
					<BalanceTrends />
				</div>
				<div className="lg:col-span-1">
					<ExpensesBreakdown />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
				<div className="lg:col-span-1">
					<MonthlyBudgets />
				</div>
				<div className="lg:col-span-3">
					<IncomeExpensesChart />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
				<div className="lg:col-span-3">
					<WeeklyExpenses />
				</div>
				<div className="lg:col-span-1">
					<SavingGoals />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
				<TopExpenses
					transactions={transactions}
					className="lg:col-span-1"
					limit={5}
				/>
				<div className="lg:col-span-3">
					<TransactionHistory />
				</div>
			</div>
		</div>
	);
}
