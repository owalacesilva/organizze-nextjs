import Layout from "@/components/layout";
import WalletsSection from "@/components/section/wallets";

export default function WalletsPage() {
	return (
		<Layout breadcrumbTitleKey="nav.wallets">
			<WalletsSection />
		</Layout>
	);
}
