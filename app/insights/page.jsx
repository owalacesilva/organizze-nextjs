import Layout from "@/components/layout";
import InsightsSection from "@/components/section/insights";

export default function InsightsPage() {
	return (
		<Layout
			breadcrumbTitleKey="insights.title"
			breadcrumbSubtitleKey="insights.subtitle"
		>
			<InsightsSection />
		</Layout>
	);
}
