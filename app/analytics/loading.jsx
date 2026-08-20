import Layout from "@/components/layout";
import { AnalyticsSkeleton } from "@/components/section/analytics/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.analytics">
			<AnalyticsSkeleton />
		</Layout>
	);
}
