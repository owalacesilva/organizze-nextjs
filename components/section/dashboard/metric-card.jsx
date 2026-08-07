"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

/**
 * @param change   Percentage difference against the comparison period.
 * @param inverted Set for "expenses"-like metrics, where growth is bad news.
 */
export function MetricCard({ title, value, change = 0, inverted = false }) {
	const { t } = useTranslation();

	const isUp = change > 0;
	const isGood = inverted ? !isUp : isUp;

	return (
		<Card>
			<CardContent className="space-y-1 p-3">
				<h3 className="text-[11px] uppercase tracking-wide text-muted-foreground">
					{title}
				</h3>
				<p className="text-xl font-semibold tabular-nums">{value}</p>
				<div className="flex items-center gap-1.5 text-[11px]">
					<span
						className={cn(
							"flex items-center gap-0.5 font-medium",
							isGood
								? "text-emerald-600 dark:text-emerald-400"
								: "text-red-600 dark:text-red-400",
						)}
					>
						{isUp ? (
							<ArrowUpIcon className="h-3 w-3" />
						) : (
							<ArrowDownIcon className="h-3 w-3" />
						)}
						{Math.abs(change).toFixed(1)}%
					</span>
					<span className="text-muted-foreground">
						{t("dashboard.vsPrevious")}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
