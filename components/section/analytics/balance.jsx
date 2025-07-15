"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, DollarSignIcon, PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import {
	Bar,
	BarChart,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import { TransactionHistory } from "./transaction-history"

// Updated with a full year of data
const balanceData = [
	{ month: "Jan", balance: 12000, change: 0 },
	{ month: "Feb", balance: 13600, change: 13.3 },
	{ month: "Mar", balance: 15000, change: 10.3 },
	{ month: "Apr", balance: 16200, change: 8.0 },
	{ month: "May", balance: 17300, change: 6.8 },
	{ month: "Jun", balance: 18400, change: 6.4 },
	{ month: "Jul", balance: 19200, change: 4.3 },
	{ month: "Aug", balance: 20100, change: 4.7 },
	{ month: "Sep", balance: 21500, change: 7.0 },
	{ month: "Oct", balance: 22800, change: 6.0 },
	{ month: "Nov", balance: 23900, change: 4.8 },
	{ month: "Dec", balance: 25000, change: 4.6 },
]

const accounts = [
	{ name: "Checking Account", balance: 4200, goal: 5000, color: "hsl(143, 85%, 40%)" },
	{ name: "Savings Account", balance: 8500, goal: 10000, color: "hsl(250, 85%, 60%)" },
	{ name: "Investment Account", balance: 12300, goal: 15000, color: "hsl(346, 87%, 60%)" },
]

// Calculate total balance
const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

// Distribution data for pie chart
const distributionData = accounts.map((account) => ({
	name: account.name,
	value: account.balance,
	color: account.color,
}))

// Monthly spending by category data
const spendingByCategory = [
	{ category: "Housing", amount: 1200 },
	{ category: "Food", amount: 650 },
	{ category: "Transportation", amount: 350 },
	{ category: "Utilities", amount: 280 },
	{ category: "Entertainment", amount: 220 },
	{ category: "Healthcare", amount: 180 },
	{ category: "Shopping", amount: 320 },
	{ category: "Other", amount: 150 },
]

// Upcoming bills data
const upcomingBills = [
	{ id: 1, name: "Rent", amount: 1200, dueDate: "2025-04-01", status: "upcoming", category: "Housing" },
	{ id: 2, name: "Electricity", amount: 85, dueDate: "2025-04-05", status: "upcoming", category: "Utilities" },
	{ id: 3, name: "Internet", amount: 65, dueDate: "2025-04-10", status: "upcoming", category: "Utilities" },
	{ id: 4, name: "Phone", amount: 45, dueDate: "2025-04-15", status: "upcoming", category: "Utilities" },
]

// Cash flow data
const cashFlowData = [
	{ month: "Jan", income: 4200, expenses: 3400 },
	{ month: "Feb", income: 4200, expenses: 3000 },
	{ month: "Mar", income: 4500, expenses: 3100 },
	{ month: "Apr", income: 4200, expenses: 3200 },
	{ month: "May", income: 4200, expenses: 3100 },
	{ month: "Jun", income: 4800, expenses: 3400 },
]

export const Balance = () => {
	// Format currency
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value)
	}

	// Format date
	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
		}).format(date)
	}

	// Calculate monthly change
	const lastMonthBalance = balanceData[balanceData.length - 1].balance
	const previousMonthBalance = balanceData[balanceData.length - 2].balance
	const monthlyChange = lastMonthBalance - previousMonthBalance
	const monthlyChangePercent = (monthlyChange / previousMonthBalance) * 100

	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="bg-primary/10 p-2 sm:p-3 rounded-full">
								<DollarSignIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground">Total Balance</p>
								<p className="text-lg sm:text-xl md:text-2xl font-bold">{formatCurrency(totalBalance)}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className={`p-2 sm:p-3 rounded-full ${monthlyChange >= 0 ? "bg-green-500/10" : "bg-red-500/10"}`}>
								{monthlyChange >= 0 ? (
									<TrendingUpIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
								) : (
									<TrendingDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
								)}
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground">Monthly Change</p>
								<div className="flex items-center gap-1">
									<p className="text-lg sm:text-xl md:text-2xl font-bold">{formatCurrency(monthlyChange)}</p>
									<span className={`text-xs sm:text-sm ${monthlyChange >= 0 ? "text-green-500" : "text-red-500"}`}>
										{monthlyChangePercent.toFixed(1)}%
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="bg-blue-500/10 p-2 sm:p-3 rounded-full">
								<PiggyBankIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground">Savings Rate</p>
								<p className="text-lg sm:text-xl md:text-2xl font-bold">18.2%</p>
								<p className="text-[10px] sm:text-xs text-muted-foreground">of monthly income</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4 sm:p-6">
						<div className="flex items-center gap-3 sm:gap-4">
							<div className="bg-purple-500/10 p-2 sm:p-3 rounded-full">
								<ArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
							</div>
							<div>
								<p className="text-xs sm:text-sm text-muted-foreground">YTD Growth</p>
								<p className="text-lg sm:text-xl md:text-2xl font-bold">108.3%</p>
								<p className="text-[10px] sm:text-xs text-green-500">+12.5% from last year</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Balance Chart and Distribution */}
			<div className="grid gap-4 sm:gap-6 md:grid-cols-3">
				<Card className="md:col-span-2">
					<CardHeader className="p-4 sm:p-6">
						<CardTitle className="text-base sm:text-lg">Balance Trend</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Balance growth over the last 12 months</CardDescription>
					</CardHeader>
					<CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
						<div className="h-[250px] sm:h-[300px] md:h-[350px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={balanceData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
										tickFormatter={(value) => `$${value / 1000}k`}
										width={35}
									/>
									<Tooltip
										formatter={(value) => [formatCurrency(value), "Balance"]}
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
										dataKey="balance"
										stroke="hsl(var(--primary))"
										strokeWidth={2}
										dot={{ fill: "hsl(var(--primary))", r: 3, strokeWidth: 0 }}
										activeDot={{ r: 5, fill: "hsl(var(--primary))", strokeWidth: 0 }}
										// Add gradient effect
										fill="url(#colorBalance)"
									/>
									<defs>
										<linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
											<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
										</linearGradient>
									</defs>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="p-4 sm:p-6">
						<CardTitle className="text-base sm:text-lg">Account Distribution</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Breakdown of your total balance</CardDescription>
					</CardHeader>
					<CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
						<div className="h-[180px] sm:h-[220px] md:h-[250px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={distributionData}
										cx="50%"
										cy="50%"
										innerRadius={40}
										outerRadius={60}
										paddingAngle={2}
										dataKey="value"
									>
										{distributionData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip
										formatter={(value) => [formatCurrency(value), "Balance"]}
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
						<div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3">
							{distributionData.map((item, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center gap-1 sm:gap-2">
										<div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
										<span className="text-xs sm:text-sm">{item.name}</span>
									</div>
									<div className="flex items-center gap-1 sm:gap-2">
										<span className="text-xs sm:text-sm font-medium">{formatCurrency(item.value)}</span>
										<span className="text-[10px] sm:text-xs text-muted-foreground">
											{((item.value / totalBalance) * 100).toFixed(1)}%
										</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Cash Flow Widget */}
			<Card>
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Cash Flow</CardTitle>
					<CardDescription className="text-xs sm:text-sm">Monthly income vs expenses</CardDescription>
				</CardHeader>
				<CardContent className="p-2 sm:p-6 pt-0 sm:pt-0">
					<div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={cashFlowData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
									tickFormatter={(value) => `$${value / 1000}k`}
									width={35}
								/>
								<Tooltip
									formatter={(value) => [formatCurrency(value), ""]}
									contentStyle={{
										borderRadius: "0.375rem",
										border: "1px solid hsl(var(--border))",
										backgroundColor: "hsl(var(--background))",
										fontSize: "12px",
										padding: "8px",
									}}
									cursor={false}
								/>
								<Bar dataKey="income" name="Income" fill="hsl(143, 85%, 40%)" radius={[4, 4, 0, 0]} />
								<Bar dataKey="expenses" name="Expenses" fill="hsl(346, 87%, 60%)" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Account Goals */}
			<div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				{accounts.map((account, index) => (
					<Card key={account.name}>
						<CardHeader className="p-4 sm:p-6 pb-2">
							<CardTitle className="text-base sm:text-lg">{account.name}</CardTitle>
							<CardDescription className="text-xs sm:text-sm">Goal progress</CardDescription>
						</CardHeader>
						<CardContent className="p-4 sm:p-6 pt-0">
							<div className="text-lg sm:text-xl md:text-2xl font-bold">{formatCurrency(account.balance)}</div>
							<div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
								<div className="flex justify-between text-xs sm:text-sm">
									<span>Goal: {formatCurrency(account.goal)}</span>
									<span>{Math.round((account.balance / account.goal) * 100)}%</span>
								</div>
								<div className="relative w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
									<div
										className="h-full rounded-full transition-all duration-300"
										style={{
											width: `${Math.min(100, (account.balance / account.goal) * 100)}%`,
											backgroundColor: account.color,
										}}
									></div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Spending by Category Widget */}
			<div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
				<Card>
					<CardHeader className="p-4 sm:p-6">
						<CardTitle className="text-base sm:text-lg">Monthly Spending by Category</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Where your money is going</CardDescription>
					</CardHeader>
					<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
						<div className="space-y-3 sm:space-y-4">
							{spendingByCategory.map((item, index) => (
								<div key={index} className="space-y-1 sm:space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-xs sm:text-sm font-medium">{item.category}</span>
										<span className="text-xs sm:text-sm font-medium">{formatCurrency(item.amount)}</span>
									</div>
									<div className="relative w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
										<div
											className="h-full rounded-full"
											style={{
												width: `${(item.amount / spendingByCategory[0].amount) * 100}%`,
												backgroundColor: `hsl(${index * 30}, 85%, 60%)`,
											}}
										></div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Upcoming Bills Widget */}
				<Card>
					<CardHeader className="p-4 sm:p-6">
						<CardTitle className="text-base sm:text-lg">Upcoming Bills</CardTitle>
						<CardDescription className="text-xs sm:text-sm">Bills due in the next 30 days</CardDescription>
					</CardHeader>
					<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
						<div className="space-y-3 sm:space-y-4">
							{upcomingBills.map((bill) => (
								<div
									key={bill.id}
									className="flex items-center justify-between border-b pb-2 sm:pb-3 last:border-0 last:pb-0"
								>
									<div>
										<p className="text-xs sm:text-sm font-medium">{bill.name}</p>
										<p className="text-[10px] sm:text-xs text-muted-foreground">
											{bill.category} • Due {formatDate(bill.dueDate)}
										</p>
									</div>
									<div className="text-right">
										<p className="text-xs sm:text-sm font-medium">{formatCurrency(bill.amount)}</p>
										<Badge
											variant="outline"
											className="bg-amber-500/10 text-amber-600 border-amber-200 text-[10px] sm:text-xs"
										>
											{bill.status}
										</Badge>
									</div>
								</div>
							))}
							<Button variant="outline" className="w-full mt-2 text-xs sm:text-sm h-8 sm:h-10">
								View All Bills
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Transaction History Component */}
			<TransactionHistory />
		</div>
	)
}

