"use client";

import { useGetCryptoQuotes } from "@/app/api/quotes/hooks";
import { ChangeIndicator } from "./change-indicator";
import { QuotesPanel } from "./quotes-panel";

function priceDigits(value) {
	return Math.abs(value) < 10
		? { minimumFractionDigits: 4, maximumFractionDigits: 4 }
		: { minimumFractionDigits: 2, maximumFractionDigits: 2 };
}

const COLUMNS = [
	{
		key: "symbol",
		labelKey: "quotes.columns.asset",
		render: (quote) => (
			<div className="flex flex-col">
				<span className="font-medium">{quote.symbol}</span>
				<span className="text-[11px] text-muted-foreground">{quote.name}</span>
			</div>
		),
	},
	{
		key: "price",
		labelKey: "quotes.columns.price",
		align: "right",
		render: (quote, { formatBRL }) =>
			formatBRL(quote.price, priceDigits(quote.price)),
	},
	{
		key: "change",
		labelKey: "quotes.columns.change24h",
		align: "right",
		render: (quote) => <ChangeIndicator percent={quote.changePercent} />,
	},
	{
		key: "range",
		labelKey: "quotes.columns.range24h",
		align: "right",
		render: (quote, { formatBRL }) =>
			`${formatBRL(quote.low24h, priceDigits(quote.low24h))} – ${formatBRL(
				quote.high24h,
				priceDigits(quote.high24h),
			)}`,
	},
	{
		key: "volume24h",
		labelKey: "quotes.columns.volume24h",
		align: "right",
		render: (quote, { formatBRL }) =>
			formatBRL(quote.volume24h, {
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

const changeAmount = (quote, { formatBRL }) =>
	formatBRL(quote.change, {
		...priceDigits(quote.change),
		signDisplay: "exceptZero",
	});

const RANGE = {
	labelKey: "quotes.columns.range24h",
	low: (quote) => quote.low24h,
	high: (quote) => quote.high24h,
	value: (quote) => quote.price,
	render: (value, { formatBRL }) => formatBRL(value, priceDigits(value)),
};

const CARD = {
	title: (quote) => quote.symbol,
	subtitle: (quote) => quote.name,
	value: (quote, { formatBRL }) =>
		formatBRL(quote.price, priceDigits(quote.price)),
	change: (quote) => quote.changePercent,
	changeAmount,
	stats: ["volume24h", "marketCap"],
};

const DETAILS = {
	omit: ["symbol", "price", "change", "range"],
	stats: [
		{
			key: "changeValue",
			labelKey: "quotes.columns.changeValue",
			render: changeAmount,
		},
		{
			key: "previousClose",
			labelKey: "quotes.columns.previousClose",
			render: (quote, { formatBRL }) => {
				const previous = quote.price - quote.change;
				return formatBRL(previous, priceDigits(previous));
			},
		},
	],
};

export default function Crypto({ view, onViewChange }) {
	const query = useGetCryptoQuotes();

	return (
		<QuotesPanel
			titleKey="quotes.tabs.crypto"
			columns={COLUMNS}
			card={CARD}
			range={RANGE}
			details={DETAILS}
			rowKey={(quote) => quote.symbol}
			searchable={(quote) => `${quote.symbol} ${quote.name}`}
			query={query}
			view={view}
			onViewChange={onViewChange}
		/>
	);
}
