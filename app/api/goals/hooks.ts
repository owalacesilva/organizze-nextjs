import {
	createGoal,
	deleteGoal,
	getGoals,
	updateGoal,
} from "@/app/api/goals/actions";
import type {
	GoalsResponse,
	CreateGoalRequest,
	CreateGoalResponse,
	DeleteGoalResponse,
	UpdateGoalRequest,
	UpdateGoalResponse,
} from "@/app/api/goals/types";
import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

export const useGetGoals = (): UseQueryResult<GoalsResponse, Error> => {
	return useQuery<GoalsResponse, Error>({
		queryKey: ["goals"],
		queryFn: getGoals,
		refetchOnMount: "always",
	});
};

export const useCreateGoal = (): UseMutationResult<
	CreateGoalResponse,
	Error,
	CreateGoalRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createGoal,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["goals"] });
		},
	});
};

export const useUpdateGoal = (): UseMutationResult<
	UpdateGoalResponse,
	Error,
	{ id: number | string; data: UpdateGoalRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateGoal(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["goals"] });
		},
	});
};

export const useDeleteGoal = (): UseMutationResult<
	DeleteGoalResponse,
	Error,
	number | string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteGoal,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["goals"] });
		},
	});
};
