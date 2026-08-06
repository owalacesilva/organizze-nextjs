"use client";

import {
	SkeletonMetricCards,
	SkeletonPage,
	SkeletonProgressList,
	SkeletonTableCard,
} from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors GoalsSection: goal rail (3 cols) beside the selected goal's detail. */
export function GoalsSkeleton() {
	return (
		<SkeletonPage className="space-y-6">
			<div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
				<div className="hidden space-y-4 lg:col-span-3 lg:block">
					{Array.from({ length: 4 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<Card key={index} className="shadow-none">
							<CardContent className="flex items-center gap-4 p-4 sm:p-6">
								<Skeleton className="h-11 w-11 shrink-0 rounded-full" />
								<div className="w-full space-y-2">
									<Skeleton className="h-3 w-28" />
									<Skeleton className="h-2.5 w-24" />
								</div>
							</CardContent>
						</Card>
					))}
					<Skeleton className="h-9 w-full" />
				</div>

				<div className="space-y-4 sm:space-y-6 lg:col-span-9">
					<Skeleton className="h-8 w-48" />

					<Card className="shadow-none">
						<CardContent className="space-y-4 p-4 sm:p-6">
							<div className="flex justify-between">
								<Skeleton className="h-6 w-28" />
								<Skeleton className="h-6 w-28" />
							</div>
							<Skeleton className="h-2 w-full rounded-full" />
							<div className="flex justify-between">
								<Skeleton className="h-3 w-10" />
								<Skeleton className="h-3 w-10" />
							</div>
						</CardContent>
					</Card>

					<SkeletonMetricCards count={4} />
					<SkeletonProgressList items={3} />
					<SkeletonTableCard rows={5} columns={4} toolbar={false} />
				</div>
			</div>
		</SkeletonPage>
	);
}

export default GoalsSkeleton;
