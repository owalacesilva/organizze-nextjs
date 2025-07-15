"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Car, Carrot, GraduationCap, Plus, Shirt } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const budgets = [
	{
		id: "food",
		name: "Food & Dining",
		amount: 850.0,
		spent: 650.75,
		icon: Carrot,
		period: "Overtime",
		iconBg: "bg-indigo-100",
		iconColor: "text-indigo-600",
	},
	{
		id: "shopping",
		name: "Shopping",
		amount: 500.0,
		spent: 320.5,
		icon: Shirt,
		period: "Week",
		iconBg: "bg-emerald-100",
		iconColor: "text-emerald-600",
	},
	{
		id: "transportation",
		name: "Transportation",
		amount: 300.0,
		spent: 150.25,
		icon: Car,
		period: "Month",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		id: "entertainment",
		name: "Entertainment",
		amount: 200.0,
		spent: 175.5,
		icon: GraduationCap,
		period: "Day",
		iconBg: "bg-amber-100",
		iconColor: "text-amber-600",
	},
]

const spendingTrend = [
	{ month: "Jan", amount: 50 },
	{ month: "Feb", amount: 100 },
	{ month: "Mar", amount: 95 },
	{ month: "Apr", amount: 150 },
	{ month: "May", amount: 140 },
	{ month: "Jun", amount: 200 },
	{ month: "Jul", amount: 120 },
	{ month: "Aug", amount: 100 },
	{ month: "Sep", amount: 150 },
	{ month: "Oct", amount: 140 },
	{ month: "Nov", amount: 200 },
	{ month: "Dec", amount: 320 },
]

function BudgetCard({ budget, isActive = false }) {
	const percentage = (budget.spent / budget.amount) * 100
	const Icon = budget.icon

	return (
		<Card
			className={cn(
				"transition-all hover:border-primary/50 cursor-pointer flex-shrink-0",
				isActive && "border-primary/50",
				"w-[260px] sm:w-full"
			)}
		>
			<CardContent className="p-4 sm:p-6">
				<div className="flex items-center gap-3 sm:gap-4">
					<div className={cn("p-2 sm:p-3 rounded-xl", budget.iconBg)}>
						<Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", budget.iconColor)} />
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<div>
								<div className="font-medium text-sm sm:text-base">{budget.name}</div>
								<div className="text-xs sm:text-sm text-muted-foreground">${budget.amount}</div>
							</div>
							<div className="text-xs sm:text-sm text-muted-foreground">{budget.period}</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

function BudgetDetails({ budget }) {
	const percentage = (budget.spent / budget.amount) * 100
	const remaining = budget.amount - budget.spent
	const lastMonth = 820.5
	const savings = lastMonth - budget.spent

	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="bg-card p-4 sm:p-6 rounded-lg">
				<h2 className="text-xl sm:text-2xl font-bold">{budget.name}</h2>
			</div>

			<Card>
				<CardContent className="pt-4 sm:pt-6">
					<div className="space-y-3 sm:space-y-4">
						<div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
							<div>Spend</div>
							<div>Budget</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-lg sm:text-2xl font-bold">${budget.spent}</div>
							<div className="text-lg sm:text-2xl font-bold">${budget.amount}</div>
						</div>
						<Progress value={percentage} className="h-2" />
						<div className="flex items-center justify-between text-xs sm:text-sm">
							<div className="text-indigo-600">{percentage.toFixed(0)}%</div>
							<div className="text-muted-foreground">{(100 - percentage).toFixed(0)}%</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="space-y-1">
							<div className="text-xs sm:text-sm text-muted-foreground">Last Month</div>
							<div className="text-lg sm:text-2xl font-bold">${lastMonth}</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="space-y-1">
							<div className="text-xs sm:text-sm text-muted-foreground">Expenses</div>
							<div className="text-lg sm:text-2xl font-bold">${budget.spent}</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="space-y-1">
							<div className="text-xs sm:text-sm text-muted-foreground">Savings</div>
							<div className="text-lg sm:text-2xl font-bold">${savings.toFixed(2)}</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="pb-2 pt-4 px-4 sm:pb-4 sm:pt-6 sm:px-6">
					<CardTitle className="text-base sm:text-lg">Monthly Spending Trend</CardTitle>
				</CardHeader>
				<CardContent className="px-2 sm:px-6">
					<div className="h-[200px] sm:h-[250px] md:h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={spendingTrend}
								margin={{
									top: 5,
									right: 10,
									left: 10,
									bottom: 0,
								}}
							>
								<defs>
									<linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
										<stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tick={{ fontSize: 10, fill: "#6B7280" }}
									dy={10}
									interval="preserveStartEnd"
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tick={{ fontSize: 10, fill: "#6B7280" }}
									dx={-10}
									width={30}
								/>
								<Tooltip
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											return (
												<div className="rounded-lg border bg-background p-2 shadow-sm">
													<div className="grid grid-cols-2 gap-2">
														<div className="flex flex-col">
															<span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
															<span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
														</div>
														<div className="flex flex-col">
															<span className="text-[0.70rem] uppercase text-muted-foreground">Amount</span>
															<span className="font-bold">${payload[0].value}</span>
														</div>
													</div>
												</div>
											)
										}
										return null
									}}
								/>
								<Area type="monotone" dataKey="amount" stroke="#4F46E5" strokeWidth={2} fill="url(#colorSpending)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export function Budgets() {
	return (
		<div className="space-y-6">
			{/* Budget cards - horizontal scrolling on mobile, vertical on desktop */}
			<div className="lg:hidden overflow-x-auto pb-2">
				<div className="flex gap-4">
					{budgets.map((budget) => (
						<BudgetCard key={budget.id} budget={budget} isActive={budget.id === "food"} />
					))}
					<Button className="flex-shrink-0 w-[260px] h-[72px] sm:h-auto">
						<Plus className="mr-2 h-4 w-4" />
						Add new budget
					</Button>
				</div>
			</div>

			{/* Desktop layout */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
				{/* Sidebar - hidden on mobile, shown on desktop */}
				<div className="hidden lg:block lg:col-span-3 space-y-4">
					{budgets.map((budget) => (
						<BudgetCard key={budget.id} budget={budget} isActive={budget.id === "food"} />
					))}
					<Button className="w-full">
						<Plus className="mr-2 h-4 w-4" />
						Add new budget
					</Button>
				</div>

				{/* Budget details */}
				<div className="lg:col-span-9">
					<BudgetDetails budget={budgets[0]} />
				</div>
			</div>
		</div>
	)
}
