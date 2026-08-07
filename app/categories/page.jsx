import Layout from "@/components/layout";
import Categories from "@/components/section/settings/categories";

export default function CategoriesPage() {
	return (
		<Layout
			breadcrumbTitleKey="categories.title"
			breadcrumbSubtitleKey="categories.subtitle"
		>
			<Categories />
		</Layout>
	);
}
