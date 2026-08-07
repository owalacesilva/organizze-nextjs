import { API_BASE_URL } from "@/app/api";
import type {
	GoalsResponse,
	CreateGoalRequest,
	CreateGoalResponse,
	DeleteGoalResponse,
	UpdateGoalRequest,
	UpdateGoalResponse,
} from "@/app/api/goals/types";
import { SIMULATION_ENABLED, simulatedGoals } from "@/lib/simulation";

export const getGoals = async (): Promise<GoalsResponse> => {
	if (SIMULATION_ENABLED) return simulatedGoals.list();

	const response = await fetch(`${API_BASE_URL}/api/goals`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch goals");
	}

	return await response.json();
};

export const createGoal = async (
	data: CreateGoalRequest,
): Promise<CreateGoalResponse> => {
	if (SIMULATION_ENABLED) return simulatedGoals.create(data);

	const response = await fetch(`${API_BASE_URL}/api/goals`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to create goal");
	}

	return await response.json();
};

export const updateGoal = async (
	id: number | string,
	data: UpdateGoalRequest,
): Promise<UpdateGoalResponse> => {
	if (SIMULATION_ENABLED) return simulatedGoals.update(id, data);

	const response = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update goal");
	}

	return await response.json();
};

export const deleteGoal = async (
	id: number | string,
): Promise<DeleteGoalResponse> => {
	if (SIMULATION_ENABLED) return simulatedGoals.remove(id);

	const response = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete goal");
	}

	return await response.json();
};
