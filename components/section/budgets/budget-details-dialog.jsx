"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";
import { budgetUsage } from "@/lib/budgets";
import { inMonth, sortByDateDesc } from "@/lib/transactions";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";

const MAX_TRANSACTIONS = 8;

function Stat({ label, value, tone = "default" }) {
	return (
		<div className="space-y-0.5">
			<p className="text-[10px] uppercase tracking-wide text-muted-foreground">
				{label}
			</p>
			<p
				className={cn(
					"text-xs font-medium tabular-nums",
					tone === "negative" && "text-destructive",
				)}
			>
				{value}
			</p>
		</div>
	);
}

export function BudgetDetailsDialog({
	budget,
	open,
	onOpenChange,
	transactions = [],
	onEdit,
	onDelete,
}) {
	const { t, formatCurrency, formatDate } = useTranslation();

	const usage = useMemo(() => (budget ? budgetUsage(budget) : null), [budget]);

	const related = useMemo(() => {
		if (!budget) return [];

		const monthly = inMonth(transactions).filter(
			(transaction) =>
				transaction.amount < 0 &&
				(budget.categoryId === null ||
					String(transaction.categoryId) === String(budget.categoryId)),
		);

		return sortByDateDesc(monthly).slice(0, MAX_TRANSACTIONS);
	}, [budget, transactions]);

	if (!budget || !usage) return null;

	const status = usage.isOver
		? { label: t("budgets.exceededBy", {
				amount: formatCurrency(Math.abs(usage.remaining)),
			}), variant: "destructive" }
		: usage.willExceed
			? { label: t("budgets.willExceed"), variant: "secondary" }
			: { label: t("budgets.onTrack"), variant: "secondary" };

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent closeLabel={t("common.close")}>
				<DialogHeader>
					<DialogTitle>{budget.name}</DialogTitle>
					<DialogDescription>
						{budget.category?.name ?? t("budgets.allCategories")} ·{" "}
						{t(`budgets.periods.${budget.period}`)}
					</DialogDescription>
				</DialogHeader>

				<DialogBody>
					<div className="space-y-1.5">
						<p className="text-xl font-bold tabular-nums">
							{t("budgets.spentOf", {
								spent: formatCurrency(usage.spent),
								limit: formatCurrency(usage.limit),
							})}
						</p>
						<Progress
							value={Math.min(100, usage.percent)}
							className={cn(usage.isOver && "[&>div]:bg-destructive")}
						/>
						<div className="flex items-center justify-between gap-2">
							<span className="text-[11px] text-muted-foreground">
								{t("budgets.usage", { percent: Math.round(usage.percent) })}
							</span>
							<Badge variant={status.variant}>{status.label}</Badge>
						</div>
					</div>

					<Separator />

					<div className="grid grid-cols-2 gap-3">
						<Stat
							label={t("budgets.remaining")}
							value={formatCurrency(Math.max(0, usage.remaining))}
							tone={usage.isOver ? "negative" : "default"}
						/>
						<Stat
							label={t("budgets.dailyAverage")}
							value={formatCurrency(usage.dailyAverage)}
						/>
						<Stat
							label={t("budgets.projected")}
							value={formatCurrency(usage.projected)}
							tone={usage.willExceed ? "negative" : "default"}
						/>
						<Stat
							label={t("transactions.periods.label")}
							value={t("budgets.daysLeft", { count: usage.daysLeft })}
						/>
					</div>

					<Separator />

					<div className="space-y-2">
						<p className="text-xs font-medium">
							{t("budgets.relatedTransactions")}
						</p>

						{related.length === 0 ? (
							<p className="py-4 text-center text-[11px] text-muted-foreground">
								{t("budgets.noTransactions")}
							</p>
						) : (
							<ul className="divide-y rounded-md border">
								{related.map((transaction) => (
									<li
										key={transaction.id}
										className="flex items-center gap-2 px-2 py-1.5"
									>
										<div className="min-w-0 flex-1">
											<p className="truncate text-xs">
												{transaction.description}
											</p>
											<p className="text-[10px] text-muted-foreground">
												{formatDate(transaction.date, { dateStyle: "short" })}
											</p>
										</div>
										<span className="shrink-0 text-xs font-medium tabular-nums text-red-600 dark:text-red-400">
											{formatCurrency(Math.abs(transaction.amount))}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>
				</DialogBody>

				<DialogFooter>
					<Button
						variant="outline"
						className="gap-1.5"
						onClick={() => onEdit(budget)}
					>
						<Pencil />
						{t("common.edit")}
					</Button>
					<Button
						variant="destructive"
						className="gap-1.5"
						onClick={() => onDelete(budget)}
					>
						<Trash2 />
						{t("common.delete")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
