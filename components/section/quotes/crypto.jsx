"use client";

import { useGetCryptoQuotes } from "@/app/api/quotes/hooks";
import { ChangeIndicator } from "./change-indicator";
import { QuotesPanel } from "./quotes-panel";

/**
 * Coins span six orders of magnitude — BTC in the hundreds of thousands of
 * reais, DOGE around one — so cheap coins get extra decimals rather than
 * collapsing to "R$ 1,04" for every sub-cent move.
 */
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

export default function Crypto() {
	const query = useGetCryptoQuotes();

	return (
		<QuotesPanel
			titleKey="quotes.tabs.crypto"
			columns={COLUMNS}
			rowKey={(quote) => quote.symbol}
			searchable={(quote) => `${quote.symbol} ${quote.name}`}
			query={query}
		/>
	);
}
