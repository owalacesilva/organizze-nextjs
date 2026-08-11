import Layout from "@/components/layout";
import { RewardsSkeleton } from "@/components/section/rewards/skeleton";

// `Layout` lives inside each page rather than in a Next.js layout.jsx, so the
// route skeleton has to render the chrome too.
export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.rewards">
			<RewardsSkeleton />
		</Layout>
	);
}
