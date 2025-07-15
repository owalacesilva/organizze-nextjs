import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const expenses = [
	{ category: "Food", amount: 1200, percentage: 38, color: "bg-orange-500" },
	{ category: "Transport", amount: 700, percentage: 22, color: "bg-orange-300" },
	{ category: "Healthcare", amount: 400, percentage: 12, color: "bg-yellow-400" },
	{ category: "Education", amount: 300, percentage: 9, color: "bg-green-400" },
	{ category: "Clothes", amount: 250, percentage: 8, color: "bg-green-500" },
	{ category: "Pets", amount: 180, percentage: 6, color: "bg-blue-400" },
	{ category: "Entertainment", amount: 150, percentage: 5, color: "bg-gray-400" },
]

export function ExpensesBreakdown() {
	const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Monthly Expenses</CardTitle>
			</CardHeader>
			<CardContent>
				{/* Progress Bar */}
				<div className="h-2 w-full flex rounded-full overflow-hidden mb-6">
					{expenses.map((expense, index) => (
						<div key={expense.category} className={cn(expense.color)} style={{ width: `${expense.percentage}%` }} />
					))}
				</div>

				{/* Expenses List */}
				<div className="space-y-0">
					{expenses.map((expense, index) => (
						<div
							key={expense.category}
							className={cn(
								"flex items-center justify-between py-3",
								index !== expenses.length - 1 && "border-b border-border",
							)}
						>
							<div className="flex items-center gap-2">
								<div className={cn("h-3 w-3 rounded-full", expense.color)} />
								<span className="text-sm text-muted-foreground">{expense.category}</span>
							</div>
							<div className="flex items-center gap-4">
								<span className="text-sm font-medium">${expense.amount.toLocaleString()}</span>
								<span className="text-sm text-muted-foreground w-8">{expense.percentage}%</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

