"use client";

import {
	SkeletonChartCard,
	SkeletonPage,
	SkeletonTableCard,
} from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors the wallets dashboard: account rail (3 cols) beside the detail pane. */
export function WalletsSkeleton() {
	return (
		<SkeletonPage className="space-y-0 py-4 sm:py-6">
			<div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
				<div className="lg:col-span-3">
					<div className="flex gap-3 overflow-hidden pb-2 lg:flex-col lg:pb-0">
						{Array.from({ length: 4 }).map((_, index) => (
							<Card
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
								key={index}
								className="w-[200px] shrink-0 shadow-none sm:w-[220px] lg:w-full"
							>
								<CardContent className="flex items-center gap-3 p-4">
									<Skeleton className="h-11 w-11 shrink-0 rounded-full" />
									<div className="w-full space-y-2">
										<Skeleton className="h-3 w-20" />
										<Skeleton className="h-4 w-24" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				<div className="space-y-4 sm:space-y-6 lg:col-span-9">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
						<Card className="shadow-none">
							<CardContent className="space-y-3 p-4 sm:p-6">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-7 w-40" />
								<Skeleton className="h-2.5 w-32" />
							</CardContent>
						</Card>
						<Card className="shadow-none">
							<CardContent className="space-y-3 p-4 sm:p-6">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-7 w-40" />
								<Skeleton className="h-2.5 w-32" />
							</CardContent>
						</Card>
					</div>

					<SkeletonChartCard height="h-64" />
					<SkeletonTableCard rows={5} columns={5} toolbar={false} />
				</div>
			</div>
		</SkeletonPage>
	);
}

export default WalletsSkeleton;
