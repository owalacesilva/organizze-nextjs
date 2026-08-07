"use client";

import { SkeletonPage } from "@/components/elements/skeletons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors the categories manager: create form beside the two lists. */
export function CategoriesSkeleton() {
	return (
		<SkeletonPage className="space-y-3">
			<div className="grid gap-3 md:grid-cols-3">
				<Card className="h-fit">
					<CardHeader>
						<Skeleton className="h-3 w-28" />
					</CardHeader>
					<CardContent className="space-y-3">
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-6 w-40" />
						<Skeleton className="h-8 w-full" />
					</CardContent>
				</Card>

				<div className="space-y-3 md:col-span-2">
					{Array.from({ length: 2 }).map((_, card) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<Card key={card}>
							<CardHeader>
								<Skeleton className="h-3 w-32" />
							</CardHeader>
							<CardContent className="space-y-2">
								{Array.from({ length: 4 }).map((_, row) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
									<div key={row} className="flex items-center gap-2">
										<Skeleton className="h-7 w-7 shrink-0" />
										<Skeleton className="h-3 w-32" />
										<Skeleton className="ml-auto h-7 w-16" />
									</div>
								))}
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</SkeletonPage>
	);
}

export default CategoriesSkeleton;
