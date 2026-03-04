import { getTransactionById } from "@/app/api/transactions/actions";
import { TransactionByIdResponse } from "@/app/api/transactions/types";
import {
	useQuery,
	useMutation,
	type UseQueryResult,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useGetTransactionById = (
	id: number | string,
): UseQueryResult<any, Error> => {
	return useQuery<TransactionByIdResponse, Error, any>({
		queryKey: ["transactions", id],
		queryFn: () => getTransactionById(id),
		select: (res) => res.data,
		enabled: !!id && id !== 0,
		refetchOnMount: "always",
	});
};
