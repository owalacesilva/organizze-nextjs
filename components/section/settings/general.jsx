"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { toast } from "sonner";

const CURRENCIES = ["BRL", "USD", "EUR", "GBP"];

const TIME_ZONES = [
	"America/Sao_Paulo",
	"America/New_York",
	"Europe/London",
	"Europe/Lisbon",
	"UTC",
];

const NOTIFICATION_KEYS = ["notifyMoney", "notifyMerchant", "notifyRecommendations"];

export default function General() {
	const { t, localeConfig } = useTranslation();

	const [currency, setCurrency] = useState(localeConfig.currency);
	const [timeZone, setTimeZone] = useState(TIME_ZONES[0]);
	const [notifications, setNotifications] = useState({
		notifyMoney: true,
		notifyMerchant: false,
		notifyRecommendations: false,
	});

	const toggle = (key) =>
		setNotifications((previous) => ({ ...previous, [key]: !previous[key] }));

	const save = () => toast.success(t("settings.general.saved"));

	return (
		<div className="space-y-3">
			<Card>
				<CardHeader>
					<CardTitle>{t("settings.general.preferences")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 md:grid-cols-2">
						<div className="space-y-1">
							<Label htmlFor="primary-currency">
								{t("settings.general.primaryCurrency")}
							</Label>
							<Select value={currency} onValueChange={setCurrency}>
								<SelectTrigger id="primary-currency">
									<SelectValue placeholder={t("common.select")} />
								</SelectTrigger>
								<SelectContent>
									{CURRENCIES.map((code) => (
										<SelectItem key={code} value={code}>
											{code}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1">
							<Label htmlFor="time-zone">
								{t("settings.general.timeZone")}
							</Label>
							<Select value={timeZone} onValueChange={setTimeZone}>
								<SelectTrigger id="time-zone">
									<SelectValue placeholder={t("common.select")} />
								</SelectTrigger>
								<SelectContent>
									{TIME_ZONES.map((zone) => (
										<SelectItem key={zone} value={zone}>
											{zone.replace("_", " ")}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={save}>{t("common.save")}</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("settings.general.notifications")}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{NOTIFICATION_KEYS.map((key) => (
						<div key={key} className="flex items-center justify-between gap-3">
							<Label htmlFor={key} className="text-muted-foreground">
								{t(`settings.general.${key}`)}
							</Label>
							<Switch
								id={key}
								checked={notifications[key]}
								onCheckedChange={() => toggle(key)}
							/>
						</div>
					))}
				</CardContent>
				<CardFooter>
					<Button onClick={save}>{t("common.save")}</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
