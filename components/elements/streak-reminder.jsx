"use client";

import { useGamification } from "@/hooks/useGamification";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * Warns that a live streak is about to lapse.
 *
 * NOTE: the spec asks for a push notification or an email three hours before
 * midnight. Neither exists in this app — there is no notification service, no
 * mail transport and no server-side scheduler — and neither can be faked from
 * the client, since both have to reach a user who has closed the tab. This is
 * the in-app stand-in: it fires on the same three-hour trigger, but only for
 * someone who is looking at the page. Delivering it while they are away needs
 * a scheduled job on the backend.
 *
 * `useGamification` ticks its clock every minute, so a session left open
 * crosses into the window on its own.
 */
export function StreakReminder() {
	const { t } = useTranslation();
	const { profile, isPending } = useGamification();
	const warned = useRef(false);

	const { atRisk, current } = profile.streak;

	useEffect(() => {
		if (isPending) return;

		// Logging a transaction clears the risk and re-arms the warning for
		// tomorrow, so the toast cannot repeat within one evening.
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
