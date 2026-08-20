"use client";

import { SkeletonPage } from "@/components/elements/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export function RewardsSkeleton() {
	return (
		<SkeletonPage className="space-y-3">
			<Skeleton className="h-40 w-full" />

			<div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
				<Skeleton className="h-64 w-full" />
				<Skeleton className="h-64 w-full" />
			</div>

			<Skeleton className="h-72 w-full" />
		</SkeletonPage>
	);
}

export default RewardsSkeleton;
