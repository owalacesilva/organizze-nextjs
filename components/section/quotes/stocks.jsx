"use client";

import { useGetStockQuotes } from "@/app/api/quotes/hooks";
import { Badge } from "@/components/ui/badge";
import { ChangeIndicator } from "./change-indicator";
import { QuotesPanel } from "./quotes-panel";

const COLUMNS = [
	{
		key: "symbol",
		labelKey: "quotes.columns.symbol",
		render: (quote) => (
			<div className="flex flex-col">
				<span className="font-medium">{quote.symbol}</span>
				<span className="text-[11px] text-muted-foreground">{quote.name}</span>
			</div>
		),
	},
	{
		key: "sector",
		labelKey: "quotes.columns.sector",
		render: (quote, { t }) => (
			<Badge variant="secondary">{t(`quotes.sectors.${quote.sector}`)}</Badge>
		),
	},
	{
		key: "price",
		labelKey: "quotes.columns.price",
		align: "right",
		render: (quote, { formatBRL }) => formatBRL(quote.price),
	},
	{
		key: "change",
		labelKey: "quotes.columns.change",
		align: "right",
		render: (quote) => <ChangeIndicator percent={quote.changePercent} />,
	},
	{
		key: "range",
		labelKey: "quotes.columns.dayRange",
		align: "right",
		render: (quote, { formatBRL }) =>
			`${formatBRL(quote.dayLow)} – ${formatBRL(quote.dayHigh)}`,
	},
	{
		key: "volume",
		labelKey: "quotes.columns.volume",
		align: "right",
		render: (quote, { formatNumber }) =>
			formatNumber(quote.volume, {
				notation: "compact",
				maximumFractionDigits: 1,
			}),
	},
	{
		key: "marketCap",
		labelKey: "quotes.columns.marketCap",
		align: "right",
		render: (quote, { formatBRL }) =>
			formatBRL(quote.marketCap, {
				notation: "compact",
				maximumFractionDigits: 1,
			}),
	},
];

export default function Stocks() {
	const query = useGetStockQuotes();

	return (
		<QuotesPanel
			titleKey="quotes.tabs.stocks"
			columns={COLUMNS}
			rowKey={(quote) => quote.symbol}
			searchable={(quote) => `${quote.symbol} ${quote.name}`}
			query={query}
		/>
	);
}
