// import Breadcrumb from "@/components/breadcrumb"
import { SiteFooter } from "@/components/layout/footer"
import { DashboardHeader } from "@/components/layout/header"
import { DashboardSidebar } from "@/components/layout/sidebar"
import { Breadcrumb } from "./breadcrumb"

export default function Layout({ children, breadcrumbTitle }) {
	return (
		<>
			<div className="relative min-h-screen">
				<DashboardSidebar />
				<DashboardHeader />
				<div className="pt-[88px] pb-32 md:pl-[82px]">
					<main className="min-h-[calc(100vh-88px-64px)] container mx-auto">
						{breadcrumbTitle && (
							<Breadcrumb
								title={breadcrumbTitle}
								items={[
									{ title: "Home", href: "/" },
									{ title: breadcrumbTitle, href: "#" },
								]}
							/>
						)}
						{children}
					</main>
				</div>
				<SiteFooter />
			</div>
		</>
	)
}

