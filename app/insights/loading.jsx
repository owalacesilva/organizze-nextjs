import Layout from "@/components/layout";
import { InsightsSkeleton } from "@/components/section/insights/skeleton";

export default function Loading() {
	return (
		<Layout
			breadcrumbTitleKey="insights.title"
			breadcrumbSubtitleKey="insights.subtitle"
		>
			<InsightsSkeleton />
		</Layout>
	);
}
