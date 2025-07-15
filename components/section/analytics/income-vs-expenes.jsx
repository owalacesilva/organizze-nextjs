"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Updated with a full year of data
const monthlyData = [
	{ month: "Jan", income: 3200, expenses: 2400, savings: 800, savingsRate: 25 },
	{ month: "Feb", income: 3400, expenses: 1800, savings: 1600, savingsRate: 47 },
	{ month: "Mar", income: 3600, expenses: 2200, savings: 1400, savingsRate: 39 },
	{ month: "Apr", income: 3800, expenses: 2600, savings: 1200, savingsRate: 32 },
	{ month: "May", income: 4000, expenses: 2900, savings: 1100, savingsRate: 28 },
	{ month: "Jun", income: 4200, expenses: 3100, savings: 1100, savingsRate: 26 },
	{ month: "Jul", income: 4300, expenses: 3400, savings: 900, savingsRate: 21 },
	{ month: "Aug", income: 4100, expenses: 3200, savings: 900, savingsRate: 22 },
	{ month: "Sep", income: 4200, expenses: 2700, savings: 1500, savingsRate: 36 },
	{ month: "Oct", income: 4400, expenses: 2500, savings: 1900, savingsRate: 43 },
	{ month: "Nov", income: 4300, expenses: 2800, savings: 1500, savingsRate: 35 },
	{ month: "Dec", income: 5000, expenses: 3800, savings: 1200, savingsRate: 24 },
]

// Calculate totals and averages
const totals = monthlyData.reduce(
	(acc, curr) => {
		acc.income += curr.income
		acc.expenses += curr.expenses
		acc.savings += curr.savings
		return acc
	},
	{ income: 0, expenses: 0, savings: 0 },
)

const averages = {
	income: Math.round(totals.income / monthlyData.length),
	expenses: Math.round(totals.expenses / monthlyData.length),
	savings: Math.round(totals.savings / monthlyData.length),
	savingsRate: Math.round((totals.savings / totals.income) * 100),
}

export const IncomeVsExpenses = () => {
	// Format currency
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value)
	}

	// Format percentage
	const formatPercentage = (value) => {
		return `${value}%`
	}

	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Income vs Expenses Chart - Full Width */}
			<Card>
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Income vs Expenses</CardTitle>
					<CardDescription className="text-xs sm:text-sm">Monthly comparison throughout the year</CardDescription>
				</CardHeader>
				<CardContent className="pt-0 p-2 sm:p-6">
					<div className="h-[250px] sm:h-[300px] md:h-[350px] w-full">
						<ChartContainer
							config={{
								income: {
									label: "Income",
									color: "hsl(143, 85%, 40%)", // Vibrant green for income
								},
								expenses: {
									label: "Expenses",
									color: "hsl(346, 87%, 60%)", // Vibrant pink for expenses
								},
							}}
							className="h-full w-full"
						>
							<BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
									tickFormatter={(value) => `$${value}`}
									width={35}
								/>
								<Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
								<Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
								<ChartTooltip content={<ChartTooltipContent />} cursor={false} />
							</BarChart>
						</ChartContainer>
					</div>
				</CardContent>
			</Card>

			{/* Monthly Savings Chart */}
			<Card>
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Monthly Savings</CardTitle>
					<CardDescription className="text-xs sm:text-sm">Difference between income and expenses</CardDescription>
				</CardHeader>
				<CardContent className="pt-0 p-2 sm:p-6">
					<div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
									tickFormatter={(value) => `$${value}`}
									width={35}
								/>
								<Tooltip
									formatter={(value) => [formatCurrency(value), "Amount"]}
									contentStyle={{
										borderRadius: "0.375rem",
										border: "1px solid hsl(var(--border))",
										backgroundColor: "hsl(var(--background))",
										fontSize: "12px",
										padding: "8px",
									}}
									cursor={false}
								/>
								<Line
									type="monotone"
									dataKey="savings"
									stroke="hsl(250, 85%, 60%)" // Rich purple for savings line
									strokeWidth={2} // Slightly thinner on mobile
									dot={{ fill: "hsl(250, 85%, 60%)", r: 3, strokeWidth: 0 }}
									activeDot={{ r: 5, fill: "hsl(250, 85%, 60%)", strokeWidth: 0 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Financial Summary Table */}
			<Card>
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Financial Summary</CardTitle>
					<CardDescription className="text-xs sm:text-sm">
						Detailed monthly income, expenses, and savings
					</CardDescription>
				</CardHeader>
				<CardContent className="p-0 sm:p-6 pt-0">
					<div className="overflow-x-auto -mx-4 sm:mx-0">
						<div className="inline-block min-w-full align-middle px-4 sm:px-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="text-xs sm:text-sm">Month</TableHead>
										<TableHead className="text-right text-xs sm:text-sm">Income</TableHead>
										<TableHead className="text-right text-xs sm:text-sm">Expenses</TableHead>
										<TableHead className="text-right text-xs sm:text-sm">Savings</TableHead>
										<TableHead className="text-right text-xs sm:text-sm hidden sm:table-cell">Savings Rate</TableHead>
										<TableHead className="text-right text-xs sm:text-sm hidden sm:table-cell">Monthly Change</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{monthlyData.map((item, index) => {
										// Calculate month-over-month change for savings
										const prevSavings = index > 0 ? monthlyData[index - 1].savings : item.savings
										const savingsChange = item.savings - prevSavings
										const savingsChangePercent = prevSavings !== 0 ? Math.round((savingsChange / prevSavings) * 100) : 0

										return (
											<TableRow key={index}>
												<TableCell className="py-2 sm:py-4 text-xs sm:text-sm">{item.month}</TableCell>
												<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
													{formatCurrency(item.income)}
												</TableCell>
												<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
													{formatCurrency(item.expenses)}
												</TableCell>
												<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
													{formatCurrency(item.savings)}
												</TableCell>
												<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">
													{formatPercentage(item.savingsRate)}
												</TableCell>
												<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">
													<div className="flex items-center justify-end gap-1">
														{index > 0 && (
															<>
																{savingsChange > 0 ? (
																	<ArrowUpIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
																) : savingsChange < 0 ? (
																	<ArrowDownIcon className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
																) : (
																	<span className="h-3 w-3 sm:h-4 sm:w-4">—</span>
																)}
																<span
																	className={
																		savingsChange > 0 ? "text-green-500" : savingsChange < 0 ? "text-red-500" : ""
																	}
																>
																	{savingsChangePercent !== 0 ? `${savingsChangePercent}%` : "0%"}
																</span>
															</>
														)}
														{index === 0 && "—"}
													</div>
												</TableCell>
											</TableRow>
										)
									})}
									{/* Summary row */}
									<TableRow className="font-medium bg-muted/50">
										<TableCell className="py-2 sm:py-4 text-xs sm:text-sm">Average</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
											{formatCurrency(averages.income)}
										</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
											{formatCurrency(averages.expenses)}
										</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
											{formatCurrency(averages.savings)}
										</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">
											{formatPercentage(averages.savingsRate)}
										</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">—</TableCell>
									</TableRow>
									<TableRow className="font-medium">
										<TableCell className="py-2 sm:py-4 text-xs sm:text-sm">Total</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
											{formatCurrency(totals.income)}
										</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
											{formatCurrency(totals.expenses)}
										</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm">
											{formatCurrency(totals.savings)}
										</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">—</TableCell>
										<TableCell className="py-2 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">—</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

