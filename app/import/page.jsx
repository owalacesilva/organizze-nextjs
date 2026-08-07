import Layout from "@/components/layout";
import StatementImportSection from "@/components/section/import";

export default function ImportPage() {
	return (
		<Layout
			breadcrumbTitleKey="import.title"
			breadcrumbSubtitleKey="import.subtitle"
		>
			<StatementImportSection />
		</Layout>
	);
}
