"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { topExpenses } from "@/lib/transactions";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export function TopExpenses({
	transactions = [],
	limit = 5,
	reference,
	isLoading = false,
	className,
}) {
	const { t, formatCurrency, formatDate } = useTranslation();

	const month = useMemo(() => reference ?? new Date(), [reference]);
	const { items, total } = useMemo(
		() => topExpenses(transactions, limit, month),
		[transactions, limit, month],
	);

	const listed = items.reduce((sum, item) => sum + item.magnitude, 0);

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>{t("topExpenses.title")}</CardTitle>
				<p className="text-xs text-muted-foreground">
					{t("topExpenses.subtitle", {
						month: formatDate(month, { month: "long" }),
					})}
				</p>
			</CardHeader>

			<CardContent className="space-y-2">
				{isLoading ? (
					Array.from({ length: limit }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<div key={index} className="flex items-center gap-2">
							<Skeleton className="h-6 w-6 shrink-0 rounded-full" />
							<div className="w-full space-y-1">
								<Skeleton className="h-2.5 w-32" />
								<Skeleton className="h-2 w-20" />
							</div>
							<Skeleton className="h-3 w-16 shrink-0" />
						</div>
					))
				) : items.length === 0 ? (
					<p className="py-6 text-center text-xs text-muted-foreground">
						{t("topExpenses.empty")}
					</p>
				) : (
					<>
						<ol className="space-y-2">
							{items.map((item, position) => (
								<li key={item.id} className="flex items-center gap-2">
									<span
										className={cn(
											"flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
											position === 0
												? "bg-primary text-primary-foreground"
												: "bg-muted text-muted-foreground",
										)}
									>
										{position + 1}
									</span>

									<div className="min-w-0 flex-1">
										<p className="truncate text-xs font-medium">
											{item.description}
										</p>
										<p className="truncate text-[11px] text-muted-foreground">
											{item.categoryName || "—"} ·{" "}
											{formatDate(item.date, { dateStyle: "short" })}
										</p>
									</div>

									<div className="shrink-0 text-right">
										<p className="text-xs font-medium tabular-nums text-red-600 dark:text-red-400">
											{formatCurrency(item.magnitude)}
										</p>
										<p className="text-[10px] text-muted-foreground">
											{t("topExpenses.share", {
												percent: Math.round(item.share),
											})}
										</p>
									</div>
								</li>
							))}
						</ol>

						<p className="border-t pt-2 text-[11px] text-muted-foreground">
							{t("topExpenses.total", {
								count: items.length,
								amount: formatCurrency(listed),
							})}
							{total > listed && ` · ${formatCurrency(total)}`}
						</p>
					</>
				)}
			</CardContent>
		</Card>
	);
}

export default TopExpenses;
