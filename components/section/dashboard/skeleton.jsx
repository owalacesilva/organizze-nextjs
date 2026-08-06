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
		<SkeletonPage className="space-y-4 sm:space-y-5">
			<SkeletonMetricCards count={4} />

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
				<SkeletonChartCard className="lg:col-span-3" height="h-64" />
				<SkeletonDonutCard className="lg:col-span-1" />
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
				<SkeletonProgressList className="lg:col-span-1" items={4} />
				<SkeletonChartCard className="lg:col-span-3" height="h-56" />
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
				<SkeletonChartCard className="lg:col-span-3" height="h-56" />
				<SkeletonList className="lg:col-span-1" items={4} />
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
				<SkeletonProgressList className="lg:col-span-1" items={3} />
				<SkeletonList className="lg:col-span-3" items={5} />
			</div>
		</SkeletonPage>
	);
}

export default DashboardSkeleton;
