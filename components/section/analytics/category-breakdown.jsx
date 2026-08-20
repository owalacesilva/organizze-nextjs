"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";

export function CategoryBreakdown({ title, rows }) {
	const { t, formatCurrency } = useTranslation();

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{rows.length === 0 ? (
					<p className="py-6 text-center text-xs text-muted-foreground">
						{t("analytics.empty")}
					</p>
				) : (
					rows.map((row) => (
						<div key={row.name} className="space-y-1.5">
							<div className="flex items-center gap-2">
								<span className="truncate text-xs font-medium">{row.name}</span>
								<span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted-foreground">
									{formatCurrency(row.amount)} · {Math.round(row.percentage)}%
								</span>
							</div>
							<Progress value={row.percentage} className="h-1.5" />
						</div>
					))
				)}
			</CardContent>
		</Card>
	);
}
