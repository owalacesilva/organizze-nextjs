import Layout from "@/components/layout";
import { BudgetsSkeleton } from "@/components/section/budgets/skeleton";

// `Layout` lives inside each page rather than in a Next.js layout.jsx, so the
// route skeleton has to render the chrome too — otherwise the sidebar and
// header would disappear while the page streams in.
export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.budgets">
			<BudgetsSkeleton />
		</Layout>
	);
}
