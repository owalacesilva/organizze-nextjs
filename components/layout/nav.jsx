"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
	ArrowLeftRight,
	BarChart3,
	Headphones,
	LayoutDashboard,
	LinkIcon,
	PiggyBank,
	Settings,
	Target,
	User,
	Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";

const items = [
	{ key: "dashboard", icon: LayoutDashboard, href: "/" },
	{ key: "transactions", icon: ArrowLeftRight, href: "/transactions" },
	{ key: "wallets", icon: Wallet, href: "/wallets" },
	{ key: "budgets", icon: PiggyBank, href: "/budgets" },
	{ key: "goals", icon: Target, href: "/goals" },
	{ key: "analytics", icon: BarChart3, href: "/analytics" },
	{ key: "profile", icon: User, href: "/profile" },
	{ key: "support", icon: Headphones, href: "/support" },
	{ key: "referrals", icon: LinkIcon, href: "/referrals" },
	{ key: "settings", icon: Settings, href: "/settings" },
];

/** Mobile bottom bar shows only the primary destinations. */
const mobileItems = items.slice(0, 5);

export function MainNav({ variant = "desktop" }) {
	const pathname = usePathname();
	const { collapsed } = useSidebar();
	const { t } = useTranslation();
	const isDesktop = variant === "desktop";

	if (!isDesktop) {
		return (
			<nav className="flex w-full flex-row items-center justify-around">
				{mobileItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						aria-current={pathname === item.href ? "page" : undefined}
						className={cn(
							"flex flex-col items-center justify-center rounded-lg px-2.5 py-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white",
							pathname === item.href && "bg-white/10 text-white",
						)}
					>
						<item.icon className="h-4 w-4" />
						<span className="sr-only">{t(`nav.${item.key}`)}</span>
					</Link>
				))}
			</nav>
		);
	}

	return (
		<TooltipProvider delayDuration={300}>
			<nav className="flex flex-col gap-0.5 px-2">
				{items.map((item) => {
					const label = t(`nav.${item.key}`);
					const isActive = pathname === item.href;

					const link = (
						<Link
							href={item.href}
							aria-current={isActive ? "page" : undefined}
							className={cn(
								"flex items-center rounded-lg text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white",
								collapsed
									? "h-9 w-9 justify-center mx-auto"
									: "h-9 w-full gap-2.5 px-2.5",
								isActive && "bg-white/10 text-white",
							)}
						>
							<item.icon className="h-4 w-4 shrink-0" />
							{collapsed ? (
								<span className="sr-only">{label}</span>
							) : (
								<span className="truncate">{label}</span>
							)}
						</Link>
					);

					// Tooltips only earn their place when the label is hidden.
					return collapsed ? (
						<Tooltip key={item.href}>
							<TooltipTrigger asChild>{link}</TooltipTrigger>
							<TooltipContent side="right" align="center" sideOffset={10}>
								{label}
							</TooltipContent>
						</Tooltip>
					) : (
						<div key={item.href}>{link}</div>
					);
				})}
			</nav>
		</TooltipProvider>
	);
}
