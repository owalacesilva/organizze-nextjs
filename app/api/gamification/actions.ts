import type {
	GamificationResponse,
	GamificationStateResponse,
	UpdateGamificationRequest,
} from "@/app/api/gamification/types";
import { SIMULATION_ENABLED, simulatedGamification } from "@/lib/simulation";

export const getGamification = async (): Promise<GamificationResponse> => {
	if (SIMULATION_ENABLED) return simulatedGamification.get();

	const response = await fetch("/api/gamification", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch gamification profile");
	}

	return await response.json();
};

export const updateGamification = async (
	data: UpdateGamificationRequest,
): Promise<GamificationStateResponse> => {
	if (SIMULATION_ENABLED) return simulatedGamification.update(data);

	const response = await fetch("/api/gamification", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Failed to update gamification profile");
	}

	return await response.json();
};

export const purchaseTheme = async (
	themeId: string,
): Promise<GamificationStateResponse> => {
	if (SIMULATION_ENABLED) return simulatedGamification.purchase(themeId);

	const response = await fetch("/api/gamification/purchases", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ themeId }),
	});

	if (!response.ok) {
		throw new Error("Failed to purchase theme");
	}

	return await response.json();
};

export const celebrateBadge = async (
	badgeId: string,
): Promise<GamificationStateResponse> => {
	if (SIMULATION_ENABLED) return simulatedGamification.celebrate(badgeId);

	const response = await fetch("/api/gamification/celebrations", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ badgeId }),
	});

	if (!response.ok) {
		throw new Error("Failed to record the celebration");
	}

	return await response.json();
};
