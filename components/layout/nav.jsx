"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
	BarChart3,
	Headphones,
	LayoutDashboard,
	LinkIcon,
	PiggyBank,
	Settings,
	Target,
	User,
	Wallet,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
	{ title: "Dashboard", icon: LayoutDashboard, href: "/" },
	{ title: "Wallets", icon: Wallet, href: "/wallets" },
	{ title: "Budgets", icon: PiggyBank, href: "/budgets" },
	{ title: "Goals", icon: Target, href: "/goals" },
	{ title: "Profile", icon: User, href: "/profile" },
	{ title: "Analytics", icon: BarChart3, href: "/analytics" },
	{ title: "Support", icon: Headphones, href: "/support" },
	{ title: "Referrals", icon: LinkIcon, href: "/referrals" },
	{ title: "Settings", icon: Settings, href: "/settings" },
]

export function MainNav({ variant = "desktop" }) {
	const pathname = usePathname()
	const isDesktop = variant === "desktop"

	return (
		<TooltipProvider delayDuration={300}>
			<nav
				className={cn("flex relative", isDesktop ? "flex-col gap-2" : "flex-row items-center justify-around w-full")}
			>
				{items.map((item) =>
					isDesktop ? (
						<Tooltip key={item.href}>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									className={cn(
										"flex items-center justify-center rounded-xl p-3 w-12 mx-auto text-white/70 hover:bg-white/10 hover:text-white transition-colors",
										pathname === item.href && "bg-white/10 text-white",
									)}
								>
									<item.icon className="h-5 w-5" />
									<span className="sr-only">{item.title}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right" align="center" sideOffset={12} className="z-50">
								{item.title}
							</TooltipContent>
						</Tooltip>
					) : (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center justify-center rounded-xl p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors",
								pathname === item.href && "bg-white/10 text-white",
								"flex-col text-[10px]",
							)}
						>
							<item.icon className="h-5 w-5 mb-1" />
							{/* <span>{item.title}</span> */}
						</Link>
					),
				)}
			</nav>
		</TooltipProvider>
	)
}

