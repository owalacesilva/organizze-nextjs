import Layout from "@/components/layout";
import { QuotesSkeleton } from "@/components/section/quotes/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.quotes">
			<QuotesSkeleton />
		</Layout>
	);
}
