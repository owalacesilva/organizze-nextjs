import {
	getCryptoQuotes,
	getCurrencyQuotes,
	getFiiQuotes,
	getStockQuotes,
	getTreasuryQuotes,
} from "@/app/api/quotes/actions";
import {
	CryptoQuotesResponse,
	CurrencyQuotesResponse,
	FiiQuotesResponse,
	StockQuotesResponse,
	TreasuryQuotesResponse,
} from "@/app/api/quotes/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useGetStockQuotes = (): UseQueryResult<
	StockQuotesResponse,
	Error
> => {
	return useQuery<StockQuotesResponse, Error>({
		queryKey: ["quotes", "stocks"],
		queryFn: getStockQuotes,
		refetchOnMount: "always",
	});
};

export const useGetFiiQuotes = (): UseQueryResult<FiiQuotesResponse, Error> => {
	return useQuery<FiiQuotesResponse, Error>({
		queryKey: ["quotes", "fiis"],
		queryFn: getFiiQuotes,
		refetchOnMount: "always",
	});
};

export const useGetTreasuryQuotes = (): UseQueryResult<
	TreasuryQuotesResponse,
	Error
> => {
	return useQuery<TreasuryQuotesResponse, Error>({
		queryKey: ["quotes", "treasury"],
		queryFn: getTreasuryQuotes,
		refetchOnMount: "always",
	});
};

export const useGetCurrencyQuotes = (): UseQueryResult<
	CurrencyQuotesResponse,
	Error
> => {
	return useQuery<CurrencyQuotesResponse, Error>({
		queryKey: ["quotes", "currencies"],
		queryFn: getCurrencyQuotes,
		refetchOnMount: "always",
	});
};

export const useGetCryptoQuotes = (): UseQueryResult<
	CryptoQuotesResponse,
	Error
> => {
	return useQuery<CryptoQuotesResponse, Error>({
		queryKey: ["quotes", "crypto"],
		queryFn: getCryptoQuotes,
		refetchOnMount: "always",
	});
};
