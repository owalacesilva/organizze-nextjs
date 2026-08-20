"use client";

import { useGetCategories } from "@/app/api/categories/hooks";
import {
	useCreateTransaction,
	useDeleteTransaction,
	useGetTransactions,
	useUpdateTransaction,
} from "@/app/api/transactions/hooks";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
	DEFAULT_FILTERS,
	countActiveFilters,
	filterTransactions,
	normalizeTransaction,
	sortByDateDesc,
	summarizeTransactions,
} from "@/lib/transactions";
import { AlertCircle, Plus, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { TransactionDetailDialog } from "./transaction-detail-dialog";
import { TransactionFilters } from "./transaction-filters";
import { TransactionFormDialog } from "./transaction-form-dialog";
import { TransactionSummary } from "./transaction-summary";
import { TransactionsTable } from "./transactions-table";

export default function TransactionsSection() {
	const { t } = useTranslation();

	const [filters, setFilters] = useState(DEFAULT_FILTERS);
	const [selected, setSelected] = useState(null);
	const [detailOpen, setDetailOpen] = useState(false);
	const [formOpen, setFormOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [pendingDelete, setPendingDelete] = useState(null);

	const transactionsQuery = useGetTransactions();
	const categoriesQuery = useGetCategories();
	const createMutation = useCreateTransaction();
	const updateMutation = useUpdateTransaction();
	const deleteMutation = useDeleteTransaction();

	const categories = categoriesQuery.data?.categories ?? [];

	const transactions = useMemo(
		() =>
			sortByDateDesc(
				(transactionsQuery.data?.transactions ?? []).map(normalizeTransaction),
			),
		[transactionsQuery.data],
	);

	const visible = useMemo(
		() => filterTransactions(transactions, filters),
		[transactions, filters],
	);

	const summary = useMemo(() => summarizeTransactions(visible), [visible]);

	const paginationResetKey = useMemo(
		() => JSON.stringify(filters),
		[filters],
	);

	const isFiltered =
		countActiveFilters(filters) > 0 || filters.search.trim() !== "";

	const openCreate = () => {
		setEditing(null);
		setFormOpen(true);
	};

	const openEdit = (transaction) => {
		setDetailOpen(false);
		setEditing(transaction);
		setFormOpen(true);
	};

	const openDelete = (transaction) => {
		setDetailOpen(false);
		setPendingDelete(transaction);
	};

	const handleSubmit = async (payload) => {
		try {
			if (editing) {
				await updateMutation.mutateAsync({ id: editing.id, data: payload });
				toast.success(t("transactions.updated"));
			} else {
				await createMutation.mutateAsync(payload);
				toast.success(t("transactions.created"));
			}
			setFormOpen(false);
			setEditing(null);
		} catch (error) {
			toast.error(t("transactions.saveError"), { description: error.message });
		}
	};

	const handleDelete = async () => {
		const target = pendingDelete;
		if (!target) return;

		try {
			await deleteMutation.mutateAsync(target.id);
			toast.success(t("transactions.deleted"));
			setSelected(null);
		} catch (error) {
			toast.error(t("transactions.deleteError"), {
				description: error.message,
			});
		} finally {
			setPendingDelete(null);
		}
	};

	return (
		<div className="space-y-3">
			<TransactionSummary summary={summary} count={visible.length} />

			<Card>
				<CardHeader className="gap-2">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
						<div className="relative flex-1 sm:max-w-xs">
							<Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
							<Input
								value={filters.search}
								onChange={(event) =>
									setFilters({ ...filters, search: event.target.value })
								}
								placeholder={t("transactions.placeholders.search")}
								aria-label={t("common.search")}
								className="pl-8"
							/>
						</div>

						<div className="flex items-center gap-2 sm:ml-auto">
							<Button
								variant="outline"
								size="icon"
								onClick={() => transactionsQuery.refetch()}
								disabled={transactionsQuery.isFetching}
								aria-label={t("common.refresh")}
							>
								<RefreshCw
									className={cn(transactionsQuery.isFetching && "animate-spin")}
								/>
							</Button>
							<Button onClick={openCreate}>
								<Plus />
								{t("transactions.add")}
							</Button>
						</div>
					</div>

					<TransactionFilters
						filters={filters}
						categories={categories}
						onChange={setFilters}
						onClear={() =>
							setFilters({ ...DEFAULT_FILTERS, search: filters.search })
						}
					/>
				</CardHeader>

				<CardContent>
					{transactionsQuery.isError ? (
						<div className="flex flex-col items-center gap-3 py-10 text-center">
							<AlertCircle className="h-6 w-6 text-destructive" />
							<div>
								<p className="text-sm font-medium">
									{t("transactions.loadError")}
								</p>
								<p className="text-xs text-muted-foreground">
									{transactionsQuery.error?.message}
								</p>
							</div>
							<Button
								variant="outline"
								onClick={() => transactionsQuery.refetch()}
							>
								{t("common.retry")}
							</Button>
						</div>
					) : (
						<TransactionsTable
							transactions={visible}
							isLoading={transactionsQuery.isPending}
							isFiltered={isFiltered}
							resetKey={paginationResetKey}
							onSelect={(transaction) => {
								setSelected(transaction);
								setDetailOpen(true);
							}}
							onEdit={openEdit}
							onDelete={openDelete}
						/>
					)}
				</CardContent>
			</Card>

			<TransactionDetailDialog
				transaction={selected}
				open={detailOpen}
				onOpenChange={setDetailOpen}
				onEdit={openEdit}
				onDelete={openDelete}
			/>

			<TransactionFormDialog
				open={formOpen}
				onOpenChange={(open) => {
					setFormOpen(open);
					if (!open) setEditing(null);
				}}
				transaction={editing}
				categories={categories}
				onSubmit={handleSubmit}
				isSubmitting={createMutation.isPending || updateMutation.isPending}
			/>

			<AlertDialog
				open={Boolean(pendingDelete)}
				onOpenChange={(open) => !open && setPendingDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t("transactions.deleteConfirmTitle")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t("transactions.deleteConfirmDescription", {
								description: pendingDelete?.description ?? "",
							})}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={deleteMutation.isPending}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{t("common.delete")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
