import {
	getWallets,
	getWalletById,
	createWallet,
	updateWallet,
	editWallet,
	deleteWallet,
} from "@/app/api/wallets/actions";
import type {
	WalletsResponse,
	WalletByIdResponse,
	CreateWalletRequest,
	CreateWalletResponse,
	UpdateWalletRequest,
	UpdateWalletResponse,
	DeleteWalletResponse,
} from "@/app/api/wallets/types";

describe("Wallets Actions", () => {
	beforeEach(() => {
		(global.fetch as jest.Mock).mockClear();
	});

	describe("getWallets", () => {
		it("should fetch all wallets successfully", async () => {
			const mockResponse: WalletsResponse = {
				wallets: [
					{
						id: 1,
						name: "Main Wallet",
						balance: 1000,
						type: "checking",
						currency: "USD",
					},
					{
						id: 2,
						name: "Savings",
						balance: 5000,
						type: "savings",
						currency: "USD",
					},
				],
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getWallets();

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets", {
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

			await expect(getWallets()).rejects.toThrow("Failed to fetch wallets");
		});

		it("should handle network errors", async () => {
			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error("Network error"),
			);

			await expect(getWallets()).rejects.toThrow("Network error");
		});
	});

	describe("getWalletById", () => {
		it("should fetch wallet by id successfully", async () => {
			const mockResponse: WalletByIdResponse = {
				id: 1,
				name: "Main Wallet",
				balance: 1000,
				type: "checking",
				currency: "USD",
				availableBalance: 1000,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await getWalletById(1);

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets/1", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			expect(result).toEqual(mockResponse);
		});

		it("should accept string id", async () => {
			const mockResponse: WalletByIdResponse = {
				id: 1,
				name: "Main Wallet",
				balance: 1000,
				type: "checking",
				currency: "USD",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			await getWalletById("1");

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets/1", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
		});

		it("should throw error when wallet not found", async () => {
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(getWalletById(999)).rejects.toThrow(
				"Failed to fetch wallet",
			);
		});
	});

	describe("createWallet", () => {
		it("should create wallet successfully", async () => {
			const requestData: CreateWalletRequest = {
				name: "New Wallet",
				balance: 500,
				type: "checking",
				currency: "USD",
			};

			const mockResponse: CreateWalletResponse = {
				id: 3,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createWallet(requestData);

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});
			expect(result).toEqual(mockResponse);
		});

		it("should create wallet with credit limit", async () => {
			const requestData: CreateWalletRequest = {
				name: "Credit Card",
				balance: 0,
				type: "credit",
				currency: "USD",
				creditLimit: 5000,
			};

			const mockResponse: CreateWalletResponse = {
				id: 4,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await createWallet(requestData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error when creation fails", async () => {
			const requestData: CreateWalletRequest = {
				name: "New Wallet",
				balance: 500,
				type: "checking",
				currency: "USD",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(createWallet(requestData)).rejects.toThrow(
				"Failed to create wallet",
			);
		});
	});

	describe("updateWallet", () => {
		it("should update wallet successfully", async () => {
			const updateData: UpdateWalletRequest = {
				name: "Updated Wallet",
				balance: 1500,
			};

			const mockResponse: UpdateWalletResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateWallet(1, updateData);

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets/1", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});
			expect(result).toEqual(mockResponse);
		});

		it("should update partial wallet data", async () => {
			const updateData: UpdateWalletRequest = {
				name: "Renamed Wallet",
			};

			const mockResponse: UpdateWalletResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await updateWallet(1, updateData);

			expect(result).toEqual(mockResponse);
		});

		it("should throw error when update fails", async () => {
			const updateData: UpdateWalletRequest = {
				name: "Updated Wallet",
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
			});

			await expect(updateWallet(1, updateData)).rejects.toThrow(
				"Failed to update wallet",
			);
		});
	});

	describe("editWallet", () => {
		it("should be an alias for updateWallet", async () => {
			const updateData: UpdateWalletRequest = {
				name: "Edited Wallet",
			};

			const mockResponse: UpdateWalletResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await editWallet(1, updateData);

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets/1", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});
			expect(result).toEqual(mockResponse);
		});
	});

	describe("deleteWallet", () => {
		it("should delete wallet successfully", async () => {
			const mockResponse: DeleteWalletResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			const result = await deleteWallet(1);

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets/1", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			expect(result).toEqual(mockResponse);
		});

		it("should accept string id", async () => {
			const mockResponse: DeleteWalletResponse = {
				id: 1,
			};

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => mockResponse,
			});

			await deleteWallet("1");

			expect(global.fetch).toHaveBeenCalledWith("/api/wallets/1", {
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

			await expect(deleteWallet(1)).rejects.toThrow("Failed to delete wallet");
		});
	});
});
