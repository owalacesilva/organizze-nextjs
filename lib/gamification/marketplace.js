/**
 * Token marketplace.
 *
 * Every item is an accent theme: buying one writes `data-accent` onto the
 * document element, and `globals.css` repoints `--primary` from there. That
 * keeps the reward visible in both light and dark mode without a second set of
 * palettes to maintain.
 */

/** `id` doubles as the dictionary key under `gamification.market.items`. */
export const THEMES = [
	{ id: "default", price: 0, swatch: "230 80% 50%" },
	{ id: "emerald", price: 300, swatch: "160 84% 32%" },
	{ id: "amber", price: 400, swatch: "32 95% 44%" },
	{ id: "violet", price: 600, swatch: "271 81% 56%" },
	{ id: "rose", price: 800, swatch: "347 77% 50%" },
];

/** The free theme is owned by everyone; the rest have to be bought. */
export function isOwned(themeId, purchases = []) {
	return themeId === "default" || purchases.includes(themeId);
}

export function findTheme(themeId) {
	return THEMES.find((theme) => theme.id === themeId) ?? THEMES[0];
}

/**
 * What the marketplace should render for each item, given the wallet and what
 * is already owned.
 */
export function catalogue({ purchases = [], balance = 0, active = "default" } = {}) {
	return THEMES.map((theme) => {
		const owned = isOwned(theme.id, purchases);

		return {
			...theme,
			owned,
			active: theme.id === active,
			affordable: owned || balance >= theme.price,
		};
	});
}

/** Total spent, derived from what was bought — never tracked separately. */
export function spentOn(purchases = []) {
	return purchases.reduce((total, id) => total + findTheme(id).price, 0);
}
