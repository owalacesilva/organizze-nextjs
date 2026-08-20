"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const socials = [
	{ label: "Facebook", icon: Facebook, href: "#" },
	{ label: "Twitter", icon: Twitter, href: "#" },
	{ label: "LinkedIn", icon: Linkedin, href: "#" },
	{ label: "YouTube", icon: Youtube, href: "#" },
];

const BRAND_SLOT = "\u0000";

export function SiteFooter({ className, ...props }) {
	const { t } = useTranslation();
	const [before, after = ""] = t("layout.copyright", {
		brand: BRAND_SLOT,
	}).split(BRAND_SLOT);

	return (
		<footer
			className={cn(
				"sidebar-transition fixed inset-x-0 bottom-0 z-40 border-t bg-background md:left-[var(--sidebar-w)]",
				className,
			)}
			{...props}
		>
			<div className="flex h-[var(--footer-height)] items-center justify-between px-3">
				<p className="text-xs text-muted-foreground">
					{before}
					<span className="text-primary">{BRAND_NAME}</span>
					{after}
				</p>
				<div className="flex items-center space-x-3">
					{socials.map((social) => (
						<Link
							key={social.label}
							href={social.href}
							className="text-muted-foreground hover:text-foreground"
						>
							<social.icon className="h-3.5 w-3.5" />
							<span className="sr-only">{social.label}</span>
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
}
