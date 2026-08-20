"use client";

import {
	SkeletonPage,
	SkeletonTableCard,
} from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TransactionsSkeleton() {
	return (
		<SkeletonPage className="space-y-3">
			<div className="grid gap-3 sm:grid-cols-3">
				{Array.from({ length: 3 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<Card key={index} className="shadow-none">
						<CardContent className="flex items-center gap-3 p-3">
							<Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
							<div className="w-full space-y-1.5">
								<Skeleton className="h-2.5 w-16" />
								<Skeleton className="h-4 w-24" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<SkeletonTableCard rows={10} columns={6} />
		</SkeletonPage>
	);
}

export default TransactionsSkeleton;
