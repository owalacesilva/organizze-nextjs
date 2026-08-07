export type BudgetPeriod = "week" | "month" | "quarter" | "year";

export interface BudgetByIdResponse {
	id: number;
	name: string;
	amount: number;
	/** Consumed in the current period, derived from the statement. */
	spent: number;
	period: BudgetPeriod;
	categoryId: number | null;
	category?: {
		id: number;
		name: string;
	} | null;
}

export interface BudgetsResponse {
	budgets: BudgetByIdResponse[];
}

export interface CreateBudgetRequest {
	name: string;
	amount: number;
	period: BudgetPeriod;
	categoryId?: number | null;
}

export interface CreateBudgetResponse {
	id: number;
}

export interface UpdateBudgetRequest {
	name?: string;
	amount?: number;
	period?: BudgetPeriod;
	categoryId?: number | null;
}

export interface UpdateBudgetResponse {
	id: number;
}

export interface DeleteBudgetResponse {
	id: number;
}
