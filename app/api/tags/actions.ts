import { API_BASE_URL } from "@/app/api";
import type {
	TagsResponse,
	CreateTagRequest,
	CreateTagResponse,
	DeleteTagResponse,
	UpdateTagRequest,
	UpdateTagResponse,
} from "@/app/api/tags/types";
import { SIMULATION_ENABLED, simulatedTags } from "@/lib/simulation";

export const getTags = async (): Promise<TagsResponse> => {
	if (SIMULATION_ENABLED) return simulatedTags.list();

	const response = await fetch(`${API_BASE_URL}/api/tags`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch tags");
	}

	return await response.json();
};

export const createTag = async (
	data: CreateTagRequest,
): Promise<CreateTagResponse> => {
	if (SIMULATION_ENABLED) return simulatedTags.create(data);

	const response = await fetch(`${API_BASE_URL}/api/tags`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to create tag");
	}

	return await response.json();
};

export const updateTag = async (
	id: number | string,
	data: UpdateTagRequest,
): Promise<UpdateTagResponse> => {
	if (SIMULATION_ENABLED) return simulatedTags.update(id, data);

	const response = await fetch(`${API_BASE_URL}/api/tags/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update tag");
	}

	return await response.json();
};

export const deleteTag = async (
	id: number | string,
): Promise<DeleteTagResponse> => {
	if (SIMULATION_ENABLED) return simulatedTags.remove(id);

	const response = await fetch(`${API_BASE_URL}/api/tags/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete tag");
	}

	return await response.json();
};
