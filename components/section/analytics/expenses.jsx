"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Updated monthly data for a full year
const monthlyData = [
	{ month: "Jan", amount: 2400 },
	{ month: "Feb", amount: 1800 },
	{ month: "Mar", amount: 2200 },
	{ month: "Apr", amount: 2600 },
	{ month: "May", amount: 2900 },
	{ month: "Jun", amount: 3100 },
	{ month: "Jul", amount: 3400 }, // Summer vacation expenses
	{ month: "Aug", amount: 3200 }, // Back to school shopping
	{ month: "Sep", amount: 2700 }, // Fall season begins
	{ month: "Oct", amount: 2500 }, // Halloween expenses
	{ month: "Nov", amount: 2800 }, // Thanksgiving expenses
	{ month: "Dec", amount: 3800 }, // Holiday shopping season
]

// Calculate the total value for percentage calculation
const calculateExpensesData = () => {
	// Define expense categories with realistic values
	const rawData = [
		{ name: "Food", value: 1200 },
		{ name: "Transport", value: 800 },
		{ name: "Healthcare", value: 600 },
		{ name: "Education", value: 450 },
		{ name: "Clothes", value: 350 },
		{ name: "Pets", value: 250 },
		{ name: "Entertainment", value: 450 },
	]

	// Calculate total
	const total = rawData.reduce((sum, item) => sum + item.value, 0)

	// Calculate percentages and add colors
	return rawData.map((item, index) => ({
		...item,
		percentage: Math.round((item.value / total) * 100),
	}))
}

const expensesData = calculateExpensesData()

// Theme-consistent colors for the pie chart
const COLORS = [
	"hsl(var(--primary))",
	"hsl(var(--primary) / 0.8)",
	"hsl(var(--primary) / 0.6)",
	"hsl(var(--primary) / 0.4)",
	"hsl(217, 91%, 60%)", // blue-500
	"hsl(214, 95%, 70%)", // blue-400
	"hsl(213, 97%, 80%)", // blue-300
]

export const Expenses = () => {
	// Format currency
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value)
	}

	return (
		<div className="grid gap-4 sm:gap-6">
			<Card className="border shadow-sm">
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg font-semibold">Expenses Breakdown</CardTitle>
					<CardDescription className="text-xs sm:text-sm">
						Distribution of expenses across different categories
					</CardDescription>
				</CardHeader>
				<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:w-1/2 h-[250px] sm:h-[300px] flex items-center justify-center">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={expensesData}
										dataKey="value"
										nameKey="name"
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={80}
										paddingAngle={2}
										label={({ name, percentage }) => {
											// On small screens, only show percentage
											const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0
											return screenWidth < 640 ? `${percentage}%` : `${name}: ${percentage}%`
										}}
										labelLine={false}
									>
										{expensesData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip
										formatter={(value) => [formatCurrency(value), "Amount"]}
										contentStyle={{
											borderRadius: "0.375rem",
											border: "1px solid hsl(var(--border))",
											backgroundColor: "hsl(var(--background))",
											fontSize: "12px",
											padding: "8px",
										}}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
						<div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4 lg:pl-6">
							<div className="space-y-1 mb-3 sm:mb-4">
								<h4 className="text-xs sm:text-sm font-medium">Category Breakdown</h4>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Total: {formatCurrency(expensesData.reduce((sum, item) => sum + item.value, 0))}
								</p>
							</div>
							<div className="space-y-1 sm:space-y-2 max-h-[200px] sm:max-h-none overflow-y-auto pr-1">
								{expensesData.map((item, index) => (
									<div key={index} className="flex justify-between items-center py-1.5 sm:py-2 border-b">
										<div className="flex items-center">
											<div
												className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1.5 sm:mr-2"
												style={{ backgroundColor: COLORS[index % COLORS.length] }}
											></div>
											<span className="text-xs sm:text-sm">{item.name}</span>
										</div>
										<div className="flex items-center">
											<span className="text-xs sm:text-sm font-medium mr-2 sm:mr-4">{formatCurrency(item.value)}</span>
											<span className="text-xs sm:text-sm text-muted-foreground w-8 sm:w-10 text-right">
												{item.percentage}%
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Monthly Expenses</CardTitle>
					<CardDescription className="text-xs sm:text-sm">Expense trends throughout the year</CardDescription>
				</CardHeader>
				<CardContent className="p-0 sm:p-6 pt-0 h-[250px] sm:h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
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
								cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
							/>
							<Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	)
}

