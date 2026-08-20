"use client";

import { SkeletonPage } from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WalletsSkeleton() {
	return (
		<SkeletonPage className="space-y-3">
			<div className="flex items-center justify-between">
				<Skeleton className="h-3 w-24" />
				<div className="flex gap-2">
					<Skeleton className="h-8 w-8" />
					<Skeleton className="h-8 w-28" />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<Card key={index}>
						<CardContent className="space-y-2 p-3">
							<Skeleton className="h-2.5 w-20" />
							<Skeleton className="h-5 w-28" />
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<Card key={index}>
						<CardContent className="space-y-2 p-3">
							<div className="flex items-center gap-2">
								<Skeleton className="h-7 w-7 shrink-0" />
								<div className="w-full space-y-1.5">
									<Skeleton className="h-2.5 w-24" />
									<Skeleton className="h-2 w-16" />
								</div>
							</div>
							<Skeleton className="h-5 w-28" />
							<Skeleton className="h-2.5 w-32" />
						</CardContent>
					</Card>
				))}
			</div>
		</SkeletonPage>
	);
}

export default WalletsSkeleton;
