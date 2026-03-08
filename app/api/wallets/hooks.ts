import {
	getWallets,
	getWalletById,
	createWallet,
	updateWallet,
	editWallet,
	deleteWallet,
} from "@/app/api/wallets/actions";
import type {
	WalletByIdResponse,
	WalletsResponse,
	CreateWalletRequest,
	CreateWalletResponse,
	UpdateWalletRequest,
	UpdateWalletResponse,
	DeleteWalletResponse,
} from "@/app/api/wallets/types";
import {
	useQuery,
	useMutation,
	type UseQueryResult,
	type UseMutationResult,
	useQueryClient,
} from "@tanstack/react-query";

export const useGetWallets = (): UseQueryResult<WalletsResponse, Error> => {
	return useQuery<WalletsResponse, Error>({
		queryKey: ["wallets"],
		queryFn: getWallets,
		refetchOnMount: "always",
	});
};

export const useGetWalletById = (
	id: number | string,
): UseQueryResult<WalletByIdResponse, Error> => {
	return useQuery<WalletByIdResponse, Error>({
		queryKey: ["wallets", id],
		queryFn: () => getWalletById(id),
		enabled: !!id && id !== 0,
		refetchOnMount: "always",
	});
};

export const useCreateWallet = (): UseMutationResult<
	CreateWalletResponse,
	Error,
	CreateWalletRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createWallet,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wallets"] });
		},
	});
};

export const useUpdateWallet = (): UseMutationResult<
	UpdateWalletResponse,
	Error,
	{ id: number | string; data: UpdateWalletRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateWallet(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["wallets", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["wallets"] });
		},
	});
};

export const useEditWallet = (): UseMutationResult<
	UpdateWalletResponse,
	Error,
	{ id: number | string; data: UpdateWalletRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => editWallet(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["wallets", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["wallets"] });
		},
	});
};

export const useDeleteWallet = (): UseMutationResult<
	DeleteWalletResponse,
	Error,
	number | string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteWallet,
		onSuccess: (_, id) => {
			queryClient.removeQueries({ queryKey: ["wallets", id] });
			queryClient.invalidateQueries({ queryKey: ["wallets"] });
		},
	});
};
