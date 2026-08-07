"use client";

import { SkeletonChartCard, SkeletonPage } from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors the budgets page: toolbar, budget cards with progress, trend chart. */
export function BudgetsSkeleton() {
	return (
		<SkeletonPage className="space-y-3">
			<div className="flex items-center justify-between">
				<Skeleton className="h-3 w-48" />
				<div className="flex gap-2">
					<Skeleton className="h-8 w-8" />
					<Skeleton className="h-8 w-32" />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<Card key={index}>
						<CardContent className="space-y-2 p-3">
							<div className="space-y-1.5">
								<Skeleton className="h-2.5 w-24" />
								<Skeleton className="h-2 w-32" />
							</div>
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-1.5 w-full" />
							<div className="flex justify-between">
								<Skeleton className="h-2 w-16" />
								<Skeleton className="h-2 w-20" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<SkeletonChartCard height="h-48" />
		</SkeletonPage>
	);
}

export default BudgetsSkeleton;
