"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { DollarSign, Euro, PoundSterling } from "lucide-react";
import { useState } from "react";

/** Static reference rates against BRL until a rates endpoint exists. */
const RATES = [
	{ code: "USD", rate: 5.42, icon: DollarSign, tone: "bg-blue-500" },
	{ code: "EUR", rate: 5.88, icon: Euro, tone: "bg-emerald-500" },
	{ code: "GBP", rate: 6.91, icon: PoundSterling, tone: "bg-amber-500" },
];

const METHODS = ["bank", "card", "pix", "wallet"];

const DETAIL_ROWS = [
	{ key: "exchangeAmount", value: "500,00 BRL" },
	{ key: "paymentMethod", value: "Pix" },
	{ key: "exchangeRate", value: "1 USD = 5,42 BRL" },
	{ key: "fee", value: "3,75 BRL" },
	{ key: "vat", value: "1,25 BRL" },
	{ key: "subtotal", value: "505,00 BRL" },
];

export default function Currencies() {
	const { t, formatCurrency } = useTranslation();
	const [currency, setCurrency] = useState("USD");
	const [method, setMethod] = useState("pix");

	return (
		<div className="space-y-3">
			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				{RATES.map(({ code, rate, icon: Icon, tone }) => (
					<Card key={code}>
						<CardContent className="flex items-center gap-2 p-3">
							<div
								className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${tone}`}
							>
								<Icon className="h-4 w-4" />
							</div>
							<div>
								<p className="text-xs font-medium">{code}</p>
								<p className="text-[11px] text-muted-foreground">
									{t("settings.currencies.rate", {
										from: code,
										rate: rate.toLocaleString("pt-BR"),
										to: "BRL",
									})}
								</p>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-3 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>{t("settings.currencies.exchangeTitle")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="space-y-1">
							<Label htmlFor="exchange-currency">
								{t("settings.currencies.currency")}
							</Label>
							<Select value={currency} onValueChange={setCurrency}>
								<SelectTrigger id="exchange-currency">
									<SelectValue placeholder={t("common.select")} />
								</SelectTrigger>
								<SelectContent>
									{RATES.map(({ code }) => (
										<SelectItem key={code} value={code}>
											{code}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1">
							<Label htmlFor="exchange-method">
								{t("settings.currencies.paymentMethod")}
							</Label>
							<Select value={method} onValueChange={setMethod}>
								<SelectTrigger id="exchange-method">
									<SelectValue placeholder={t("common.select")} />
								</SelectTrigger>
								<SelectContent>
									{METHODS.map((value) => (
										<SelectItem key={value} value={value}>
											{t(`settings.currencies.methods.${value}`)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1">
							<Label htmlFor="exchange-amount">
								{t("settings.currencies.amount")}
							</Label>
							<div className="grid grid-cols-2 gap-2">
								<Input id="exchange-amount" defaultValue="500,00" />
								<Input defaultValue="92,25" />
							</div>
						</div>

						<div className="flex items-center justify-between text-xs">
							<span>{t("settings.currencies.monthlyLimit")}</span>
							<span className="font-medium text-primary">
								{t("settings.currencies.remaining", {
									amount: formatCurrency(49750),
								})}
							</span>
						</div>

						<Button className="w-full">
							{t("settings.currencies.exchangeNow")}
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("settings.currencies.detailsTitle")}</CardTitle>
					</CardHeader>
					<CardContent className="divide-y p-0">
						{DETAIL_ROWS.map((row) => (
							<div
								key={row.key}
								className="flex items-center justify-between px-3 py-2 text-xs"
							>
								<span className="font-medium text-primary">
									{t(`settings.currencies.${row.key}`)}
								</span>
								<span className="tabular-nums">{row.value}</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
