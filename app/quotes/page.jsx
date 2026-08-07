import Layout from "@/components/layout";
import QuotesSection from "@/components/section/quotes";

export default function QuotesPage() {
	return (
		<Layout
			breadcrumbTitleKey="quotes.title"
			breadcrumbSubtitleKey="quotes.subtitle"
		>
			<QuotesSection />
		</Layout>
	);
}
