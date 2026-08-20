"use client";

import { Badge } from "@/components/ui/badge";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";
import { searchFeatures } from "@/lib/search";
import {
	ArrowLeftRight,
	BarChart3,
	CandlestickChart,
	LayoutDashboard,
	Lightbulb,
	PiggyBank,
	Search,
	Settings,
	Shapes,
	Target,
	Upload,
	User,
	Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const FEATURES = [
	{ href: "/", icon: LayoutDashboard, labelKey: "nav.dashboard", descriptionKey: "dashboard.subtitle", key: "dashboard" },
	{ href: "/transactions", icon: ArrowLeftRight, labelKey: "nav.transactions", descriptionKey: "transactions.subtitle", key: "transactions" },
	{ href: "/wallets", icon: Wallet, labelKey: "nav.wallets", descriptionKey: "wallets.subtitle", key: "wallets" },
	{ href: "/budgets", icon: PiggyBank, labelKey: "nav.budgets", descriptionKey: "budgets.subtitle", key: "budgets" },
	{ href: "/goals", icon: Target, labelKey: "nav.goals", descriptionKey: "goals.subtitle", key: "goals" },
	{ href: "/quotes", icon: CandlestickChart, labelKey: "nav.quotes", descriptionKey: "quotes.subtitle", key: "quotes" },
	{ href: "/analytics", icon: BarChart3, labelKey: "nav.analytics", descriptionKey: "analytics.subtitle", key: "analytics" },
	{ href: "/insights", icon: Lightbulb, labelKey: "nav.insights", descriptionKey: "insights.subtitle", key: "insights" },
	{ href: "/import", icon: Upload, labelKey: "nav.import", descriptionKey: "import.subtitle", key: "import" },
	{ href: "/categories", icon: Shapes, labelKey: "nav.categories", descriptionKey: "categories.subtitle", key: "categories" },
	{ href: "/profile", icon: User, labelKey: "nav.profile", descriptionKey: "profile.subtitle", key: "profile" },
	{ href: "/settings", icon: Settings, labelKey: "nav.settings", descriptionKey: "settings.subtitle", key: "settings" },
];

const SUGGESTIONS = ["quotes", "budgets", "goals"];

export function SearchDialog({ open, onOpenChange }) {
	const { t } = useTranslation();
	const router = useRouter();
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (!open) setQuery("");
	}, [open]);

	const entries = useMemo(
		() =>
			FEATURES.map((feature) => ({
				...feature,
				label: t(feature.labelKey),
				description: t(feature.descriptionKey),
				keywords: t(`search.keywords.${feature.key}`),
			})),
		[t],
	);

	const results = useMemo(
		() => searchFeatures(entries, query),
		[entries, query],
	);

	const hasQuery = query.trim().length > 0;

	const go = (href) => {
		onOpenChange(false);
		router.push(href);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="overflow-hidden p-0 shadow-lg"
				closeLabel={t("common.close")}
				aria-describedby={undefined}
			>
				<DialogTitle className="sr-only">{t("search.title")}</DialogTitle>
				<Command shouldFilter={false}>
					<div className="relative">
						<CommandInput
							value={query}
							onValueChange={setQuery}
							placeholder={t("search.placeholder")}
							className="pr-28"
						/>
						<Badge
							variant="secondary"
							className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2"
						>
							{t("search.beta")}
						</Badge>
					</div>

					<CommandList className="max-h-[320px]">
						{!hasQuery ? (
							<div className="flex flex-col items-center px-4 py-10 text-center">
								<Search className="mb-3 h-8 w-8 text-muted-foreground/40" />
								<p className="text-sm font-semibold">{t("search.emptyTitle")}</p>
								<p className="mt-0.5 text-xs text-muted-foreground">
									{t("search.emptyDescription")}
								</p>

								<p className="mt-5 text-[11px] text-muted-foreground">
									{t("search.trySearching")}
								</p>
								<div className="mt-1 flex flex-wrap justify-center gap-3">
									{SUGGESTIONS.map((key) => (
										<button
											key={key}
											type="button"
											onClick={() => setQuery(t(`nav.${key}`))}
											className="text-xs font-medium text-primary hover:underline"
										>
											{t(`nav.${key}`)}
										</button>
									))}
								</div>
							</div>
						) : results.length === 0 ? (
							<div className="flex flex-col items-center px-4 py-10 text-center">
								<Search className="mb-3 h-8 w-8 text-muted-foreground/40" />
								<p className="text-sm font-semibold">{t("search.noResults")}</p>
								<p className="mt-0.5 text-xs text-muted-foreground">
									{t("search.noResultsHint", { term: query.trim() })}
								</p>
							</div>
						) : (
							<CommandGroup heading={t("search.group")}>
								{results.map((feature) => (
									<CommandItem
										key={feature.href}
										value={feature.href}
										onSelect={() => go(feature.href)}
										className="gap-2"
									>
										<feature.icon className="shrink-0 text-muted-foreground" />
										<span className="flex min-w-0 flex-col">
											<span className="truncate text-xs font-medium">
												{feature.label}
											</span>
											<span className="truncate text-[11px] text-muted-foreground">
												{feature.description}
											</span>
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						)}
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
