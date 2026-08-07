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

export default function SignIn({ onStateChange, setEmail }) {
	const { t } = useTranslation();
	const [emailInput, setEmailInput] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		setEmail(emailInput);
		onStateChange("verify-email");
	};

	return (
		<div className="flex h-full flex-col justify-center">
			<CardHeader>
				<CardTitle className="text-base">{t("auth.signIn.title")}</CardTitle>
			</CardHeader>

			<CardContent className="flex-grow">
				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="space-y-1">
						<Label htmlFor="signin-email">{t("auth.fields.email")}</Label>
						<Input
							id="signin-email"
							type="email"
							placeholder={t("auth.fields.emailPlaceholder")}
							value={emailInput}
							onChange={(event) => setEmailInput(event.target.value)}
							required
						/>
					</div>

					<div className="space-y-1">
						<Label htmlFor="signin-password">{t("auth.fields.password")}</Label>
						<Input
							id="signin-password"
							type="password"
							placeholder={t("auth.fields.passwordPlaceholder")}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
					</div>

					<Button className="w-full" type="submit">
						{t("auth.signIn.submit")}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="mt-auto flex-col justify-between gap-2 border-t pt-3 sm:flex-row">
				<Button variant="link" onClick={() => onStateChange("signup")}>
					{t("auth.signIn.noAccount")}
				</Button>
				<Button variant="link" onClick={() => onStateChange("reset")}>
					{t("auth.signIn.forgot")}
				</Button>
			</CardFooter>
		</div>
	);
}
