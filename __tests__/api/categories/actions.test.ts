import {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	editCategory,
	deleteCategory,
} from "@/app/api/categories/actions";
import type {
	CategoriesResponse,
	CategoryByIdResponse,
	CreateCategoryRequest,
	CreateCategoryResponse,
	UpdateCategoryRequest,
	UpdateCategoryResponse,
	DeleteCategoryResponse,
} from "@/app/api/categories/types";

describe("Categories Actions", () => {
	beforeEach(() => {
		(global.fetch as jest.Mock).mockClear();
	});

	describe("getCategories", () => {
		it("should fetch all categories successfully", async () => {
			const mockResponse: CategoriesResponse = {
				categories: [
					{
						id: 1,
						name: "Food",
						description: "Food and dining",
						color: "#FF5733",
						type: "expenses",
						available: true,
						createdAt: "2024-01-01T00:00:00Z",
						updatedAt: "2024-01-01T00:00:00Z",
					},
					{
						id: 2,
						name: "Salary",
						description: "Monthly salary",
						color: "#33FF57",
						type: "earnings",
						available: true,
						createdAt: "2024-01-01T00:00:00Z",
						updatedAt: "2024-01-01T00:00:00Z",
					},
				],
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getCategories();

			expect(global.fetch).toHaveBeenCalledWith("/api/categories", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			expect(result).toEqual(mockResponse);
		});

		it("should throw error when fetch fails", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(getCategories()).rejects.toThrow(
				"Failed to fetch categories",
			);
		});

		it("should handle network errors", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error"),
			);

			await expect(getCategories()).rejects.toThrow("Network error");
		});
	});

	describe("getCategoryById", () => {
		it("should fetch category by id successfully", async () => {
			const mockResponse: CategoryByIdResponse = {
				id: 1,
				name: "Food",
				description: "Food and dining",
				color: "#FF5733",
				type: "expenses",
				available: true,
				createdAt: "2024-01-01T00:00:00Z",
				updatedAt: "2024-01-01T00:00:00Z",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getCategoryById(1);

			expect(global.fetch).toHaveBeenCalledWith("/api/categories/1", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			expect(result).toEqual(mockResponse);
		});

		it("should fetch category with children", async () => {
			const mockResponse: CategoryByIdResponse = {
				id: 1,
				name: "Food",
				description: "Food and dining",
				color: "#FF5733",
				type: "expenses",
				available: true,
				children: [
					{
						id: 3,
						name: "Restaurants",
						description: "Dining out",
						color: "#FF5733",
						type: "expenses",
						available: true,
						parentId: 1,
						createdAt: "2024-01-01T00:00:00Z",
						updatedAt: "2024-01-01T00:00:00Z",
					},
				],
				createdAt: "2024-01-01T00:00:00Z",
				updatedAt: "2024-01-01T00:00:00Z",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getCategoryById(1);

			expect(result.children).toHaveLength(1);
			expect(result.children?.[0].parentId).toBe(1);
		});

		it("should accept string id", async () => {
			const mockResponse: CategoryByIdResponse = {
				id: 1,
				name: "Food",
				description: "Food and dining",
				color: "#FF5733",
				type: "expenses",
				available: true,
				createdAt: "2024-01-01T00:00:00Z",
				updatedAt: "2024-01-01T00:00:00Z",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			await getCategoryById("1");

			expect(global.fetch).toHaveBeenCalledWith("/api/categories/1", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
		});

		it("should throw error when category not found", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(getCategoryById(999)).rejects.toThrow(
				"Failed to fetch category",
			);
		});
	});

	describe("createCategory", () => {
		it("should create expense category successfully", async () => {
			const requestData: CreateCategoryRequest = {
				name: "Transport",
				description: "Transportation expenses",
				color: "#3357FF",
				type: "expenses",
			};

			const mockResponse: CreateCategoryResponse = {
				id: 3,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createCategory(requestData);

			expect(global.fetch).toHaveBeenCalledWith("/api/categories", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});
			expect(result).toEqual(mockResponse);
		});

		it("should create earnings category successfully", async () => {
			const requestData: CreateCategoryRequest = {
				name: "Freelance",
				description: "Freelance income",
				color: "#33FF57",
				type: "earnings",
			};

			const mockResponse: CreateCategoryResponse = {
				id: 4,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createCategory(requestData);

			expect(result).toEqual(mockResponse);
		});

		it("should create category with parent", async () => {
			const requestData: CreateCategoryRequest = {
				name: "Uber",
				description: "Uber rides",
				color: "#3357FF",
				type: "expenses",
				parentId: 3,
			};

			const mockResponse: CreateCategoryResponse = {
				id: 5,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createCategory(requestData);

			expect(result).toEqual(mockResponse);
		});

		it("should create unavailable category", async () => {
			const requestData: CreateCategoryRequest = {
				name: "Archived",
				description: "Archived category",
				color: "#999999",
				type: "expenses",
				available: false,
			};

			const mockResponse: CreateCategoryResponse = {
				id: 6,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createCategory(requestData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error when creation fails", async () => {
			const requestData: CreateCategoryRequest = {
				name: "Invalid",
				description: "Invalid category",
				color: "#000000",
				type: "expenses",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(createCategory(requestData)).rejects.toThrow(
				"Failed to create category",
			);
		});
	});

	describe("updateCategory", () => {
		it("should update category successfully", async () => {
			const updateData: UpdateCategoryRequest = {
				name: "Updated Food",
				description: "Updated description",
			};

			const mockResponse: UpdateCategoryResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateCategory(1, updateData);

			expect(global.fetch).toHaveBeenCalledWith("/api/categories/1", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});
			expect(result).toEqual(mockResponse);
		});

		it("should update category type", async () => {
			const updateData: UpdateCategoryRequest = {
				type: "earnings",
			};

			const mockResponse: UpdateCategoryResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateCategory(1, updateData);

			expect(result).toEqual(mockResponse);
		});

		it("should update category availability", async () => {
			const updateData: UpdateCategoryRequest = {
				available: false,
			};

			const mockResponse: UpdateCategoryResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateCategory(1, updateData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error when update fails", async () => {
			const updateData: UpdateCategoryRequest = {
				name: "Updated",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(updateCategory(1, updateData)).rejects.toThrow(
				"Failed to update category",
			);
		});
	});

	describe("editCategory", () => {
		it("should be an alias for updateCategory", async () => {
			const updateData: UpdateCategoryRequest = {
				name: "Edited Category",
			};

			const mockResponse: UpdateCategoryResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await editCategory(1, updateData);

			expect(global.fetch).toHaveBeenCalledWith("/api/categories/1", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});
			expect(result).toEqual(mockResponse);
		});
	});

	describe("deleteCategory", () => {
		it("should delete category successfully", async () => {
			const mockResponse: DeleteCategoryResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await deleteCategory(1);

			expect(global.fetch).toHaveBeenCalledWith("/api/categories/1", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			expect(result).toEqual(mockResponse);
		});

		it("should accept string id", async () => {
			const mockResponse: DeleteCategoryResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			await deleteCategory("1");

			expect(global.fetch).toHaveBeenCalledWith("/api/categories/1", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
		});

		it("should throw error when deletion fails", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(deleteCategory(1)).rejects.toThrow(
				"Failed to delete category",
			);
		});
	});
});
