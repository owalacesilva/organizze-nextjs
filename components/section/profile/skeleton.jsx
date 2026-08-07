"use client";

import { SkeletonChartCard, SkeletonPage } from "@/components/elements/skeletons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors ProfileSection: overview card beside the per-wallet spending panel. */
export function ProfileSkeleton() {
	return (
		<SkeletonPage className="grid grid-cols-1 gap-2 space-y-0 sm:gap-3 lg:grid-cols-12">
			<Card className="lg:col-span-4">
				<CardHeader>
					<Skeleton className="h-3 w-20" />
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-start gap-2">
						<Skeleton className="h-12 w-12 shrink-0" />
						<div className="w-full space-y-1.5">
							<Skeleton className="h-3 w-32" />
							<Skeleton className="h-2.5 w-40" />
							<Skeleton className="h-4 w-16" />
						</div>
					</div>
					<Skeleton className="h-1.5 w-full" />
					<Skeleton className="h-28 w-full" />
					<div className="grid grid-cols-3 gap-1">
						<Skeleton className="h-10" />
						<Skeleton className="h-10" />
						<Skeleton className="h-10" />
					</div>
				</CardContent>
			</Card>

			<div className="lg:col-span-8">
				<SkeletonChartCard height="h-56" />
			</div>
		</SkeletonPage>
	);
}

export default ProfileSkeleton;
