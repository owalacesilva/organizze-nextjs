import Layout from "@/components/layout";
import { RewardsSkeleton } from "@/components/section/rewards/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.rewards">
			<RewardsSkeleton />
		</Layout>
	);
}
