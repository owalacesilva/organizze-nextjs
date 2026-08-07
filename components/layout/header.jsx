"use client";

import { LanguageToggle } from "@/components/elements/language-toggle";
import { ModeToggle } from "@/components/elements/mode-toggle";
import { UserNav } from "@/components/elements/user-nav";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { Search } from "lucide-react";
import { UserNotification } from "../elements/user-notification";
import { SidebarToggle } from "./sidebar";

export function DashboardHeader() {
	const { t } = useTranslation();

	return (
		<header className="sidebar-transition fixed inset-x-0 top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:left-[var(--sidebar-w)]">
			<div className="container mx-auto flex h-[var(--header-height)] items-center gap-3">
				<SidebarToggle className="hidden shrink-0 md:inline-flex" />

				<div className="relative w-full max-w-sm">
					<Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder={t("common.searchPlaceholder")}
						aria-label={t("common.search")}
						className="h-8 w-full pl-8 pr-3 text-sm focus-visible:ring-0"
					/>
				</div>

				<div className="ml-auto flex shrink-0 items-center gap-1">
					<LanguageToggle />
					<ModeToggle />
					<UserNotification />
					<UserNav />
				</div>
			</div>
		</header>
	);
}
