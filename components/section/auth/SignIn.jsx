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
import { MOCK_USER_CREDENTIALS, SIMULATION_ENABLED } from "@/lib/simulation";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignIn({ onStateChange }) {
	const { t } = useTranslation();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitting(true);

		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		setSubmitting(false);

		if (result?.error) {
			toast.error(t("auth.signIn.error"));
			return;
		}

		router.push(searchParams.get("callbackUrl") || "/");
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
							value={email}
							onChange={(event) => setEmail(event.target.value)}
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

					<Button className="w-full" type="submit" disabled={submitting}>
						{submitting ? t("auth.signIn.submitting") : t("auth.signIn.submit")}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="mt-auto flex-col gap-2 border-t pt-3">
				<div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
					<Button variant="link" onClick={() => onStateChange("signup")}>
						{t("auth.signIn.noAccount")}
					</Button>
					<Button variant="link" onClick={() => onStateChange("reset")}>
						{t("auth.signIn.forgot")}
					</Button>
				</div>

				{SIMULATION_ENABLED && (
					<p className="text-center text-xs text-muted-foreground">
						{t("auth.signIn.mockHint", MOCK_USER_CREDENTIALS)}
					</p>
				)}
			</CardFooter>
		</div>
	);
}
