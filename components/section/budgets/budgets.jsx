"use client";

import {
	useCreateBudget,
	useDeleteBudget,
	useGetBudgets,
	useUpdateBudget,
} from "@/app/api/budgets/hooks";
import { useGetCategories } from "@/app/api/categories/hooks";
import { useGetTransactions } from "@/app/api/transactions/hooks";
import { BudgetsSkeleton } from "@/components/section/budgets/skeleton";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { monthlyTotals, normalizeTransaction } from "@/lib/transactions";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	MoreHorizontal,
	Pencil,
	PiggyBank,
	Plus,
	RefreshCw,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { toast } from "sonner";
import { BudgetDetailsDialog } from "./budget-details-dialog";
import { BudgetFormDialog } from "./budget-form-dialog";

function BudgetCard({ budget, onSelect, onEdit, onDelete }) {
	const { t, formatCurrency } = useTranslation();

	const spent = budget.spent ?? 0;
	const percent = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
	const remaining = budget.amount - spent;
	const isOver = remaining < 0;

	return (
		<Card
			onClick={() => onSelect(budget)}
			className="cursor-pointer transition-colors hover:border-primary/50"
		>
			<CardContent className="space-y-2 p-3">
				<div className="flex items-start gap-2">
					<div className="min-w-0 flex-1">
						<p className="truncate text-xs font-medium">{budget.name}</p>
						<p className="text-[11px] text-muted-foreground">
							{budget.category?.name ?? t("budgets.allCategories")} ·{" "}
							{t(`budgets.periods.${budget.period}`)}
						</p>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon-xs"
								onClick={(event) => event.stopPropagation()}
								aria-label={t("common.actions")}
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
								onSelect={() => onEdit(budget)}
							>
								<Pencil />
								{t("common.edit")}
							</DropdownMenuItem>
							<DropdownMenuItem
								className="gap-2 text-destructive focus:text-destructive"
								onSelect={() => onDelete(budget)}
							>
								<Trash2 />
								{t("common.delete")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="flex items-baseline justify-between">
					<span className="text-lg font-semibold tabular-nums">
						{formatCurrency(spent)}
					</span>
					<span className="text-[11px] text-muted-foreground">
						{t("budgets.limit")}: {formatCurrency(budget.amount)}
					</span>
				</div>

				<Progress
					value={Math.min(100, percent)}
					className={cn("h-1.5", isOver && "[&>div]:bg-destructive")}
				/>

				<div className="flex justify-between text-[11px]">
					<span className="text-muted-foreground">
						{t("budgets.usage", { percent: Math.round(percent) })}
					</span>
					<span
						className={cn(
							isOver
								? "text-destructive"
								: "text-emerald-600 dark:text-emerald-400",
						)}
					>
						{isOver
							? t("budgets.exceededBy", {
									amount: formatCurrency(Math.abs(remaining)),
								})
							: `${t("budgets.remaining")}: ${formatCurrency(remaining)}`}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}

/** Six-month expense curve, computed from the statement rather than mocked. */
function SpendingTrend({ transactions }) {
	const { t, formatCurrency, formatDate } = useTranslation();

	const data = useMemo(
		() =>
			monthlyTotals(transactions, 6).map((bucket) => ({
				label: formatDate(bucket.date, { month: "short" }),
				expenses: Math.round(bucket.expenses * 100) / 100,
			})),
		[transactions, formatDate],
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("budgets.monthlyTrend")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-48">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={data}
							margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
						>
							<defs>
								<linearGradient id="budgetTrend" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0.3}
									/>
									<stop
										offset="95%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<XAxis
								dataKey="label"
								tickLine={false}
								axisLine={false}
								tick={{ fontSize: 10 }}
								stroke="currentColor"
								className="text-muted-foreground"
							/>
							<YAxis
								tickLine={false}
								axisLine={false}
								width={44}
								tick={{ fontSize: 10 }}
								stroke="currentColor"
								className="text-muted-foreground"
							/>
							<Tooltip
								formatter={(value) => formatCurrency(value)}
								contentStyle={{
									backgroundColor: "hsl(var(--card))",
									borderColor: "hsl(var(--border))",
									borderRadius: 0,
									fontSize: 12,
									color: "hsl(var(--foreground))",
								}}
							/>
							<Area
								type="monotone"
								dataKey="expenses"
								name={t("budgets.spent")}
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								fill="url(#budgetTrend)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}

export function Budgets() {
	const { t, formatCurrency } = useTranslation();

	const [formOpen, setFormOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [selected, setSelected] = useState(null);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [pendingDelete, setPendingDelete] = useState(null);

	const budgetsQuery = useGetBudgets();
	const categoriesQuery = useGetCategories();
	const transactionsQuery = useGetTransactions();
	const createMutation = useCreateBudget();
	const updateMutation = useUpdateBudget();
	const deleteMutation = useDeleteBudget();

	const budgets = budgetsQuery.data?.budgets ?? [];
	const categories = categoriesQuery.data?.categories ?? [];

	const transactions = useMemo(
		() =>
			(transactionsQuery.data?.transactions ?? []).map(normalizeTransaction),
		[transactionsQuery.data],
	);

	const summary = useMemo(
		() =>
			budgets.reduce(
				(totals, budget) => {
					totals.budgeted += budget.amount;
					totals.spent += budget.spent ?? 0;
					return totals;
				},
				{ budgeted: 0, spent: 0 },
			),
		[budgets],
	);

	const openCreate = () => {
		setEditing(null);
		setFormOpen(true);
	};

	// Leaving the details panel open behind the form would stack two panels.
	const openEdit = (budget) => {
		setDetailsOpen(false);
		setEditing(budget);
		setFormOpen(true);
	};

	const openDelete = (budget) => {
		setDetailsOpen(false);
		setPendingDelete(budget);
	};

	const handleSubmit = async (payload) => {
		try {
			if (editing) {
				await updateMutation.mutateAsync({ id: editing.id, data: payload });
				toast.success(t("budgets.updated"));
			} else {
				await createMutation.mutateAsync(payload);
				toast.success(t("budgets.created"));
			}
			setFormOpen(false);
			setEditing(null);
		} catch (error) {
			toast.error(t("budgets.saveError"), { description: error.message });
		}
	};

	const handleDelete = async () => {
		const target = pendingDelete;
		if (!target) return;

		try {
			await deleteMutation.mutateAsync(target.id);
			toast.success(t("budgets.deleted"));
		} catch (error) {
			toast.error(t("budgets.deleteError"), { description: error.message });
		} finally {
			setPendingDelete(null);
		}
	};

	if (budgetsQuery.isPending) {
		return (
			<div role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<BudgetsSkeleton />
			</div>
		);
	}

	if (budgetsQuery.isError) {
		return (
			<div className="flex flex-col items-center gap-3 py-10 text-center">
				<AlertCircle className="h-6 w-6 text-destructive" />
				<div>
					<p className="text-sm font-medium">{t("budgets.loadError")}</p>
					<p className="text-xs text-muted-foreground">
						{budgetsQuery.error?.message}
					</p>
				</div>
				<Button variant="outline" onClick={() => budgetsQuery.refetch()}>
					{t("common.retry")}
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap items-center gap-2">
				<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
					<span>
						{t("budgets.totalBudgeted")}:{" "}
						<span className="font-medium text-foreground">
							{formatCurrency(summary.budgeted)}
						</span>
					</span>
					<span>
						{t("budgets.totalSpent")}:{" "}
						<span className="font-medium text-foreground">
							{formatCurrency(summary.spent)}
						</span>
					</span>
				</div>

				<div className="ml-auto flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={() => budgetsQuery.refetch()}
						disabled={budgetsQuery.isFetching}
						aria-label={t("common.refresh")}
					>
						<RefreshCw
							className={cn(budgetsQuery.isFetching && "animate-spin")}
						/>
					</Button>
					<Button onClick={openCreate}>
						<Plus />
						{t("budgets.add")}
					</Button>
				</div>
			</div>

			{budgets.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center gap-2 py-10 text-center">
						<PiggyBank className="h-6 w-6 text-muted-foreground" />
						<p className="text-sm font-medium">{t("budgets.empty")}</p>
						<p className="text-xs text-muted-foreground">
							{t("budgets.emptyHint")}
						</p>
						<Button className="mt-1" onClick={openCreate}>
							<Plus />
							{t("budgets.add")}
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
					{budgets.map((budget) => (
						<BudgetCard
							key={budget.id}
							budget={budget}
							onSelect={(target) => {
								setSelected(target);
								setDetailsOpen(true);
							}}
							onEdit={openEdit}
							onDelete={openDelete}
						/>
					))}
				</div>
			)}

			<SpendingTrend transactions={transactions} />

			<BudgetDetailsDialog
				budget={selected}
				open={detailsOpen}
				onOpenChange={setDetailsOpen}
				transactions={transactions}
				onEdit={openEdit}
				onDelete={openDelete}
			/>

			<BudgetFormDialog
				open={formOpen}
				onOpenChange={(open) => {
					setFormOpen(open);
					if (!open) setEditing(null);
				}}
				budget={editing}
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
							{t("budgets.deleteConfirmTitle")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t("budgets.deleteConfirmDescription", {
								name: pendingDelete?.name ?? "",
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
