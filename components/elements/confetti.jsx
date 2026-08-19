"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const PIECE_COUNT = 28;
const DURATION_MS = 2200;

const COLORS = [
	"bg-primary",
	"bg-emerald-500",
	"bg-amber-400",
	"bg-rose-500",
	"bg-sky-400",
];

/**
 * A short burst of confetti, drawn with divs.
 *
 * Deliberately not a dependency: two dozen absolutely-positioned squares on a
 * CSS keyframe cost nothing and cannot break the bundle.
 *
 * Honours `prefers-reduced-motion` by not rendering at all — a celebration is
 * decorative, and the badge or completed bar already says the same thing.
 *
 * @param active Flip to `true` to fire. Re-firing needs a new `runKey`.
 */
export function Confetti({ active, runKey, className }) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (!active) return undefined;

		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

		if (reduced) return undefined;

		setVisible(true);
		const id = setTimeout(() => setVisible(false), DURATION_MS);
		return () => clearTimeout(id);
	}, [active, runKey]);

	// Positions are fixed per mount so a re-render does not reshuffle mid-flight.
	const pieces = useMemo(
		() =>
			Array.from({ length: PIECE_COUNT }, (_, index) => ({
				id: index,
				left: (index * 97) % 100,
				delay: (index % 7) * 90,
				drift: ((index % 5) - 2) * 18,
				color: COLORS[index % COLORS.length],
				size: 4 + (index % 3) * 2,
			})),
		[],
	);

	if (!visible) return null;

	return (
		<div
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute inset-0 z-20 overflow-hidden",
				className,
			)}
		>
			{pieces.map((piece) => (
				<span
					key={piece.id}
					className={cn("confetti-piece absolute top-0 rounded-[1px]", piece.color)}
					style={{
						left: `${piece.left}%`,
						width: piece.size,
						height: piece.size * 2,
						animationDelay: `${piece.delay}ms`,
						"--confetti-drift": `${piece.drift}px`,
					}}
				/>
			))}
		</div>
	);
}
