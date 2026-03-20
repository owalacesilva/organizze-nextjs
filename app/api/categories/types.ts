export interface CategoryByIdResponse {
	id: number;
	name: string;
	description: string;
	color: string;
	type: "earnings" | "expenses";
	available: boolean;
	parentId?: number;
	children?: CategoryByIdResponse[];
	createdAt: string;
	updatedAt: string;
}

export interface CategoriesResponse {
	categories: CategoryByIdResponse[];
}

export interface CreateCategoryRequest {
	name: string;
	description: string;
	color: string;
	type: "earnings" | "expenses";
	available?: boolean;
	parentId?: number;
}

export interface CreateCategoryResponse {
	id: number;
}

export interface UpdateCategoryRequest {
	name?: string;
	description?: string;
	color?: string;
	type?: "earnings" | "expenses";
	available?: boolean;
	parentId?: number;
}

export interface UpdateCategoryResponse {
	id: number;
}

export interface DeleteCategoryResponse {
	id: number;
}
