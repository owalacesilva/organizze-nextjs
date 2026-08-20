import Layout from "@/components/layout";
import { CategoriesSkeleton } from "@/components/section/categories/skeleton";

export default function Loading() {
	return (
		<Layout breadcrumbTitle="Categorias">
			<CategoriesSkeleton />
		</Layout>
	);
}
