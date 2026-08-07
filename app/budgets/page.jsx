import Layout from "@/components/layout";
import BudgetsSection from "@/components/section/budgets";

export default function BudgetsPage() {
	return (
		<Layout
			breadcrumbTitleKey="budgets.title"
			breadcrumbSubtitleKey="budgets.subtitle"
		>
			<BudgetsSection />
		</Layout>
	);
}
