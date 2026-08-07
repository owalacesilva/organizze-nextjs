"use client";

import { useGetCurrencyQuotes } from "@/app/api/quotes/hooks";
import { ChangeIndicator } from "./change-indicator";
import { QuotesPanel } from "./quotes-panel";

/** FX moves in the fourth decimal, so rates get more precision than prices. */
const RATE_DIGITS = { minimumFractionDigits: 4, maximumFractionDigits: 4 };

const COLUMNS = [
	{
		key: "pair",
		labelKey: "quotes.columns.pair",
		render: (quote, { t }) => (
			<div className="flex flex-col">
				<span className="font-medium">{quote.code}/BRL</span>
				<span className="text-[11px] text-muted-foreground">
					{t(`quotes.currencyNames.${quote.code}`)}
				</span>
			</div>
		),
	},
	{
		key: "bid",
		labelKey: "quotes.columns.bid",
		align: "right",
		render: (quote, { formatBRL }) => formatBRL(quote.bid, RATE_DIGITS),
	},
	{
		key: "ask",
		labelKey: "quotes.columns.ask",
		align: "right",
		render: (quote, { formatBRL }) => formatBRL(quote.ask, RATE_DIGITS),
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
			`${formatBRL(quote.dayLow, RATE_DIGITS)} – ${formatBRL(quote.dayHigh, RATE_DIGITS)}`,
	},
	{
		key: "previousClose",
		labelKey: "quotes.columns.previousClose",
		align: "right",
		render: (quote, { formatBRL }) =>
			formatBRL(quote.previousClose, RATE_DIGITS),
	},
];

export default function Currencies() {
	const query = useGetCurrencyQuotes();

	return (
		<QuotesPanel
			titleKey="quotes.tabs.currencies"
			columns={COLUMNS}
			rowKey={(quote) => quote.code}
			searchable={(quote, { t }) =>
				`${quote.code} ${t(`quotes.currencyNames.${quote.code}`)}`
			}
			query={query}
		/>
	);
}
