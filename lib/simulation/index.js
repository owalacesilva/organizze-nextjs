/**
 * In-memory simulated backend.
 *
 * The REST API this app talks to does not exist yet for every resource, so with
 * `NEXT_PUBLIC_SIMULATE_API=true` the action layer routes here instead of
 * `fetch`. It answers with the same response shapes the `types.ts` files declare,
 * adds a little latency so loading states are exercised, and keeps writes in
 * module state — meaning edits survive client navigation and reset on reload.
 *
 * Flip the flag off and the very same actions hit the real endpoints.
 */

import {
	buildGamificationProfile,
	findTheme,
	isOwned,
} from "@/lib/gamification";
import {
	SEED_BUDGETS,
	SEED_CATEGORIES,
	SEED_CRYPTO_QUOTES,
	SEED_CURRENCY_QUOTES,
	SEED_FII_QUOTES,
	SEED_GOALS,
	SEED_IMPORTS,
<<<<<<< HEAD
=======
	SEED_LEADERBOARD_PEERS,
>>>>>>> 3db3392 (Issue/5 (#9))
	SEED_STOCK_QUOTES,
	SEED_TAGS,
	SEED_TREASURY_QUOTES,
	SEED_USERS,
	SEED_WALLETS,
	buildSeedTransactions,
} from "./seed";

export const SIMULATION_ENABLED =
	process.env.NEXT_PUBLIC_SIMULATE_API === "true";

/** Simulated round-trip. Kept short enough to stay pleasant to click through. */
const LATENCY_MS = 180;

function delay(ms = LATENCY_MS) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function clone(value) {
	return JSON.parse(JSON.stringify(value));
}

const now = () => new Date().toISOString();

function createState() {
	const transactions = buildSeedTransactions();

	return {
		transactions,
		categories: SEED_CATEGORIES.map((category) => ({
			...category,
			available: true,
			createdAt: now(),
			updatedAt: now(),
		})),
		wallets: SEED_WALLETS.map((wallet) => ({
			...wallet,
			availableBalance:
				wallet.type === "credit"
					? (wallet.creditLimit ?? 0) + wallet.balance
					: wallet.balance,
		})),
		budgets: clone(SEED_BUDGETS),
		goals: clone(SEED_GOALS),
		tags: clone(SEED_TAGS),
		imports: SEED_IMPORTS.map(({ daysAgo, ...upload }) => ({
			...upload,
			createdAt: new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
			finishedAt: new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
		})),
		// The only gamification facts arithmetic cannot recover; everything
		// else — streak, XP, badges, quest — is derived on read.
		gamification: {
			purchases: [],
			activeTheme: "default",
			leaderboardOptIn: false,
			celebratedBadges: [],
		},
		nextId: {
			transactions: transactions.length + 1,
			categories: SEED_CATEGORIES.length + 1,
			wallets: SEED_WALLETS.length + 1,
			budgets: SEED_BUDGETS.length + 1,
			goals: SEED_GOALS.length + 1,
			tags: SEED_TAGS.length + 1,
			imports: SEED_IMPORTS.length + 1,
		},
	};
}

const state = createState();

/** Test/dev helper: drop every write and go back to the seeded dataset. */
export function resetSimulation() {
	Object.assign(state, createState());
}

function nextId(resource) {
	const id = state.nextId[resource];
	state.nextId[resource] = id + 1;
	return id;
}

function find(collection, id) {
	const match = state[collection].find(
		(item) => String(item.id) === String(id),
	);
	if (!match) throw new Error(`Simulated ${collection} ${id} not found`);
	return match;
}

function remove(collection, id) {
	const index = state[collection].findIndex(
		(item) => String(item.id) === String(id),
	);
	if (index === -1) throw new Error(`Simulated ${collection} ${id} not found`);
	state[collection].splice(index, 1);
}

/** Expenses are stored negative; the budget's `spent` mirrors the statement. */
function spentForCategory(categoryId) {
	const startOfMonth = new Date();
	startOfMonth.setDate(1);

	return state.transactions
		.filter(
			(transaction) =>
				transaction.category?.id === categoryId &&
				transaction.amount < 0 &&
				new Date(transaction.date) >= startOfMonth,
		)
		.reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
}

function categoryRef(categoryId) {
	const category = state.categories.find(
		(item) => String(item.id) === String(categoryId),
	);
	return category ? { id: category.id, name: category.name } : null;
}

function walletRef(walletId) {
	const wallet = state.wallets.find((item) => String(item.id) === String(walletId));
	return wallet ? { id: wallet.id, name: wallet.name } : null;
}

export const simulatedTransactions = {
	async list() {
		await delay();
		return { transactions: clone(state.transactions) };
	},

	async get(id) {
		await delay();
		return clone(find("transactions", id));
	},

	async create(data) {
		await delay();

		const transaction = {
			id: nextId("transactions"),
			amount: Number(data.amount) || 0,
			description: data.description ?? "",
			date: data.date ?? now().slice(0, 10),
			category: categoryRef(data.categoryId),
			wallet: walletRef(data.walletId) ?? clone(state.wallets[0]),
		};

		state.transactions.unshift(transaction);
		return { id: transaction.id };
	},

	async update(id, data) {
		await delay();

		const transaction = find("transactions", id);
		if (data.amount !== undefined) transaction.amount = Number(data.amount);
		if (data.description !== undefined) {
			transaction.description = data.description;
		}
		if (data.date !== undefined) transaction.date = data.date;
		if (data.categoryId !== undefined) {
			transaction.category = categoryRef(data.categoryId);
		}
		if (data.walletId !== undefined) {
			transaction.wallet = walletRef(data.walletId) ?? transaction.wallet;
		}

		return { id: transaction.id };
	},

	async remove(id) {
		await delay();
		remove("transactions", id);
		return { id: Number(id) };
	},
};

/** Surfaced on the signIn page so manual QA knows what to type in. */
export const MOCK_USER_CREDENTIALS = {
	email: SEED_USERS[0].email,
	password: SEED_USERS[0].password,
};

export const simulatedAuth = {
	async verifyCredentials(email, password) {
		await delay();

		const user = SEED_USERS.find(
			(candidate) => candidate.email.toLowerCase() === email?.toLowerCase(),
		);

		if (!user || user.password !== password) return null;

		const { password: _password, ...safeUser } = user;
		return clone(safeUser);
	},
};

export const simulatedCategories = {
	async list() {
		await delay();
		return { categories: clone(state.categories) };
	},

	async get(id) {
		await delay();
		return clone(find("categories", id));
	},

	async create(data) {
		await delay();

		const category = {
			id: nextId("categories"),
			name: data.name,
			description: data.description ?? "",
			color: data.color ?? "#6366f1",
			type: data.type ?? "expenses",
			available: data.available ?? true,
			parentId: data.parentId,
			createdAt: now(),
			updatedAt: now(),
		};

		state.categories.push(category);
		return { id: category.id };
	},

	async update(id, data) {
		await delay();

		const category = find("categories", id);
		Object.assign(category, data, { updatedAt: now() });
		return { id: category.id };
	},

	async remove(id) {
		await delay();
		remove("categories", id);
		return { id: Number(id) };
	},
};

export const simulatedWallets = {
	async list() {
		await delay();
		return { wallets: clone(state.wallets) };
	},

	async get(id) {
		await delay();
		return clone(find("wallets", id));
	},

	async create(data) {
		await delay();

		const balance = Number(data.balance) || 0;
		const wallet = {
			id: nextId("wallets"),
			name: data.name,
			balance,
			type: data.type ?? "checking",
			currency: data.currency ?? "BRL",
			creditLimit: data.creditLimit,
			availableBalance:
				data.type === "credit" ? (data.creditLimit ?? 0) + balance : balance,
		};

		state.wallets.push(wallet);
		return { id: wallet.id };
	},

	async update(id, data) {
		await delay();

		const wallet = find("wallets", id);
		Object.assign(wallet, data);
		wallet.availableBalance =
			wallet.type === "credit"
				? (wallet.creditLimit ?? 0) + wallet.balance
				: wallet.balance;
		return { id: wallet.id };
	},

	async remove(id) {
		await delay();
		remove("wallets", id);
		return { id: Number(id) };
	},
};

export const simulatedBudgets = {
	async list() {
		await delay();

		return {
			budgets: state.budgets.map((budget) => ({
				...clone(budget),
				spent: Math.round(spentForCategory(budget.categoryId) * 100) / 100,
				category: categoryRef(budget.categoryId),
			})),
		};
	},

	async create(data) {
		await delay();

		const budget = {
			id: nextId("budgets"),
			name: data.name,
			categoryId: data.categoryId ? Number(data.categoryId) : null,
			amount: Number(data.amount) || 0,
			period: data.period ?? "month",
		};

		state.budgets.push(budget);
		return { id: budget.id };
	},

	async update(id, data) {
		await delay();

		const budget = find("budgets", id);
		Object.assign(budget, data);
		return { id: budget.id };
	},

	async remove(id) {
		await delay();
		remove("budgets", id);
		return { id: Number(id) };
	},
};

export const simulatedGoals = {
	async list() {
		await delay();
		return { goals: clone(state.goals) };
	},

	async create(data) {
		await delay();

		const goal = {
			id: nextId("goals"),
			name: data.name,
			target: Number(data.target) || 0,
			saved: Number(data.saved) || 0,
			deadline: data.deadline ?? null,
			walletId: data.walletId ? Number(data.walletId) : null,
		};

		state.goals.push(goal);
		return { id: goal.id };
	},

	async update(id, data) {
		await delay();

		const goal = find("goals", id);
		Object.assign(goal, data);
		return { id: goal.id };
	},

	async remove(id) {
		await delay();
		remove("goals", id);
		return { id: Number(id) };
	},
};

export const simulatedTags = {
	async list() {
		await delay();
		return { tags: clone(state.tags) };
	},

	async create(data) {
		await delay();

		const tag = {
			id: nextId("tags"),
			name: data.name,
			color: data.color ?? "#6366f1",
		};

		state.tags.push(tag);
		return { id: tag.id };
	},

	async update(id, data) {
		await delay();

		const tag = find("tags", id);
		Object.assign(tag, data);
		return { id: tag.id };
	},

	async remove(id) {
		await delay();
		remove("tags", id);
		return { id: Number(id) };
	},
};

/**
 * Upload history. An import run is recorded as `processing` when it starts and
 * updated once every row has been attempted, so a page reload mid-import still
 * shows what was going on.
 */
export const simulatedImports = {
	async list() {
		await delay();

		// Newest first — the history reads as a log.
		return {
			imports: clone(state.imports).sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt),
			),
		};
	},

	async get(id) {
		await delay();
		return clone(find("imports", id));
	},

	async create(data) {
		await delay(60);

		const upload = {
			id: nextId("imports"),
			fileName: data.fileName ?? "",
			totalRows: Number(data.totalRows) || 0,
			importedRows: Number(data.importedRows) || 0,
			failedRows: Number(data.failedRows) || 0,
			status: data.status ?? "processing",
			createdAt: now(),
			finishedAt: data.status && data.status !== "processing" ? now() : null,
		};

		state.imports.push(upload);
		return { id: upload.id };
	},

	async update(id, data) {
		await delay(60);

		const upload = find("imports", id);
		Object.assign(upload, data);
		if (data.status && data.status !== "processing") {
			upload.finishedAt = now();
		}

		return { id: upload.id };
	},

	async remove(id) {
		await delay();
		remove("imports", id);
		return { id: Number(id) };
	},
};

/**
 * Market quotes. Read-only: there is nothing to create or edit, a real feed
 * would only ever push new values. Prices come straight from the seed, so the
 * lists are stable across reloads; `updatedAt` is stamped on every read, which
 * is what makes the refresh button in the UI observable.
 */
function quoteList(seed) {
	return async () => {
		await delay();
		const updatedAt = now();
		return { quotes: seed.map((quote) => ({ ...quote, updatedAt })) };
	};
}

export const simulatedQuotes = {
	stocks: quoteList(SEED_STOCK_QUOTES),
	fiis: quoteList(SEED_FII_QUOTES),
	treasury: quoteList(SEED_TREASURY_QUOTES),
	currencies: quoteList(SEED_CURRENCY_QUOTES),
	crypto: quoteList(SEED_CRYPTO_QUOTES),
};
<<<<<<< HEAD
=======

/**
 * Gamification.
 *
 * Only the stored half lives here — purchases, the active theme, the
 * leaderboard opt-in and which celebrations have already been shown. Streaks,
 * XP, badges and quest progress are derived from the statement by
 * `lib/gamification`, so they are never written and never go stale.
 *
 * The token balance is recomputed here on every purchase rather than trusted
 * from the caller: affordability is an integrity rule, and the client asking
 * nicely is not a check.
 */
function gamificationBalance() {
	const profile = buildGamificationProfile({
		transactions: state.transactions,
		budgets: state.budgets.map((budget) => ({
			...budget,
			spent: spentForCategory(budget.categoryId),
		})),
		goals: state.goals,
		wallets: state.wallets,
		state: state.gamification,
	});

	return profile.tokens.balance;
}

export const simulatedGamification = {
	async get() {
		await delay();
		return {
			state: clone(state.gamification),
			peers: clone(SEED_LEADERBOARD_PEERS),
		};
	},

	async update(patch) {
		await delay(60);
		Object.assign(state.gamification, patch);
		return { state: clone(state.gamification) };
	},

	async purchase(themeId) {
		await delay();

		const theme = findTheme(themeId);
		if (!theme || theme.id !== themeId) {
			throw new Error(`Unknown theme ${themeId}`);
		}

		if (isOwned(themeId, state.gamification.purchases)) {
			throw new Error(`Theme ${themeId} is already owned`);
		}

		if (gamificationBalance() < theme.price) {
			throw new Error("Not enough tokens");
		}

		state.gamification.purchases.push(themeId);
		state.gamification.activeTheme = themeId;

		return { state: clone(state.gamification) };
	},

	/** Records that a badge's celebration has been shown, so it fires once. */
	async celebrate(badgeId) {
		await delay(60);

		if (!state.gamification.celebratedBadges.includes(badgeId)) {
			state.gamification.celebratedBadges.push(badgeId);
		}

		return { state: clone(state.gamification) };
	},
};
>>>>>>> 3db3392 (Issue/5 (#9))
