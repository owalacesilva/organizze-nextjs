import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

export function MetricCard({ title, value, change, lastMonth }) {
	const isPositive = change > 0

	return (
		<div className="rounded-lg bg-card p-6 shadow-sm border border-border">
			<div className="space-y-2">
				<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
				<div className="text-3xl font-bold">{value}</div>
				<div className="flex items-center gap-2 text-sm">
					<div className={cn("flex items-center gap-1", isPositive ? "text-emerald-600" : "text-red-600")}>
						{isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
						<span className="font-medium">{Math.abs(change)}%</span>
					</div>
					<span className="text-muted-foreground">Last month {lastMonth}</span>
				</div>
			</div>
		</div>
	)
}

