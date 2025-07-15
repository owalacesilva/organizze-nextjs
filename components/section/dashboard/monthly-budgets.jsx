import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, GraduationCap, PawPrintIcon as Paw, Shirt, ShoppingBag } from "lucide-react"

const budgets = [
	{
		category: "Grocery Stores",
		current: 75,
		total: 100,
		icon: ShoppingBag,
		color: "bg-emerald-500",
		lightColor: "bg-emerald-50",
	},
	{
		category: "Transportation",
		current: 25,
		total: 100,
		icon: Bus,
		color: "bg-cyan-500",
		lightColor: "bg-cyan-50",
	},
	{
		category: "Pets",
		current: 50,
		total: 100,
		icon: Paw,
		color: "bg-blue-500",
		lightColor: "bg-blue-50",
	},
	{
		category: "Education",
		current: 45,
		total: 100,
		icon: GraduationCap,
		color: "bg-violet-500",
		lightColor: "bg-violet-50",
	},
	{
		category: "Clothes",
		current: 35,
		total: 100,
		icon: Shirt,
		color: "bg-indigo-500",
		lightColor: "bg-indigo-50",
	},
]

export function MonthlyBudgets() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Monthly Budgets
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{budgets.map((budget) => {
					const Icon = budget.icon
					return (
						<div key={budget.category} className="space-y-3">
							<div className="flex items-center gap-3">
								<div className={`${budget.lightColor} p-2 rounded-full`}>
									<Icon className={`h-4 w-4 ${budget.color} text-white rounded-full`} />
								</div>
								<span className="text-sm font-medium">{budget.category}</span>
								<span className="text-sm text-muted-foreground ml-auto">
									{budget.current} / {budget.total}
								</span>
							</div>
							<div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
								<div
									className={`h-full ${budget.color} transition-all`}
									style={{ width: `${(budget.current / budget.total) * 100}%` }}
								/>
							</div>
						</div>
					)
				})}
			</CardContent>
		</Card>
	)
}

