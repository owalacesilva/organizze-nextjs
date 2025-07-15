import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

const payments = [
	{
		category: "Electricity",
		date: "5 january 2024",
		amount: "+450.00",
		status: "Paid",
		statusColor: "bg-emerald-500/10 text-emerald-500",
	},
	{
		category: "Internet",
		date: "5 january 2024",
		amount: "+450.00",
		status: "Due",
		statusColor: "bg-yellow-500/10 text-yellow-500",
	},
	{
		category: "Apple Music",
		date: "5 january 2024",
		amount: "+450.00",
		status: "Cancel",
		statusColor: "bg-red-500/10 text-red-500",
	},
	{
		category: "Groceries",
		date: "5 january 2024",
		amount: "+450.00",
	},
	{
		category: "Netflix",
		date: "6 january 2024",
		amount: "+199.00",
		status: "Paid",
		statusColor: "bg-emerald-500/10 text-emerald-500",
	},
	// {
	// 	category: "Gym Membership",
	// 	date: "7 january 2024",
	// 	amount: "+299.00",
	// 	status: "Due",
	// 	statusColor: "bg-yellow-500/10 text-yellow-500",
	// },
	// {
	// 	category: "Phone Bill",
	// 	date: "8 january 2024",
	// 	amount: "+599.00",
	// 	status: "Paid",
	// 	statusColor: "bg-emerald-500/10 text-emerald-500",
	// },
]

export function PaymentsHistory() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle>Payments History</CardTitle>
				<Link href="#" className="text-sm text-primary hover:underline">
					See more
				</Link>
			</CardHeader>
			<CardContent className="">
				<div className="grid gap-4 mt-3">
					{payments.map((payment, index) => (
						<div key={index} className="grid grid-cols-[1fr,auto] items-center gap-4">
							<div className="flex flex-col gap-0.5">
								<span className="font-medium">{payment.category}</span>
								<span className="text-xs text-muted-foreground">{payment.date}</span>
							</div>
							<div className="text-right gap-2">
								<div className="font-medium">{payment.amount}</div>
								{payment.status && (
									<Badge variant="secondary" className={cn("rounded-md font-normal", payment.statusColor)}>
										{payment.status}
									</Badge>
								)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

