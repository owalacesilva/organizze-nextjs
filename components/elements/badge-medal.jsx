"use client";

import { cn } from "@/lib/utils";
import {
	Award,
	CalendarCheck,
	CalendarDays,
	Flame,
	Footprints,
	Lock,
	PiggyBank,
	Rocket,
	Sprout,
	Target,
	Trophy,
	Wallet,
} from "lucide-react";

/** One icon per badge id, so a medal is recognisable before it is read. */
const ICONS = {
	firstStep: Footprints,
	weekStreak: Flame,
	monthStreak: CalendarCheck,
	quarterStreak: CalendarDays,
	firstBudget: Wallet,
	budgetKeeper: PiggyBank,
	firstGoal: Target,
	goalAchiever: Award,
	goalCollector: Trophy,
	saver: Sprout,
	superSaver: Trophy,
	foundingMember: Rocket,
};

const TIER_CLASS = {
	bronze: "bg-amber-600/15 text-amber-700 ring-amber-600/30 dark:text-amber-500",
	silver: "bg-slate-400/15 text-slate-600 ring-slate-400/30 dark:text-slate-300",
	gold: "bg-yellow-500/15 text-yellow-700 ring-yellow-500/30 dark:text-yellow-400",
};

/**
 * A badge medal.
 *
 * Locked medals keep the badge's own icon rather than swapping to a padlock —
 * seeing what you are working towards is the point — and go flat grey so the
 * unlocked ones still read at a glance.
 */
export function BadgeMedal({ id, tier = "bronze", unlocked = false, size = "default" }) {
	const Icon = ICONS[id] ?? Award;
	const large = size === "large";

	return (
		<span
			className={cn(
				"relative inline-flex shrink-0 items-center justify-center rounded-full ring-1",
				large ? "h-16 w-16" : "h-10 w-10",
				unlocked
					? TIER_CLASS[tier] ?? TIER_CLASS.bronze
					: "bg-muted text-muted-foreground/50 ring-border grayscale",
			)}
		>
			<Icon className={large ? "h-7 w-7" : "h-5 w-5"} aria-hidden="true" />

			{!unlocked && (
				<span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border bg-background">
					<Lock className="h-2.5 w-2.5 text-muted-foreground" aria-hidden="true" />
				</span>
			)}
		</span>
	);
}
