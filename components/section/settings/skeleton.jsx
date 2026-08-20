"use client";

import {
	SkeletonFormCard,
	SkeletonPage,
	SkeletonTabs,
} from "@/components/elements/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export function SettingsSkeleton() {
	return (
		<SkeletonPage>
			<Skeleton className="h-9 w-full md:hidden" />
			<SkeletonTabs count={10} className="hidden md:flex" />

			<div className="space-y-2 pt-2">
				<SkeletonFormCard fields={4} />
				<SkeletonFormCard fields={2} />
			</div>
		</SkeletonPage>
	);
}

export default SettingsSkeleton;
