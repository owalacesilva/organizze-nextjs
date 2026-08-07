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

// Mock account for exercising the credentials signIn flow without a real
// backend. Password is plain text here on purpose: this only ever backs the
// simulated auth path (`NEXT_PUBLIC_SIMULATE_API=true`), never production.
export const SEED_USERS = [
	{
		id: 1,
		name: "Hafsa Humaira",
		email: "demo@organizze.app",
		password: "organizze123",
		avatar: "/images/avatar/1.jpg",
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

/**
 * Market quotes, one list per asset class.
 *
 * Prices are fixed rather than jittered so screenshots and tests stay
 * comparable — the store stamps `updatedAt` on read, which is the only part
 * that moves. `sector`, `segment` and `indexer` are dictionary keys (a closed
 * set the UI translates), while names and tickers are proper nouns kept
 * verbatim.
 */
export const SEED_STOCK_QUOTES = [
	{ symbol: "PETR4", name: "Petrobras PN", sector: "oilGas", price: 38.42, change: 0.53, changePercent: 1.4, previousClose: 37.89, dayHigh: 38.71, dayLow: 37.62, volume: 42_318_900, marketCap: 501_200_000_000 },
	{ symbol: "VALE3", name: "Vale ON", sector: "mining", price: 61.18, change: -0.74, changePercent: -1.2, previousClose: 61.92, dayHigh: 62.05, dayLow: 60.88, volume: 31_204_700, marketCap: 278_400_000_000 },
	{ symbol: "ITUB4", name: "Itaú Unibanco PN", sector: "financial", price: 34.87, change: 0.29, changePercent: 0.84, previousClose: 34.58, dayHigh: 34.99, dayLow: 34.41, volume: 24_876_300, marketCap: 341_900_000_000 },
	{ symbol: "BBDC4", name: "Bradesco PN", sector: "financial", price: 14.62, change: -0.11, changePercent: -0.75, previousClose: 14.73, dayHigh: 14.8, dayLow: 14.55, volume: 28_431_500, marketCap: 155_700_000_000 },
	{ symbol: "ABEV3", name: "Ambev ON", sector: "beverages", price: 12.94, change: 0.08, changePercent: 0.62, previousClose: 12.86, dayHigh: 13.02, dayLow: 12.85, volume: 19_562_100, marketCap: 203_800_000_000 },
	{ symbol: "WEGE3", name: "WEG ON", sector: "industrials", price: 52.73, change: 1.06, changePercent: 2.05, previousClose: 51.67, dayHigh: 52.9, dayLow: 51.52, volume: 8_734_200, marketCap: 221_300_000_000 },
	{ symbol: "B3SA3", name: "B3 ON", sector: "financial", price: 11.38, change: -0.05, changePercent: -0.44, previousClose: 11.43, dayHigh: 11.49, dayLow: 11.31, volume: 22_105_800, marketCap: 62_400_000_000 },
	{ symbol: "MGLU3", name: "Magazine Luiza ON", sector: "retail", price: 9.07, change: 0.34, changePercent: 3.9, previousClose: 8.73, dayHigh: 9.21, dayLow: 8.7, volume: 15_890_400, marketCap: 6_100_000_000 },
	{ symbol: "RENT3", name: "Localiza ON", sector: "carRental", price: 41.55, change: -0.62, changePercent: -1.47, previousClose: 42.17, dayHigh: 42.28, dayLow: 41.3, volume: 11_243_600, marketCap: 39_800_000_000 },
	{ symbol: "SUZB3", name: "Suzano ON", sector: "pulpPaper", price: 57.29, change: 0.44, changePercent: 0.77, previousClose: 56.85, dayHigh: 57.61, dayLow: 56.72, volume: 9_118_700, marketCap: 74_600_000_000 },
	{ symbol: "RADL3", name: "Raia Drogasil ON", sector: "health", price: 26.14, change: -0.19, changePercent: -0.72, previousClose: 26.33, dayHigh: 26.45, dayLow: 26.02, volume: 7_452_900, marketCap: 45_100_000_000 },
	{ symbol: "ELET3", name: "Eletrobras ON", sector: "utilities", price: 43.86, change: 0.71, changePercent: 1.65, previousClose: 43.15, dayHigh: 44.02, dayLow: 43.08, volume: 13_667_400, marketCap: 99_300_000_000 },
];

export const SEED_FII_QUOTES = [
	{ symbol: "HGLG11", name: "CSHG Logística", segment: "logistics", price: 158.42, change: 0.87, changePercent: 0.55, previousClose: 157.55, dividendYield: 8.42, lastDividend: 1.1, priceToBook: 0.96 },
	{ symbol: "KNRI11", name: "Kinea Renda Imobiliária", segment: "hybrid", price: 152.3, change: -0.65, changePercent: -0.43, previousClose: 152.95, dividendYield: 8.05, lastDividend: 1.02, priceToBook: 0.91 },
	{ symbol: "MXRF11", name: "Maxi Renda", segment: "receivables", price: 10.28, change: 0.04, changePercent: 0.39, previousClose: 10.24, dividendYield: 12.15, lastDividend: 0.1, priceToBook: 1.01 },
	{ symbol: "XPML11", name: "XP Malls", segment: "malls", price: 111.76, change: 1.24, changePercent: 1.12, previousClose: 110.52, dividendYield: 9.31, lastDividend: 0.87, priceToBook: 0.94 },
	{ symbol: "VISC11", name: "Vinci Shopping Centers", segment: "malls", price: 105.63, change: -0.42, changePercent: -0.4, previousClose: 106.05, dividendYield: 9.68, lastDividend: 0.85, priceToBook: 0.88 },
	{ symbol: "BCFF11", name: "BTG Pactual Fundo de Fundos", segment: "fundOfFunds", price: 68.19, change: 0.23, changePercent: 0.34, previousClose: 67.96, dividendYield: 11.02, lastDividend: 0.63, priceToBook: 0.93 },
	{ symbol: "HGRE11", name: "CSHG Real Estate", segment: "corporate", price: 131.05, change: -1.18, changePercent: -0.89, previousClose: 132.23, dividendYield: 8.77, lastDividend: 0.96, priceToBook: 0.79 },
	{ symbol: "BTLG11", name: "BTG Pactual Logística", segment: "logistics", price: 101.44, change: 0.58, changePercent: 0.58, previousClose: 100.86, dividendYield: 8.94, lastDividend: 0.78, priceToBook: 0.98 },
	{ symbol: "KNCR11", name: "Kinea Rendimentos Imobiliários", segment: "receivables", price: 104.87, change: 0.11, changePercent: 0.1, previousClose: 104.76, dividendYield: 10.63, lastDividend: 0.93, priceToBook: 1.0 },
	{ symbol: "VGIP11", name: "Valora CRI Índice de Preço", segment: "receivables", price: 87.32, change: -0.35, changePercent: -0.4, previousClose: 87.67, dividendYield: 12.88, lastDividend: 0.94, priceToBook: 0.87 },
];

/**
 * Tesouro Direto. `rate` is the annual buy rate — how it reads depends on the
 * indexer (a spread over SELIC/IPCA, or a flat prefixed rate), so the UI
 * composes the label. `minimumInvestment` follows the programme's rule: 1% of
 * a unit, never below R$ 30.
 */
export const SEED_TREASURY_QUOTES = [
	{ id: 1, name: "Tesouro Selic 2029", indexer: "selic", maturity: "2029-03-01", rate: 0.0428, unitPrice: 15_234.56, minimumInvestment: 152.35 },
	{ id: 2, name: "Tesouro Selic 2031", indexer: "selic", maturity: "2031-03-01", rate: 0.1215, unitPrice: 15_187.22, minimumInvestment: 151.87 },
	{ id: 3, name: "Tesouro Prefixado 2027", indexer: "prefixado", maturity: "2027-01-01", rate: 12.85, unitPrice: 8_142.73, minimumInvestment: 81.43 },
	{ id: 4, name: "Tesouro Prefixado 2031", indexer: "prefixado", maturity: "2031-01-01", rate: 13.02, unitPrice: 5_316.48, minimumInvestment: 53.16 },
	{ id: 5, name: "Tesouro Prefixado com Juros Semestrais 2033", indexer: "prefixado", maturity: "2033-01-01", rate: 13.18, unitPrice: 1_094.27, minimumInvestment: 30 },
	{ id: 6, name: "Tesouro IPCA+ 2029", indexer: "ipca", maturity: "2029-05-15", rate: 6.42, unitPrice: 3_487.19, minimumInvestment: 34.87 },
	{ id: 7, name: "Tesouro IPCA+ 2035", indexer: "ipca", maturity: "2035-05-15", rate: 6.58, unitPrice: 2_216.05, minimumInvestment: 30 },
	{ id: 8, name: "Tesouro IPCA+ com Juros Semestrais 2040", indexer: "ipca", maturity: "2040-08-15", rate: 6.61, unitPrice: 4_128.94, minimumInvestment: 41.29 },
	{ id: 9, name: "Tesouro Renda+ Aposentadoria Extra 2050", indexer: "ipca", maturity: "2050-12-15", rate: 6.73, unitPrice: 512.38, minimumInvestment: 30 },
	{ id: 10, name: "Tesouro Educa+ 2030", indexer: "ipca", maturity: "2030-12-15", rate: 6.49, unitPrice: 1_387.62, minimumInvestment: 30 },
];

/** Exchange rates quoted against BRL. Names come from the dictionaries. */
export const SEED_CURRENCY_QUOTES = [
	{ code: "USD", bid: 5.4231, ask: 5.4258, change: 0.0187, changePercent: 0.35, previousClose: 5.4044, dayHigh: 5.439, dayLow: 5.3902 },
	{ code: "EUR", bid: 5.8874, ask: 5.8912, change: -0.0142, changePercent: -0.24, previousClose: 5.9016, dayHigh: 5.9105, dayLow: 5.879 },
	{ code: "GBP", bid: 6.9142, ask: 6.9198, change: 0.0321, changePercent: 0.47, previousClose: 6.8821, dayHigh: 6.931, dayLow: 6.8745 },
	{ code: "CHF", bid: 6.1284, ask: 6.1339, change: 0.0208, changePercent: 0.34, previousClose: 6.1076, dayHigh: 6.142, dayLow: 6.0985 },
	{ code: "CAD", bid: 3.9612, ask: 3.9648, change: -0.0093, changePercent: -0.23, previousClose: 3.9705, dayHigh: 3.976, dayLow: 3.9548 },
	{ code: "AUD", bid: 3.5487, ask: 3.5521, change: 0.0114, changePercent: 0.32, previousClose: 3.5373, dayHigh: 3.559, dayLow: 3.5312 },
	{ code: "JPY", bid: 0.0367, ask: 0.0369, change: -0.0002, changePercent: -0.54, previousClose: 0.0369, dayHigh: 0.037, dayLow: 0.0366 },
	{ code: "ARS", bid: 0.0041, ask: 0.0043, change: -0.0001, changePercent: -2.38, previousClose: 0.0042, dayHigh: 0.0042, dayLow: 0.0041 },
];

/** Crypto priced in BRL, with the usual rolling 24h window. */
export const SEED_CRYPTO_QUOTES = [
	{ symbol: "BTC", name: "Bitcoin", price: 612_487.3, change: 12_834.6, changePercent: 2.14, high24h: 618_920, low24h: 598_310.5, volume24h: 178_400_000_000, marketCap: 12_100_000_000_000 },
	{ symbol: "ETH", name: "Ethereum", price: 19_842.67, change: -265.48, changePercent: -1.32, high24h: 20_190.4, low24h: 19_618.2, volume24h: 84_700_000_000, marketCap: 2_380_000_000_000 },
	{ symbol: "BNB", name: "BNB", price: 3_417.92, change: 23.09, changePercent: 0.68, high24h: 3_452.1, low24h: 3_380.44, volume24h: 9_800_000_000, marketCap: 498_000_000_000 },
	{ symbol: "SOL", name: "Solana", price: 1_284.55, change: 59.68, changePercent: 4.87, high24h: 1_302.8, low24h: 1_218.9, volume24h: 31_200_000_000, marketCap: 612_000_000_000 },
	{ symbol: "XRP", name: "XRP", price: 12.84, change: -0.12, changePercent: -0.93, high24h: 13.05, low24h: 12.71, volume24h: 18_600_000_000, marketCap: 731_000_000_000 },
	{ symbol: "USDT", name: "Tether", price: 5.43, change: 0.001, changePercent: 0.02, high24h: 5.44, low24h: 5.42, volume24h: 402_800_000_000, marketCap: 638_000_000_000 },
	{ symbol: "ADA", name: "Cardano", price: 3.62, change: 0.06, changePercent: 1.69, high24h: 3.68, low24h: 3.54, volume24h: 4_100_000_000, marketCap: 128_000_000_000 },
	{ symbol: "DOGE", name: "Dogecoin", price: 1.04, change: -0.03, changePercent: -2.8, high24h: 1.07, low24h: 1.02, volume24h: 6_900_000_000, marketCap: 152_000_000_000 },
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
