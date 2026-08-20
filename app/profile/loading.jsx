import Layout from "@/components/layout";
import { ProfileSkeleton } from "@/components/section/profile/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.profile">
			<ProfileSkeleton />
		</Layout>
	);
}
