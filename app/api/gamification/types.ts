export interface LeaderboardPeer {
	handle: string;
	rate: number;
}

export interface GamificationState {
	purchases: string[];
	activeTheme: string;
	leaderboardOptIn: boolean;
	celebratedBadges: string[];
}

export interface GamificationResponse {
	state: GamificationState;
	peers: LeaderboardPeer[];
}

export interface GamificationStateResponse {
	state: GamificationState;
}

export type UpdateGamificationRequest = Partial<
	Pick<GamificationState, "activeTheme" | "leaderboardOptIn">
>;
