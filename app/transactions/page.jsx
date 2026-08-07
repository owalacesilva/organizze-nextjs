import Layout from "@/components/layout";
import TransactionsSection from "@/components/section/transactions";

export default function TransactionsPage() {
	return (
		<Layout
			breadcrumbTitleKey="transactions.title"
			breadcrumbSubtitleKey="transactions.subtitle"
		>
			<TransactionsSection />
		</Layout>
	);
}
