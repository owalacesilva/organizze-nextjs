import Layout from "@/components/layout";
import DashboardSection from "@/components/section/dashboard";

export default function Home() {
	return (
		<Layout breadcrumbTitleKey="nav.dashboard">
			<DashboardSection />
		</Layout>
	);
}
