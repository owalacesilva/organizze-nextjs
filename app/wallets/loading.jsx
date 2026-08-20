import Layout from "@/components/layout";
import { WalletsSkeleton } from "@/components/section/wallets/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.wallets">
			<WalletsSkeleton />
		</Layout>
	);
}
