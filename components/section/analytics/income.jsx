"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Updated monthly data for a full year
const monthlyData = [
	{ month: "Jan", amount: 3200 },
	{ month: "Feb", amount: 3400 },
	{ month: "Mar", amount: 3600 },
	{ month: "Apr", amount: 3800 },
	{ month: "May", amount: 4000 },
	{ month: "Jun", amount: 4200 },
	{ month: "Jul", amount: 4300 }, // Summer bonus
	{ month: "Aug", amount: 4100 }, // Slight decrease
	{ month: "Sep", amount: 4200 }, // Back to normal
	{ month: "Oct", amount: 4400 }, // Q4 bonus
	{ month: "Nov", amount: 4300 }, // Consistent income
	{ month: "Dec", amount: 5000 }, // Year-end bonus
]

// Income sources data
const sourceData = [
	{ name: "Salary", value: 3500, color: "hsl(var(--primary))" },
	{ name: "Investments", value: 800, color: "hsl(var(--primary)/0.8)" },
	{ name: "Freelance", value: 600, color: "hsl(var(--primary)/0.6)" },
	{ name: "Rental", value: 400, color: "hsl(var(--primary)/0.4)" },
	{ name: "Other", value: 200, color: "hsl(var(--primary)/0.2)" },
]

// Calculate total income
const totalIncome = sourceData.reduce((sum, source) => sum + source.value, 0)

// Detailed monthly income by source for the table
const detailedIncomeData = [
	{
		source: "Salary",
		monthly: 3500,
		quarterly: 10500,
		yearly: 42000,
		percentage: Math.round((3500 / totalIncome) * 100),
	},
	{
		source: "Investments",
		monthly: 800,
		quarterly: 2400,
		yearly: 9600,
		percentage: Math.round((800 / totalIncome) * 100),
	},
	{
		source: "Freelance",
		monthly: 600,
		quarterly: 1800,
		yearly: 7200,
		percentage: Math.round((600 / totalIncome) * 100),
	},
	{
		source: "Rental",
		monthly: 400,
		quarterly: 1200,
		yearly: 4800,
		percentage: Math.round((400 / totalIncome) * 100),
	},
	{
		source: "Other",
		monthly: 200,
		quarterly: 600,
		yearly: 2400,
		percentage: Math.round((200 / totalIncome) * 100),
	},
	{
		source: "Total",
		monthly: totalIncome,
		quarterly: totalIncome * 3,
		yearly: totalIncome * 12,
		percentage: 100,
	},
]

export const Income = () => {
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
		<div className="space-y-4 sm:space-y-6">
			<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
				<Card>
					<CardHeader className="p-4 sm:p-6">
						<CardTitle className="text-base sm:text-lg">Monthly Income</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Income trends throughout the year</CardDescription>
					</CardHeader>
					<CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
						<div className="h-[200px] sm:h-[250px] md:h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
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
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="p-4 sm:p-6">
						<CardTitle className="text-base sm:text-lg">Income Sources</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Breakdown by source</CardDescription>
					</CardHeader>
					<CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
						<div className="h-[200px] sm:h-[250px] md:h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={sourceData}
										cx="50%"
										cy="50%"
										innerRadius={40}
										outerRadius={70}
										paddingAngle={2}
										dataKey="value"
										label={({ name, percent }) => {
											// On small screens, only show percentage
											const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0
											return screenWidth < 640
												? `${(percent * 100).toFixed(0)}%`
												: `${name} ${(percent * 100).toFixed(0)}%`
										}}
										labelLine={false}
									>
										{sourceData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
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
					</CardContent>
				</Card>
			</div>

			{/* Income Table */}
			<Card>
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Income Details</CardTitle>
					<CardDescription className="text-xs sm:text-sm">Detailed breakdown of income sources</CardDescription>
				</CardHeader>
				<CardContent className="p-0 sm:p-6 pt-0">
					<div className="overflow-x-auto -mx-4 sm:mx-0">
						<div className="inline-block min-w-full align-middle px-4 sm:px-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="text-xs sm:text-sm">Source</TableHead>
										<TableHead className="text-right text-xs sm:text-sm">Monthly</TableHead>
										<TableHead className="text-right text-xs sm:text-sm hidden sm:table-cell">Quarterly</TableHead>
										<TableHead className="text-right text-xs sm:text-sm">Yearly</TableHead>
										<TableHead className="text-right text-xs sm:text-sm hidden sm:table-cell">Percentage</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{detailedIncomeData.map((item, index) => (
										<TableRow key={index} className={item.source === "Total" ? "font-medium" : ""}>
											<TableCell className="flex items-center gap-1 sm:gap-2 py-2 sm:py-4 text-xs sm:text-sm">
												{item.source !== "Total" && (
													<div
														className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
														style={{
															backgroundColor:
																item.source === "Total"
																	? "transparent"
																	: sourceData.find((src) => src.name === item.source)?.color,
														}}
													></div>
												)}
												{item.source}
											</TableCell>
											<TableCell className="text-right py-2 sm:py-4 text-xs sm:text-sm">
												{formatCurrency(item.monthly)}
											</TableCell>
											<TableCell className="text-right py-2 sm:py-4 text-xs sm:text-sm hidden sm:table-cell">
												{formatCurrency(item.quarterly)}
											</TableCell>
											<TableCell className="text-right py-2 sm:py-4 text-xs sm:text-sm">
												{formatCurrency(item.yearly)}
											</TableCell>
											<TableCell className="text-right py-2 sm:py-4 text-xs sm:text-sm hidden sm:table-cell">
												{item.percentage}%
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

