"use client";

import {
	SkeletonChartCard,
	SkeletonDonutCard,
	SkeletonList,
	SkeletonMetricCards,
	SkeletonPage,
	SkeletonProgressList,
} from "@/components/elements/skeletons";

/** Mirrors DashboardSection: metric row, then four 3/1 and 1/3 splits. */
export function DashboardSkeleton() {
	return (
		<SkeletonPage className="space-y-2 sm:space-y-3">
			<SkeletonMetricCards count={4} />

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
				<SkeletonChartCard className="lg:col-span-3" height="h-64" />
				<SkeletonDonutCard className="lg:col-span-1" />
			</div>

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
				<SkeletonProgressList className="lg:col-span-1" items={4} />
				<SkeletonChartCard className="lg:col-span-3" height="h-56" />
			</div>

			<div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
				<SkeletonChartCard className="lg:col-span-3" height="h-48" />
				<SkeletonProgressList className="lg:col-span-1" items={3} />
			</div>

			<SkeletonList items={6} />
		</SkeletonPage>
	);
}

export default DashboardSkeleton;
