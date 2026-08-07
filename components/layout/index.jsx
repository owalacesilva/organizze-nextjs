"use client";

import { SiteFooter } from "@/components/layout/footer";
import { DashboardHeader } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { useTranslation } from "@/hooks/useTranslation";
import { Breadcrumb } from "./breadcrumb";
import { SidebarProvider, useSidebar } from "./sidebar-context";

/**
 * @param breadcrumbTitle     Literal heading text.
 * @param breadcrumbTitleKey  Dictionary key — preferred, and lets server
 *                            components stay server components.
 */
function LayoutShell({
	children,
	breadcrumbTitle,
	breadcrumbTitleKey,
	breadcrumbSubtitle,
	breadcrumbSubtitleKey,
}) {
	const { collapsed } = useSidebar();
	const { t } = useTranslation();

	const title = breadcrumbTitleKey ? t(breadcrumbTitleKey) : breadcrumbTitle;
	const subtitle = breadcrumbSubtitleKey
		? t(breadcrumbSubtitleKey)
		: breadcrumbSubtitle;

	return (
		// `data-sidebar-state` drives --sidebar-w, which the header, footer and
		// main content all read so their offsets animate together.
		<div
			data-sidebar-state={collapsed ? "collapsed" : "expanded"}
			className="relative min-h-screen"
		>
			<DashboardSidebar />
			<DashboardHeader />

			<div className="sidebar-transition pt-[var(--header-height)] pb-[calc(var(--footer-height)+var(--mobile-nav-height)+1rem)] md:pb-[calc(var(--footer-height)+1rem)] md:pl-[var(--sidebar-w)]">
				<main className="container mx-auto min-h-[calc(100vh-var(--header-height)-var(--footer-height))] py-3">
					{title && (
						<Breadcrumb
							title={title}
							subtitle={subtitle}
							items={[
								{ titleKey: "layout.home", href: "/" },
								{ title, href: "#" },
							]}
						/>
					)}
					{children}
				</main>
			</div>

			<SiteFooter />
		</div>
	);
}

export default function Layout(props) {
	return (
		<SidebarProvider>
			<LayoutShell {...props} />
		</SidebarProvider>
	);
}
