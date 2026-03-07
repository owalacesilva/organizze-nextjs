import {
	getTransactions,
	getTransactionById,
	createTransaction,
	updateTransaction,
	editTransaction,
	deleteTransaction,
} from "@/app/api/transactions/actions";
import {
	TransactionByIdResponse,
	TransactionsResponse,
	CreateTransactionRequest,
	CreateTransactionResponse,
	UpdateTransactionRequest,
	UpdateTransactionResponse,
	DeleteTransactionResponse,
} from "@/app/api/transactions/types";
import {
	useQuery,
	useMutation,
	type UseQueryResult,
	type UseMutationResult,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useGetTransactions = (): UseQueryResult<
	TransactionsResponse,
	Error
> => {
	return useQuery<TransactionsResponse, Error>({
		queryKey: ["transactions"],
		queryFn: getTransactions,
		refetchOnMount: "always",
	});
};

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

export const useCreateTransaction = (): UseMutationResult<
	CreateTransactionResponse,
	Error,
	CreateTransactionRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTransaction,
		onSuccess: () => {
			// Invalidate and refetch transactions list
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});
};

export const useUpdateTransaction = (): UseMutationResult<
	UpdateTransactionResponse,
	Error,
	{ id: number | string; data: UpdateTransactionRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateTransaction(id, data),
		onSuccess: (_, variables) => {
			// Invalidate the specific transaction and transactions list
			queryClient.invalidateQueries({
				queryKey: ["transactions", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});
};

export const useEditTransaction = (): UseMutationResult<
	UpdateTransactionResponse,
	Error,
	{ id: number | string; data: UpdateTransactionRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => editTransaction(id, data),
		onSuccess: (_, variables) => {
			// Invalidate the specific transaction and transactions list
			queryClient.invalidateQueries({
				queryKey: ["transactions", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});
};

export const useDeleteTransaction = (): UseMutationResult<
	DeleteTransactionResponse,
	Error,
	number | string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTransaction,
		onSuccess: (_, id) => {
			// Remove the specific transaction from cache and invalidate transactions list
			queryClient.removeQueries({ queryKey: ["transactions", id] });
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
		},
	});
};
