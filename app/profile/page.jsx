import Layout from "@/components/layout";
import ProfileSection from "@/components/section/profile";

export default function ProfilePage() {
	return (
		<Layout
			breadcrumbTitleKey="profile.title"
			breadcrumbSubtitleKey="profile.subtitle"
		>
			<ProfileSection />
		</Layout>
	);
}
