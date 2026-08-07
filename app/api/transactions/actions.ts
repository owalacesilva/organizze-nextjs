import { SIMULATION_ENABLED, simulatedTransactions } from "@/lib/simulation";
import { API_BASE_URL } from "@/app/api";
import type {
	TransactionByIdResponse,
	TransactionsResponse,
	CreateTransactionRequest,
	CreateTransactionResponse,
	UpdateTransactionRequest,
	UpdateTransactionResponse,
	DeleteTransactionResponse,
} from "@/app/api/transactions/types";

export const getTransactions = async (): Promise<TransactionsResponse> => {
	if (SIMULATION_ENABLED) return simulatedTransactions.list();

	const response = await fetch(`${API_BASE_URL}/api/transactions`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch transactions");
	}

	return await response.json();
};

export const getTransactionById = async (
	id: number | string,
): Promise<TransactionByIdResponse> => {
	if (SIMULATION_ENABLED) return simulatedTransactions.get(id);

	const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch transaction");
	}

	return await response.json();
};

export const createTransaction = async (
	data: CreateTransactionRequest,
): Promise<CreateTransactionResponse> => {
	if (SIMULATION_ENABLED) return simulatedTransactions.create(data);

	const response = await fetch(`${API_BASE_URL}/api/transactions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to create transaction");
	}

	return await response.json();
};

export const updateTransaction = async (
	id: number | string,
	data: UpdateTransactionRequest,
): Promise<UpdateTransactionResponse> => {
	if (SIMULATION_ENABLED) return simulatedTransactions.update(id, data);

	const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update transaction");
	}

	return await response.json();
};

export const editTransaction = async (
	id: number | string,
	data: UpdateTransactionRequest,
): Promise<UpdateTransactionResponse> => {
	return updateTransaction(id, data);
};

export const deleteTransaction = async (
	id: number | string,
): Promise<DeleteTransactionResponse> => {
	if (SIMULATION_ENABLED) return simulatedTransactions.remove(id);

	const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete transaction");
	}

	return await response.json();
};
