"use client";

import { useGetTreasuryQuotes } from "@/app/api/quotes/hooks";
import { Badge } from "@/components/ui/badge";
import { QuotesPanel } from "./quotes-panel";

const rateLabel = (quote, { t, formatNumber }) =>
	t(`quotes.rateFormat.${quote.indexer}`, {
		rate: formatNumber(quote.rate, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 4,
		}),
	});

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
		render: rateLabel,
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

const CARD = {
	title: (quote) => quote.name,
	subtitle: (quote, { t }) => t(`quotes.indexers.${quote.indexer}`),
	value: rateLabel,
	stats: ["maturity", "unitPrice", "minimumInvestment"],
};

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

const DETAILS = {
	omit: ["name", "indexer", "rate"],
	stats: [
		{
			key: "yearsToMaturity",
			labelKey: "quotes.columns.timeToMaturity",
			render: (quote, { t }) => {
				const years = (new Date(quote.maturity) - Date.now()) / YEAR_MS;
				return years <= 0
					? t("quotes.details.matured")
					: t("quotes.details.yearsToMaturity", { count: Math.ceil(years) });
			},
		},
	],
};

export default function Treasury({ view, onViewChange }) {
	const query = useGetTreasuryQuotes();

	return (
		<QuotesPanel
			titleKey="quotes.tabs.treasury"
			columns={COLUMNS}
			card={CARD}
			details={DETAILS}
			rowKey={(quote) => quote.id}
			searchable={(quote) => quote.name}
			query={query}
			view={view}
			onViewChange={onViewChange}
		/>
	);
}
