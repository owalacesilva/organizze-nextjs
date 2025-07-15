"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Building2, Car, CreditCard, FileText, Plus, ShoppingBag, Wallet } from "lucide-react"
import { useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const accounts = [
	{
		name: "City Bank",
		balance: "$221,478",
		icon: Building2,
		id: "city-bank",
	},
	{
		name: "Debit Card",
		balance: "$221,478",
		icon: CreditCard,
		id: "debit-card",
	},
	{
		name: "Visa Card",
		balance: "$221,478",
		icon: CreditCard,
		id: "visa-card",
	},
	{
		name: "Cash",
		balance: "$221,478",
		icon: Wallet,
		id: "cash",
	},
]

const chartData = [
	{ year: "2010", value: 28 },
	{ year: "2011", value: 35 },
	{ year: "2012", value: 39 },
	{ year: "2013", value: 48 },
	{ year: "2014", value: 46 },
	{ year: "2015", value: 43 },
	{ year: "2016", value: 58 },
]

const transactions = [
	{
		category: "Beauty",
		icon: ShoppingBag,
		iconBg: "bg-green-500",
		date: "12.12.2023",
		description: "Grocery items and Beverage soft drinks",
		amount: -32.2,
		currency: "USD",
	},
	{
		category: "Bills & Fees",
		icon: FileText,
		iconBg: "bg-cyan-500",
		date: "12.12.2023",
		description: "Grocery items and Beverage soft drinks",
		amount: -32.2,
		currency: "USD",
	},
	{
		category: "Car",
		icon: Car,
		iconBg: "bg-blue-500",
		date: "12.12.2023",
		description: "Grocery items and Beverage soft drinks",
		amount: -32.2,
		currency: "USD",
	},
]

export default function BankingDashboard() {
	const [activeAccount, setActiveAccount] = useState("cash")

	return (
		<div className="py-4 sm:py-6">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
				{/* Left Sidebar - horizontal scrolling on mobile, vertical on desktop */}
				<div className="lg:col-span-3 lg:space-y-3">
					<div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
						{accounts.map((account) => (
							<Card
								key={account.id}
								className={cn(
									"overflow-hidden cursor-pointer transition-colors flex-shrink-0 w-[200px] sm:w-[220px] lg:w-full",
									activeAccount === account.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent",
								)}
								onClick={() => setActiveAccount(account.id)}
							>
								<CardContent className="p-4">
									<div className="flex items-center gap-3">
										<div
											className={cn(
												"p-3 rounded-full",
												activeAccount === account.id ? "bg-primary-foreground/20" : "bg-muted",
											)}
										>
											<account.icon
												className={cn(
													"h-5 w-5",
													activeAccount === account.id ? "text-primary-foreground" : "text-primary",
												)}
											/>
										</div>
										<div>
											<div className="text-sm font-medium">{account.name}</div>
											<div className="text-base font-bold">{account.balance}</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
						<button className="flex-shrink-0 w-[200px] sm:w-[220px] lg:w-full rounded-lg border border-dashed p-4 text-center hover:border-primary bg-card flex items-center justify-center gap-2 transition-colors">
							<span className="text-sm font-medium">Add new wallet</span>
							<Plus className="h-4 w-4" />
						</button>
					</div>
				</div>

				{/* Main Content */}
				<div className="lg:col-span-9 space-y-4 sm:space-y-6">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
						{/* Balance Card */}
						<Card>
							<CardContent className="p-4 sm:p-6">
								<div className="text-sm text-muted-foreground mb-1">Total Balance</div>
								<div className="text-2xl sm:text-3xl font-bold mb-4">$221,478</div>

								<div className="space-y-3">
									<div className="flex justify-between items-center">
										<div className="text-sm text-muted-foreground">Personal Funds</div>
										<div className="font-medium">$32,500.28</div>
									</div>
									<div className="flex justify-between items-center">
										<div className="text-sm text-muted-foreground">Credit Limits</div>
										<div className="font-medium">$2,500.00</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Debit Card */}
						<Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
							<CardContent className="p-4 sm:p-6 relative">
								<div className="absolute top-4 right-4">
									<span className="font-bold opacity-80">VISA</span>
								</div>
								<div className="mt-8 mb-6 text-lg sm:text-2xl tracking-widest font-mono">
									<span className="hidden sm:inline">1234 5678 7890 9875</span>
									<span className="sm:hidden">**** **** **** 9875</span>
								</div>
								<div className="flex justify-between items-center">
									<div className="font-medium">Saiful Islam</div>
									<div className="text-sm opacity-80">EXP: 12/21</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
						{/* Balance Stats */}
						<Card>
							<CardContent className="p-4 sm:p-6">
								<div className="text-sm text-muted-foreground mb-1">Total Balance</div>
								<div className="text-xl sm:text-2xl font-bold mb-2">$432,568</div>
								<div className="flex items-center gap-2 text-xs sm:text-sm mb-4">
									<span className="text-green-500">↑ 2.47%</span>
									<span className="text-muted-foreground">Last month $24,478</span>
								</div>
							</CardContent>
						</Card>

						{/* Monthly Expenses */}
						<Card>
							<CardContent className="p-4 sm:p-6">
								<div className="text-sm text-muted-foreground mb-1">Monthly Expenses</div>
								<div className="text-xl sm:text-2xl font-bold mb-2">$432,568</div>
								<div className="flex items-center gap-2 text-xs sm:text-sm mb-4">
									<span className="text-green-500">↑ 2.47%</span>
									<span className="text-muted-foreground">Last month $24,478</span>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Chart */}
					<Card className="overflow-hidden">
						<CardContent className="py-4 sm:py-6">
							<div className="text-base sm:text-lg font-medium mb-4 px-4 sm:px-0">Balance Overtime</div>
							<div className="h-48 sm:h-64">
								<ResponsiveContainer width="100%" height="100%">
									<AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
										<XAxis
											dataKey="year"
											tickLine={false}
											axisLine={false}
											tick={{ fontSize: 12 }}
											stroke="currentColor"
											className="text-foreground"
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tick={{ fontSize: 12 }}
											stroke="currentColor"
											className="text-foreground"
											domain={[0, 60]}
											ticks={[0, 15, 30, 45, 60]}
										/>
										<Tooltip
											contentStyle={{
												backgroundColor: "hsl(var(--card))",
												borderColor: "hsl(var(--border))",
												borderRadius: "0.5rem",
												boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
												color: "hsl(var(--foreground))",
											}}
										/>
										<defs>
											<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
												<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
											</linearGradient>
										</defs>
										<Area
											type="monotone"
											dataKey="value"
											stroke="hsl(var(--primary))"
											strokeWidth={3}
											fill="url(#colorValue)"
											dot={{
												r: 4,
												fill: "hsl(var(--background))",
												stroke: "hsl(var(--primary))",
												strokeWidth: 2,
											}}
											activeDot={{
												r: 6,
												fill: "hsl(var(--primary))",
												stroke: "hsl(var(--background))",
												strokeWidth: 2,
											}}
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					{/* Transaction History */}
					<Card>
						<CardContent className="p-4 sm:p-6">
							<div className="text-base sm:text-lg font-medium mb-4">Transaction History</div>
							<div className="overflow-x-auto -mx-4 sm:mx-0">
								<div className="inline-block min-w-full align-middle px-4 sm:px-0">
									<table className="min-w-full">
										<thead>
											<tr className="text-left text-xs sm:text-sm text-muted-foreground border-b">
												<th className="pb-3 font-medium">Category</th>
												<th className="pb-3 font-medium hidden sm:table-cell">Date</th>
												<th className="pb-3 font-medium">Description</th>
												<th className="pb-3 font-medium text-right">Amount</th>
												<th className="pb-3 font-medium text-right hidden sm:table-cell">Currency</th>
											</tr>
										</thead>
										<tbody>
											{transactions.map((transaction, index) => (
												<tr key={index} className="border-b last:border-b-0">
													<td className="py-3 sm:py-4">
														<div className="flex items-center gap-2 sm:gap-3">
															<div className="p-1.5 sm:p-2 rounded-full bg-primary">
																<transaction.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
															</div>
															<span className="text-sm font-medium">{transaction.category}</span>
														</div>
													</td>
													<td className="py-3 sm:py-4 text-xs sm:text-sm hidden sm:table-cell">{transaction.date}</td>
													<td className="py-3 sm:py-4 text-xs sm:text-sm max-w-[100px] sm:max-w-xs truncate">
														{transaction.description}
													</td>
													<td className="py-3 sm:py-4 text-right text-sm font-medium">{transaction.amount}</td>
													<td className="py-3 sm:py-4 text-right text-xs sm:text-sm hidden sm:table-cell">
														{transaction.currency}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

