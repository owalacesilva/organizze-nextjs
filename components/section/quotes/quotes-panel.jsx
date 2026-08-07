"use client";

import { DataTablePagination } from "@/components/elements/data-table-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw, Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

const SKELETON_ROWS = 6;

/**
 * Shared shell for every quotes tab.
 *
 * The five asset classes list different columns but behave identically —
 * search, pagination, loading/error/empty states, a manual refresh — so each
 * tab only describes its columns and hands over the query.
 *
 * @param titleKey    Dictionary key for the card heading.
 * @param columns     `{ key, labelKey, align?, className?, render(row, format) }`.
 *                    `render` receives the `useTranslation()` result — plus
 *                    `formatBRL` — so cells format in the active locale.
 * @param rowKey      Picks a stable React key out of a row.
 * @param searchable  `(row, format)` → the string the search box matches
 *                    against, so translated labels stay searchable too.
 * @param query       A `useGet*Quotes()` result.
 */
export function QuotesPanel({
	titleKey,
	columns,
	rowKey,
	searchable,
	query,
}) {
	const translation = useTranslation();
	const { t, formatCurrency, formatDate } = translation;
	const [search, setSearch] = useState("");

	// B3, Tesouro Direto and the BRL side of every pair listed here are priced
	// in reais — the UI locale changes the notation, never the currency.
	const format = useMemo(
		() => ({
			...translation,
			formatBRL: (value, options) =>
				formatCurrency(value, { currency: "BRL", ...options }),
		}),
		[translation, formatCurrency],
	);

	const quotes = useMemo(() => query.data?.quotes ?? [], [query.data]);

	const filtered = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) return quotes;
		return quotes.filter((quote) =>
			searchable(quote, format).toLowerCase().includes(term),
		);
	}, [quotes, search, searchable, format]);

	const pagination = usePagination(filtered, { resetKey: search });

	// Every row in a response shares the same feed timestamp.
	const updatedAt = quotes[0]?.updatedAt;

	const body = () => {
		if (query.isPending) {
			return (
				<div className="space-y-1.5" role="status" aria-busy="true">
					<span className="sr-only">{t("common.loading")}</span>
					{Array.from({ length: SKELETON_ROWS }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<Skeleton key={index} className="h-9 w-full" />
					))}
				</div>
			);
		}

		if (query.isError) {
			return (
				<div className="flex flex-col items-center gap-2 py-8 text-center">
					<AlertCircle className="h-5 w-5 text-destructive" />
					<p className="text-xs font-medium">{t("quotes.loadError")}</p>
					<Button variant="outline" onClick={() => query.refetch()}>
						{t("common.retry")}
					</Button>
				</div>
			);
		}

		if (filtered.length === 0) {
			return (
				<div className="flex flex-col items-center gap-2 py-8 text-center">
					<TrendingUp className="h-5 w-5 text-muted-foreground" />
					<p className="text-xs font-medium">
						{search ? t("quotes.noMatches") : t("quotes.empty")}
					</p>
					{search && (
						<p className="text-[11px] text-muted-foreground">
							{t("quotes.noMatchesHint", { term: search.trim() })}
						</p>
					)}
				</div>
			);
		}

		return (
			<>
				<div className="overflow-x-auto rounded-md border">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								{columns.map((column) => (
									<TableHead
										key={column.key}
										className={cn(
											"whitespace-nowrap",
											column.align === "right" && "text-right",
											column.className,
										)}
									>
										{t(column.labelKey)}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{pagination.pageItems.map((quote) => (
								<TableRow key={rowKey(quote)}>
									{columns.map((column) => (
										<TableCell
											key={column.key}
											className={cn(
												"whitespace-nowrap",
												column.align === "right" && "text-right tabular-nums",
												column.className,
											)}
										>
											{column.render(quote, format)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<DataTablePagination {...pagination} />
			</>
		);
	};

	return (
		<Card>
			<CardHeader className="flex-col gap-2 space-y-0 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<CardTitle>{t(titleKey)}</CardTitle>
					<p className="text-xs text-muted-foreground">
						{updatedAt
							? t("quotes.updatedAt", {
									time: formatDate(updatedAt, { timeStyle: "medium" }),
								})
							: t("quotes.subtitle")}
					</p>
				</div>

				<div className="flex items-center gap-2">
					<div className="relative w-full sm:w-56">
						<Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder={t("quotes.searchPlaceholder")}
							aria-label={t("quotes.searchPlaceholder")}
							className="h-8 pl-8"
						/>
					</div>

					<Button
						variant="outline"
						size="icon"
						onClick={() => query.refetch()}
						disabled={query.isFetching}
						aria-label={
							query.isFetching ? t("common.refreshing") : t("common.refresh")
						}
					>
						<RefreshCw className={cn(query.isFetching && "animate-spin")} />
					</Button>
				</div>
			</CardHeader>

			<CardContent>{body()}</CardContent>
		</Card>
	);
}
