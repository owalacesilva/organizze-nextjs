"use client";

import { useGetFiiQuotes } from "@/app/api/quotes/hooks";
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
		key: "segment",
		labelKey: "quotes.columns.segment",
		render: (quote, { t }) => (
			<Badge variant="secondary">{t(`quotes.segments.${quote.segment}`)}</Badge>
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
		key: "dividendYield",
		labelKey: "quotes.columns.dividendYield",
		align: "right",
		render: (quote, { formatNumber }) =>
			`${formatNumber(quote.dividendYield, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})}%`,
	},
	{
		key: "lastDividend",
		labelKey: "quotes.columns.lastDividend",
		align: "right",
		render: (quote, { formatBRL }) => formatBRL(quote.lastDividend),
	},
	{
		key: "priceToBook",
		labelKey: "quotes.columns.priceToBook",
		align: "right",
		render: (quote, { formatNumber }) =>
			formatNumber(quote.priceToBook, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}),
	},
];

const changeAmount = (quote, { formatBRL }) =>
	formatBRL(quote.change, { signDisplay: "exceptZero" });

const CARD = {
	title: (quote) => quote.symbol,
	subtitle: (quote) => quote.name,
	badge: (quote, { t }) => t(`quotes.segments.${quote.segment}`),
	value: (quote, { formatBRL }) => formatBRL(quote.price),
	change: (quote) => quote.changePercent,
	changeAmount,
	stats: ["dividendYield", "lastDividend", "priceToBook"],
};

const DETAILS = {
	omit: ["symbol", "segment", "price", "change"],
	stats: [
		{
			key: "changeValue",
			labelKey: "quotes.columns.changeValue",
			render: changeAmount,
		},
		{
			key: "previousClose",
			labelKey: "quotes.columns.previousClose",
			render: (quote, { formatBRL }) => formatBRL(quote.previousClose),
		},
		{
			key: "annualisedDividend",
			labelKey: "quotes.columns.annualisedDividend",
			render: (quote, { formatBRL }) => formatBRL(quote.lastDividend * 12),
		},
	],
};

export default function Fiis({ view, onViewChange }) {
	const query = useGetFiiQuotes();

	return (
		<QuotesPanel
			titleKey="quotes.tabs.fiis"
			columns={COLUMNS}
			card={CARD}
			details={DETAILS}
			rowKey={(quote) => quote.symbol}
			searchable={(quote) => `${quote.symbol} ${quote.name}`}
			query={query}
			view={view}
			onViewChange={onViewChange}
		/>
	);
}
