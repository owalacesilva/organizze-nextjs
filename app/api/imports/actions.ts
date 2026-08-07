import { API_BASE_URL } from "@/app/api";
import type {
	CreateImportRequest,
	CreateImportResponse,
	DeleteImportResponse,
	ImportsResponse,
	UpdateImportRequest,
	UpdateImportResponse,
} from "@/app/api/imports/types";
import { SIMULATION_ENABLED, simulatedImports } from "@/lib/simulation";

export const getImports = async (): Promise<ImportsResponse> => {
	if (SIMULATION_ENABLED) return simulatedImports.list();

	const response = await fetch(`${API_BASE_URL}/api/imports`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch imports");
	}

	return await response.json();
};

export const createImport = async (
	data: CreateImportRequest,
): Promise<CreateImportResponse> => {
	if (SIMULATION_ENABLED) return simulatedImports.create(data);

	const response = await fetch(`${API_BASE_URL}/api/imports`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to create import");
	}

	return await response.json();
};

export const updateImport = async (
	id: number | string,
	data: UpdateImportRequest,
): Promise<UpdateImportResponse> => {
	if (SIMULATION_ENABLED) return simulatedImports.update(id, data);

	const response = await fetch(`${API_BASE_URL}/api/imports/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update import");
	}

	return await response.json();
};

export const deleteImport = async (
	id: number | string,
): Promise<DeleteImportResponse> => {
	if (SIMULATION_ENABLED) return simulatedImports.remove(id);

	const response = await fetch(`${API_BASE_URL}/api/imports/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete import");
	}

	return await response.json();
};
