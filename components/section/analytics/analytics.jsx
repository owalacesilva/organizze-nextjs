"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileBarChart2, FileText, PieChart, TrendingUp } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Updated financial data for the charts
const financialData = [
	{ month: "Jan", income: 4200, expenses: 3400, savings: 800 },
	{ month: "Feb", income: 4800, expenses: 3900, savings: 900 },
	{ month: "Mar", income: 5200, expenses: 4100, savings: 1100 },
	{ month: "Apr", income: 5600, expenses: 4300, savings: 1300 },
	{ month: "May", income: 6200, expenses: 4800, savings: 1400 },
	{ month: "Jun", income: 6800, expenses: 5200, savings: 1600 },
]

// Updated metrics with more relevant financial information and different icon background colors
const metrics = [
	{
		title: "Monthly Income",
		value: "$6,840.50",
		icon: TrendingUp,
		iconBg: "bg-emerald-600", // Green for income/growth
	},
	{
		title: "Monthly Expenses",
		value: "$4,385.75",
		icon: FileText,
		iconBg: "bg-rose-600", // Red for expenses/costs
	},
	{
		title: "Total Savings",
		value: "$2,454.75",
		icon: FileBarChart2,
		iconBg: "bg-amber-500", // Gold/amber for savings
	},
	{
		title: "Active Categories",
		value: "12",
		icon: PieChart,
		iconBg: "bg-indigo-600", // Purple for categories/organization
	},
]

// Updated expense categories with more descriptive names
const monthlyExpenses = [
	{ month: "Jan", housing: 15, food: 20, transportation: 12 },
	{ month: "Feb", housing: 20, food: 15, transportation: 15 },
	{ month: "Mar", housing: 25, food: 18, transportation: 20 },
	{ month: "Apr", housing: 18, food: 22, transportation: 16 },
	{ month: "May", housing: 22, food: 19, transportation: 18 },
	{ month: "Jun", housing: 15, food: 15, transportation: 15 },
	{ month: "Jul", housing: 20, food: 25, transportation: 18 },
	{ month: "Aug", housing: 28, food: 20, transportation: 22 },
	{ month: "Sep", housing: 24, food: 18, transportation: 20 },
	{ month: "Oct", housing: 19, food: 23, transportation: 17 },
	{ month: "Nov", housing: 26, food: 22, transportation: 19 },
	{ month: "Dec", housing: 30, food: 25, transportation: 22 },
]

function MetricCard({ metric }) {
	const Icon = metric.icon

	return (
		<Card>
			<CardContent className="p-4 sm:p-6">
				<div className="flex items-center gap-3 sm:gap-4">
					<div className={`${metric.iconBg} p-2 sm:p-3 rounded-full text-primary-foreground`}>
						<Icon className="h-4 w-4 sm:h-5 sm:w-5" />
					</div>
					<div>
						<p className="text-xs sm:text-sm text-muted-foreground">{metric.title}</p>
						<p className="text-lg sm:text-xl md:text-2xl font-bold">{metric.value}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

// Define attractive chart colors
const chartColors = {
	housing: "#4f46e5", // indigo
	food: "#06b6d4", // cyan
	transportation: "#8b5cf6", // violet
	income: "#10b981", // emerald
	expenses: "#f43f5e", // rose
	savings: "#f59e0b", // amber
}

export function Analytics() {
	// Function to get appropriate chart height based on screen size
	const getResponsiveChartHeight = (mobile, tablet, desktop) => {
		return {
			height: "100%",
			minHeight: mobile,
			className: `h-[${mobile}px] sm:h-[${tablet}px] md:h-[${desktop}px]`,
		}
	}

	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				{metrics.map((metric) => (
					<MetricCard key={metric.title} metric={metric} />
				))}
			</div>

			<Card>
				<CardContent className="pt-4 sm:pt-6 p-2 sm:p-6">
					<div className="space-y-3 sm:space-y-4">
						<h3 className="text-base sm:text-lg font-semibold px-2 sm:px-0">Monthly Expense Categories</h3>
						<div className="h-[250px] sm:h-[300px] md:h-[400px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={monthlyExpenses} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
									<XAxis
										dataKey="month"
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
										interval="preserveStartEnd"
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
										domain={[0, 80]}
										ticks={[0, 20, 40, 60, 80]}
										width={25}
									/>
									<Tooltip
										cursor={false}
										content={({ active, payload }) => {
											if (active && payload && payload.length) {
												return (
													<div className="rounded-lg border bg-background p-2 shadow-sm">
														<div className="grid gap-2">
															<div className="flex items-center justify-between gap-2">
																<div className="flex items-center gap-1">
																	<div
																		className="h-2 w-2 sm:h-3 sm:w-3 rounded-full"
																		style={{ backgroundColor: chartColors.housing }}
																	></div>
																	<span className="text-[0.65rem] sm:text-[0.70rem] uppercase text-muted-foreground">
																		Housing
																	</span>
																</div>
																<span className="text-xs sm:text-sm font-bold">${payload[0].value * 100}</span>
															</div>
															<div className="flex items-center justify-between gap-2">
																<div className="flex items-center gap-1">
																	<div
																		className="h-2 w-2 sm:h-3 sm:w-3 rounded-full"
																		style={{ backgroundColor: chartColors.food }}
																	></div>
																	<span className="text-[0.65rem] sm:text-[0.70rem] uppercase text-muted-foreground">
																		Food
																	</span>
																</div>
																<span className="text-xs sm:text-sm font-bold">${payload[1].value * 100}</span>
															</div>
															<div className="flex items-center justify-between gap-2">
																<div className="flex items-center gap-1">
																	<div
																		className="h-2 w-2 sm:h-3 sm:w-3 rounded-full"
																		style={{ backgroundColor: chartColors.transportation }}
																	></div>
																	<span className="text-[0.65rem] sm:text-[0.70rem] uppercase text-muted-foreground">
																		Transport
																	</span>
																</div>
																<span className="text-xs sm:text-sm font-bold">${payload[2].value * 100}</span>
															</div>
														</div>
													</div>
												)
											}
											return null
										}}
									/>
									<Bar dataKey="housing" stackId="stack" fill={chartColors.housing} radius={[4, 4, 0, 0]} />
									<Bar dataKey="food" stackId="stack" fill={chartColors.food} radius={[4, 4, 0, 0]} />
									<Bar
										dataKey="transportation"
										stackId="stack"
										fill={chartColors.transportation}
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
				<Card>
					<CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
						<CardTitle className="text-base sm:text-lg">Income vs Expenses</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Monthly financial overview</CardDescription>
					</CardHeader>
					<CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
						<div className="h-[200px] sm:h-[250px] md:h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={financialData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
									<XAxis
										dataKey="month"
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
										width={35}
									/>
									<Tooltip
										cursor={false}
										content={({ active, payload, label }) => {
											if (active && payload && payload.length) {
												return (
													<div className="rounded-lg border bg-background p-2 shadow-sm">
														<div className="grid gap-2">
															<div className="text-xs sm:text-sm font-medium">{label}</div>
															<div className="flex items-center justify-between gap-2">
																<div className="flex items-center gap-1">
																	<div
																		className="h-2 w-2 sm:h-3 sm:w-3 rounded-full"
																		style={{ backgroundColor: chartColors.income }}
																	></div>
																	<span className="text-[0.65rem] sm:text-[0.70rem] uppercase text-muted-foreground">
																		Income
																	</span>
																</div>
																<span className="text-xs sm:text-sm font-bold">${payload[0].value}</span>
															</div>
															<div className="flex items-center justify-between gap-2">
																<div className="flex items-center gap-1">
																	<div
																		className="h-2 w-2 sm:h-3 sm:w-3 rounded-full"
																		style={{ backgroundColor: chartColors.expenses }}
																	></div>
																	<span className="text-[0.65rem] sm:text-[0.70rem] uppercase text-muted-foreground">
																		Expenses
																	</span>
																</div>
																<span className="text-xs sm:text-sm font-bold">${payload[1].value}</span>
															</div>
														</div>
													</div>
												)
											}
											return null
										}}
									/>
									<Bar dataKey="income" fill={chartColors.income} radius={[4, 4, 0, 0]} />
									<Bar dataKey="expenses" fill={chartColors.expenses} radius={[4, 4, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="p-4 pb-2 sm:p-6 sm:pb-4">
						<CardTitle className="text-base sm:text-lg">Monthly Savings</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Trend of savings over time</CardDescription>
					</CardHeader>
					<CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
						<div className="h-[200px] sm:h-[250px] md:h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={financialData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
									<XAxis
										dataKey="month"
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
									/>
									<YAxis
										tickLine={false}
										axisLine={false}
										tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
										width={35}
									/>
									<Tooltip
										cursor={false}
										content={({ active, payload, label }) => {
											if (active && payload && payload.length) {
												return (
													<div className="rounded-lg border bg-background p-2 shadow-sm">
														<div className="grid gap-2">
															<div className="text-xs sm:text-sm font-medium">{label}</div>
															<div className="flex items-center justify-between gap-2">
																<div className="flex items-center gap-1">
																	<div
																		className="h-2 w-2 sm:h-3 sm:w-3 rounded-full"
																		style={{ backgroundColor: chartColors.savings }}
																	></div>
																	<span className="text-[0.65rem] sm:text-[0.70rem] uppercase text-muted-foreground">
																		Savings
																	</span>
																</div>
																<span className="text-xs sm:text-sm font-bold">${payload[0].value}</span>
															</div>
														</div>
													</div>
												)
											}
											return null
										}}
									/>
									<Line
										type="monotone"
										dataKey="savings"
										stroke={chartColors.savings}
										strokeWidth={2}
										dot={{ fill: chartColors.savings, r: 4, strokeWidth: 0 }}
										activeDot={{ r: 6, fill: chartColors.savings, strokeWidth: 0 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

