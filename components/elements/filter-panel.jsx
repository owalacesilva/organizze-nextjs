"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

/**
 * Collapsible container for filter controls, so a dense filter area can be
 * folded away when it is not in use.
 *
 * Renders uncontrolled by default; pass `open` + `onOpenChange` to control it.
 *
 * @example
 * <FilterPanel activeCount={2} onClear={reset}>
 *   <FilterField label="Category">…</FilterField>
 * </FilterPanel>
 */
export function FilterPanel({
	children,
	title,
	activeCount = 0,
	onClear,
	defaultOpen = false,
	open: controlledOpen,
	onOpenChange,
	className,
	contentClassName,
}) {
	const { t } = useTranslation();
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : uncontrolledOpen;

	const setOpen = (next) => {
		if (!isControlled) setUncontrolledOpen(next);
		onOpenChange?.(next);
	};

	return (
		<Collapsible
			open={open}
			onOpenChange={setOpen}
			className={cn("rounded-lg border bg-card", className)}
		>
			<div className="flex items-center justify-between gap-2 px-3 py-2">
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="h-7 gap-2 px-2 text-xs font-medium"
						aria-label={open ? t("filters.hide") : t("filters.show")}
					>
						<SlidersHorizontal className="h-3.5 w-3.5" />
						{title ?? t("filters.title")}
						{activeCount > 0 && (
							<Badge
								variant="secondary"
								className="h-4 px-1.5 text-[10px] font-medium"
							>
								{t("filters.active", { count: activeCount })}
							</Badge>
						)}
						<ChevronDown
							aria-hidden
							className={cn(
								"h-3.5 w-3.5 transition-transform duration-200",
								open && "rotate-180",
							)}
						/>
					</Button>
				</CollapsibleTrigger>

				{activeCount > 0 && onClear && (
					<Button
						variant="ghost"
						size="sm"
						onClick={onClear}
						className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
					>
						<X className="h-3.5 w-3.5" />
						{t("filters.clear")}
					</Button>
				)}
			</div>

			<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
				<div
					className={cn(
						"grid gap-3 border-t px-3 py-3 sm:grid-cols-2 lg:grid-cols-4",
						contentClassName,
					)}
				>
					{children}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}

/** Label + control pair sized for the FilterPanel grid. */
export function FilterField({ label, htmlFor, children, className }) {
	return (
		<div className={cn("space-y-1", className)}>
			<label
				htmlFor={htmlFor}
				className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
			>
				{label}
			</label>
			{children}
		</div>
	);
}
