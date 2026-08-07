"use client";

import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { CheckCircle } from "lucide-react";

export default function Success({ onStateChange, message, nextState }) {
	const { t } = useTranslation();

	return (
		<div className="flex h-full flex-col justify-center">
			<CardHeader>
				<CardTitle className="text-base">{t("auth.success.title")}</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-grow flex-col items-center justify-center gap-2 text-center">
				<CheckCircle className="h-12 w-12 text-emerald-500" />
				<p className="text-xs text-muted-foreground">
					{message ?? t("auth.success.message")}
				</p>
			</CardContent>

			<CardFooter className="mt-auto justify-center border-t pt-3">
				<Button onClick={() => onStateChange(nextState)}>
					{t("auth.success.continue")}
				</Button>
			</CardFooter>
		</div>
	);
}
