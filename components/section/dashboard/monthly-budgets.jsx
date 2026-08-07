"use client";

import { useGetBudgets } from "@/app/api/budgets/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function MonthlyBudgets() {
	const { t, formatCurrency } = useTranslation();
	const budgetsQuery = useGetBudgets();

	const budgets = budgetsQuery.data?.budgets ?? [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("dashboard.monthlyBudgets")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{budgetsQuery.isPending ? (
					Array.from({ length: 4 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<div key={index} className="space-y-1.5">
							<Skeleton className="h-2.5 w-24" />
							<Skeleton className="h-1.5 w-full" />
						</div>
					))
				) : budgets.length === 0 ? (
					<p className="py-6 text-center text-xs text-muted-foreground">
						{t("dashboard.noBudgets")}
					</p>
				) : (
					budgets.map((budget) => {
						const spent = budget.spent ?? 0;
						const percent =
							budget.amount > 0 ? (spent / budget.amount) * 100 : 0;

						return (
							<div key={budget.id} className="space-y-1.5">
								<div className="flex items-center gap-2">
									<span className="truncate text-xs font-medium">
										{budget.name}
									</span>
									<span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted-foreground">
										{formatCurrency(spent)} / {formatCurrency(budget.amount)}
									</span>
								</div>
								<Progress
									value={Math.min(100, percent)}
									className={cn(
										"h-1.5",
										percent > 100 && "[&>div]:bg-destructive",
									)}
								/>
							</div>
						);
					})
				)}
			</CardContent>
		</Card>
	);
}
