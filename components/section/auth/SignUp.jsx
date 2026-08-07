"use client";

import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { toast } from "sonner";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

export default function SignUp({ onStateChange, setPhoneNumber }) {
	const { t } = useTranslation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phone, setPhone] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			toast.error(t("auth.signUp.passwordMismatch"));
			return;
		}

		setPhoneNumber(phone);
		onStateChange("verify-phone");
	};

	return (
		<div className="flex h-full flex-col justify-center">
			<CardHeader>
				<CardTitle className="text-base">{t("auth.signUp.title")}</CardTitle>
			</CardHeader>

			<CardContent className="flex-grow">
				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="space-y-1">
						<Label htmlFor="signup-email">{t("auth.fields.email")}</Label>
						<Input
							id="signup-email"
							type="email"
							placeholder={t("auth.fields.emailPlaceholder")}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</div>

					<div className="space-y-1">
						<Label htmlFor="signup-password">{t("auth.fields.password")}</Label>
						<Input
							id="signup-password"
							type="password"
							placeholder={t("auth.fields.createPassword")}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
						<PasswordStrengthMeter password={password} />
					</div>

					<div className="space-y-1">
						<Label htmlFor="signup-confirm">
							{t("auth.fields.confirmPassword")}
						</Label>
						<Input
							id="signup-confirm"
							type="password"
							placeholder={t("auth.fields.confirmPasswordPlaceholder")}
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
							required
						/>
					</div>

					<div className="space-y-1">
						<Label htmlFor="signup-phone">{t("auth.fields.phone")}</Label>
						<Input
							id="signup-phone"
							type="tel"
							placeholder={t("auth.fields.phonePlaceholder")}
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
							required
						/>
					</div>

					<Button className="w-full" type="submit">
						{t("auth.signUp.submit")}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="mt-auto border-t pt-3">
				<Button variant="link" onClick={() => onStateChange("signin")}>
					{t("auth.signUp.hasAccount")}
				</Button>
			</CardFooter>
		</div>
	);
}
