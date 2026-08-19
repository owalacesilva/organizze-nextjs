"use client";

import { LanguageToggle } from "@/components/elements/language-toggle";
import { ModeToggle } from "@/components/elements/mode-toggle";
import { SearchDialog } from "@/components/elements/search-dialog";
import { TokenBalance } from "@/components/elements/token-balance";
import { UserNav } from "@/components/elements/user-nav";
import { useTranslation } from "@/hooks/useTranslation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { UserNotification } from "../elements/user-notification";
import { SidebarToggle } from "./sidebar";

export function DashboardHeader() {
	const { t } = useTranslation();
	const [searchOpen, setSearchOpen] = useState(false);

	// ⌘K / Ctrl+K is what people reach for before they reach for the mouse.
	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return;
			event.preventDefault();
			setSearchOpen((open) => !open);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	return (
		<header className="sidebar-transition fixed inset-x-0 top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:left-[var(--sidebar-w)]">
			<div className="container mx-auto flex h-[var(--header-height)] items-center gap-3">
				<SidebarToggle className="hidden shrink-0 md:inline-flex" />

				{/* A button rather than a field: typing happens in the dialog, and a
				    real input here would take focus only to hand it straight over. */}
				<button
					type="button"
					onClick={() => setSearchOpen(true)}
					aria-label={t("common.search")}
					className="relative flex h-8 w-full max-w-sm items-center gap-2 rounded-md border border-input bg-background pl-8 pr-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					<Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
					<span className="truncate">{t("common.searchPlaceholder")}</span>
					<kbd className="ml-auto hidden shrink-0 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:inline-block">
						⌘K
					</kbd>
				</button>

				<div className="ml-auto flex shrink-0 items-center gap-1">
					<TokenBalance />
					<LanguageToggle />
					<ModeToggle />
					<UserNotification />
					<UserNav />
				</div>
			</div>

			<SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
		</header>
	);
}
