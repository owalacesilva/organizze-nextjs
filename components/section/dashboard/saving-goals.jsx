"use client";

import { useGetGoals } from "@/app/api/goals/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";

export function SavingGoals() {
	const { t, formatCurrency } = useTranslation();
	const goalsQuery = useGetGoals();

	const goals = goalsQuery.data?.goals ?? [];

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("dashboard.savingGoals")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{goalsQuery.isPending ? (
					Array.from({ length: 3 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<div key={index} className="space-y-1.5">
							<Skeleton className="h-2.5 w-28" />
							<Skeleton className="h-1.5 w-full" />
						</div>
					))
				) : goals.length === 0 ? (
					<p className="py-6 text-center text-xs text-muted-foreground">
						{t("dashboard.noGoals")}
					</p>
				) : (
					goals.map((goal) => {
						const percent = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;

						return (
							<div key={goal.id} className="space-y-1.5">
								<div className="flex items-center gap-2">
									<span className="truncate text-xs font-medium">
										{goal.name}
									</span>
									<span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted-foreground">
										{formatCurrency(goal.saved)} / {formatCurrency(goal.target)}
									</span>
								</div>
								<Progress value={Math.min(100, percent)} className="h-1.5" />
							</div>
						);
					})
				)}
			</CardContent>
		</Card>
	);
}
