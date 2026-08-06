"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
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
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const EMPTY_FORM = {
	type: "expense",
	amount: "",
	categoryId: "",
	date: "",
	description: "",
};

function toFormState(transaction) {
	if (!transaction) {
		return {
			...EMPTY_FORM,
			date: new Date().toISOString().slice(0, 10),
		};
	}

	return {
		type: transaction.type,
		amount: String(Math.abs(transaction.amount)),
		categoryId:
			transaction.categoryId === null ? "" : String(transaction.categoryId),
		// <input type="date"> needs a bare YYYY-MM-DD value.
		date: String(transaction.date ?? "").slice(0, 10),
		description: transaction.description ?? "",
	};
}

function validate(form, t) {
	const errors = {};

	if (!form.amount || Number(form.amount) <= 0) {
		errors.amount = t("transactions.validation.amountRequired");
	}
	if (!form.categoryId) {
		errors.categoryId = t("transactions.validation.categoryRequired");
	}
	if (!form.date) {
		errors.date = t("transactions.validation.dateRequired");
	}
	if (!form.description.trim()) {
		errors.description = t("transactions.validation.descriptionRequired");
	}

	return errors;
}

/**
 * Create/edit dialog. `transaction` being set switches it to edit mode.
 * `onSubmit` receives the API payload and may return a promise.
 */
export function TransactionFormDialog({
	open,
	onOpenChange,
	transaction,
	categories = [],
	onSubmit,
	isSubmitting = false,
}) {
	const { t } = useTranslation();
	const [form, setForm] = useState(() => toFormState(transaction));
	const [errors, setErrors] = useState({});

	// Reload the form whenever the dialog opens for a different row.
	useEffect(() => {
		if (open) {
			setForm(toFormState(transaction));
			setErrors({});
		}
	}, [open, transaction]);

	const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nextErrors = validate(form, t);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		const magnitude = Math.abs(Number(form.amount));

		await onSubmit({
			// Expenses are stored as negative amounts.
			amount: form.type === "expense" ? -magnitude : magnitude,
			description: form.description.trim(),
			date: form.date,
			categoryId: Number(form.categoryId),
		});
	};

	const fieldError = (key) =>
		errors[key] ? (
			<p className="text-[11px] text-destructive">{errors[key]}</p>
		) : null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[480px]">
				<DialogHeader>
					<DialogTitle className="text-base">
						{transaction ? t("transactions.edit") : t("transactions.add")}
					</DialogTitle>
					<DialogDescription className="text-xs">
						{t("transactions.subtitle")}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-3" noValidate>
					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label htmlFor="transaction-type" className="text-xs">
								{t("transactions.fields.type")}
							</Label>
							<Select value={form.type} onValueChange={set("type")}>
								<SelectTrigger id="transaction-type" className="h-8 text-xs">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="expense" className="text-xs">
										{t("transactions.types.expense")}
									</SelectItem>
									<SelectItem value="income" className="text-xs">
										{t("transactions.types.income")}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1">
							<Label htmlFor="transaction-amount" className="text-xs">
								{t("transactions.fields.amount")}
							</Label>
							<Input
								id="transaction-amount"
								type="number"
								min="0"
								step="0.01"
								inputMode="decimal"
								value={form.amount}
								onChange={(event) => set("amount")(event.target.value)}
								placeholder={t("transactions.placeholders.amount")}
								aria-invalid={Boolean(errors.amount)}
								className={cn("h-8 text-xs", errors.amount && "border-destructive")}
							/>
							{fieldError("amount")}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label htmlFor="transaction-category" className="text-xs">
								{t("transactions.fields.category")}
							</Label>
							<Select value={form.categoryId} onValueChange={set("categoryId")}>
								<SelectTrigger
									id="transaction-category"
									aria-invalid={Boolean(errors.categoryId)}
									className={cn(
										"h-8 text-xs",
										errors.categoryId && "border-destructive",
									)}
								>
									<SelectValue
										placeholder={t("transactions.placeholders.selectCategory")}
									/>
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem
											key={category.id}
											value={String(category.id)}
											className="text-xs"
										>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldError("categoryId")}
						</div>

						<div className="space-y-1">
							<Label htmlFor="transaction-date" className="text-xs">
								{t("transactions.fields.date")}
							</Label>
							<Input
								id="transaction-date"
								type="date"
								value={form.date}
								onChange={(event) => set("date")(event.target.value)}
								aria-invalid={Boolean(errors.date)}
								className={cn("h-8 text-xs", errors.date && "border-destructive")}
							/>
							{fieldError("date")}
						</div>
					</div>

					<div className="space-y-1">
						<Label htmlFor="transaction-description" className="text-xs">
							{t("transactions.fields.description")}
						</Label>
						<Textarea
							id="transaction-description"
							value={form.description}
							onChange={(event) => set("description")(event.target.value)}
							placeholder={t("transactions.placeholders.description")}
							aria-invalid={Boolean(errors.description)}
							className={cn(
								"min-h-[72px] text-xs",
								errors.description && "border-destructive",
							)}
						/>
						{fieldError("description")}
					</div>

					<DialogFooter className="gap-2 sm:gap-2">
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="h-8 text-xs"
							onClick={() => onOpenChange(false)}
						>
							{t("common.cancel")}
						</Button>
						<Button
							type="submit"
							size="sm"
							className="h-8 text-xs"
							disabled={isSubmitting}
						>
							{isSubmitting && (
								<Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
							)}
							{isSubmitting ? t("common.saving") : t("common.save")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
