import { BalanceTrends } from "./balance-trends"
import { ExpensesBreakdown } from "./expenses-breakdown"
import { IncomeExpensesChart } from "./income-expenses-chart"
import { MetricCard } from "./metric-card"
import { MonthlyBudgets } from "./monthly-budgets"
import { PaymentsHistory } from "./payments-history"
import { SavingGoals } from "./saving-goals"
import { TransactionHistory } from "./transaction-history"
import { WeeklyExpenses } from "./weekly-expenses"

export default function DashboardSection() {
	return (
		<>
			<div className="space-y-4 sm:space-y-5">
				{/* Metric cards - stack on mobile, 2 columns on md, 4 columns on lg */}
				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					<MetricCard title="Total Balance" value="$432,568" change={3.12} lastMonth="$28,940" />
					<MetricCard title="Total Period Change" value="$245,860" change={1.98} lastMonth="$21,230" />
					<MetricCard title="Total Period Expenses" value="$2,530" change={-4.78} lastMonth="$26,340" />
					<MetricCard title="Total Period Income" value="$24,560" change={2.84} lastMonth="$23,890" />
				</div>

				{/* Balance Trends and Expenses Breakdown - stack on mobile and tablet, side by side on desktop */}
				<div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
					<div className="lg:col-span-3">
						<BalanceTrends />
					</div>
					<div className="lg:col-span-1">
						<ExpensesBreakdown />
					</div>
				</div>

				{/* Monthly Budgets and Income Expenses Chart - stack on mobile and tablet, side by side on desktop */}
				<div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
					<div className="lg:col-span-1">
						<MonthlyBudgets />
					</div>
					<div className="lg:col-span-3">
						<IncomeExpensesChart />
					</div>
				</div>

				{/* Weekly Expenses and Payments History - stack on mobile and tablet, side by side on desktop */}
				<div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
					<div className="lg:col-span-3">
						<WeeklyExpenses />
					</div>
					<div className="lg:col-span-1">
						<PaymentsHistory />
					</div>
				</div>

				{/* Saving Goals and Transaction History - stack on mobile and tablet, side by side on desktop */}
				<div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
					<div className="lg:col-span-1">
						<SavingGoals />
					</div>
					<div className="lg:col-span-3">
						<TransactionHistory />
					</div>
				</div>
			</div>
		</>
	)
}

