"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
import { CheckCircle, CreditCard, Mail, Phone, Upload, XCircle } from "lucide-react";
import { useState } from "react";

const ID_TYPES = ["passport", "driver", "national"];
const PURPOSES = ["primary", "work", "personal", "recovery"];
const COUNTRIES = ["br", "us", "pt", "ca", "uk"];

// Placeholder contact points until the verification endpoints exist.
const EMAILS = [
	{ value: "hello@example.com", verified: true },
	{ value: "work@example.com", verified: true },
	{ value: "backup@example.com", verified: false },
];

const PHONES = [
	{ value: "+55 11 98765-4321", verified: true },
	{ value: "+55 11 91234-5678", verified: false },
];

function VerificationRow({ icon: Icon, value, verified }) {
	const { t } = useTranslation();

	return (
		<div className="flex items-center gap-2">
			<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
				<Icon className="h-3.5 w-3.5 text-primary" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-xs font-medium">{value}</p>
				<span
					className={
						verified
							? "flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400"
							: "flex items-center gap-1 text-[11px] text-destructive"
					}
				>
					{verified ? (
						<CheckCircle className="h-3 w-3" />
					) : (
						<XCircle className="h-3 w-3" />
					)}
					{verified
						? t("settings.security.verified")
						: t("settings.security.pending")}
				</span>
			</div>
		</div>
	);
}

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

export default function Security() {
	const { t } = useTranslation();
	const [idOpen, setIdOpen] = useState(false);
	const [emailOpen, setEmailOpen] = useState(false);
	const [phoneOpen, setPhoneOpen] = useState(false);

	return (
		<div className="space-y-3">
			<div className="grid gap-3 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>{t("settings.security.idCardTitle")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<VerificationRow
							icon={CreditCard}
							value="0024 5687 2254 3698"
							verified
						/>

						<Dialog open={idOpen} onOpenChange={setIdOpen}>
							<DialogTrigger asChild>
								<Button className="w-full">
									{t("settings.security.addId")}
								</Button>
							</DialogTrigger>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>{t("settings.security.addId")}</DialogTitle>
									<DialogDescription>
										{t("settings.security.addIdDescription")}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="space-y-1">
										<Label htmlFor="id-type">
											{t("settings.security.idType")}
										</Label>
										<Select>
											<SelectTrigger id="id-type">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{ID_TYPES.map((type) => (
													<SelectItem key={type} value={type}>
														{t(`settings.security.idTypes.${type}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-1">
										<Label htmlFor="id-number">
											{t("settings.security.idNumber")}
										</Label>
										<Input
											id="id-number"
											placeholder={t("settings.security.idNumberPlaceholder")}
										/>
									</div>

									<div className="space-y-1">
										<Label htmlFor="id-expiry">
											{t("settings.security.expiryDate")}
										</Label>
										<Input id="id-expiry" type="date" />
									</div>

									<div className="space-y-1">
										<Label>{t("settings.security.uploadId")}</Label>
										<UploadBox id="id-upload" />
									</div>
								</DialogBody>

								<DialogFooter>
									<Button variant="outline" onClick={() => setIdOpen(false)}>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setIdOpen(false)}>
										{t("settings.security.submitVerification")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("settings.security.emailTitle")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{EMAILS.map((email) => (
							<VerificationRow
								key={email.value}
								icon={Mail}
								value={email.value}
								verified={email.verified}
							/>
						))}

						<Dialog open={emailOpen} onOpenChange={setEmailOpen}>
							<DialogTrigger asChild>
								<Button className="w-full">
									{t("settings.security.addEmail")}
								</Button>
							</DialogTrigger>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>{t("settings.security.addEmail")}</DialogTitle>
									<DialogDescription>
										{t("settings.security.addEmailDescription")}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="space-y-1">
										<Label htmlFor="new-email-address">
											{t("settings.security.emailAddress")}
										</Label>
										<Input
											id="new-email-address"
											type="email"
											placeholder={t("settings.security.emailPlaceholder")}
										/>
									</div>

									<div className="space-y-1">
										<Label htmlFor="email-purpose">
											{t("settings.security.purpose")}
										</Label>
										<Select>
											<SelectTrigger id="email-purpose">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{PURPOSES.map((purpose) => (
													<SelectItem key={purpose} value={purpose}>
														{t(`settings.security.purposes.${purpose}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-1">
										<div className="flex items-center justify-between">
											<Label htmlFor="email-code">
												{t("settings.security.verificationCode")}
											</Label>
											<Button variant="link" size="xs">
												{t("settings.security.sendCode")}
											</Button>
										</div>
										<Input id="email-code" />
										<p className="text-[10px] text-muted-foreground">
											{t("settings.security.emailCodeHint")}
										</p>
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setEmailOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setEmailOpen(false)}>
										{t("settings.security.verifyAddEmail")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("settings.security.phoneTitle")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{PHONES.map((phone) => (
							<VerificationRow
								key={phone.value}
								icon={Phone}
								value={phone.value}
								verified={phone.verified}
							/>
						))}

						<Dialog open={phoneOpen} onOpenChange={setPhoneOpen}>
							<DialogTrigger asChild>
								<Button className="w-full">
									{t("settings.security.addPhone")}
								</Button>
							</DialogTrigger>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>{t("settings.security.addPhone")}</DialogTitle>
									<DialogDescription>
										{t("settings.security.addPhoneDescription")}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="space-y-1">
										<Label htmlFor="phone-country">
											{t("settings.security.country")}
										</Label>
										<Select defaultValue="br">
											<SelectTrigger id="phone-country">
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

									<div className="space-y-1">
										<Label htmlFor="new-phone">
											{t("settings.security.phoneNumber")}
										</Label>
										<Input
											id="new-phone"
											placeholder={t("settings.security.phonePlaceholder")}
										/>
									</div>

									<div className="space-y-1">
										<Label htmlFor="phone-purpose">
											{t("settings.security.purpose")}
										</Label>
										<Select>
											<SelectTrigger id="phone-purpose">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{PURPOSES.map((purpose) => (
													<SelectItem key={purpose} value={purpose}>
														{t(`settings.security.purposes.${purpose}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-1">
										<div className="flex items-center justify-between">
											<Label htmlFor="sms-code">
												{t("settings.security.smsCode")}
											</Label>
											<Button variant="link" size="xs">
												{t("settings.security.sendCode")}
											</Button>
										</div>
										<Input id="sms-code" />
										<p className="text-[10px] text-muted-foreground">
											{t("settings.security.smsCodeHint")}
										</p>
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setPhoneOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setPhoneOpen(false)}>
										{t("settings.security.verifyAddPhone")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>{t("settings.security.passwordTitle")}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid gap-3 md:grid-cols-3">
						<div className="space-y-1">
							<Label htmlFor="current-password">
								{t("settings.security.currentPassword")}
							</Label>
							<Input id="current-password" type="password" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="new-password">
								{t("settings.security.newPassword")}
							</Label>
							<Input id="new-password" type="password" />
						</div>
						<div className="space-y-1">
							<Label htmlFor="confirm-password">
								{t("settings.security.confirmPassword")}
							</Label>
							<Input id="confirm-password" type="password" />
						</div>
					</div>

					<Button>{t("settings.security.updatePassword")}</Button>
				</CardContent>
			</Card>
		</div>
	);
}
