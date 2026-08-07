"use client";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const BUDGET_PERIODS = ["week", "month", "quarter", "year"];

const NO_CATEGORY = "none";

const EMPTY_FORM = {
	name: "",
	amount: "",
	period: "month",
	categoryId: NO_CATEGORY,
};

function toFormState(budget) {
	if (!budget) return { ...EMPTY_FORM };

	return {
		name: budget.name ?? "",
		amount: String(budget.amount ?? ""),
		period: budget.period ?? "month",
		categoryId:
			budget.categoryId === null || budget.categoryId === undefined
				? NO_CATEGORY
				: String(budget.categoryId),
	};
}

function validate(form, t) {
	const errors = {};

	if (!form.name.trim()) errors.name = t("budgets.validation.nameRequired");
	if (!form.amount || Number(form.amount) <= 0) {
		errors.amount = t("budgets.validation.amountRequired");
	}
	if (!form.period) errors.period = t("budgets.validation.periodRequired");

	return errors;
}

/**
 * Create/edit panel for a budget. Passing `budget` switches it to edit mode.
 * `onSubmit` receives the API payload and may return a promise.
 */
export function BudgetFormDialog({
	open,
	onOpenChange,
	budget,
	categories = [],
	onSubmit,
	isSubmitting = false,
}) {
	const { t } = useTranslation();
	const [form, setForm] = useState(() => toFormState(budget));
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open) {
			setForm(toFormState(budget));
			setErrors({});
		}
	}, [open, budget]);

	const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nextErrors = validate(form, t);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		await onSubmit({
			name: form.name.trim(),
			amount: Number(form.amount),
			period: form.period,
			categoryId:
				form.categoryId === NO_CATEGORY ? null : Number(form.categoryId),
		});
	};

	const fieldError = (key) =>
		errors[key] ? (
			<p className="text-[11px] text-destructive">{errors[key]}</p>
		) : null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent closeLabel={t("common.close")}>
				<DialogHeader>
					<DialogTitle>
						{budget ? t("budgets.edit") : t("budgets.add")}
					</DialogTitle>
					<DialogDescription>{t("budgets.subtitle")}</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} noValidate>
					<DialogBody>
						<div className="space-y-1">
							<Label htmlFor="budget-name">{t("budgets.fields.name")}</Label>
							<Input
								id="budget-name"
								value={form.name}
								onChange={(event) => set("name")(event.target.value)}
								placeholder={t("budgets.placeholders.name")}
								aria-invalid={Boolean(errors.name)}
								className={cn(errors.name && "border-destructive")}
							/>
							{fieldError("name")}
						</div>

						<div className="grid grid-cols-2 gap-2">
							<div className="space-y-1">
								<Label htmlFor="budget-amount">
									{t("budgets.fields.amount")}
								</Label>
								<Input
									id="budget-amount"
									type="number"
									min="0"
									step="0.01"
									inputMode="decimal"
									value={form.amount}
									onChange={(event) => set("amount")(event.target.value)}
									placeholder={t("budgets.placeholders.amount")}
									aria-invalid={Boolean(errors.amount)}
									className={cn(errors.amount && "border-destructive")}
								/>
								{fieldError("amount")}
							</div>

							<div className="space-y-1">
								<Label htmlFor="budget-period">
									{t("budgets.fields.period")}
								</Label>
								<Select value={form.period} onValueChange={set("period")}>
									<SelectTrigger id="budget-period">
										<SelectValue
											placeholder={t("budgets.placeholders.selectPeriod")}
										/>
									</SelectTrigger>
									<SelectContent>
										{BUDGET_PERIODS.map((period) => (
											<SelectItem key={period} value={period}>
												{t(`budgets.periods.${period}`)}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{fieldError("period")}
							</div>
						</div>

						<div className="space-y-1">
							<Label htmlFor="budget-category">
								{t("budgets.fields.category")}
							</Label>
							<Select value={form.categoryId} onValueChange={set("categoryId")}>
								<SelectTrigger id="budget-category">
									<SelectValue
										placeholder={t("budgets.placeholders.selectCategory")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={NO_CATEGORY}>
										{t("budgets.allCategories")}
									</SelectItem>
									{categories.map((category) => (
										<SelectItem key={category.id} value={String(category.id)}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</DialogBody>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							{t("common.cancel")}
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="animate-spin" />}
							{isSubmitting ? t("common.saving") : t("common.save")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
