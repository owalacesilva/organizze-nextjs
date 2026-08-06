"use client";

import {
	SkeletonChartCard,
	SkeletonList,
	SkeletonPage,
	SkeletonTabs,
} from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors ProfileSection: identity header, tabs, spending chart and accounts. */
export function ProfileSkeleton() {
	return (
		<SkeletonPage>
			<Card className="shadow-none">
				<CardContent className="flex flex-col items-center gap-4 p-4 sm:flex-row sm:p-6">
					<Skeleton className="h-16 w-16 shrink-0 rounded-full" />
					<div className="w-full space-y-2">
						<Skeleton className="h-5 w-44" />
						<Skeleton className="h-3 w-56" />
						<Skeleton className="h-4 w-20 rounded-full" />
					</div>
					<Skeleton className="h-8 w-28 shrink-0" />
				</CardContent>
			</Card>

			<SkeletonTabs count={4} />

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<SkeletonChartCard className="lg:col-span-2" height="h-64" />
				<SkeletonList className="lg:col-span-1" items={4} />
			</div>
		</SkeletonPage>
	);
}

export default ProfileSkeleton;
