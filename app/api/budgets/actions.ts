import { API_BASE_URL } from "@/app/api";
import type {
	BudgetsResponse,
	CreateBudgetRequest,
	CreateBudgetResponse,
	DeleteBudgetResponse,
	UpdateBudgetRequest,
	UpdateBudgetResponse,
} from "@/app/api/budgets/types";
import { SIMULATION_ENABLED, simulatedBudgets } from "@/lib/simulation";

export const getBudgets = async (): Promise<BudgetsResponse> => {
	if (SIMULATION_ENABLED) return simulatedBudgets.list();

	const response = await fetch(`${API_BASE_URL}/api/budgets`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch budgets");
	}

	return await response.json();
};

export const createBudget = async (
	data: CreateBudgetRequest,
): Promise<CreateBudgetResponse> => {
	if (SIMULATION_ENABLED) return simulatedBudgets.create(data);

	const response = await fetch(`${API_BASE_URL}/api/budgets`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to create budget");
	}

	return await response.json();
};

export const updateBudget = async (
	id: number | string,
	data: UpdateBudgetRequest,
): Promise<UpdateBudgetResponse> => {
	if (SIMULATION_ENABLED) return simulatedBudgets.update(id, data);

	const response = await fetch(`${API_BASE_URL}/api/budgets/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update budget");
	}

	return await response.json();
};

export const deleteBudget = async (
	id: number | string,
): Promise<DeleteBudgetResponse> => {
	if (SIMULATION_ENABLED) return simulatedBudgets.remove(id);

	const response = await fetch(`${API_BASE_URL}/api/budgets/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete budget");
	}

	return await response.json();
};
