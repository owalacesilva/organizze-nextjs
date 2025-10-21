import Layout from "@/components/layout";
import { TransactionHistory } from "@/components/section/analytics/transaction-history";

export default function TransactionsPage() {
	return (
		<Layout breadcrumbTitle="Extrato">
			<TransactionHistory></TransactionHistory>
		</Layout>
	);
}
