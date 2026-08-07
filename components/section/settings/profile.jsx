"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Link from "next/link";

const COUNTRIES = ["br", "us", "pt", "ca", "uk", "de", "fr", "jp"];

export default function Profile() {
	const { t } = useTranslation();

	return (
		<div className="space-y-3">
			<div className="grid gap-3 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>{t("settings.profileForm.userProfile")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="space-y-1">
							<Label htmlFor="full-name">
								{t("settings.profileForm.fullName")}
							</Label>
							<Input id="full-name" placeholder={t("common.name")} />
						</div>

						<div className="flex items-center gap-2">
							<Avatar className="h-12 w-12">
								<AvatarImage src="/images/avatar/1.jpg" alt="" />
								<AvatarFallback>HH</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-xs font-medium">Hafsa Humaira</p>
								<p className="text-[11px] text-muted-foreground">
									{t("settings.profileForm.avatarHint")}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Input id="profile-picture" type="file" className="hidden" />
							<Button variant="outline" asChild>
								<label htmlFor="profile-picture" className="cursor-pointer">
									{t("settings.profileForm.chooseFile")}
								</label>
							</Button>
							<span className="text-[11px] text-muted-foreground">
								{t("settings.profileForm.noFileChosen")}
							</span>
						</div>

						<Button>{t("common.save")}</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("settings.profileForm.credentials")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="space-y-1">
							<Label htmlFor="new-email">
								{t("settings.profileForm.newEmail")}
							</Label>
							<Input
								id="new-email"
								type="email"
								placeholder={t("profile.fields.email")}
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="new-password">
								{t("settings.profileForm.newPassword")}
							</Label>
							<Input id="new-password" type="password" />
						</div>

						<p className="text-[11px]">
							<Link href="/settings" className="text-primary hover:underline">
								{t("settings.profileForm.twoFactorHint")}
							</Link>
						</p>

						<Button>{t("common.save")}</Button>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>
						{t("settings.profileForm.personalInformation")}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid gap-3 md:grid-cols-2">
						<div className="space-y-1">
							<Label htmlFor="personal-name">
								{t("settings.profileForm.fullName")}
							</Label>
							<Input id="personal-name" defaultValue="Hafsa Humaira" />
						</div>

						<div className="space-y-1">
							<Label htmlFor="personal-email">
								{t("profile.fields.email")}
							</Label>
							<Input
								id="personal-email"
								type="email"
								defaultValue="hello@example.com"
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="personal-address">
								{t("profile.fields.address")}
							</Label>
							<Input id="personal-address" />
						</div>

						<div className="space-y-1">
							<Label htmlFor="personal-city">{t("profile.fields.city")}</Label>
							<Input id="personal-city" />
						</div>

						<div className="space-y-1">
							<Label htmlFor="personal-postal">
								{t("profile.fields.postalCode")}
							</Label>
							<Input id="personal-postal" />
						</div>

						<div className="space-y-1">
							<Label htmlFor="personal-country">
								{t("profile.fields.country")}
							</Label>
							<Select>
								<SelectTrigger id="personal-country">
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
					</div>

					<Button>{t("common.save")}</Button>
				</CardContent>
			</Card>
		</div>
	);
}
