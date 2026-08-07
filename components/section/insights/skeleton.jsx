"use client";

import { SkeletonPage } from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors InsightsSection: summary tiles, insight cards, then the two lists. */
export function InsightsSkeleton() {
	return (
		<SkeletonPage className="space-y-3">
			<Skeleton className="h-2.5 w-32" />

			<div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<Card key={index}>
						<CardContent className="space-y-2 p-3">
							<Skeleton className="h-2.5 w-20" />
							<Skeleton className="h-5 w-24" />
						</CardContent>
					</Card>
				))}
			</div>

			<Skeleton className="h-3 w-40" />

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
				{Array.from({ length: 4 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<Card key={index}>
						<CardContent className="flex items-start gap-2 p-3">
							<Skeleton className="h-7 w-7 shrink-0 rounded-full" />
							<div className="w-full space-y-1.5">
								<Skeleton className="h-2.5 w-40" />
								<Skeleton className="h-2 w-full" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</SkeletonPage>
	);
}

export default InsightsSkeleton;
