import Layout from "@/components/layout";
import AnalyticsSection from "@/components/section/analytics";

export default function AnalyticsPage() {
	return (
		<Layout
			breadcrumbTitleKey="analytics.title"
			breadcrumbSubtitleKey="analytics.subtitle"
		>
			<AnalyticsSection />
		</Layout>
	);
}
