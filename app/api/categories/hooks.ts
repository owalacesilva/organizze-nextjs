import {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	editCategory,
	deleteCategory,
} from "@/app/api/categories/actions";
import {
	CategoryByIdResponse,
	CategoriesResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
	DeleteCategoryResponse,
} from "@/app/api/categories/types";
import {
	useQuery,
	useMutation,
	type UseQueryResult,
	type UseMutationResult,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";

export const useGetCategories = (): UseQueryResult<
	CategoriesResponse,
	Error
> => {
	return useQuery<CategoriesResponse, Error>({
		queryKey: ["categories"],
		queryFn: getCategories,
		refetchOnMount: "always",
	});
};

export const useGetCategoryById = (
	id: number | string,
): UseQueryResult<any, Error> => {
	return useQuery<CategoryByIdResponse, Error, any>({
		queryKey: ["categories", id],
		queryFn: () => getCategoryById(id),
		select: (res) => res.data,
		enabled: !!id && id !== 0,
		refetchOnMount: "always",
	});
};

export const useCreateCategory = (): UseMutationResult<
	CreateCategoryResponse,
	Error,
	CreateCategoryRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			// Invalidate and refetch categories list
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

export const useUpdateCategory = (): UseMutationResult<
	UpdateCategoryResponse,
	Error,
	{ id: number | string; data: UpdateCategoryRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateCategory(id, data),
		onSuccess: (_, variables) => {
			// Invalidate the specific category and categories list
			queryClient.invalidateQueries({
				queryKey: ["categories", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

export const useEditCategory = (): UseMutationResult<
	UpdateCategoryResponse,
	Error,
	{ id: number | string; data: UpdateCategoryRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => editCategory(id, data),
		onSuccess: (_, variables) => {
			// Invalidate the specific category and categories list
			queryClient.invalidateQueries({
				queryKey: ["categories", variables.id],
			});
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

export const useDeleteCategory = (): UseMutationResult<
	DeleteCategoryResponse,
	Error,
	number | string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: (_, id) => {
			// Remove the specific category from cache and invalidate categories list
			queryClient.removeQueries({ queryKey: ["categories", id] });
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
