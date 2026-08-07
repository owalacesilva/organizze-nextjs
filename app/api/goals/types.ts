export interface GoalByIdResponse {
	id: number;
	name: string;
	/** Amount the user wants to reach. */
	target: number;
	/** Amount put aside so far. */
	saved: number;
	deadline?: string | null;
	walletId?: number | null;
}

export interface GoalsResponse {
	goals: GoalByIdResponse[];
}

export interface CreateGoalRequest {
	name: string;
	target: number;
	saved?: number;
	deadline?: string | null;
	walletId?: number | null;
}

export interface CreateGoalResponse {
	id: number;
}

export interface UpdateGoalRequest {
	name?: string;
	target?: number;
	saved?: number;
	deadline?: string | null;
	walletId?: number | null;
}

export interface UpdateGoalResponse {
	id: number;
}

export interface DeleteGoalResponse {
	id: number;
}
