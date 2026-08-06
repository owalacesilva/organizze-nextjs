"use client";

import {
	SkeletonChartCard,
	SkeletonDonutCard,
	SkeletonPage,
	SkeletonTableCard,
} from "@/components/elements/skeletons";

/**
 * Mirrors the Income breakdown the categories page renders: a bar chart and a
 * donut side by side, then the detail table.
 */
export function CategoriesSkeleton() {
	return (
		<SkeletonPage className="space-y-4 sm:space-y-6">
			<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
				<SkeletonChartCard height="h-[200px] sm:h-[250px] md:h-[300px]" />
				<SkeletonDonutCard legendItems={4} />
			</div>

			<SkeletonTableCard rows={6} columns={5} toolbar={false} pagination={false} />
		</SkeletonPage>
	);
}

export default CategoriesSkeleton;
