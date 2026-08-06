"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PAGE_SIZE_OPTIONS, getPageRange } from "@/hooks/usePagination";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from "lucide-react";

/**
 * Pagination bar for tables. Spread a `usePagination()` result straight into it:
 *
 * @example
 * const pagination = usePagination(rows);
 * <DataTablePagination {...pagination} />
 */
export function DataTablePagination({
	page,
	pageSize,
	totalItems,
	totalPages,
	from,
	to,
	canPrevious,
	canNext,
	setPage,
	setPageSize,
	first,
	previous,
	next,
	last,
	pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
	showPageSize = true,
	className,
}) {
	const { t, formatNumber } = useTranslation();

	if (totalItems === 0) return null;

	const pages = getPageRange(page, totalPages);

	return (
		<div
			className={cn(
				"flex flex-col gap-2 pt-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			<div className="flex items-center gap-3">
				<p>
					{t("pagination.showing", {
						from: formatNumber(from),
						to: formatNumber(to),
						total: formatNumber(totalItems),
					})}
				</p>

				{showPageSize && (
					<div className="hidden items-center gap-1.5 sm:flex">
						<span className="whitespace-nowrap">
							{t("pagination.rowsPerPage")}
						</span>
						<Select
							value={String(pageSize)}
							onValueChange={(value) => setPageSize(Number(value))}
						>
							<SelectTrigger
								className="h-7 w-[4.25rem] text-xs"
								aria-label={t("pagination.rowsPerPage")}
							>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{pageSizeOptions.map((option) => (
									<SelectItem
										key={option}
										value={String(option)}
										className="text-xs"
									>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			</div>

			<nav
				aria-label={t("pagination.page", { page, pages: totalPages })}
				className="flex items-center gap-1"
			>
				<Button
					variant="outline"
					size="icon"
					className="hidden h-7 w-7 sm:inline-flex"
					onClick={first}
					disabled={!canPrevious}
					aria-label={t("pagination.first")}
				>
					<ChevronsLeft className="h-3.5 w-3.5" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="h-7 w-7"
					onClick={previous}
					disabled={!canPrevious}
					aria-label={t("pagination.previous")}
				>
					<ChevronLeft className="h-3.5 w-3.5" />
				</Button>

				{pages.map((entry) =>
					typeof entry === "number" ? (
						<Button
							key={entry}
							variant={entry === page ? "default" : "outline"}
							size="icon"
							className="h-7 w-7 text-xs"
							onClick={() => setPage(entry)}
							aria-label={t("pagination.goToPage", { page: entry })}
							aria-current={entry === page ? "page" : undefined}
						>
							{entry}
						</Button>
					) : (
						<span
							key={entry}
							aria-hidden
							className="flex h-7 w-7 items-center justify-center"
						>
							<MoreHorizontal className="h-3.5 w-3.5" />
						</span>
					),
				)}

				<Button
					variant="outline"
					size="icon"
					className="h-7 w-7"
					onClick={next}
					disabled={!canNext}
					aria-label={t("pagination.next")}
				>
					<ChevronRight className="h-3.5 w-3.5" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="hidden h-7 w-7 sm:inline-flex"
					onClick={last}
					disabled={!canNext}
					aria-label={t("pagination.last")}
				>
					<ChevronsRight className="h-3.5 w-3.5" />
				</Button>
			</nav>
		</div>
	);
}
