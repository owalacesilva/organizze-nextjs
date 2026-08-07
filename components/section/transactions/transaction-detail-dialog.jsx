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
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

function Row({ label, children }) {
	return (
		<div className="flex items-center justify-between gap-2">
			<span className="text-xs text-muted-foreground">{label}</span>
			<span className="truncate text-xs font-medium">{children}</span>
		</div>
	);
}

export function TransactionDetailDialog({
	transaction,
	open,
	onOpenChange,
	onEdit,
	onDelete,
}) {
	const { t, formatCurrency, formatDate } = useTranslation();

	if (!transaction) return null;

	const isIncome = transaction.type === "income";

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent closeLabel={t("common.close")}>
				<DialogHeader>
					<DialogTitle>{t("transactions.details")}</DialogTitle>
					<DialogDescription>{transaction.description}</DialogDescription>
				</DialogHeader>

				<DialogBody>
					<p
						className={cn(
							"text-xl font-bold tabular-nums",
							isIncome
								? "text-emerald-600 dark:text-emerald-400"
								: "text-red-600 dark:text-red-400",
						)}
					>
						{transaction.amount > 0 ? "+" : ""}
						{formatCurrency(transaction.amount)}
					</p>

					<Separator />

					<div className="space-y-2">
						<Row label={t("transactions.fields.type")}>
							<Badge
								variant="outline"
								className={cn(
									"h-4 px-1 text-[10px]",
									isIncome
										? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
										: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
								)}
							>
								{t(`transactions.types.${transaction.type}`)}
							</Badge>
						</Row>
						<Row label={t("transactions.fields.category")}>
							{transaction.categoryName || "—"}
						</Row>
						<Row label={t("transactions.fields.date")}>
							{formatDate(transaction.date, { dateStyle: "long" })}
						</Row>
						{transaction.walletName && (
							<Row label={t("transactions.fields.wallet")}>
								{transaction.walletName}
							</Row>
						)}
						<Row label={t("transactions.fields.id")}>
							<span className="font-mono text-[11px] text-muted-foreground">
								#{transaction.id}
							</span>
						</Row>
					</div>
				</DialogBody>

				<DialogFooter>
					<Button
						variant="outline"
						className="gap-1.5"
						onClick={() => onEdit(transaction)}
					>
						<Pencil />
						{t("common.edit")}
					</Button>
					<Button
						variant="destructive"
						className="gap-1.5"
						onClick={() => onDelete(transaction)}
					>
						<Trash2 />
						{t("common.delete")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
