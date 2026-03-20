/**
 * Example usage of the Categories API
 *
 * This file demonstrates how to use the categories API hooks and actions.
 * You can use this as a reference when implementing category features.
 */

import React from "react";
import {
	useGetCategories,
	useCreateCategory,
	useUpdateCategory,
	useDeleteCategory,
} from "@/app/api/categories/hooks";
import type {
	CreateCategoryRequest,
	UpdateCategoryRequest,
} from "@/app/api/categories/types";

// Example: Display categories list
export function CategoriesList() {
	const { data, isLoading, error } = useGetCategories();

	if (isLoading) return <div>Loading categories...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<ul>
			{data?.categories.map((category) => (
				<li key={category.id}>
					<span style={{ color: category.color }}>{category.name}</span>-{" "}
					{category.description} ({category.type})
				</li>
			))}
		</ul>
	);
}

// Example: Create a new category
export function CreateCategoryForm() {
	const createCategoryMutation = useCreateCategory();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const categoryData: CreateCategoryRequest = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
			color: formData.get("color") as string,
			type: formData.get("type") as "earnings" | "expenses",
			available: true,
		};

		try {
			await createCategoryMutation.mutateAsync(categoryData);
			console.log("Category created successfully!");
		} catch (error) {
			console.error("Failed to create category:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name="name" placeholder="Category name" required />
			<input name="description" placeholder="Description" required />
			<input name="color" type="color" required />
			<select name="type" required>
				<option value="earnings">Earnings</option>
				<option value="expenses">Expenses</option>
			</select>
			<button type="submit" disabled={createCategoryMutation.isPending}>
				{createCategoryMutation.isPending ? "Creating..." : "Create Category"}
			</button>
		</form>
	);
}

// Example: Update category
export function EditCategory({ categoryId }: { categoryId: number }) {
	const updateCategoryMutation = useUpdateCategory();

	const handleUpdate = async (data: UpdateCategoryRequest) => {
		try {
			await updateCategoryMutation.mutateAsync({ id: categoryId, data });
			console.log("Category updated successfully!");
		} catch (error) {
			console.error("Failed to update category:", error);
		}
	};

	// Implementation would include form for editing
	return <div>Edit form implementation...</div>;
}

// Example: Delete category
export function DeleteCategoryButton({ categoryId }: { categoryId: number }) {
	const deleteCategoryMutation = useDeleteCategory();

	const handleDelete = async () => {
		if (confirm("Are you sure you want to delete this category?")) {
			try {
				await deleteCategoryMutation.mutateAsync(categoryId);
				console.log("Category deleted successfully!");
			} catch (error) {
				console.error("Failed to delete category:", error);
			}
		}
	};

	return (
		<button onClick={handleDelete} disabled={deleteCategoryMutation.isPending}>
			{deleteCategoryMutation.isPending ? "Deleting..." : "Delete"}
		</button>
	);
}

// Example: Using actions directly (if needed outside of React components)
import { createCategory, getCategories } from "@/app/api/categories/actions";

export async function exampleDirectUsage() {
	// Get all categories
	const categories = await getCategories();
	console.log("Categories:", categories);

	// Create new category
	const newCategory = await createCategory({
		name: "Food",
		description: "Food and dining expenses",
		color: "#ff6b6b",
		type: "expenses",
		available: true,
	});
	console.log("New category ID:", newCategory.id);
}
