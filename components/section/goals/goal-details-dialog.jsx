"use client";

import { Confetti } from "@/components/elements/confetti";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";
import { goalProgress } from "@/lib/goals";
import { cn } from "@/lib/utils";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
					tone === "positive" && "text-emerald-600 dark:text-emerald-400",
				)}
			>
				{value}
			</p>
		</div>
	);
}

export function GoalDetailsDialog({
	goal,
	open,
	onOpenChange,
	wallets = [],
	onEdit,
	onDelete,
	onContribute,
	isSaving = false,
}) {
	const { t, formatCurrency, formatDate } = useTranslation();
	const [amount, setAmount] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		if (open) {
			setAmount("");
			setError(null);
		}
	}, [open]);

	const progress = useMemo(() => (goal ? goalProgress(goal) : null), [goal]);

	if (!goal || !progress) return null;

	const wallet = wallets.find(
		(item) => String(item.id) === String(goal.walletId),
	);

	const handleContribute = async (event) => {
		event.preventDefault();

		const value = Number(amount);
		if (!amount || Number.isNaN(value) || value <= 0) {
			setError(t("goals.contributionInvalid"));
			return;
		}

		setError(null);
		await onContribute(goal, progress.saved + value);
		setAmount("");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent closeLabel={t("common.close")} className="overflow-hidden">
				<Confetti
					active={progress.isComplete}
					runKey={`${goal.id}-${progress.saved}`}
				/>

				<DialogHeader>
					<DialogTitle>{goal.name}</DialogTitle>
					<DialogDescription>
						{goal.deadline
							? `${t("goals.deadline")}: ${formatDate(goal.deadline, { dateStyle: "long" })}`
							: t("goals.noDeadline")}
					</DialogDescription>
				</DialogHeader>

				<DialogBody>
					<div className="space-y-1.5">
						<p className="text-xl font-bold tabular-nums">
							{formatCurrency(progress.saved)}
							<span className="ml-1 text-xs font-normal text-muted-foreground">
								/ {formatCurrency(progress.target)}
							</span>
						</p>
						<Progress
								value={Math.min(100, progress.percent)}
								indicatorClassName={cn(progress.isComplete && "bg-emerald-500")}
							/>
						<div className="flex items-center justify-between gap-2">
							<span className="text-[11px] text-muted-foreground">
								{t("goals.progress", { percent: Math.round(progress.percent) })}
							</span>
							{progress.isComplete ? (
								<Badge className="border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
									{t("goals.completed")}
								</Badge>
							) : progress.isOverdue ? (
								<Badge variant="destructive">{t("goals.overdue")}</Badge>
							) : (
								<Badge variant="secondary">{t("goals.onTrack")}</Badge>
							)}
						</div>
					</div>

					<Separator />

					<div className="grid grid-cols-2 gap-3">
						<Stat
							label={t("goals.remaining")}
							value={formatCurrency(progress.remaining)}
						/>
						<Stat
							label={t("goals.monthlyNeeded")}
							value={
								progress.monthlyNeeded === null
									? "—"
									: formatCurrency(progress.monthlyNeeded)
							}
							tone={progress.isOverdue ? "negative" : "default"}
						/>
						{progress.monthsLeft !== null && (
							<Stat
								label={t("goals.deadline")}
								value={t("goals.monthsLeft", {
									count: Math.max(0, Math.ceil(progress.monthsLeft)),
								})}
								tone={progress.isOverdue ? "negative" : "default"}
							/>
						)}
						{wallet && (
							<Stat label={t("goals.linkedWallet")} value={wallet.name} />
						)}
					</div>

					{progress.isComplete ? (
						<p className="rounded-md bg-emerald-500/10 p-2 text-[11px] text-emerald-700 dark:text-emerald-400">
							{t("goals.completedHint")}
						</p>
					) : (
						<>
							<Separator />

							<form onSubmit={handleContribute} className="space-y-1" noValidate>
								<Label htmlFor="goal-contribution">
									{t("goals.contributionAmount")}
								</Label>
								<div className="flex gap-2">
									<Input
										id="goal-contribution"
										type="number"
										min="0"
										step="0.01"
										inputMode="decimal"
										value={amount}
										onChange={(event) => setAmount(event.target.value)}
										placeholder={t("goals.placeholders.saved")}
										aria-invalid={Boolean(error)}
										className={cn(error && "border-destructive")}
									/>
									<Button type="submit" className="gap-1.5" disabled={isSaving}>
										{isSaving ? <Loader2 className="animate-spin" /> : <Plus />}
										{t("goals.contribute")}
									</Button>
								</div>
								{error && (
									<p className="text-[11px] text-destructive">{error}</p>
								)}
							</form>
						</>
					)}
				</DialogBody>

				<DialogFooter>
					<Button
						variant="outline"
						className="gap-1.5"
						onClick={() => onEdit(goal)}
					>
						<Pencil />
						{t("common.edit")}
					</Button>
					<Button
						variant="destructive"
						className="gap-1.5"
						onClick={() => onDelete(goal)}
					>
						<Trash2 />
						{t("common.delete")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
