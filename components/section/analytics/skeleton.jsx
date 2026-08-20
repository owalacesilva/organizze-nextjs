"use client";

import {
	SkeletonChartCard,
	SkeletonMetricCards,
	SkeletonPage,
} from "@/components/elements/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsSkeleton() {
	return (
		<SkeletonPage className="space-y-3">
			<Skeleton className="h-8 w-full max-w-lg" />
			<SkeletonMetricCards count={4} />
			<SkeletonChartCard height="h-72" />
		</SkeletonPage>
	);
}

export default AnalyticsSkeleton;
