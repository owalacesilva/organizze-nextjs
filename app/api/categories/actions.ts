import type {
	CategoryByIdResponse,
	CategoriesResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
	DeleteCategoryResponse,
} from "@/app/api/categories/types";

export const getCategories = async (): Promise<CategoriesResponse> => {
	const response = await fetch("/api/categories", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch categories");
	}

	return await response.json();
};

export const getCategoryById = async (
	id: number | string,
): Promise<CategoryByIdResponse> => {
	const response = await fetch(`/api/categories/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch category");
	}

	return await response.json();
};

export const createCategory = async (
	data: CreateCategoryRequest,
): Promise<CreateCategoryResponse> => {
	const response = await fetch("/api/categories", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to create category");
	}

	return await response.json();
};

export const updateCategory = async (
	id: number | string,
	data: UpdateCategoryRequest,
): Promise<UpdateCategoryResponse> => {
	const response = await fetch(`/api/categories/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update category");
	}

	return await response.json();
};

export const editCategory = async (
	id: number | string,
	data: UpdateCategoryRequest,
): Promise<UpdateCategoryResponse> => {
	return updateCategory(id, data);
};

export const deleteCategory = async (
	id: number | string,
): Promise<DeleteCategoryResponse> => {
	const response = await fetch(`/api/categories/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete category");
	}

	return await response.json();
};
