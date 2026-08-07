"use client";

import { cn } from "@/lib/utils";

/**
 * Where the current value sits between the low and the high of its window.
 *
 * The marker is centred on its position, so it keeps its full width at either
 * extreme instead of half-disappearing off the end of the track.
 */
export function RangeBar({
	low,
	high,
	value,
	render,
	format,
	label,
	className,
}) {
	const span = high - low;
	const percent = span > 0 ? ((value - low) / span) * 100 : 50;
	const clamped = Math.min(100, Math.max(0, percent));

	return (
		<div className={cn("space-y-1", className)}>
			{label && (
				<p className="text-[10px] uppercase tracking-wide text-muted-foreground">
					{label}
				</p>
			)}

			<div className="relative h-1.5 rounded-full bg-muted">
				<span
					className="absolute top-1/2 h-3 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
					style={{ left: `${clamped}%` }}
				/>
			</div>

			<div className="flex justify-between text-[10px] tabular-nums text-muted-foreground">
				<span>{render(low, format)}</span>
				<span>{render(high, format)}</span>
			</div>
		</div>
	);
}
