"use client";

import { DataTablePagination } from "@/components/elements/data-table-pagination";
import { SkeletonTable } from "@/components/elements/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ChevronRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const COLUMN_COUNT = 7;

function TypeBadge({ type }) {
	const { t } = useTranslation();

	return (
		<Badge
			variant="outline"
			className={cn(
				"h-4 px-1 text-[10px] font-medium",
				type === "income"
					? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
					: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
			)}
		>
			{t(`transactions.types.${type}`)}
		</Badge>
	);
}

/** One label/value pair inside an expanded row. */
function DetailItem({ label, children }) {
	return (
		<div className="flex flex-col gap-0.5">
			<span className="text-[10px] uppercase tracking-wide text-muted-foreground">
				{label}
			</span>
			<span className="text-xs font-medium">{children}</span>
		</div>
	);
}

export function TransactionsTable({
	transactions,
	isLoading,
	isFiltered,
	onSelect,
	onEdit,
	onDelete,
	resetKey,
}) {
	const { t, formatCurrency, formatDate } = useTranslation();
	const pagination = usePagination(transactions, { resetKey });
	const [expandedIds, setExpandedIds] = useState(() => new Set());

	// Rows that leave the viewport (filter or page change) shouldn't come back
	// expanded, so the open set is dropped whenever the visible slice changes.
	useEffect(() => {
		setExpandedIds(new Set());
	}, [resetKey, pagination.page]);

	const toggleRow = (id) =>
		setExpandedIds((previous) => {
			const next = new Set(previous);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});

	const allExpanded =
		pagination.pageItems.length > 0 &&
		pagination.pageItems.every((transaction) => expandedIds.has(transaction.id));

	const toggleAll = () =>
		setExpandedIds(
			allExpanded
				? new Set()
				: new Set(pagination.pageItems.map((transaction) => transaction.id)),
		);

	// A skeleton in the table's own shape keeps the card from collapsing and
	// re-expanding the way a centred spinner does.
	if (isLoading) {
		return (
			<div role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<SkeletonTable rows={5} columns={COLUMN_COUNT} />
			</div>
		);
	}

	return (
		<>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="w-7 px-1">
								<Button
									variant="ghost"
									size="icon-xs"
									onClick={toggleAll}
									disabled={pagination.pageItems.length === 0}
									aria-expanded={allExpanded}
									aria-label={
										allExpanded
											? t("transactions.collapseAll")
											: t("transactions.expandAll")
									}
								>
									<ChevronRight
										className={cn(
											"transition-transform",
											allExpanded && "rotate-90",
										)}
									/>
								</Button>
							</TableHead>
							<TableHead>{t("transactions.fields.description")}</TableHead>
							<TableHead>{t("transactions.fields.category")}</TableHead>
							<TableHead className="hidden sm:table-cell">
								{t("transactions.fields.date")}
							</TableHead>
							<TableHead className="hidden md:table-cell">
								{t("transactions.fields.type")}
							</TableHead>
							<TableHead className="text-right">
								{t("transactions.fields.amount")}
							</TableHead>
							<TableHead className="w-8">
								<span className="sr-only">
									{t("transactions.fields.actions")}
								</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pagination.pageItems.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={COLUMN_COUNT}
									className="py-6 text-center text-xs text-muted-foreground"
								>
									{isFiltered
										? t("transactions.emptyFiltered")
										: t("transactions.empty")}
								</TableCell>
							</TableRow>
						) : (
							pagination.pageItems.flatMap((transaction) => {
								const isExpanded = expandedIds.has(transaction.id);

								const row = (
									<TableRow
										key={transaction.id}
										onClick={() => onSelect(transaction)}
										data-state={isExpanded ? "open" : "closed"}
										className={cn(
											"cursor-pointer",
											isExpanded && "border-b-0 bg-muted/40",
										)}
									>
										<TableCell className="px-1">
											{/* The chevron expands in place; the rest of the row
											    still opens the detail panel. */}
											<Button
												variant="ghost"
												size="icon-xs"
												onClick={(event) => {
													event.stopPropagation();
													toggleRow(transaction.id);
												}}
												aria-expanded={isExpanded}
												aria-label={
													isExpanded
														? t("transactions.collapseRow")
														: t("transactions.expandRow")
												}
											>
												<ChevronRight
													className={cn(
														"transition-transform",
														isExpanded && "rotate-90",
													)}
												/>
											</Button>
										</TableCell>
										<TableCell className="max-w-[180px] truncate">
											{transaction.description}
										</TableCell>
										<TableCell>{transaction.categoryName || "—"}</TableCell>
										<TableCell className="hidden sm:table-cell">
											{formatDate(transaction.date, { dateStyle: "short" })}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											<TypeBadge type={transaction.type} />
										</TableCell>
										<TableCell
											className={cn(
												"text-right font-medium tabular-nums",
												transaction.amount < 0
													? "text-red-600 dark:text-red-400"
													: "text-emerald-600 dark:text-emerald-400",
											)}
										>
											{transaction.amount > 0 ? "+" : ""}
											{formatCurrency(transaction.amount)}
										</TableCell>
										<TableCell className="px-1">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													{/* Row click opens the detail panel; stop it here. */}
													<Button
														variant="ghost"
														size="icon-xs"
														onClick={(event) => event.stopPropagation()}
														aria-label={t("transactions.fields.actions")}
													>
														<MoreHorizontal />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													align="end"
													onClick={(event) => event.stopPropagation()}
												>
													<DropdownMenuItem
														className="gap-2"
														onSelect={() => onEdit(transaction)}
													>
														<Pencil />
														{t("common.edit")}
													</DropdownMenuItem>
													<DropdownMenuItem
														className="gap-2 text-destructive focus:text-destructive"
														onSelect={() => onDelete(transaction)}
													>
														<Trash2 />
														{t("common.delete")}
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);

								if (!isExpanded) return [row];

								return [
									row,
									<TableRow
										key={`${transaction.id}-details`}
										className="bg-muted/40 hover:bg-muted/40"
									>
										<TableCell colSpan={COLUMN_COUNT} className="px-3 py-2">
											<div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4">
												<DetailItem label={t("transactions.fields.date")}>
													{formatDate(transaction.date, { dateStyle: "long" })}
												</DetailItem>
												<DetailItem label={t("transactions.fields.type")}>
													<TypeBadge type={transaction.type} />
												</DetailItem>
												<DetailItem label={t("transactions.fields.wallet")}>
													{transaction.walletName || "—"}
												</DetailItem>
												<DetailItem label={t("transactions.fields.id")}>
													<span className="font-mono text-[11px] text-muted-foreground">
														#{transaction.id}
													</span>
												</DetailItem>
												<div className="col-span-2 sm:col-span-4">
													<DetailItem
														label={t("transactions.fields.description")}
													>
														{transaction.description}
													</DetailItem>
												</div>
											</div>

											<div className="mt-2 flex justify-end gap-2">
												<Button
													variant="outline"
													size="xs"
													className="gap-1"
													onClick={() => onEdit(transaction)}
												>
													<Pencil />
													{t("common.edit")}
												</Button>
												<Button
													variant="destructive"
													size="xs"
													className="gap-1"
													onClick={() => onDelete(transaction)}
												>
													<Trash2 />
													{t("common.delete")}
												</Button>
											</div>
										</TableCell>
									</TableRow>,
								];
							})
						)}
					</TableBody>
				</Table>
			</div>

			<DataTablePagination {...pagination} />
		</>
	);
}
