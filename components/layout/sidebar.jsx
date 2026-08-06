"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { Logo } from "../elements/logo";
import { MainNav } from "./nav";
import { useSidebar } from "./sidebar-context";

/**
 * Toggles the desktop sidebar between the icon rail and the labelled panel.
 * Rendered in the sidebar itself and in the header, so it stays reachable in
 * both states.
 */
export function SidebarToggle({ className, variant = "ghost" }) {
	const { collapsed, toggle } = useSidebar();
	const { t } = useTranslation();
	const label = collapsed
		? t("layout.expandSidebar")
		: t("layout.collapseSidebar");
	const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;

	return (
		<Button
			variant={variant}
			size="icon"
			onClick={toggle}
			aria-label={label}
			aria-expanded={!collapsed}
			title={`${label} (Ctrl+B)`}
			className={cn("h-8 w-8", className)}
		>
			<Icon className="h-4 w-4" />
		</Button>
	);
}

export function DashboardSidebar() {
	const { collapsed } = useSidebar();

	return (
		<>
			{/* Desktop rail / panel */}
			<aside className="sidebar-transition fixed inset-y-0 left-0 z-50 hidden w-[var(--sidebar-w)] flex-col bg-primary md:flex">
				<div
					className={cn(
						"flex h-[var(--header-height)] items-center border-b border-white/10",
						collapsed ? "justify-center px-2" : "justify-between pl-3 pr-2",
					)}
				>
					<Link href="/" className="flex min-w-0 items-center gap-2">
						<Logo iconOnly size="sm" className="bg-white/15" />
						{!collapsed && (
							<span className="truncate text-base font-bold tracking-tight text-white">
								{BRAND_NAME}
							</span>
						)}
					</Link>
					{!collapsed && (
						<SidebarToggle className="shrink-0 text-white/70 hover:bg-white/10 hover:text-white" />
					)}
				</div>

				<div className="flex-1 overflow-y-auto py-2">
					<MainNav variant="desktop" />
				</div>

				{collapsed && (
					<div className="flex justify-center border-t border-white/10 p-2">
						<SidebarToggle className="text-white/70 hover:bg-white/10 hover:text-white" />
					</div>
				)}
			</aside>

			{/* Mobile bottom bar, docked above the footer */}
			<nav className="fixed inset-x-0 bottom-[var(--footer-height)] z-50 flex h-[var(--mobile-nav-height)] bg-primary md:hidden">
				<MainNav variant="mobile" />
			</nav>
		</>
	);
}
