import Layout from "@/components/layout";
import { GoalsSkeleton } from "@/components/section/goals/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitleKey="nav.goals">
			<GoalsSkeleton />
		</Layout>
	);
}
