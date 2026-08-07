"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

export default function PhoneOtpVerification({ onStateChange, phoneNumber }) {
	const { t } = useTranslation();
	const [otp, setOtp] = useState("");
	const [otpSent, setOtpSent] = useState(false);

	return (
		<div className="flex h-full flex-col justify-center">
			<CardHeader>
				<CardTitle className="text-base">{t("auth.phone.title")}</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-grow flex-col justify-center">
				{otpSent ? (
					<div className="space-y-3">
						<div className="space-y-1">
							<Label htmlFor="otp">{t("auth.phone.otp")}</Label>
							<Input
								id="otp"
								placeholder={t("auth.phone.otpPlaceholder")}
								value={otp}
								onChange={(event) => setOtp(event.target.value)}
								required
							/>
						</div>
						<Button className="w-full" onClick={() => onStateChange("success")}>
							{t("auth.phone.verify")}
						</Button>
					</div>
				) : (
					<div className="space-y-3">
						<p className="text-xs text-muted-foreground">
							{t("auth.phone.willSend", { phone: phoneNumber })}
						</p>
						<Button className="w-full" onClick={() => setOtpSent(true)}>
							{t("auth.phone.sendOtp")}
						</Button>
					</div>
				)}
			</CardContent>
		</div>
	);
}
