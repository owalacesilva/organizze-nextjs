/**
 * Deterministic seed data for the simulated backend.
 *
 * Everything here is derived from a fixed PRNG seed so a reload produces the
 * same dataset — screenshots, tests and manual QA stay comparable. Labels are
 * plain strings on purpose: they stand in for user-entered data (which is never
 * translated), unlike the UI chrome that goes through the dictionaries.
 */

/** mulberry32 — small, fast, and stable across runtimes. */
function createRandom(seed) {
	let state = seed >>> 0;

	return function random() {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const SEED = 20260806;

/** `days` ago as YYYY-MM-DD, relative to the day the module is first loaded. */
function dateDaysAgo(days, reference) {
	const date = new Date(reference);
	date.setDate(date.getDate() - days);
	return date.toISOString().slice(0, 10);
}

export const SEED_CATEGORIES = [
	{
		id: 1,
		name: "Alimentação",
		description: "Mercado, restaurantes e delivery",
		color: "#6366f1",
		type: "expenses",
	},
	{
		id: 2,
		name: "Moradia",
		description: "Aluguel, condomínio e contas da casa",
		color: "#0ea5e9",
		type: "expenses",
	},
	{
		id: 3,
		name: "Transporte",
		description: "Combustível, aplicativos e manutenção",
		color: "#f59e0b",
		type: "expenses",
	},
	{
		id: 4,
		name: "Saúde",
		description: "Plano, farmácia e consultas",
		color: "#ef4444",
		type: "expenses",
	},
	{
		id: 5,
		name: "Lazer",
		description: "Streaming, cinema e viagens",
		color: "#a855f7",
		type: "expenses",
	},
	{
		id: 6,
		name: "Educação",
		description: "Cursos, livros e mensalidades",
		color: "#14b8a6",
		type: "expenses",
	},
	{
		id: 7,
		name: "Salário",
		description: "Remuneração mensal",
		color: "#22c55e",
		type: "earnings",
	},
	{
		id: 8,
		name: "Freelance",
		description: "Projetos e serviços pontuais",
		color: "#84cc16",
		type: "earnings",
	},
	{
		id: 9,
		name: "Investimentos",
		description: "Rendimentos e dividendos",
		color: "#10b981",
		type: "earnings",
	},
];

export const SEED_WALLETS = [
	{
		id: 1,
		name: "Conta corrente",
		balance: 8420.55,
		type: "checking",
		currency: "BRL",
	},
	{
		id: 2,
		name: "Poupança",
		balance: 15250,
		type: "savings",
		currency: "BRL",
	},
	{
		id: 3,
		name: "Cartão de crédito",
		balance: -1875.4,
		type: "credit",
		currency: "BRL",
		creditLimit: 9000,
	},
	{
		id: 4,
		name: "Dinheiro",
		balance: 320,
		type: "cash",
		currency: "BRL",
	},
];

export const SEED_TAGS = [
	{ id: 1, name: "Recorrente", color: "#6366f1" },
	{ id: 2, name: "Essencial", color: "#0ea5e9" },
	{ id: 3, name: "Supérfluo", color: "#f59e0b" },
	{ id: 4, name: "Reembolsável", color: "#22c55e" },
];

export const SEED_BUDGETS = [
	{ id: 1, name: "Alimentação", categoryId: 1, amount: 1200, period: "month" },
	{ id: 2, name: "Transporte", categoryId: 3, amount: 600, period: "month" },
	{ id: 3, name: "Lazer", categoryId: 5, amount: 450, period: "month" },
	{ id: 4, name: "Educação", categoryId: 6, amount: 800, period: "quarter" },
];

export const SEED_GOALS = [
	{ id: 1, name: "Reserva de emergência", target: 30000, saved: 12400 },
	{ id: 2, name: "Viagem", target: 8000, saved: 3150 },
	{ id: 3, name: "Carro novo", target: 45000, saved: 9800 },
	{ id: 4, name: "Notebook", target: 7000, saved: 5600 },
];

/**
 * A couple of past uploads so the import history isn't empty on a fresh load.
 * `daysAgo` is resolved against the load time by the store.
 */
export const SEED_IMPORTS = [
	{
		id: 1,
		fileName: "extrato-fevereiro.csv",
		daysAgo: 21,
		totalRows: 48,
		importedRows: 48,
		failedRows: 0,
		status: "completed",
	},
	{
		id: 2,
		fileName: "cartao-marco.csv",
		daysAgo: 6,
		totalRows: 32,
		importedRows: 29,
		failedRows: 3,
		status: "partial",
	},
];

/** Description pools per category, used to build believable statements. */
const DESCRIPTIONS = {
	1: ["Supermercado", "Padaria", "Delivery", "Almoço", "Feira"],
	2: ["Aluguel", "Condomínio", "Energia elétrica", "Internet", "Água"],
	3: ["Combustível", "Aplicativo de corrida", "Estacionamento", "Revisão"],
	4: ["Farmácia", "Plano de saúde", "Consulta", "Exames"],
	5: ["Streaming", "Cinema", "Bar com amigos", "Livraria"],
	6: ["Curso online", "Mensalidade", "Material didático"],
	7: ["Salário"],
	8: ["Projeto freelance", "Consultoria"],
	9: ["Rendimento CDB", "Dividendos"],
};

/** Plausible amount ranges per category (magnitudes, sign applied later). */
const RANGES = {
	1: [18, 320],
	2: [90, 1900],
	3: [22, 480],
	4: [35, 620],
	5: [25, 390],
	6: [60, 900],
	7: [6500, 7200],
	8: [800, 3200],
	9: [120, 1400],
};

/**
 * Build the simulated statement: ~90 entries across the last four months, with
 * one salary per month so the balance stays positive.
 */
export function buildSeedTransactions(reference = new Date()) {
	const random = createRandom(SEED);
	const expenseCategories = SEED_CATEGORIES.filter(
		(category) => category.type === "expenses",
	);
	const transactions = [];
	let id = 1;

	const pick = (list) => list[Math.floor(random() * list.length)];
	const amountFor = (categoryId) => {
		const [min, max] = RANGES[categoryId];
		return Math.round((min + random() * (max - min)) * 100) / 100;
	};
	const walletFor = () => pick(SEED_WALLETS);

	const push = (category, days) => {
		const wallet = walletFor();
		const magnitude = amountFor(category.id);

		transactions.push({
			id: id++,
			// The sign carries the type — see lib/transactions.js.
			amount: category.type === "expenses" ? -magnitude : magnitude,
			description: pick(DESCRIPTIONS[category.id]),
			date: dateDaysAgo(days, reference),
			category: { id: category.id, name: category.name },
			wallet: { id: wallet.id, name: wallet.name },
		});
	};

	for (let month = 0; month < 4; month++) {
		const monthOffset = month * 30;

		// Salary lands on the 5th day of each simulated month.
		push(SEED_CATEGORIES.find((category) => category.id === 7), monthOffset + 5);

		if (month % 2 === 0) {
			push(
				SEED_CATEGORIES.find((category) => category.id === 8),
				monthOffset + 12,
			);
		}
		push(SEED_CATEGORIES.find((category) => category.id === 9), monthOffset + 20);

		for (let entry = 0; entry < 19; entry++) {
			push(pick(expenseCategories), monthOffset + Math.floor(random() * 29));
		}
	}

	return transactions;
}
