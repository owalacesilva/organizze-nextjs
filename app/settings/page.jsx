import Layout from "@/components/layout";
import SettingsSection from "@/components/section/settings";

export default function SettingsPage() {
	return (
		<Layout breadcrumbTitleKey="nav.settings">
			<SettingsSection />
		</Layout>
	);
}
