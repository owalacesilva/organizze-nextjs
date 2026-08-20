import Layout from "@/components/layout";
import { DashboardSkeleton } from "@/components/section/dashboard/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.dashboard">
			<DashboardSkeleton />
		</Layout>
	);
}
