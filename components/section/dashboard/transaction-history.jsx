import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Film, GraduationCap, Scissors, Smartphone } from "lucide-react"

const transactions = [
	{
		category: "Beauty",
		icon: Scissors,
		iconColor: "bg-emerald-500",
		date: "12.12.2023",
		description: "Haircut & Skincare Products",
		amount: -45.0,
		currency: "USD",
	},
	{
		category: "Bills & Fees",
		icon: Smartphone,
		iconColor: "bg-blue-500",
		date: "12.12.2023",
		description: "Monthly Internet Subscription",
		amount: -60.0,
		currency: "USD",
	},
	{
		category: "Car",
		icon: Car,
		iconColor: "bg-cyan-500",
		date: "12.12.2023",
		description: "Fuel & Car Wash",
		amount: -30.5,
		currency: "USD",
	},
	{
		category: "Education",
		icon: GraduationCap,
		iconColor: "bg-sky-500",
		date: "12.12.2023",
		description: "Online Course Subscription",
		amount: -25.0,
		currency: "USD",
	},
	{
		category: "Entertainment",
		icon: Film,
		iconColor: "bg-indigo-500",
		date: "12.12.2023",
		description: "Movie & Streaming Service",
		amount: -12.99,
		currency: "USD",
	},
]

export function TransactionHistory() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Transaction History</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="relative w-full overflow-auto">
					<table className="w-full caption-bottom text-sm">
						<thead>
							<tr className="border-b border-border">
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
								<th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
								<th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
								<th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Currency</th>
							</tr>
						</thead>
						<tbody>
							{transactions.map((transaction, index) => {
								const Icon = transaction.icon
								const isLastRow = index === transactions.length - 1
								return (
									<tr
										key={index}
										className={`${isLastRow ? "" : "border-b border-border"} transition-colors hover:bg-muted/50`}
									>
										<td className="p-4">
											<div className="flex items-center gap-3">
												<div className={`${transaction.iconColor} p-2 rounded-full`}>
													<Icon className="h-4 w-4 text-white" />
												</div>
												<span>{transaction.category}</span>
											</div>
										</td>
										<td className="p-4">{transaction.date}</td>
										<td className="p-4">{transaction.description}</td>
										<td className="p-4 text-right">{transaction.amount.toFixed(2)}</td>
										<td className="p-4 text-right">{transaction.currency}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	)
}

