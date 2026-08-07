import { I18nProvider } from "@/components/elements/i18n-provider";
import InsightsSection from "@/components/section/insights";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";

jest.mock("sonner", () => ({
	toast: { success: jest.fn(), error: jest.fn() },
}));

const today = new Date();
const day = (dayOfMonth, monthOffset = 0) => {
	const date = new Date(today.getFullYear(), today.getMonth() + monthOffset, dayOfMonth);
	return date.toISOString().slice(0, 10);
};

/**
 * Enough activity for several generators to fire: income, a dominant rent
 * charge, an uncategorised row and a duplicated pharmacy charge.
 */
const TRANSACTIONS = [
	{
		id: 1,
		amount: 5000,
		description: "Salário",
		date: day(1),
		category: { id: 7, name: "Salário" },
		wallet: { id: 1, name: "Conta corrente" },
	},
	{
		id: 2,
		amount: -1500,
		description: "Aluguel",
		date: day(2),
		category: { id: 2, name: "Moradia" },
		wallet: { id: 1, name: "Conta corrente" },
	},
	{
		id: 3,
		amount: -89.9,
		description: "Farmácia",
		date: day(3),
		category: { id: 4, name: "Saúde" },
		wallet: { id: 1, name: "Conta corrente" },
	},
	{
		id: 4,
		amount: -89.9,
		description: "Farmácia",
		date: day(4),
		category: { id: 4, name: "Saúde" },
		wallet: { id: 1, name: "Conta corrente" },
	},
	{
		id: 5,
		amount: -40,
		description: "Sem categoria",
		date: day(5),
		wallet: { id: 1, name: "Conta corrente" },
	},
	// Last month, so the month-over-month comparison has something to chew on.
	{
		id: 6,
		amount: -200,
		description: "Aluguel",
		date: day(2, -1),
		category: { id: 2, name: "Moradia" },
		wallet: { id: 1, name: "Conta corrente" },
	},
];

const BUDGETS = [
	{ id: 1, name: "Moradia", categoryId: 2, amount: 100, spent: 1500, period: "month" },
];

const GOALS = [{ id: 1, name: "Notebook", target: 1000, saved: 1000 }];

const WALLETS = [
	{ id: 1, name: "Conta corrente", type: "checking", balance: 3000 },
];

function mockApi({
	transactions = TRANSACTIONS,
	budgets = BUDGETS,
	goals = GOALS,
	wallets = WALLETS,
} = {}) {
	global.fetch.mockImplementation((url) => {
		const ok = (body) =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

		if (String(url).includes("/api/transactions")) return ok({ transactions });
		if (String(url).includes("/api/budgets")) return ok({ budgets });
		if (String(url).includes("/api/goals")) return ok({ goals });
		if (String(url).includes("/api/wallets")) return ok({ wallets });
		return ok({});
	});
}

function renderSection() {
	window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});

	return render(
		<I18nProvider>
			<QueryClientProvider client={queryClient}>
				<InsightsSection />
			</QueryClientProvider>
		</I18nProvider>,
	);
}

describe("InsightsSection", () => {
	it("groups the insights by urgency", async () => {
		mockApi();
		renderSection();

		expect(await screen.findByText("Precisa da sua atenção")).toBeInTheDocument();
		expect(screen.getByText("Vale saber")).toBeInTheDocument();
		expect(screen.getByText("Indo bem")).toBeInTheDocument();
	});

	it("renders the headline numbers for the month", async () => {
		mockApi();
		renderSection();

		expect(await screen.findByText("Receitas do mês")).toBeInTheDocument();
		// 5000 in, 1719.80 out.
		expect(screen.getByText("R$ 5.000,00")).toBeInTheDocument();
		expect(screen.getByText("R$ 1.719,80")).toBeInTheDocument();
	});

	it("surfaces the new observations with their numbers filled in", async () => {
		mockApi();
		renderSection();

		// Duplicate charge, uncategorised rows and a finished goal.
		expect(
			await screen.findByText("Possível cobrança duplicada"),
		).toBeInTheDocument();
		expect(screen.getByText("Lançamentos sem categoria")).toBeInTheDocument();
		expect(screen.getByText("Notebook foi concluída")).toBeInTheDocument();

		// A blown budget is critical, so it leads the attention group.
		expect(screen.getByText("Um orçamento estourou")).toBeInTheDocument();

		// Currency placeholders are formatted, not left raw.
		expect(screen.queryByText(/\{\{/)).not.toBeInTheDocument();
	});

	it("falls back to the empty state with nothing to go on", async () => {
		mockApi({ transactions: [], budgets: [], goals: [], wallets: [] });
		renderSection();

		expect(
			await screen.findByText(
				"Ainda não há movimentação suficiente neste mês para dizer algo útil",
			),
		).toBeInTheDocument();
		expect(screen.queryByText("Vale saber")).not.toBeInTheDocument();
	});

	it("hides a group that has nothing in it", async () => {
		// Only a blown budget: attention has a card, the other groups do not.
		mockApi({ transactions: [], goals: [], wallets: [] });
		renderSection();

		expect(await screen.findByText("Precisa da sua atenção")).toBeInTheDocument();
		expect(screen.queryByText("Indo bem")).not.toBeInTheDocument();
		expect(screen.queryByText("Vale saber")).not.toBeInTheDocument();
	});
});
