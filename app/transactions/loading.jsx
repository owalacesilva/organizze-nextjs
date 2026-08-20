import Layout from "@/components/layout";
import { TransactionsSkeleton } from "@/components/section/transactions/skeleton";

export default function Loading() {
	return (
		<Layout
			breadcrumbTitleKey="transactions.title"
			breadcrumbSubtitleKey="transactions.subtitle"
		>
			<TransactionsSkeleton />
		</Layout>
	);
}
