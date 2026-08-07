import Layout from "@/components/layout";
import SettingsSection from "@/components/section/settings";

export default function SettingsPage() {
	return (
		<Layout
			breadcrumbTitleKey="settings.title"
			breadcrumbSubtitleKey="settings.subtitle"
		>
			<SettingsSection />
		</Layout>
	);
}
