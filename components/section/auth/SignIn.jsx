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
import { Eye, EyeOff } from "lucide-react";
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
	const [showPassword, setShowPassword] = useState(false);
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
		<div className="flex flex-col">
			<CardHeader className="items-center text-center">
				<CardTitle className="text-lg">{t("auth.signIn.title")}</CardTitle>
			</CardHeader>

			<CardContent>
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
						<div className="relative">
							<Input
								id="signin-password"
								type={showPassword ? "text" : "password"}
								placeholder={t("auth.fields.passwordPlaceholder")}
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="pr-9"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword((value) => !value)}
								className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								aria-label={
									showPassword
										? t("auth.fields.hidePassword")
										: t("auth.fields.showPassword")
								}
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>

						<div className="flex justify-end">
							<Button
								type="button"
								variant="link"
								className="h-auto p-0 text-xs"
								onClick={() => onStateChange("reset")}
							>
								{t("auth.signIn.forgot")}
							</Button>
						</div>
					</div>

					<Button className="w-full" type="submit" disabled={submitting}>
						{submitting ? t("auth.signIn.submitting") : t("auth.signIn.submit")}
					</Button>
				</form>

				{SIMULATION_ENABLED && (
					<p className="mt-3 text-center text-xs text-muted-foreground">
						{t("auth.signIn.mockHint", MOCK_USER_CREDENTIALS)}
					</p>
				)}
			</CardContent>

			<CardFooter className="justify-center border-t py-3">
				<Button
					variant="link"
					className="h-auto p-0 text-xs"
					onClick={() => onStateChange("signup")}
				>
					{t("auth.signIn.noAccount")}
				</Button>
			</CardFooter>
		</div>
	);
}
