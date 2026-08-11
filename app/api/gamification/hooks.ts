import {
	celebrateBadge,
	getGamification,
	purchaseTheme,
	updateGamification,
} from "@/app/api/gamification/actions";
import {
	GamificationResponse,
	GamificationStateResponse,
	UpdateGamificationRequest,
} from "@/app/api/gamification/types";
import {
	useMutation,
	useQuery,
	useQueryClient,
	type UseMutationResult,
	type UseQueryResult,
} from "@tanstack/react-query";

export const useGetGamification = (): UseQueryResult<
	GamificationResponse,
	Error
> => {
	return useQuery<GamificationResponse, Error>({
		queryKey: ["gamification"],
		queryFn: getGamification,
		refetchOnMount: "always",
	});
};

export const useUpdateGamification = (): UseMutationResult<
	GamificationStateResponse,
	Error,
	UpdateGamificationRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateGamification,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gamification"] });
		},
	});
};

export const usePurchaseTheme = (): UseMutationResult<
	GamificationStateResponse,
	Error,
	string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: purchaseTheme,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gamification"] });
		},
	});
};

export const useCelebrateBadge = (): UseMutationResult<
	GamificationStateResponse,
	Error,
	string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: celebrateBadge,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["gamification"] });
		},
	});
};
