import Layout from "@/components/layout";
import WalletsSection from "@/components/section/wallets";

export default function WalletsPage() {
	return (
		<Layout
			breadcrumbTitleKey="wallets.title"
			breadcrumbSubtitleKey="wallets.subtitle"
		>
			<WalletsSection />
		</Layout>
	);
}
