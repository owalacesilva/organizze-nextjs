import {
	createImport,
	deleteImport,
	getImports,
	updateImport,
} from "@/app/api/imports/actions";
import type {
	CreateImportRequest,
	CreateImportResponse,
	DeleteImportResponse,
	ImportsResponse,
	UpdateImportRequest,
	UpdateImportResponse,
} from "@/app/api/imports/types";
import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

export const useGetImports = (): UseQueryResult<ImportsResponse, Error> => {
	return useQuery<ImportsResponse, Error>({
		queryKey: ["imports"],
		queryFn: getImports,
		refetchOnMount: "always",
	});
};

export const useCreateImport = (): UseMutationResult<
	CreateImportResponse,
	Error,
	CreateImportRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createImport,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["imports"] });
		},
	});
};

export const useUpdateImport = (): UseMutationResult<
	UpdateImportResponse,
	Error,
	{ id: number | string; data: UpdateImportRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateImport(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["imports"] });
		},
	});
};

export const useDeleteImport = (): UseMutationResult<
	DeleteImportResponse,
	Error,
	number | string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteImport,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["imports"] });
		},
	});
};
