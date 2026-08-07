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

const NO_WALLET = "none";

const EMPTY_FORM = {
	name: "",
	target: "",
	saved: "",
	deadline: "",
	walletId: NO_WALLET,
};

function toFormState(goal) {
	if (!goal) return { ...EMPTY_FORM };

	return {
		name: goal.name ?? "",
		target: String(goal.target ?? ""),
		saved: String(goal.saved ?? ""),
		// <input type="date"> needs a bare YYYY-MM-DD value.
		deadline: String(goal.deadline ?? "").slice(0, 10),
		walletId:
			goal.walletId === null || goal.walletId === undefined
				? NO_WALLET
				: String(goal.walletId),
	};
}

function validate(form, t) {
	const errors = {};

	if (!form.name.trim()) errors.name = t("goals.validation.nameRequired");
	if (!form.target || Number(form.target) <= 0) {
		errors.target = t("goals.validation.targetRequired");
	}
	if (form.saved !== "" && Number(form.saved) > Number(form.target || 0)) {
		errors.saved = t("goals.validation.savedInvalid");
	}

	return errors;
}

/**
 * Create/edit panel for a goal. Passing `goal` switches it to edit mode.
 * `onSubmit` receives the API payload and may return a promise.
 */
export function GoalFormDialog({
	open,
	onOpenChange,
	goal,
	wallets = [],
	onSubmit,
	isSubmitting = false,
}) {
	const { t } = useTranslation();
	const [form, setForm] = useState(() => toFormState(goal));
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open) {
			setForm(toFormState(goal));
			setErrors({});
		}
	}, [open, goal]);

	const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nextErrors = validate(form, t);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		await onSubmit({
			name: form.name.trim(),
			target: Number(form.target),
			saved: Number(form.saved) || 0,
			deadline: form.deadline || null,
			walletId: form.walletId === NO_WALLET ? null : Number(form.walletId),
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
					<DialogTitle>{goal ? t("goals.edit") : t("goals.add")}</DialogTitle>
					<DialogDescription>{t("goals.subtitle")}</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} noValidate>
					<DialogBody>
						<div className="space-y-1">
							<Label htmlFor="goal-name">{t("goals.fields.name")}</Label>
							<Input
								id="goal-name"
								value={form.name}
								onChange={(event) => set("name")(event.target.value)}
								placeholder={t("goals.placeholders.name")}
								aria-invalid={Boolean(errors.name)}
								className={cn(errors.name && "border-destructive")}
							/>
							{fieldError("name")}
						</div>

						<div className="grid grid-cols-2 gap-2">
							<div className="space-y-1">
								<Label htmlFor="goal-target">{t("goals.fields.target")}</Label>
								<Input
									id="goal-target"
									type="number"
									min="0"
									step="0.01"
									inputMode="decimal"
									value={form.target}
									onChange={(event) => set("target")(event.target.value)}
									placeholder={t("goals.placeholders.target")}
									aria-invalid={Boolean(errors.target)}
									className={cn(errors.target && "border-destructive")}
								/>
								{fieldError("target")}
							</div>

							<div className="space-y-1">
								<Label htmlFor="goal-saved">{t("goals.fields.saved")}</Label>
								<Input
									id="goal-saved"
									type="number"
									min="0"
									step="0.01"
									inputMode="decimal"
									value={form.saved}
									onChange={(event) => set("saved")(event.target.value)}
									placeholder={t("goals.placeholders.saved")}
									aria-invalid={Boolean(errors.saved)}
									className={cn(errors.saved && "border-destructive")}
								/>
								{fieldError("saved")}
							</div>
						</div>

						<div className="grid grid-cols-2 gap-2">
							<div className="space-y-1">
								<Label htmlFor="goal-deadline">
									{t("goals.fields.deadline")}{" "}
									<span className="font-normal text-muted-foreground">
										({t("common.optional")})
									</span>
								</Label>
								<Input
									id="goal-deadline"
									type="date"
									value={form.deadline}
									onChange={(event) => set("deadline")(event.target.value)}
								/>
							</div>

							<div className="space-y-1">
								<Label htmlFor="goal-wallet">{t("goals.fields.wallet")}</Label>
								<Select value={form.walletId} onValueChange={set("walletId")}>
									<SelectTrigger id="goal-wallet">
										<SelectValue
											placeholder={t("goals.placeholders.selectWallet")}
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={NO_WALLET}>
											{t("common.none")}
										</SelectItem>
										{wallets.map((wallet) => (
											<SelectItem key={wallet.id} value={String(wallet.id)}>
												{wallet.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
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
