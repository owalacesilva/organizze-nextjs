"use client";

import {
	SkeletonChartCard,
	SkeletonPage,
	SkeletonProgressList,
} from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors BudgetsSection: budget cards with progress, then the trend chart. */
export function BudgetsSkeleton() {
	return (
		<SkeletonPage>
			<div className="flex items-center justify-between">
				<Skeleton className="h-5 w-40" />
				<Skeleton className="h-8 w-32" />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<Card key={index} className="shadow-none">
						<CardContent className="space-y-3 p-4">
							<div className="flex items-center gap-3">
								<Skeleton className="h-10 w-10 shrink-0 rounded-full" />
								<div className="w-full space-y-1.5">
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-2.5 w-16" />
								</div>
							</div>
							<Skeleton className="h-2 w-full rounded-full" />
							<div className="flex justify-between">
								<Skeleton className="h-2.5 w-16" />
								<Skeleton className="h-2.5 w-16" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<SkeletonChartCard className="lg:col-span-2" height="h-64" />
				<SkeletonProgressList className="lg:col-span-1" items={5} />
			</div>
		</SkeletonPage>
	);
}

export default BudgetsSkeleton;
