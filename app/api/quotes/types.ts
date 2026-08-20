interface BaseQuote {
	updatedAt: string;
}

interface MovingQuote extends BaseQuote {
	price: number;
	change: number;
	changePercent: number;
}

export type StockSector =
	| "beverages"
	| "carRental"
	| "financial"
	| "health"
	| "industrials"
	| "mining"
	| "oilGas"
	| "pulpPaper"
	| "retail"
	| "utilities";

export interface StockQuote extends MovingQuote {
	symbol: string;
	name: string;
	sector: StockSector;
	previousClose: number;
	dayHigh: number;
	dayLow: number;
	volume: number;
	marketCap: number;
}

export type FiiSegment =
	| "corporate"
	| "fundOfFunds"
	| "hybrid"
	| "logistics"
	| "malls"
	| "receivables";

export interface FiiQuote extends MovingQuote {
	symbol: string;
	name: string;
	segment: FiiSegment;
	previousClose: number;
	dividendYield: number;
	lastDividend: number;
	priceToBook: number;
}

export type TreasuryIndexer = "ipca" | "prefixado" | "selic";

export interface TreasuryQuote extends BaseQuote {
	id: number;
	name: string;
	indexer: TreasuryIndexer;
	maturity: string;
	rate: number;
	unitPrice: number;
	minimumInvestment: number;
}

export interface CurrencyQuote extends BaseQuote {
	code: string;
	bid: number;
	ask: number;
	change: number;
	changePercent: number;
	previousClose: number;
	dayHigh: number;
	dayLow: number;
}

export interface CryptoQuote extends MovingQuote {
	symbol: string;
	name: string;
	high24h: number;
	low24h: number;
	volume24h: number;
	marketCap: number;
}

export interface StockQuotesResponse {
	quotes: StockQuote[];
}

export interface FiiQuotesResponse {
	quotes: FiiQuote[];
}

export interface TreasuryQuotesResponse {
	quotes: TreasuryQuote[];
}

export interface CurrencyQuotesResponse {
	quotes: CurrencyQuote[];
}

export interface CryptoQuotesResponse {
	quotes: CryptoQuote[];
}
