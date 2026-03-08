export interface WalletByIdResponse {
	id: number;
	name: string;
	balance: number;
	type: string;
	currency: string;
	availableBalance?: number;
	creditLimit?: number;
}

export interface WalletsResponse {
	wallets: WalletByIdResponse[];
}

export interface CreateWalletRequest {
	name: string;
	balance: number;
	type: string;
	currency: string;
	creditLimit?: number;
}

export interface CreateWalletResponse {
	id: number;
}

export interface UpdateWalletRequest {
	name?: string;
	balance?: number;
	type?: string;
	currency?: string;
	creditLimit?: number;
}

export interface UpdateWalletResponse {
	id: number;
}

export interface DeleteWalletResponse {
	id: number;
}
