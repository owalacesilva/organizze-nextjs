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
	const response = await fetch("/api/transactions", {
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
	const response = await fetch(`/api/transactions/${id}`, {
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
	const response = await fetch("/api/transactions", {
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
	const response = await fetch(`/api/transactions/${id}`, {
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
	const response = await fetch(`/api/transactions/${id}`, {
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
