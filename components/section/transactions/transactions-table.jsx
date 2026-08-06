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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

function TypeBadge({ type }) {
	const { t } = useTranslation();

	return (
		<Badge
			variant="outline"
			className={cn(
				"h-5 px-1.5 text-[10px] font-medium",
				type === "income"
					? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
					: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
			)}
		>
			{t(`transactions.types.${type}`)}
		</Badge>
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

	// A skeleton in the table's own shape keeps the card from collapsing and
	// re-expanding the way a centred spinner does.
	if (isLoading) {
		return (
			<div role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<SkeletonTable rows={5} columns={6} />
			</div>
		);
	}

	return (
		<>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="h-9 text-xs">
								{t("transactions.fields.description")}
							</TableHead>
							<TableHead className="h-9 text-xs">
								{t("transactions.fields.category")}
							</TableHead>
							<TableHead className="hidden h-9 text-xs sm:table-cell">
								{t("transactions.fields.date")}
							</TableHead>
							<TableHead className="hidden h-9 text-xs md:table-cell">
								{t("transactions.fields.type")}
							</TableHead>
							<TableHead className="h-9 text-right text-xs">
								{t("transactions.fields.amount")}
							</TableHead>
							<TableHead className="h-9 w-10 text-xs">
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
									colSpan={6}
									className="py-8 text-center text-sm text-muted-foreground"
								>
									{isFiltered
										? t("transactions.emptyFiltered")
										: t("transactions.empty")}
								</TableCell>
							</TableRow>
						) : (
							pagination.pageItems.map((transaction) => (
								<TableRow
									key={transaction.id}
									onClick={() => onSelect(transaction)}
									className="cursor-pointer"
								>
									<TableCell className="max-w-[180px] truncate py-2 text-xs sm:text-sm">
										{transaction.description}
									</TableCell>
									<TableCell className="py-2 text-xs sm:text-sm">
										{transaction.categoryName || "—"}
									</TableCell>
									<TableCell className="hidden py-2 text-xs sm:table-cell sm:text-sm">
										{formatDate(transaction.date, { dateStyle: "short" })}
									</TableCell>
									<TableCell className="hidden py-2 md:table-cell">
										<TypeBadge type={transaction.type} />
									</TableCell>
									<TableCell
										className={cn(
											"py-2 text-right text-xs font-medium tabular-nums sm:text-sm",
											transaction.amount < 0
												? "text-red-600 dark:text-red-400"
												: "text-emerald-600 dark:text-emerald-400",
										)}
									>
										{transaction.amount > 0 ? "+" : ""}
										{formatCurrency(transaction.amount)}
									</TableCell>
									<TableCell className="py-2">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												{/* Row click opens the detail dialog; stop it here. */}
												<Button
													variant="ghost"
													size="icon"
													className="h-7 w-7"
													onClick={(event) => event.stopPropagation()}
													aria-label={t("transactions.fields.actions")}
												>
													<MoreHorizontal className="h-3.5 w-3.5" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												align="end"
												onClick={(event) => event.stopPropagation()}
											>
												<DropdownMenuItem
													className="gap-2 text-xs"
													onSelect={() => onEdit(transaction)}
												>
													<Pencil className="h-3.5 w-3.5" />
													{t("common.edit")}
												</DropdownMenuItem>
												<DropdownMenuItem
													className="gap-2 text-xs text-destructive focus:text-destructive"
													onSelect={() => onDelete(transaction)}
												>
													<Trash2 className="h-3.5 w-3.5" />
													{t("common.delete")}
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<DataTablePagination {...pagination} />
		</>
	);
}
