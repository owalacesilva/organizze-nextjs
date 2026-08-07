"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

/**
 * Building blocks for page-level loading states. Each one mirrors the shape of
 * the real content it stands in for, so the layout does not jump when the data
 * arrives.
 *
 * Wrap a page skeleton in <SkeletonPage> once — it owns the single live region
 * so assistive tech announces "loading" rather than reading empty boxes.
 */
export function SkeletonPage({ children, className }) {
	const { t } = useTranslation();

	return (
		<div
			role="status"
			aria-busy="true"
			aria-live="polite"
			className={cn("space-y-2", className)}
		>
			<span className="sr-only">{t("common.loading")}</span>
			{children}
		</div>
	);
}

/** Stacked text lines; the last one is short so it reads like a paragraph. */
export function SkeletonText({ lines = 3, className }) {
	return (
		<div className={cn("space-y-2", className)}>
			{Array.from({ length: lines }).map((_, index) => (
				<Skeleton
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					key={index}
					className={cn("h-3", index === lines - 1 ? "w-2/3" : "w-full")}
				/>
			))}
		</div>
	);
}

/** Row of compact stat tiles — icon, caption, value. */
export function SkeletonMetricCards({ count = 4, className }) {
	return (
		<div
			className={cn(
				"grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
				className,
			)}
		>
			{Array.from({ length: count }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
				<Card key={index} className="shadow-none">
					<CardContent className="flex items-center gap-3 p-3">
						<Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
						<div className="w-full space-y-2">
							<Skeleton className="h-2.5 w-20" />
							<Skeleton className="h-4 w-28" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

/** Card with a title and a plot area. */
export function SkeletonChartCard({ height = "h-56", className, title = true }) {
	return (
		<Card className={cn("shadow-none", className)}>
			{title && (
				<CardHeader className="p-3 pb-0">
					<Skeleton className="h-4 w-40" />
					<Skeleton className="h-2.5 w-24" />
				</CardHeader>
			)}
			<CardContent className="p-3">
				<Skeleton className={cn("w-full", height)} />
			</CardContent>
		</Card>
	);
}

/** Donut/pie placeholder with a small legend. */
export function SkeletonDonutCard({ className, legendItems = 4 }) {
	return (
		<Card className={cn("shadow-none", className)}>
			<CardHeader className="p-3 pb-0">
				<Skeleton className="h-4 w-32" />
			</CardHeader>
			<CardContent className="flex flex-col items-center gap-2 p-3">
				<Skeleton className="h-36 w-36 rounded-full" />
				<div className="w-full space-y-2">
					{Array.from({ length: legendItems }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<div key={index} className="flex items-center gap-2">
							<Skeleton className="h-2.5 w-2.5 rounded-full" />
							<Skeleton className="h-2.5 flex-1" />
							<Skeleton className="h-2.5 w-8" />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

/**
 * Table placeholder. Column widths cycle so the rows read as a table rather
 * than a block of identical bars.
 */
const COLUMN_WIDTHS = ["w-32", "w-24", "w-20", "w-28", "w-16"];

export function SkeletonTable({
	rows = 8,
	columns = 5,
	header = true,
	className,
}) {
	return (
		<div className={cn("w-full", className)}>
			{header && (
				<div className="flex items-center gap-2 border-b py-2">
					{Array.from({ length: columns }).map((_, index) => (
						<Skeleton
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
							key={index}
							className={cn(
								"h-3",
								COLUMN_WIDTHS[index % COLUMN_WIDTHS.length],
								index === columns - 1 && "ml-auto",
							)}
						/>
					))}
				</div>
			)}
			{Array.from({ length: rows }).map((_, rowIndex) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					key={rowIndex}
					className="flex items-center gap-2 border-b py-3 last:border-0"
				>
					{Array.from({ length: columns }).map((_, columnIndex) => (
						<Skeleton
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
							key={columnIndex}
							className={cn(
								"h-3.5",
								COLUMN_WIDTHS[columnIndex % COLUMN_WIDTHS.length],
								columnIndex === columns - 1 && "ml-auto",
							)}
						/>
					))}
				</div>
			))}
		</div>
	);
}

/** Table wrapped in a card, with the toolbar and pagination bar around it. */
export function SkeletonTableCard({
	rows = 8,
	columns = 5,
	toolbar = true,
	pagination = true,
	className,
}) {
	return (
		<Card className={cn("shadow-none", className)}>
			{toolbar && (
				<CardHeader className="gap-3 p-3">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
						<Skeleton className="h-8 w-full sm:max-w-xs" />
						<div className="flex gap-2 sm:ml-auto">
							<Skeleton className="h-8 w-8" />
							<Skeleton className="h-8 w-36" />
						</div>
					</div>
					<Skeleton className="h-8 w-full rounded-lg" />
				</CardHeader>
			)}
			<CardContent className={cn("p-3", toolbar && "pt-0")}>
				<SkeletonTable rows={rows} columns={columns} />
				{pagination && (
					<div className="flex items-center justify-between pt-3">
						<Skeleton className="h-3 w-40" />
						<div className="flex gap-1">
							{Array.from({ length: 5 }).map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
								<Skeleton key={index} className="h-7 w-7" />
							))}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

/** Vertical list of avatar/icon + two-line rows. */
export function SkeletonList({ items = 5, title = true, className }) {
	return (
		<Card className={cn("shadow-none", className)}>
			{title && (
				<CardHeader className="p-3 pb-0">
					<Skeleton className="h-4 w-36" />
				</CardHeader>
			)}
			<CardContent className="space-y-3 p-3">
				{Array.from({ length: items }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<div key={index} className="flex items-center gap-3">
						<Skeleton className="h-8 w-8 shrink-0 rounded-full" />
						<div className="flex-1 space-y-1.5">
							<Skeleton className="h-3 w-2/5" />
							<Skeleton className="h-2.5 w-3/5" />
						</div>
						<Skeleton className="h-3 w-14 shrink-0" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

/** List of labelled progress bars (budgets, goals, category spend). */
export function SkeletonProgressList({ items = 4, title = true, className }) {
	return (
		<Card className={cn("shadow-none", className)}>
			{title && (
				<CardHeader className="p-3 pb-0">
					<Skeleton className="h-4 w-32" />
				</CardHeader>
			)}
			<CardContent className="space-y-2 p-3">
				{Array.from({ length: items }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
					<div key={index} className="space-y-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-3 w-28" />
							<Skeleton className="h-3 w-16" />
						</div>
						<Skeleton className="h-2 w-full rounded-full" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

/** Card of stacked label + input pairs. */
export function SkeletonFormCard({ fields = 4, columns = 2, className }) {
	return (
		<Card className={cn("shadow-none", className)}>
			<CardHeader className="p-3 pb-0">
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-2.5 w-56" />
			</CardHeader>
			<CardContent className="p-3">
				<div
					className={cn(
						"grid gap-3",
						columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
					)}
				>
					{Array.from({ length: fields }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<div key={index} className="space-y-1.5">
							<Skeleton className="h-2.5 w-24" />
							<Skeleton className="h-9 w-full" />
						</div>
					))}
				</div>
				<Skeleton className="mt-2 h-8 w-28" />
			</CardContent>
		</Card>
	);
}

/** Horizontal tab strip. */
export function SkeletonTabs({ count = 5, className }) {
	return (
		<div className={cn("flex gap-2 overflow-hidden border-b pb-2", className)}>
			{Array.from({ length: count }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
				<Skeleton key={index} className="h-8 w-24 shrink-0" />
			))}
		</div>
	);
}
