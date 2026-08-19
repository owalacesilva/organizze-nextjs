"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useGamification } from "@/hooks/useGamification";
import { Coins } from "lucide-react";
import Link from "next/link";

/**
 * Token balance in the header, linking to where they can be spent.
 *
 * Renders nothing until the profile has loaded — a balance that flashes zero
 * and then corrects itself reads as tokens being taken away.
 */
export function TokenBalance() {
	const { t, formatNumber } = useTranslation();
	const { profile, isPending, isError } = useGamification();

	if (isPending || isError) return null;

	return (
		<Link
			href="/rewards"
			aria-label={t("gamification.tokens.balanceLabel", {
				count: profile.tokens.balance,
			})}
			className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-background px-2.5 text-xs font-semibold transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
			<Coins className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
			<span className="tabular-nums">{formatNumber(profile.tokens.balance)}</span>
		</Link>
	);
}
