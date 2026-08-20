import Layout from "@/components/layout";
import { BudgetsSkeleton } from "@/components/section/budgets/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.budgets">
			<BudgetsSkeleton />
		</Layout>
	);
}
