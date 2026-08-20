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

export const WALLET_TYPES = [
	"checking",
	"savings",
	"credit",
	"cash",
	"investment",
];

const CURRENCIES = ["BRL", "USD", "EUR"];

const EMPTY_FORM = {
	name: "",
	type: "checking",
	balance: "",
	currency: "BRL",
	creditLimit: "",
};

function toFormState(wallet, defaultCurrency) {
	if (!wallet) return { ...EMPTY_FORM, currency: defaultCurrency };

	return {
		name: wallet.name ?? "",
		type: wallet.type ?? "checking",
		balance: String(wallet.balance ?? ""),
		currency: wallet.currency ?? defaultCurrency,
		creditLimit:
			wallet.creditLimit === undefined || wallet.creditLimit === null
				? ""
				: String(wallet.creditLimit),
	};
}

function validate(form, t) {
	const errors = {};

	if (!form.name.trim()) errors.name = t("wallets.validation.nameRequired");
	if (!form.type) errors.type = t("wallets.validation.typeRequired");
	if (form.balance !== "" && Number.isNaN(Number(form.balance))) {
		errors.balance = t("wallets.validation.balanceInvalid");
	}
	if (
		form.type === "credit" &&
		form.creditLimit !== "" &&
		Number(form.creditLimit) < 0
	) {
		errors.creditLimit = t("wallets.validation.creditLimitInvalid");
	}

	return errors;
}

export function WalletFormDialog({
	open,
	onOpenChange,
	wallet,
	onSubmit,
	isSubmitting = false,
}) {
	const { t, localeConfig } = useTranslation();
	const [form, setForm] = useState(() =>
		toFormState(wallet, localeConfig.currency),
	);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open) {
			setForm(toFormState(wallet, localeConfig.currency));
			setErrors({});
		}
	}, [open, wallet, localeConfig.currency]);

	const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nextErrors = validate(form, t);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		await onSubmit({
			name: form.name.trim(),
			type: form.type,
			balance: Number(form.balance) || 0,
			currency: form.currency,
			creditLimit:
				form.type === "credit" && form.creditLimit !== ""
					? Number(form.creditLimit)
					: undefined,
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
						{wallet ? t("wallets.edit") : t("wallets.add")}
					</DialogTitle>
					<DialogDescription>{t("wallets.subtitle")}</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} noValidate>
					<DialogBody>
						<div className="space-y-1">
							<Label htmlFor="wallet-name">{t("wallets.fields.name")}</Label>
							<Input
								id="wallet-name"
								value={form.name}
								onChange={(event) => set("name")(event.target.value)}
								placeholder={t("wallets.placeholders.name")}
								aria-invalid={Boolean(errors.name)}
								className={cn(errors.name && "border-destructive")}
							/>
							{fieldError("name")}
						</div>

						<div className="grid grid-cols-2 gap-2">
							<div className="space-y-1">
								<Label htmlFor="wallet-type">{t("wallets.fields.type")}</Label>
								<Select value={form.type} onValueChange={set("type")}>
									<SelectTrigger id="wallet-type">
										<SelectValue
											placeholder={t("wallets.placeholders.selectType")}
										/>
									</SelectTrigger>
									<SelectContent>
										{WALLET_TYPES.map((type) => (
											<SelectItem key={type} value={type}>
												{t(`wallets.types.${type}`)}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{fieldError("type")}
							</div>

							<div className="space-y-1">
								<Label htmlFor="wallet-currency">
									{t("wallets.fields.currency")}
								</Label>
								<Select value={form.currency} onValueChange={set("currency")}>
									<SelectTrigger id="wallet-currency">
										<SelectValue
											placeholder={t("wallets.placeholders.selectCurrency")}
										/>
									</SelectTrigger>
									<SelectContent>
										{CURRENCIES.map((currency) => (
											<SelectItem key={currency} value={currency}>
												{currency}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-1">
							<Label htmlFor="wallet-balance">
								{t("wallets.fields.balance")}
							</Label>
							<Input
								id="wallet-balance"
								type="number"
								step="0.01"
								inputMode="decimal"
								value={form.balance}
								onChange={(event) => set("balance")(event.target.value)}
								placeholder={t("wallets.placeholders.balance")}
								aria-invalid={Boolean(errors.balance)}
								className={cn(errors.balance && "border-destructive")}
							/>
							{fieldError("balance")}
						</div>
						{form.type === "credit" && (
							<div className="space-y-1">
								<Label htmlFor="wallet-credit-limit">
									{t("wallets.fields.creditLimit")}
								</Label>
								<Input
									id="wallet-credit-limit"
									type="number"
									min="0"
									step="0.01"
									inputMode="decimal"
									value={form.creditLimit}
									onChange={(event) => set("creditLimit")(event.target.value)}
									placeholder={t("wallets.placeholders.creditLimit")}
									aria-invalid={Boolean(errors.creditLimit)}
									className={cn(errors.creditLimit && "border-destructive")}
								/>
								{fieldError("creditLimit")}
							</div>
						)}
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
