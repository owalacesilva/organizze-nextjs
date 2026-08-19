/** A ranked row. There is deliberately nowhere here for a name or an amount. */
export interface LeaderboardPeer {
	handle: string;
	/** Monthly savings rate as a percentage. */
	rate: number;
}

/**
 * The stored half of a player's profile.
 *
 * Streaks, XP, badges and quest progress are absent on purpose: they are
 * derived from the account by `lib/gamification` rather than persisted.
 */
export interface GamificationState {
	/** Theme ids bought from the marketplace. */
	purchases: string[];
	activeTheme: string;
	leaderboardOptIn: boolean;
	/** Badges whose "milestone achieved" modal has already been shown. */
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
