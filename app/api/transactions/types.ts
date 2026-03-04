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
