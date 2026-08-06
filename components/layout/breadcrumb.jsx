"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * @param items - `{ href, title }` or `{ href, titleKey }` when the label
 *                should come from the dictionary.
 */
export function Breadcrumb({ title, subtitle, items = [] }) {
	const { t } = useTranslation();

	return (
		<div className="pb-3">
			<div className="flex flex-col gap-0.5 md:flex-row md:items-center md:justify-between">
				<div className="flex flex-col gap-0.5">
					<h1 className="text-lg font-bold tracking-tight md:text-xl">
						{title}
					</h1>
					{subtitle && (
						<p className="text-xs text-muted-foreground">{subtitle}</p>
					)}
				</div>

				{items.length > 0 && (
					<nav
						aria-label="Breadcrumb"
						className="flex items-center space-x-1 text-xs text-muted-foreground"
					>
						{items.map((item, index) => {
							const isLast = index === items.length - 1;
							return (
								<div key={item.href + index} className="flex items-center">
									{index > 0 && <ChevronRight className="h-3 w-3" />}
									<Link
										href={item.href}
										aria-current={isLast ? "page" : undefined}
										className={cn(
											"hover:text-foreground",
											isLast
												? "pointer-events-none text-foreground"
												: "hover:underline",
										)}
									>
										{item.titleKey ? t(item.titleKey) : item.title}
									</Link>
								</div>
							);
						})}
					</nav>
				)}
			</div>
		</div>
	);
}
