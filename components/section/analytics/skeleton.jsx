"use client";

import {
	SkeletonChartCard,
	SkeletonMetricCards,
	SkeletonPage,
	SkeletonTabs,
} from "@/components/elements/skeletons";

/** Mirrors AnalyticsSection: tab strip, metric row, then the chart grid. */
export function AnalyticsSkeleton() {
	return (
		<SkeletonPage>
			<SkeletonTabs count={6} />
			<SkeletonMetricCards count={4} />

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<SkeletonChartCard height="h-64" />
				<SkeletonChartCard height="h-64" />
			</div>

			<SkeletonChartCard height="h-72" />
		</SkeletonPage>
	);
}

export default AnalyticsSkeleton;
