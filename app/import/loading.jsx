import Layout from "@/components/layout";
import { SkeletonPage } from "@/components/elements/skeletons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="import.title">
			<SkeletonPage className="space-y-3">
				<Card>
					<CardContent className="flex flex-col items-center gap-2 p-6">
						<Skeleton className="h-7 w-7 rounded-full" />
						<Skeleton className="h-3 w-40" />
						<Skeleton className="h-2.5 w-56" />
						<Skeleton className="h-8 w-32" />
					</CardContent>
				</Card>
			</SkeletonPage>
		</Layout>
	);
}
