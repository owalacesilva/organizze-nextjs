import Layout from "@/components/layout";
import RewardsSection from "@/components/section/rewards";

export default function RewardsPage() {
	return (
		<Layout
			breadcrumbTitleKey="gamification.title"
			breadcrumbSubtitleKey="gamification.subtitle"
		>
			<RewardsSection />
		</Layout>
	);
}
