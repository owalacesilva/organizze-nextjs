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
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	LayoutGrid,
	RefreshCw,
	Rows3,
	Search,
	TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { QuoteCard } from "./quote-card";
import { QuoteDetailsDialog } from "./quote-details-dialog";
import { useQuoteFormat } from "./use-quote-format";

const SKELETON_ROWS = 6;

export function QuotesPanel({
	titleKey,
	columns,
	card,
	range,
	details,
	rowKey,
	searchable,
	query,
	view,
	onViewChange,
}) {
	const format = useQuoteFormat();
	const { t, formatDate } = format;

	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState(null);
	const [detailsOpen, setDetailsOpen] = useState(false);

	const quotes = useMemo(() => query.data?.quotes ?? [], [query.data]);

	const filtered = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) return quotes;
		return quotes.filter((quote) =>
			searchable(quote, format).toLowerCase().includes(term),
		);
	}, [quotes, search, searchable, format]);

	const pagination = usePagination(filtered, { resetKey: search });

	const updatedAt = quotes[0]?.updatedAt;
	const isCards = view === "cards";

	const openDetails = (quote) => {
		setSelected(quote);
		setDetailsOpen(true);
	};

	const body = () => {
		if (query.isPending) {
			return (
				<div
					className={cn(
						isCards
							? "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
							: "space-y-1.5",
					)}
					role="status"
					aria-busy="true"
				>
					<span className="sr-only">{t("common.loading")}</span>
					{Array.from({ length: SKELETON_ROWS }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
						<Skeleton key={index} className={isCards ? "h-44" : "h-9 w-full"} />
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
				{isCards ? (
					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
						{pagination.pageItems.map((quote) => (
							<QuoteCard
								key={rowKey(quote)}
								quote={quote}
								card={card}
								columns={columns}
								range={range}
								format={format}
								onSelect={openDetails}
							/>
						))}
					</div>
				) : (
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
									<TableRow
										key={rowKey(quote)}
										tabIndex={0}
										onClick={() => openDetails(quote)}
										onKeyDown={(event) => {
											if (event.key !== "Enter" && event.key !== " ") return;
											event.preventDefault();
											openDetails(quote);
										}}
										className="cursor-pointer"
									>
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
				)}

				<DataTablePagination {...pagination} />
			</>
		);
	};

	return (
		<>
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
							onClick={() => onViewChange(isCards ? "table" : "cards")}
							aria-label={
								isCards ? t("quotes.view.showTable") : t("quotes.view.showCards")
							}
							title={
								isCards ? t("quotes.view.showTable") : t("quotes.view.showCards")
							}
						>
							{isCards ? <Rows3 /> : <LayoutGrid />}
						</Button>

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

			<QuoteDetailsDialog
				quote={selected}
				open={detailsOpen}
				onOpenChange={setDetailsOpen}
				card={card}
				columns={columns}
				range={range}
				details={details}
			/>
		</>
	);
}
