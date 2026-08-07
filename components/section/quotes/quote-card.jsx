"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChangeIndicator } from "./change-indicator";
import { RangeBar } from "./range-bar";

/**
 * Card form of a quote — the primary view of this page.
 *
 * It carries what the table row carries plus the shape of the move: the change
 * in currency under the percentage, and the position of the price within the
 * session's range. Supporting stats are named by column key so the card and
 * the table always format the same figures the same way.
 *
 * The whole card opens the details dialog, the same way a goal card does.
 */
export function QuoteCard({ quote, card, columns, range, format, onSelect }) {
	const { t } = format;
	const change = card.change?.(quote, format);

	const stats = (card.stats ?? [])
		.map((key) => columns.find((column) => column.key === key))
		.filter(Boolean);

	// The card is the whole hit area, so it has to answer to the keyboard as
	// well as the pointer — this is the primary way into the details dialog.
	const open = () => onSelect(quote);
	const handleKeyDown = (event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		open();
	};

	return (
		<Card
			role="button"
			tabIndex={0}
			aria-label={t("quotes.viewDetails", { name: card.title(quote, format) })}
			onClick={open}
			onKeyDown={handleKeyDown}
			className="h-full cursor-pointer transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
			<CardContent className="flex h-full flex-col gap-2.5 p-3">
				<div className="flex items-start gap-2">
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-semibold">
							{card.title(quote, format)}
						</p>
						<p className="truncate text-[11px] text-muted-foreground">
							{card.subtitle(quote, format)}
						</p>
					</div>

					{card.badge && (
						<Badge variant="secondary" className="shrink-0">
							{card.badge(quote, format)}
						</Badge>
					)}
				</div>

				<div className="flex items-end justify-between gap-2">
					<span className="text-xl font-bold tabular-nums">
						{card.value(quote, format)}
					</span>

					{change !== undefined && (
						<span className="flex flex-col items-end">
							<ChangeIndicator percent={change} />
							{card.changeAmount && (
								<span className="text-[11px] tabular-nums text-muted-foreground">
									{card.changeAmount(quote, format)}
								</span>
							)}
						</span>
					)}
				</div>

				{range && (
					<RangeBar
						low={range.low(quote)}
						high={range.high(quote)}
						value={range.value(quote)}
						render={range.render}
						format={format}
					/>
				)}

				{stats.length > 0 && (
					<div className="mt-auto space-y-0.5 border-t pt-2">
						{stats.map((stat) => (
							<div
								key={stat.key}
								className="flex items-baseline justify-between gap-2 text-[11px]"
							>
								<span className="truncate text-muted-foreground">
									{t(stat.labelKey)}
								</span>
								<span className="shrink-0 tabular-nums">
									{stat.render(quote, format)}
								</span>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
