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

export default function ResetPassword({ onStateChange }) {
	const { t } = useTranslation();
	const [email, setEmail] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		toast.success(t("auth.reset.sent"));
		onStateChange("signin");
	};

	return (
		<div className="flex h-full flex-col justify-center">
			<CardHeader>
				<CardTitle className="text-base">{t("auth.reset.title")}</CardTitle>
			</CardHeader>

			<CardContent className="flex-grow">
				<form onSubmit={handleSubmit} className="space-y-3">
					<div className="space-y-1">
						<Label htmlFor="reset-email">{t("auth.fields.email")}</Label>
						<Input
							id="reset-email"
							type="email"
							placeholder={t("auth.fields.emailPlaceholder")}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</div>

					<Button className="w-full" type="submit">
						{t("auth.reset.submit")}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="mt-auto border-t pt-3">
				<Button variant="link" onClick={() => onStateChange("signin")}>
					{t("auth.reset.remember")}
				</Button>
			</CardFooter>
		</div>
	);
}
