"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { CheckCircle2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DURATION_MS = 3000;
const TICK_MS = 50;

export default function EmailVerification({ email }) {
	const { t } = useTranslation();
	const router = useRouter();
	const [verified, setVerified] = useState(false);
	const [progress, setProgress] = useState(0);

	// Stands in for polling the backend for the verification result.
	useEffect(() => {
		const steps = DURATION_MS / TICK_MS;
		let step = 0;

		const timer = setInterval(() => {
			step += 1;
			setProgress(Math.min((step / steps) * 100, 100));
			if (step >= steps) {
				clearInterval(timer);
				setVerified(true);
			}
		}, TICK_MS);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (!verified) return;

		const timer = setTimeout(() => router.push("/"), 1500);
		return () => clearTimeout(timer);
	}, [verified, router]);

	return (
		<div className="flex h-full flex-col justify-center">
			<CardHeader>
				<CardTitle className="text-base">{t("auth.email.title")}</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-grow flex-col items-center justify-center gap-3 text-center">
				{verified ? (
					<>
						<CheckCircle2 className="h-12 w-12 text-emerald-500" />
						<div className="space-y-1">
							<p className="text-sm font-medium">{t("auth.email.verified")}</p>
							<p className="text-xs text-muted-foreground">
								{t("auth.email.verifiedDescription")}
							</p>
							<p className="animate-pulse text-[11px] text-muted-foreground">
								{t("auth.email.redirecting")}
							</p>
						</div>
					</>
				) : (
					<>
						<Mail className="h-12 w-12 text-primary" />
						<div className="space-y-1">
							<p className="text-sm font-medium">{t("auth.email.verifying")}</p>
							<p className="text-xs text-muted-foreground">
								{t("auth.email.confirming", { email })}
							</p>
							<p className="text-[11px] text-muted-foreground">
								{t("auth.email.moment")}
							</p>
						</div>
						<Progress value={progress} className="w-full max-w-xs" />
					</>
				)}
			</CardContent>
		</div>
	);
}
