"use client";

import { useGamification } from "@/hooks/useGamification";
import { useEffect } from "react";

export function AccentTheme() {
	const { state } = useGamification();
	const accent = state?.activeTheme ?? "default";

	useEffect(() => {
		const root = document.documentElement;

		if (accent && accent !== "default") {
			root.setAttribute("data-accent", accent);
		} else {
			root.removeAttribute("data-accent");
		}
	}, [accent]);

	return null;
}
