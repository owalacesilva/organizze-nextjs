"use client";

import { useGamification } from "@/hooks/useGamification";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function StreakReminder() {
	const { t } = useTranslation();
	const { profile, isPending } = useGamification();
	const warned = useRef(false);

	const { atRisk, current } = profile.streak;

	useEffect(() => {
		if (isPending) return;

		if (!atRisk) {
			warned.current = false;
			return;
		}

		if (warned.current) return;
		warned.current = true;

		toast.warning(t("gamification.streak.riskToastTitle"), {
			description: t("gamification.streak.riskToastBody", { count: current }),
			duration: 10_000,
		});
	}, [atRisk, current, isPending, t]);

	return null;
}
