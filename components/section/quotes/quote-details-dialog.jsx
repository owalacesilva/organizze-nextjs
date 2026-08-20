"use client";

import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ChangeIndicator } from "./change-indicator";
import { RangeBar } from "./range-bar";
import { useQuoteFormat } from "./use-quote-format";

function Stat({ label, value }) {
	return (
		<div className="space-y-0.5">
			<p className="text-[10px] uppercase tracking-wide text-muted-foreground">
				{label}
			</p>
			<div className="text-xs font-medium tabular-nums">{value}</div>
		</div>
	);
}

export function QuoteDetailsDialog({
	quote,
	open,
	onOpenChange,
	card,
	columns = [],
	range,
	details = {},
}) {
	const format = useQuoteFormat();
	const { t, formatDate } = format;

	if (!quote) return null;

	const omit = details.omit ?? [];
	const fromColumns = columns.filter((column) => !omit.includes(column.key));
	const stats = [...fromColumns, ...(details.stats ?? [])];
	const change = card.change?.(quote, format);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent closeLabel={t("common.close")}>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						{card.title(quote, format)}
						{card.badge && (
							<Badge variant="secondary">{card.badge(quote, format)}</Badge>
						)}
					</DialogTitle>
					<DialogDescription>{card.subtitle(quote, format)}</DialogDescription>
				</DialogHeader>

				<DialogBody>
					<div className="flex items-baseline justify-between gap-2">
						<p className="text-xl font-bold tabular-nums">
							{card.value(quote, format)}
						</p>
						{change !== undefined && <ChangeIndicator percent={change} />}
					</div>

					{range && (
						<RangeBar
							label={t(range.labelKey)}
							low={range.low(quote)}
							high={range.high(quote)}
							value={range.value(quote)}
							render={range.render}
							format={format}
						/>
					)}

					<Separator />

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
						{stats.map((stat) => (
							<Stat
								key={stat.key}
								label={t(stat.labelKey)}
								value={stat.render(quote, format)}
							/>
						))}
					</div>

					<Separator />

					<p className="text-[11px] text-muted-foreground">
						{t("quotes.updatedAt", {
							time: formatDate(quote.updatedAt, {
								dateStyle: "medium",
								timeStyle: "medium",
							}),
						})}
					</p>
				</DialogBody>
			</DialogContent>
		</Dialog>
	);
}
