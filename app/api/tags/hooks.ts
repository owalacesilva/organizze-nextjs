import {
	createTag,
	deleteTag,
	getTags,
	updateTag,
} from "@/app/api/tags/actions";
import type {
	TagsResponse,
	CreateTagRequest,
	CreateTagResponse,
	DeleteTagResponse,
	UpdateTagRequest,
	UpdateTagResponse,
} from "@/app/api/tags/types";
import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

export const useGetTags = (): UseQueryResult<TagsResponse, Error> => {
	return useQuery<TagsResponse, Error>({
		queryKey: ["tags"],
		queryFn: getTags,
		refetchOnMount: "always",
	});
};

export const useCreateTag = (): UseMutationResult<
	CreateTagResponse,
	Error,
	CreateTagRequest
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTag,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tags"] });
		},
	});
};

export const useUpdateTag = (): UseMutationResult<
	UpdateTagResponse,
	Error,
	{ id: number | string; data: UpdateTagRequest }
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }) => updateTag(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tags"] });
		},
	});
};

export const useDeleteTag = (): UseMutationResult<
	DeleteTagResponse,
	Error,
	number | string
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTag,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tags"] });
		},
	});
};
