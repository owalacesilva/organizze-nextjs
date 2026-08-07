import type {
	CryptoQuotesResponse,
	CurrencyQuotesResponse,
	FiiQuotesResponse,
	StockQuotesResponse,
	TreasuryQuotesResponse,
} from "@/app/api/quotes/types";
import { SIMULATION_ENABLED, simulatedQuotes } from "@/lib/simulation";

export const getStockQuotes = async (): Promise<StockQuotesResponse> => {
	if (SIMULATION_ENABLED) return simulatedQuotes.stocks();

	const response = await fetch("/api/quotes/stocks", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch stock quotes");
	}

	return await response.json();
};

export const getFiiQuotes = async (): Promise<FiiQuotesResponse> => {
	if (SIMULATION_ENABLED) return simulatedQuotes.fiis();

	const response = await fetch("/api/quotes/fiis", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch FII quotes");
	}

	return await response.json();
};

export const getTreasuryQuotes = async (): Promise<TreasuryQuotesResponse> => {
	if (SIMULATION_ENABLED) return simulatedQuotes.treasury();

	const response = await fetch("/api/quotes/treasury", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch treasury quotes");
	}

	return await response.json();
};

export const getCurrencyQuotes = async (): Promise<CurrencyQuotesResponse> => {
	if (SIMULATION_ENABLED) return simulatedQuotes.currencies();

	const response = await fetch("/api/quotes/currencies", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch currency quotes");
	}

	return await response.json();
};

export const getCryptoQuotes = async (): Promise<CryptoQuotesResponse> => {
	if (SIMULATION_ENABLED) return simulatedQuotes.crypto();

	const response = await fetch("/api/quotes/crypto", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch crypto quotes");
	}

	return await response.json();
};
