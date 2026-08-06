import Layout from "@/components/layout";
import { DashboardSkeleton } from "@/components/section/dashboard/skeleton";

// `Layout` lives inside each page rather than in a Next.js layout.jsx, so the
// route skeleton has to render the chrome too — otherwise the sidebar and
// header would disappear while the page streams in.
export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.dashboard">
			<DashboardSkeleton />
		</Layout>
	);
}
