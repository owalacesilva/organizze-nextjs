import type {
	WalletByIdResponse,
	WalletsResponse,
	CreateWalletRequest,
	CreateWalletResponse,
	UpdateWalletRequest,
	UpdateWalletResponse,
	DeleteWalletResponse,
} from "@/app/api/wallets/types";

export const getWallets = async (): Promise<WalletsResponse> => {
	const response = await fetch("/api/wallets", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch wallets");
	}

	return await response.json();
};

export const getWalletById = async (
	id: number | string,
): Promise<WalletByIdResponse> => {
	const response = await fetch(`/api/wallets/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch wallet");
	}

	return await response.json();
};

export const createWallet = async (
	data: CreateWalletRequest,
): Promise<CreateWalletResponse> => {
	const response = await fetch("/api/wallets", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to create wallet");
	}

	return await response.json();
};

export const updateWallet = async (
	id: number | string,
	data: UpdateWalletRequest,
): Promise<UpdateWalletResponse> => {
	const response = await fetch(`/api/wallets/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update wallet");
	}

	return await response.json();
};

export const editWallet = async (
	id: number | string,
	data: UpdateWalletRequest,
): Promise<UpdateWalletResponse> => {
	return updateWallet(id, data);
};

export const deleteWallet = async (
	id: number | string,
): Promise<DeleteWalletResponse> => {
	const response = await fetch(`/api/wallets/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete wallet");
	}

	return await response.json();
};
