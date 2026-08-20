import Layout from "@/components/layout";
import { SettingsSkeleton } from "@/components/section/settings/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.settings">
			<SettingsSkeleton />
		</Layout>
	);
}
