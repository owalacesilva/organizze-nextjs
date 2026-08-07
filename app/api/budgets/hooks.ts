import {
	createBudget,
	deleteBudget,
	getBudgets,
	updateBudget,
} from "@/app/api/budgets/actions";
import type {
	BudgetsResponse,
	CreateBudgetRequest,
	CreateBudgetResponse,
	DeleteBudgetResponse,
	UpdateBudgetRequest,
	UpdateBudgetResponse,
} from "@/app/api/budgets/types";
import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

export const useGetBudgets = (): UseQueryResult<BudgetsResponse, Error> => {
	return useQuery<BudgetsResponse, Error>({
		queryKey: ["budgets"],
		queryFn: getBudgets,
		refetchOnMount: "always",
	});
};

export const useCreateBudget = (): UseMutationResult<
	CreateBudgetResponse,
	Error,
	CreateBudgetRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createBudget,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgets"] });
		},
	});
};

export const useUpdateBudget = (): UseMutationResult<
	UpdateBudgetResponse,
	Error,
	{ id: number | string; data: UpdateBudgetRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateBudget(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgets"] });
		},
	});
};

export const useDeleteBudget = (): UseMutationResult<
	DeleteBudgetResponse,
	Error,
	number | string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteBudget,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["budgets"] });
		},
	});
};
