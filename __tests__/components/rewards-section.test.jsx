/**
 * Drives the rewards page against the simulated backend, so the seed →
 * engine → UI chain is exercised end to end.
 */
jest.mock("@/lib/simulation", () => {
	process.env.NEXT_PUBLIC_SIMULATE_API = "true";
	return jest.requireActual("@/lib/simulation");
});

jest.mock("sonner", () => ({
	toast: { success: jest.fn(), error: jest.fn(), warning: jest.fn() },
}));

import { I18nProvider } from "@/components/elements/i18n-provider";
import RewardsSection from "@/components/section/rewards";
import { THEMES } from "@/lib/gamification";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { resetSimulation } from "@/lib/simulation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function renderSection() {
	window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});

	return render(
		<I18nProvider>
			<QueryClientProvider client={queryClient}>
				<RewardsSection />
			</QueryClientProvider>
		</I18nProvider>,
	);
}

const findCard = async (heading) =>
	(await screen.findByText(heading, {}, { timeout: 3000 })).closest(
		"[class*='rounded-lg']",
	);

beforeEach(() => {
	resetSimulation();
});

describe("RewardsSection", () => {
	it("shows a level, an XP bar and a token balance", async () => {
		renderSection();

		const heading = await screen.findByText(/^Nível \d+$/, {}, { timeout: 3000 });
		const card = heading.closest("[class*='rounded-lg']");

		expect(within(card).getByText("Tokens")).toBeInTheDocument();
		expect(within(card).getByText("Conquistas")).toBeInTheDocument();
		expect(within(card).getByText(/XP no total$/)).toBeInTheDocument();
	});

	it("itemises where the XP came from", async () => {
		renderSection();

		const ledger = await findCard("De onde veio seu XP");

		expect(
			within(ledger).getByText("Dias com movimentação registrada"),
		).toBeInTheDocument();
		expect(within(ledger).getByText("Decolagem Financeira")).toBeInTheDocument();
	});

	it("sells a theme and takes the tokens off the balance", async () => {
		const user = userEvent.setup();
		renderSection();

		const market = await findCard("Loja");
		const emerald = within(market).getByText("Esmeralda").closest("div.flex-col");

		await user.click(within(emerald).getByRole("button", { name: "Comprar" }));

		await waitFor(() =>
			expect(within(market).getAllByText("Ativo").length).toBe(1),
		);
	});

	it("stops offering themes once the balance cannot cover them", async () => {
		const user = userEvent.setup();
		renderSection();

		const market = await findCard("Loja");

		// The catalogue costs more than the seeded account has earned, so
		// buying the dearest theme has to put at least one other out of reach.
		const dearest = THEMES.reduce((a, b) => (a.price > b.price ? a : b));
		const tile = within(market)
			.getByText(`${dearest.price} tokens`)
			.closest("div.flex-col");

		await user.click(within(tile).getByRole("button", { name: "Comprar" }));

		const locked = await within(market).findAllByRole("button", {
			name: "Tokens insuficientes",
		});
		expect(locked[0]).toBeDisabled();
	});
});

describe("leaderboard", () => {
	it("keeps the user off the board until they opt in", async () => {
		renderSection();

		const board = await findCard("Ranking de economia");

		expect(
			within(board).getByText(/Você não está no ranking/),
		).toBeInTheDocument();
		expect(within(board).queryByText("Você")).not.toBeInTheDocument();
	});

	it("ranks the user once they opt in, and un-ranks them again", async () => {
		const user = userEvent.setup();
		renderSection();

		const board = await findCard("Ranking de economia");
		const toggle = within(board).getByRole("switch");

		await user.click(toggle);
		expect(await within(board).findByText("Você")).toBeInTheDocument();

		await user.click(toggle);
		await waitFor(() =>
			expect(within(board).queryByText("Você")).not.toBeInTheDocument(),
		);
	});

	it("shows only handles and percentages — never a name or an amount", async () => {
		const user = userEvent.setup();
		renderSection();

		const board = await findCard("Ranking de economia");
		await user.click(within(board).getByRole("switch"));
		await within(board).findByText("Você");

		const rows = within(board).getAllByRole("row").slice(1);
		expect(rows.length).toBeGreaterThan(1);

		for (const row of rows) {
			const cells = within(row).getAllByRole("cell");
			expect(cells).toHaveLength(3);
			// Rank, then a handle or "Você", then a bare percentage.
			expect(cells[1].textContent).toMatch(/^(User\d{4}|Você)$/);
			expect(cells[2].textContent).toMatch(/^-?[\d.,]+%$/);
			expect(row.textContent).not.toMatch(/R\$/);
		}
	});
});
