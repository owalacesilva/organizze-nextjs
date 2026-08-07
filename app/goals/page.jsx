import Layout from "@/components/layout";
import GoalsSection from "@/components/section/goals";

export default function GoalsPage() {
	return (
		<Layout
			breadcrumbTitleKey="goals.title"
			breadcrumbSubtitleKey="goals.subtitle"
		>
			<GoalsSection />
		</Layout>
	);
}
