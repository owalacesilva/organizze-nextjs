import type { TransactionByIdResponse } from "@/app/api/transactions/types";

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
