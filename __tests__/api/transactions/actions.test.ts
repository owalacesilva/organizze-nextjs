import {
	getTransactions,
	getTransactionById,
	createTransaction,
	updateTransaction,
	editTransaction,
	deleteTransaction,
} from "@/app/api/transactions/actions";
import type {
	TransactionsResponse,
	TransactionByIdResponse,
	CreateTransactionRequest,
	CreateTransactionResponse,
	UpdateTransactionRequest,
	UpdateTransactionResponse,
	DeleteTransactionResponse,
} from "@/app/api/transactions/types";

// Mock the API_BASE_URL
jest.mock("@/app/api", () => ({
	API_BASE_URL: "http://localhost:3000",
}));

describe("Transactions Actions", () => {
	beforeEach(() => {
		(global.fetch as jest.Mock).mockClear();
	});

	describe("getTransactions", () => {
		it("should fetch all transactions successfully", async () => {
			const mockResponse: TransactionsResponse = {
				transactions: [
					{
						id: 1,
						amount: 100.5,
						description: "Grocery shopping",
						date: "2024-01-15",
						category: {
							id: 1,
							name: "Food",
						},
					},
					{
						id: 2,
						amount: 5000,
						description: "Monthly salary",
						date: "2024-01-01",
						category: {
							id: 2,
							name: "Salary",
						},
					},
				],
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getTransactions();

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			expect(result).toEqual(mockResponse);
		});

		it("should throw error when fetch fails", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(getTransactions()).rejects.toThrow(
				"Failed to fetch transactions",
			);
		});

		it("should handle network errors", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error"),
			);

			await expect(getTransactions()).rejects.toThrow("Network error");
		});
	});

	describe("getTransactionById", () => {
		it("should fetch transaction by id successfully", async () => {
			const mockResponse: TransactionByIdResponse = {
				id: 1,
				amount: 100.5,
				description: "Grocery shopping",
				date: "2024-01-15",
				category: {
					id: 1,
					name: "Food",
				},
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getTransactionById(1);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions/1",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			expect(result).toEqual(mockResponse);
		});

		it("should accept string id", async () => {
			const mockResponse: TransactionByIdResponse = {
				id: 1,
				amount: 100.5,
				description: "Grocery shopping",
				date: "2024-01-15",
				category: {
					id: 1,
					name: "Food",
				},
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			await getTransactionById("1");

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions/1",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		});

		it("should throw error when transaction not found", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(getTransactionById(999)).rejects.toThrow(
				"Failed to fetch transaction",
			);
		});
	});

	describe("createTransaction", () => {
		it("should create expense transaction successfully", async () => {
			const requestData: CreateTransactionRequest = {
				amount: 50.75,
				description: "Coffee shop",
				date: "2024-01-20",
				categoryId: 1,
			};

			const mockResponse: CreateTransactionResponse = {
				id: 3,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createTransaction(requestData);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestData),
				},
			);
			expect(result).toEqual(mockResponse);
		});

		it("should create income transaction successfully", async () => {
			const requestData: CreateTransactionRequest = {
				amount: 1000,
				description: "Freelance payment",
				date: "2024-01-18",
				categoryId: 2,
			};

			const mockResponse: CreateTransactionResponse = {
				id: 4,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createTransaction(requestData);

			expect(result).toEqual(mockResponse);
		});

		it("should handle decimal amounts", async () => {
			const requestData: CreateTransactionRequest = {
				amount: 123.45,
				description: "Test transaction",
				date: "2024-01-20",
				categoryId: 1,
			};

			const mockResponse: CreateTransactionResponse = {
				id: 5,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createTransaction(requestData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error when creation fails", async () => {
			const requestData: CreateTransactionRequest = {
				amount: 50,
				description: "Invalid",
				date: "2024-01-20",
				categoryId: 999,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(createTransaction(requestData)).rejects.toThrow(
				"Failed to create transaction",
			);
		});
	});

	describe("updateTransaction", () => {
		it("should update transaction successfully", async () => {
			const updateData: UpdateTransactionRequest = {
				amount: 75.5,
				description: "Updated description",
			};

			const mockResponse: UpdateTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateTransaction(1, updateData);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions/1",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				},
			);
			expect(result).toEqual(mockResponse);
		});

		it("should update only amount", async () => {
			const updateData: UpdateTransactionRequest = {
				amount: 99.99,
			};

			const mockResponse: UpdateTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateTransaction(1, updateData);

			expect(result).toEqual(mockResponse);
		});

		it("should update only description", async () => {
			const updateData: UpdateTransactionRequest = {
				description: "New description",
			};

			const mockResponse: UpdateTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateTransaction(1, updateData);

			expect(result).toEqual(mockResponse);
		});

		it("should update category", async () => {
			const updateData: UpdateTransactionRequest = {
				categoryId: 3,
			};

			const mockResponse: UpdateTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateTransaction(1, updateData);

			expect(result).toEqual(mockResponse);
		});

		it("should update date", async () => {
			const updateData: UpdateTransactionRequest = {
				date: "2024-02-01",
			};

			const mockResponse: UpdateTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateTransaction(1, updateData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error when update fails", async () => {
			const updateData: UpdateTransactionRequest = {
				amount: 50,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(updateTransaction(1, updateData)).rejects.toThrow(
				"Failed to update transaction",
			);
		});
	});

	describe("editTransaction", () => {
		it("should be an alias for updateTransaction", async () => {
			const updateData: UpdateTransactionRequest = {
				description: "Edited description",
			};

			const mockResponse: UpdateTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await editTransaction(1, updateData);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions/1",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				},
			);
			expect(result).toEqual(mockResponse);
		});
	});

	describe("deleteTransaction", () => {
		it("should delete transaction successfully", async () => {
			const mockResponse: DeleteTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await deleteTransaction(1);

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions/1",
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			expect(result).toEqual(mockResponse);
		});

		it("should accept string id", async () => {
			const mockResponse: DeleteTransactionResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			await deleteTransaction("1");

			expect(global.fetch).toHaveBeenCalledWith(
				"http://localhost:3000/api/transactions/1",
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		});

		it("should throw error when deletion fails", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(deleteTransaction(1)).rejects.toThrow(
				"Failed to delete transaction",
			);
		});
	});
});
