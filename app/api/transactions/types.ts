export interface TransactionByIdResponse {
	id: number;
	amount: number;
	description: string;
	date: string;
	category: {
		id: number;
		name: string;
	};
}

export interface TransactionsResponse {
	transactions: TransactionByIdResponse[];
}

export interface CreateTransactionRequest {
	amount: number;
	description: string;
	date: string;
	categoryId: number;
}

export interface CreateTransactionResponse {
	id: number;
}

export interface UpdateTransactionRequest {
	amount?: number;
	description?: string;
	date?: string;
	categoryId?: number;
}

export interface UpdateTransactionResponse {
	id: number;
}

export interface DeleteTransactionResponse {
	id: number;
}
