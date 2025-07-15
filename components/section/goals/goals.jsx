"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Building2, Car, CreditCard, Gamepad, Home, Plane, Plus, Wallet } from "lucide-react"

const goals = [
	{
		id: "car",
		name: "New Car",
		saved: 10000,
		target: 25000,
		icon: Car,
		iconBg: "bg-primary",
		iconColor: "text-primary-foreground",
	},
	{
		id: "pc",
		name: "Gaming PC",
		saved: 1500,
		target: 2500,
		icon: Gamepad,
		iconBg: "bg-primary/10",
		iconColor: "text-primary",
	},
	{
		id: "vacation",
		name: "Vacation",
		saved: 1500,
		target: 5000,
		icon: Plane,
		iconBg: "bg-primary/10",
		iconColor: "text-primary",
	},
	{
		id: "renovation",
		name: "Home Renovation",
		saved: 3000,
		target: 15000,
		icon: Home,
		iconBg: "bg-primary/10",
		iconColor: "text-primary",
	},
]

const wallets = [
	{
		name: "First Bank",
		balance: 250,
		icon: Building2,
		iconBg: "bg-yellow-500",
		progress: 85,
		progressColor: "bg-primary",
	},
	{
		name: "Cash App",
		balance: 100,
		icon: Wallet,
		iconBg: "bg-indigo-500",
		progress: 45,
		progressColor: "bg-primary",
	},
	{
		name: "Capital One",
		balance: 175,
		icon: CreditCard,
		iconBg: "bg-purple-500",
		progress: 95,
		progressColor: "bg-primary",
	},
]

const history = [
	{
		date: "29 Feb 2024",
		wallet: "Visa",
		description: "Down Payment",
		amount: 5000.0,
		fees: 12.36,
	},
	{
		date: "15 Feb 2024",
		wallet: "Bank Transfer",
		description: "Savings Contribution",
		amount: 2000.0,
		fees: 12.36,
	},
	{
		date: "01 Feb 2024",
		wallet: "Cash",
		description: "Part-time Job",
		amount: 3000.0,
		fees: 12.36,
	},
]

function GoalCard({ goal, isActive = false }) {
	const percentage = (goal.saved / goal.target) * 100
	const Icon = goal.icon

	return (
		<Card
			className={cn(
				"transition-all hover:shadow-md cursor-pointer flex-shrink-0",
				isActive && goal.id === "car" ? "bg-primary text-primary-foreground" : "",
				"w-[260px] sm:w-[280px] lg:w-full",
			)}
		>
			<CardContent className="p-4 sm:p-6">
				<div className="flex items-center gap-3 sm:gap-4">
					<div
						className={cn(
							"p-2 sm:p-3 rounded-full",
							isActive && goal.id === "car" ? "bg-primary-foreground/20" : goal.iconBg,
						)}
					>
						<Icon
							className={cn(
								"h-4 w-4 sm:h-5 sm:w-5",
								isActive && goal.id === "car" ? "text-primary-foreground" : goal.iconColor,
							)}
						/>
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between mb-1 sm:mb-2">
							<div className="font-medium text-sm sm:text-base">{goal.name}</div>
							<div
								className={cn(
									"text-xs sm:text-sm",
									isActive && goal.id === "car" ? "text-primary-foreground/70" : "text-muted-foreground",
								)}
							>
								{percentage.toFixed(0)}%
							</div>
						</div>
						<div
							className={cn(
								"text-xs sm:text-sm",
								isActive && goal.id === "car" ? "text-primary-foreground/70" : "text-muted-foreground",
							)}
						>
							${goal.saved.toLocaleString()} / ${goal.target.toLocaleString()}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

function GoalDetails({ goal }) {
	const percentage = (goal.saved / goal.target) * 100
	const remaining = goal.target - goal.saved

	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="bg-card p-4 sm:p-6 rounded-lg">
				<h2 className="text-xl sm:text-2xl font-bold">{goal.name}</h2>
			</div>

			<Card>
				<CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
					<div className="space-y-3 sm:space-y-4">
						<div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
							<div>Saved</div>
							<div>Goals</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-lg sm:text-2xl font-bold">${goal.saved.toLocaleString()}</div>
							<div className="text-lg sm:text-2xl font-bold">${goal.target.toLocaleString()}</div>
						</div>
						<Progress value={percentage} className="h-2" />
						<div className="flex items-center justify-between text-xs sm:text-sm">
							<div className="text-primary">{percentage.toFixed(0)}%</div>
							<div className="text-muted-foreground">{(100 - percentage).toFixed(0)}%</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
				<Card>
					<CardContent className="p-3 sm:p-6">
						<div className="space-y-1">
							<div className="text-xs sm:text-sm text-muted-foreground">Last Month</div>
							<div className="text-base sm:text-xl md:text-2xl font-bold">$42,678</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-3 sm:p-6">
						<div className="space-y-1">
							<div className="text-xs sm:text-sm text-muted-foreground">Expenses</div>
							<div className="text-base sm:text-xl md:text-2xl font-bold">$1,798</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-3 sm:p-6">
						<div className="space-y-1">
							<div className="text-xs sm:text-sm text-muted-foreground">Taxes</div>
							<div className="text-base sm:text-xl md:text-2xl font-bold">$255.25</div>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-3 sm:p-6">
						<div className="space-y-1">
							<div className="text-xs sm:text-sm text-muted-foreground">Debt</div>
							<div className="text-base sm:text-xl md:text-2xl font-bold">$365,478</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="pb-2 pt-4 px-4 sm:pb-4 sm:pt-6 sm:px-6">
					<CardTitle className="text-base sm:text-lg">Available by Wallet</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
					{wallets.map((wallet) => (
						<div key={wallet.name} className="flex items-center gap-3 sm:gap-4">
							<div className={cn("p-1.5 sm:p-2 rounded-full", wallet.iconBg)}>
								<wallet.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
							</div>
							<div className="flex-1">
								<div className="flex items-center justify-between mb-1">
									<div className="font-medium text-sm sm:text-base">{wallet.name}</div>
									<div className="text-xs sm:text-sm">{wallet.balance}$</div>
								</div>
								<div className="h-1.5 sm:h-2 w-full rounded-full bg-muted">
									<div
										className={cn("h-full rounded-full", wallet.progressColor)}
										style={{ width: `${wallet.progress}%` }}
									/>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="pb-2 pt-4 px-4 sm:pb-4 sm:pt-6 sm:px-6">
					<CardTitle className="text-base sm:text-lg">History</CardTitle>
				</CardHeader>
				<CardContent className="p-0 sm:p-6">
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-xs sm:text-sm">Date</TableHead>
									<TableHead className="text-xs sm:text-sm">Wallet</TableHead>
									<TableHead className="text-xs sm:text-sm hidden sm:table-cell">Description</TableHead>
									<TableHead className="text-xs sm:text-sm text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{history.map((item) => (
									<TableRow key={item.date}>
										<TableCell className="text-xs sm:text-sm py-2 sm:py-4">{item.date}</TableCell>
										<TableCell className="text-xs sm:text-sm py-2 sm:py-4">{item.wallet}</TableCell>
										<TableCell className="text-xs sm:text-sm py-2 sm:py-4 hidden sm:table-cell">
											{item.description}
										</TableCell>
										<TableCell className="text-xs sm:text-sm py-2 sm:py-4 text-right">
											<div className="font-medium text-primary">+{item.amount.toLocaleString()}$</div>
											<div className="text-xs text-muted-foreground">{item.fees}$</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export function Goals() {
	return (
		<div className="space-y-6">
			{/* Goal cards - horizontal scrolling on mobile, vertical on desktop */}
			<div className="lg:hidden overflow-x-auto pb-2">
				<div className="flex gap-4">
					{goals.map((goal) => (
						<GoalCard key={goal.id} goal={goal} isActive={goal.id === "car"} />
					))}
					<Button className="flex-shrink-0 w-[260px] sm:w-[280px] h-[72px] sm:h-auto">
						<Plus className="mr-2 h-4 w-4" />
						Add new goals
					</Button>
				</div>
			</div>

			{/* Desktop layout */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
				{/* Sidebar - hidden on mobile, shown on desktop */}
				<div className="hidden lg:block lg:col-span-3 space-y-4">
					{goals.map((goal) => (
						<GoalCard key={goal.id} goal={goal} isActive={goal.id === "car"} />
					))}
					<Button className="w-full">
						<Plus className="mr-2 h-4 w-4" />
						Add new goals
					</Button>
				</div>

				{/* Goal details */}
				<div className="lg:col-span-9">
					<GoalDetails goal={goals[0]} />
				</div>
			</div>
		</div>
	)
}

