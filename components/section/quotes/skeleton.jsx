"use client";

import { SkeletonPage, SkeletonTabs } from "@/components/elements/skeletons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors QuotesSection: tab strip, then the panel's header and quote table. */
export function QuotesSkeleton() {
	return (
		<SkeletonPage>
			<Skeleton className="h-9 w-full md:hidden" />
			<SkeletonTabs count={5} className="hidden md:flex" />

			<Card className="mt-3">
				<CardHeader className="flex-col gap-2 space-y-0 sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-1.5">
						<Skeleton className="h-3.5 w-28" />
						<Skeleton className="h-2.5 w-40" />
					</div>
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-full sm:w-56" />
						<Skeleton className="h-8 w-8 shrink-0" />
					</div>
				</CardHeader>

				<CardContent>
					{/* Cards are the default view, so the route skeleton shows a grid. */}
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 6 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
							<Skeleton key={index} className="h-44" />
						))}
					</div>
					<div className="flex items-center justify-between pt-3">
						<Skeleton className="h-3 w-40" />
						<div className="flex gap-1">
							{Array.from({ length: 5 }).map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
								<Skeleton key={index} className="h-7 w-7" />
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</SkeletonPage>
	);
}

export default QuotesSkeleton;
