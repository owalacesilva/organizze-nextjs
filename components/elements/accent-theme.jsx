"use client";

import { useGamification } from "@/hooks/useGamification";
import { useEffect } from "react";

/**
 * Applies the purchased accent theme.
 *
 * Writes `data-accent` onto <html>, which `globals.css` reads to repoint
 * `--primary`. Mounted in the authenticated layout rather than the root
 * providers so the sign-in page does not ask for a profile it cannot have.
 */
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
