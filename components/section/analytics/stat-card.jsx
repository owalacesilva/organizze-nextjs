"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, hint, icon: Icon, tone = "default" }) {
	return (
		<Card>
			<CardContent className="flex items-center gap-2 p-3">
				{Icon && (
					<div
						className={cn(
							"rounded-full bg-muted p-1.5",
							tone === "positive" && "text-emerald-600 dark:text-emerald-400",
							tone === "negative" && "text-red-600 dark:text-red-400",
							tone === "default" && "text-primary",
						)}
					>
						<Icon className="h-4 w-4" />
					</div>
				)}
				<div className="min-w-0">
					<p className="truncate text-[11px] uppercase tracking-wide text-muted-foreground">
						{label}
					</p>
					<p className="text-lg font-semibold tabular-nums">{value}</p>
					{hint && (
						<p className="truncate text-[11px] text-muted-foreground">{hint}</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
