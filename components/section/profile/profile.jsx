"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Building2, CreditCard, Settings, User, Wallet } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Spending data for the detailed chart
const spendingData = [
	{ date: "4 Jan", value: 0 },
	{ date: "5 Jan", value: 100 },
	{ date: "6 Jan", value: 90 },
	{ date: "7 Jan", value: 150 },
	{ date: "8 Jan", value: 130 },
	{ date: "9 Jan", value: 200 },
	{ date: "10 Jan", value: 120 },
	{ date: "11 Jan", value: 90 },
	{ date: "12 Jan", value: 150 },
	{ date: "13 Jan", value: 140 },
	{ date: "14 Jan", value: 200 },
	{ date: "15 Jan", value: 320 },
]

// Recent spending data for the widget
const recentSpendingData = [
	{ date: "10 Mar", value: 120 },
	{ date: "11 Mar", value: 90 },
	{ date: "12 Mar", value: 150 },
	{ date: "13 Mar", value: 140 },
	{ date: "14 Mar", value: 200 },
	{ date: "15 Mar", value: 180 },
	{ date: "16 Mar", value: 220 },
]

// Connected accounts data
const connectedAccounts = [
	{
		id: "chase",
		name: "Chase Bank",
		icon: Building2,
		iconBg: "bg-indigo-600",
		active: true,
	},
	{
		id: "amex",
		name: "American Express",
		icon: CreditCard,
		iconBg: "bg-blue-600",
	},
	{
		id: "visa",
		name: "Visa Card",
		icon: CreditCard,
		iconBg: "bg-emerald-600",
	},
	{
		id: "paypal",
		name: "PayPal",
		icon: Wallet,
		iconBg: "bg-purple-600",
	},
]

// User data
const userData = {
	name: "Emily Rose Thompson",
	email: "emily.thompson@email.com",
	avatar: "/images/avatar/1.jpg?height=80&width=80",
	initials: "ET",
	registeredDate: "12 March 2024",
	plan: "Premium",
	spent: 2345.67,
	budget: 3500.0,
	primaryAccount: "Chase Bank",
}

// Calculate budget percentage
const budgetPercentage = (userData.spent / userData.budget) * 100

function ProfileHeader({ compact = false }) {
	return (
		<div className={cn("mb-4 sm:mb-8", compact && "mb-2 sm:mb-4")}>
			<div className="flex items-start gap-3 sm:gap-4">
				<Avatar
					className={cn(
						"h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20",
						compact && "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
					)}
				>
					<AvatarImage src={userData.avatar} alt={userData.name} />
					<AvatarFallback>{userData.initials}</AvatarFallback>
				</Avatar>
				<div className="space-y-0.5 sm:space-y-1">
					<h4 className={cn("text-base sm:text-lg font-medium", compact && "text-sm sm:text-base md:text-lg")}>
						{userData.name}
					</h4>
					<p className="text-xs sm:text-sm text-muted-foreground">{userData.email}</p>
					<div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
						{!compact && (
							<div className="hidden sm:block">
								<span className="font-medium">{userData.registeredDate}</span>
								<span className="ml-2">Registered</span>
							</div>
						)}
						<div>
							<Badge variant="secondary" className="text-xs">
								{userData.plan}
							</Badge>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function ProfileOverview() {
	return (
		<Card className="border shadow-sm h-full">
			<CardHeader className="pb-1 sm:pb-2 p-4 sm:p-6">
				<CardTitle className="text-base sm:text-lg">Profile Overview</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
				{/* User Info */}
				<ProfileHeader compact={true} />

				{/* Budget Progress */}
				<div className="space-y-1 sm:space-y-2 pt-1 sm:pt-2">
					<div className="flex items-center justify-between text-xs sm:text-sm">
						<span className="text-muted-foreground">Monthly Budget</span>
						<span className="font-medium">
							${userData.spent.toLocaleString()} / ${userData.budget.toLocaleString()}
						</span>
					</div>
					<Progress value={budgetPercentage} className="h-1.5 sm:h-2" />
					<div className="flex items-center justify-between text-xs">
						<span className="text-primary">{budgetPercentage.toFixed(0)}% spent</span>
						<span className="text-muted-foreground">{(100 - budgetPercentage).toFixed(0)}% remaining</span>
					</div>
				</div>

				{/* Recent Spending Chart */}
				<div className="pt-1 sm:pt-2">
					<div className="flex items-center justify-between mb-1 sm:mb-2">
						<h5 className="text-xs sm:text-sm font-medium">Recent Spending</h5>
						<span className="text-xs text-muted-foreground">{userData.primaryAccount}</span>
					</div>
					<div className="h-[100px] sm:h-[120px] w-full">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={recentSpendingData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
								<defs>
									<linearGradient id="colorSpendingWidget" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
										<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis
									dataKey="date"
									tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
									tickLine={false}
									axisLine={false}
									interval="preserveStartEnd"
								/>
								<YAxis hide={true} />
								<Tooltip
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											return (
												<div className="rounded-lg border bg-background p-2 shadow-sm">
													<div className="grid grid-cols-2 gap-2">
														<div className="flex flex-col">
															<span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
															<span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
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
								<Area
									type="monotone"
									dataKey="value"
									stroke="hsl(var(--primary))"
									strokeWidth={2}
									fill="url(#colorSpendingWidget)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-3 gap-1 sm:gap-2 pt-1 sm:pt-2">
					<Button variant="outline" size="sm" className="flex flex-col h-auto py-1.5 sm:py-2 px-0">
						<User className="h-3 w-3 sm:h-4 sm:w-4 mb-0.5 sm:mb-1" />
						<span className="text-[10px] sm:text-xs">Profile</span>
					</Button>
					<Button variant="outline" size="sm" className="flex flex-col h-auto py-1.5 sm:py-2 px-0">
						<Wallet className="h-3 w-3 sm:h-4 sm:w-4 mb-0.5 sm:mb-1" />
						<span className="text-[10px] sm:text-xs">Accounts</span>
					</Button>
					<Button variant="outline" size="sm" className="flex flex-col h-auto py-1.5 sm:py-2 px-0">
						<Settings className="h-3 w-3 sm:h-4 sm:w-4 mb-0.5 sm:mb-1" />
						<span className="text-[10px] sm:text-xs">Settings</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

function SpendingChart() {
	return (
		<div>
			<div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						data={spendingData}
						margin={{
							top: 5,
							right: 5,
							left: 0,
							bottom: 0,
						}}
					>
						<defs>
							<linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
								<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
							dy={10}
							interval="preserveStartEnd"
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
							dx={-5}
							width={30}
						/>
						<Tooltip
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									return (
										<div className="rounded-lg border bg-background p-2 shadow-sm">
											<div className="grid grid-cols-2 gap-2">
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
													<span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
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
						<Area
							type="monotone"
							dataKey="value"
							stroke="hsl(var(--primary))"
							strokeWidth={2}
							fill="url(#colorSpending)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

// Full profile page component
export function Profile() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
			{/* Left side - Profile Overview (33% width on desktop) */}
			<div className="lg:col-span-4">
				<ProfileOverview />
			</div>

			{/* Right side - Account tabs with charts (66% width on desktop) */}
			<div className="lg:col-span-8">
				<Card className="h-full">
					<CardHeader className="pb-0 p-4 sm:p-6">
						<Tabs defaultValue="chase" className="w-full">
							<div className="overflow-x-auto -mx-4 sm:mx-0 pb-1">
								<div className="px-4 sm:px-0">
									<TabsList className="w-full grid grid-cols-2 sm:grid-cols-4">
										{connectedAccounts.map((account) => (
											<TabsTrigger key={account.id} value={account.id} className="relative w-full text-xs sm:text-sm">
												{account.active && (
													<span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></span>
												)}
												<span className="truncate">{account.name.split(" ")[0]}</span>
											</TabsTrigger>
										))}
									</TabsList>
								</div>
							</div>

							{connectedAccounts.map((account) => (
								<TabsContent key={account.id} value={account.id} className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 sm:gap-3">
											<div className={cn("p-1.5 sm:p-2 rounded-full", account.iconBg)}>
												<account.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-white" />
											</div>
											<div>
												<h3 className="font-medium text-sm sm:text-base">{account.name}</h3>
												{account.active ? (
													<span className="text-[10px] sm:text-xs text-primary">Active Account</span>
												) : (
													<span className="text-[10px] sm:text-xs text-muted-foreground">Secondary Account</span>
												)}
											</div>
										</div>
										<Button variant="outline" size="sm" className="text-xs h-8">
											Manage
										</Button>
									</div>

									<SpendingChart />
								</TabsContent>
							))}
						</Tabs>
					</CardHeader>
				</Card>
			</div>
		</div>
	)
}

