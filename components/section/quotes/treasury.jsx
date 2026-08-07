"use client";

import { useGetTreasuryQuotes } from "@/app/api/quotes/hooks";
import { Badge } from "@/components/ui/badge";
import { QuotesPanel } from "./quotes-panel";

/**
 * Treasury bonds do not tick like a share does — brokers list the annual rate,
 * the maturity and what a slice costs — so this tab carries no change column.
 * How the rate reads depends on the indexer, hence the per-indexer template.
 */
const COLUMNS = [
	{
		key: "name",
		labelKey: "quotes.columns.bond",
		render: (quote) => <span className="font-medium">{quote.name}</span>,
	},
	{
		key: "indexer",
		labelKey: "quotes.columns.indexer",
		render: (quote, { t }) => (
			<Badge variant="secondary">
				{t(`quotes.indexers.${quote.indexer}`)}
			</Badge>
		),
	},
	{
		key: "maturity",
		labelKey: "quotes.columns.maturity",
		align: "right",
		render: (quote, { formatDate }) => formatDate(quote.maturity),
	},
	{
		key: "rate",
		labelKey: "quotes.columns.rate",
		align: "right",
		render: (quote, { t, formatNumber }) =>
			t(`quotes.rateFormat.${quote.indexer}`, {
				rate: formatNumber(quote.rate, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 4,
				}),
			}),
	},
	{
		key: "unitPrice",
		labelKey: "quotes.columns.unitPrice",
		align: "right",
		render: (quote, { formatBRL }) => formatBRL(quote.unitPrice),
	},
	{
		key: "minimumInvestment",
		labelKey: "quotes.columns.minimumInvestment",
		align: "right",
		render: (quote, { formatBRL }) => formatBRL(quote.minimumInvestment),
	},
];

export default function Treasury() {
	const query = useGetTreasuryQuotes();

	return (
		<QuotesPanel
			titleKey="quotes.tabs.treasury"
			columns={COLUMNS}
			rowKey={(quote) => quote.id}
			searchable={(quote) => quote.name}
			query={query}
		/>
	);
}
