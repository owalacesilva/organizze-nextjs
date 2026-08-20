"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import {
	AlertCircle,
	Camera,
	CheckCircle,
	Key,
	Pencil,
	QrCode,
	Shield,
	Smartphone,
	Upload,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ACCOUNT_TYPES = ["personal", "business", "corporate"];
const COUNTRIES = ["br", "us", "pt", "ca", "uk"];
const ID_TYPES = ["passport", "driving", "national"];

const USER = { name: "Hafsa Humaira", id: "818778", joinedAt: "2020-10-20" };

function UploadBox({ id }) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed p-3">
			<Upload className="h-6 w-6 text-muted-foreground" />
			<p className="text-center text-[11px] text-muted-foreground">
				{t("settings.security.dropHint")}
			</p>
			<Input id={id} type="file" className="hidden" />
			<Button variant="outline" asChild>
				<label htmlFor={id} className="cursor-pointer">
					{t("settings.security.chooseFile")}
				</label>
			</Button>
			<p className="text-[10px] text-muted-foreground">
				{t("settings.security.formatsHint")}
			</p>
		</div>
	);
}

export default function Account() {
	const { t, formatDate } = useTranslation();

	const [twoFactorOpen, setTwoFactorOpen] = useState(false);
	const [verifyOpen, setVerifyOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [step, setStep] = useState(1);

	const [userInfo, setUserInfo] = useState({
		email: "hello@example.com",
		type: "personal",
		country: "br",
	});

	const setField = (field) => (value) =>
		setUserInfo((previous) => ({ ...previous, [field]: value }));

	const closeVerify = (open) => {
		setVerifyOpen(open);
		if (!open) setTimeout(() => setStep(1), 300);
	};

	const info = [
		{ label: t("settings.account.userId"), value: USER.id },
		{ label: t("settings.account.emailAddress"), value: userInfo.email },
		{
			label: t("settings.account.joinedSince"),
			value: formatDate(USER.joinedAt, { dateStyle: "medium" }),
		},
		{
			label: t("settings.account.type"),
			value: t(`settings.account.accountTypes.${userInfo.type}`),
		},
		{
			label: t("settings.account.countryOfResidence"),
			value: t(`countries.${userInfo.country}`),
		},
	];

	return (
		<>
			<div className="grid gap-2 sm:gap-3 lg:grid-cols-3">
				<div className="space-y-2 sm:space-y-3 lg:col-span-2">
					<Card>
						<CardContent className="flex flex-col gap-3 p-3 sm:flex-row sm:items-start">
							<Image
								src="/images/avatar/1.jpg"
								alt=""
								width={56}
								height={56}
								className="mx-auto rounded-full sm:mx-0"
							/>
							<div className="flex-1 space-y-2 text-center sm:text-left">
								<div>
									<h2 className="text-sm font-semibold text-primary">
										{t("settings.account.welcome", { name: USER.name })}
									</h2>
									<p className="text-xs text-muted-foreground">
										{t("settings.account.unverifiedHint")}
									</p>
								</div>
								<div className="flex flex-col gap-2 sm:flex-row">
									<Button className="gap-1.5" onClick={() => setVerifyOpen(true)}>
										<CheckCircle />
										{t("settings.account.verifyAccount")}
									</Button>
									<Button
										variant="outline"
										className="gap-1.5"
										onClick={() => setTwoFactorOpen(true)}
									>
										<Shield />
										{t("settings.account.twoFactor")}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>{t("settings.account.verifyUpgrade")}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<p className="text-xs">
								<span className="font-medium">
									{t("settings.account.status")}:{" "}
								</span>
								<span className="text-amber-600 dark:text-amber-400">
									{t("settings.account.statusPending")}
								</span>
							</p>
							<p className="text-xs text-muted-foreground">
								{t("settings.account.unverifiedDescription")}
							</p>
							<Button onClick={() => setVerifyOpen(true)}>
								{t("settings.account.getVerified")}
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex-row items-center justify-between space-y-0">
							<CardTitle>{t("settings.account.information")}</CardTitle>
							<Button
								variant="secondary"
								className="gap-1.5"
								onClick={() => setEditOpen(true)}
							>
								<Pencil />
								{t("common.edit")}
							</Button>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							{info.map((item) => (
								<div key={item.label} className="space-y-0.5">
									<p className="text-[10px] uppercase tracking-wide text-muted-foreground">
										{item.label}
									</p>
									<p className="text-xs font-medium">{item.value}</p>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				<Card className="h-fit">
					<CardHeader>
						<CardTitle>{t("settings.account.downloadApp")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<p className="text-xs text-muted-foreground">
							{t("settings.account.downloadAppHint")}
						</p>
						<div className="flex flex-col gap-2">
							<Button variant="outline" className="w-full gap-1.5" asChild>
								<a href="#" rel="noopener noreferrer">
									<Smartphone />
									{t("settings.account.appStore")}
								</a>
							</Button>
							<Button variant="outline" className="w-full gap-1.5" asChild>
								<a href="#" rel="noopener noreferrer">
									<Smartphone />
									{t("settings.account.googlePlay")}
								</a>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent closeLabel={t("common.close")}>
					<DialogHeader>
						<DialogTitle>{t("settings.account.editTitle")}</DialogTitle>
						<DialogDescription>
							{t("settings.account.editDescription")}
						</DialogDescription>
					</DialogHeader>

					<DialogBody>
						<div className="space-y-1">
							<Label htmlFor="edit-email">
								{t("settings.account.emailAddress")}
							</Label>
							<Input
								id="edit-email"
								type="email"
								value={userInfo.email}
								onChange={(event) => setField("email")(event.target.value)}
							/>
							<p className="text-[10px] text-muted-foreground">
								{t("settings.account.emailChangeHint")}
							</p>
						</div>

						<div className="space-y-1">
							<Label htmlFor="edit-type">
								{t("settings.account.accountType")}
							</Label>
							<Select value={userInfo.type} onValueChange={setField("type")}>
								<SelectTrigger id="edit-type">
									<SelectValue placeholder={t("common.select")} />
								</SelectTrigger>
								<SelectContent>
									{ACCOUNT_TYPES.map((type) => (
										<SelectItem key={type} value={type}>
											{t(`settings.account.accountTypes.${type}`)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1">
							<Label htmlFor="edit-country">
								{t("settings.account.countryOfResidence")}
							</Label>
							<Select
								value={userInfo.country}
								onValueChange={setField("country")}
							>
								<SelectTrigger id="edit-country">
									<SelectValue placeholder={t("common.select")} />
								</SelectTrigger>
								<SelectContent>
									{COUNTRIES.map((code) => (
										<SelectItem key={code} value={code}>
											{t(`countries.${code}`)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<p className="text-[10px] text-muted-foreground">
								{t("settings.account.countryChangeHint")}
							</p>
						</div>

						<div className="flex items-start gap-2 rounded-md bg-muted p-2">
							<AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
							<div className="space-y-0.5">
								<p className="text-xs font-medium">
									{t("settings.account.importantTitle")}
								</p>
								<p className="text-[10px] text-muted-foreground">
									{t("settings.account.importantHint")}
								</p>
							</div>
						</div>
					</DialogBody>

					<DialogFooter>
						<Button variant="outline" onClick={() => setEditOpen(false)}>
							{t("common.cancel")}
						</Button>
						<Button onClick={() => setEditOpen(false)}>
							{t("settings.account.saveChanges")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={twoFactorOpen} onOpenChange={setTwoFactorOpen}>
				<DialogContent closeLabel={t("common.close")}>
					<DialogHeader>
						<DialogTitle>{t("settings.account.twoFactorTitle")}</DialogTitle>
						<DialogDescription>
							{t("settings.account.twoFactorDescription")}
						</DialogDescription>
					</DialogHeader>

					<DialogBody>
						<Tabs defaultValue="app">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="app">
									{t("settings.account.authenticatorApp")}
								</TabsTrigger>
								<TabsTrigger value="sms">
									{t("settings.account.smsVerification")}
								</TabsTrigger>
							</TabsList>

							<TabsContent value="app" className="space-y-2 pt-3">
								<div className="flex flex-col items-center gap-2">
									<div className="rounded-md bg-muted p-3">
										<QrCode className="h-24 w-24 text-primary" />
									</div>
									<p className="text-center text-[11px] text-muted-foreground">
										{t("settings.account.qrHint")}
									</p>
								</div>
								<div className="space-y-1">
									<Label htmlFor="totp-code">
										{t("settings.account.enterCode")}
									</Label>
									<Input
										id="totp-code"
										placeholder={t("settings.account.codePlaceholder")}
									/>
								</div>
							</TabsContent>

							<TabsContent value="sms" className="space-y-2 pt-3">
								<div className="space-y-1">
									<Label htmlFor="2fa-phone">
										{t("settings.account.phoneNumber")}
									</Label>
									<Input id="2fa-phone" placeholder="+55 11 90000-0000" />
								</div>
								<Button className="w-full">
									{t("settings.account.sendCode")}
								</Button>
								<div className="space-y-1">
									<Label htmlFor="2fa-sms-code">
										{t("settings.account.enterCode")}
									</Label>
									<Input
										id="2fa-sms-code"
										placeholder={t("settings.account.codePlaceholder")}
									/>
								</div>
							</TabsContent>
						</Tabs>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Checkbox id="backup-codes" />
								<Label htmlFor="backup-codes">
									{t("settings.account.backupCodesSaved")}
								</Label>
							</div>
							<p className="text-[10px] text-muted-foreground">
								{t("settings.account.backupCodesHint")}
							</p>
							<Button variant="outline" className="w-full gap-1.5">
								<Key />
								{t("settings.account.downloadBackupCodes")}
							</Button>
						</div>
					</DialogBody>

					<DialogFooter>
						<Button variant="outline" onClick={() => setTwoFactorOpen(false)}>
							{t("common.cancel")}
						</Button>
						<Button onClick={() => setTwoFactorOpen(false)}>
							{t("settings.account.enable2fa")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={verifyOpen} onOpenChange={closeVerify}>
				<DialogContent size="lg" closeLabel={t("common.close")}>
					<DialogHeader>
						<DialogTitle>{t("settings.account.verifyTitle")}</DialogTitle>
						<DialogDescription>
							{t("settings.account.verifyDescription")}
						</DialogDescription>
					</DialogHeader>

					{step === 1 && (
						<>
							<DialogBody>
								<h3 className="text-xs font-semibold">
									{t("settings.account.step1")}
								</h3>

								<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
									<div className="space-y-1">
										<Label htmlFor="first-name">
											{t("profile.fields.firstName")}
										</Label>
										<Input id="first-name" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="last-name">
											{t("profile.fields.lastName")}
										</Label>
										<Input id="last-name" />
									</div>
								</div>

								<div className="space-y-1">
									<Label htmlFor="birth-date">
										{t("profile.fields.birthDate")}
									</Label>
									<Input id="birth-date" type="date" />
								</div>

								<div className="space-y-1">
									<Label htmlFor="verify-address">
										{t("profile.fields.address")}
									</Label>
									<Input id="verify-address" />
								</div>

								<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
									<div className="space-y-1">
										<Label htmlFor="verify-city">
											{t("profile.fields.city")}
										</Label>
										<Input id="verify-city" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="verify-postal">
											{t("profile.fields.postalCode")}
										</Label>
										<Input id="verify-postal" />
									</div>
								</div>

								<div className="space-y-1">
									<Label htmlFor="verify-country">
										{t("profile.fields.country")}
									</Label>
									<Select defaultValue="br">
										<SelectTrigger id="verify-country">
											<SelectValue placeholder={t("common.select")} />
										</SelectTrigger>
										<SelectContent>
											{COUNTRIES.map((code) => (
												<SelectItem key={code} value={code}>
													{t(`countries.${code}`)}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</DialogBody>

							<DialogFooter>
								<Button onClick={() => setStep(2)}>
									{t("settings.account.continueToId")}
								</Button>
							</DialogFooter>
						</>
					)}

					{step === 2 && (
						<>
							<DialogBody>
								<h3 className="text-xs font-semibold">
									{t("settings.account.step2")}
								</h3>

								<fieldset className="space-y-1">
									<legend className="text-xs font-medium">
										{t("settings.account.idTypeLabel")}
									</legend>
									<RadioGroup defaultValue="passport" className="pt-1">
										{ID_TYPES.map((type) => (
											<div key={type} className="flex items-center gap-2">
												<RadioGroupItem value={type} id={`id-${type}`} />
												<Label htmlFor={`id-${type}`}>
													{t(`settings.account.idTypes.${type}`)}
												</Label>
											</div>
										))}
									</RadioGroup>
								</fieldset>

								<div className="space-y-1">
									<Label htmlFor="verify-id-number">
										{t("settings.security.idNumber")}
									</Label>
									<Input
										id="verify-id-number"
										placeholder={t("settings.account.idNumberPlaceholder")}
									/>
								</div>

								<div className="space-y-1">
									<Label>{t("settings.account.uploadFront")}</Label>
									<UploadBox id="id-front" />
								</div>

								<div className="space-y-1">
									<Label>{t("settings.account.uploadBack")}</Label>
									<UploadBox id="id-back" />
								</div>
							</DialogBody>

							<DialogFooter className="justify-between">
								<Button variant="outline" onClick={() => setStep(1)}>
									{t("common.back")}
								</Button>
								<Button onClick={() => setStep(3)}>
									{t("settings.account.continueToSelfie")}
								</Button>
							</DialogFooter>
						</>
					)}

					{step === 3 && (
						<>
							<DialogBody>
								<h3 className="text-xs font-semibold">
									{t("settings.account.step3")}
								</h3>

								<p className="text-xs text-muted-foreground">
									{t("settings.account.selfieHint")}
								</p>

								<div className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-3">
									<Camera className="h-8 w-8 text-muted-foreground" />
									<div className="flex flex-col gap-2 sm:flex-row">
										<Button variant="outline" className="gap-1.5">
											<Camera />
											{t("settings.account.takePhoto")}
										</Button>
										<Button variant="outline" className="gap-1.5">
											<Upload />
											{t("settings.account.uploadPhoto")}
										</Button>
									</div>
									<p className="text-center text-[10px] text-muted-foreground">
										{t("settings.account.selfieDisclaimer")}
									</p>
								</div>

								<div className="flex items-start gap-2 bg-muted p-2">
									<AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
									<div className="space-y-0.5">
										<p className="text-xs font-medium">
											{t("settings.account.tipsTitle")}
										</p>
										<ul className="list-disc space-y-0.5 pl-4 text-[10px] text-muted-foreground">
											<li>{t("settings.account.tip1")}</li>
											<li>{t("settings.account.tip2")}</li>
											<li>{t("settings.account.tip3")}</li>
											<li>{t("settings.account.tip4")}</li>
										</ul>
									</div>
								</div>
							</DialogBody>

							<DialogFooter className="justify-between">
								<Button variant="outline" onClick={() => setStep(2)}>
									{t("common.back")}
								</Button>
								<Button onClick={() => closeVerify(false)}>
									{t("settings.account.submitVerification")}
								</Button>
							</DialogFooter>
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}
