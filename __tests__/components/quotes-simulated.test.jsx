/**
 * The rest of the suite drives the `fetch` path. This one exercises what the
 * app actually runs in dev — `NEXT_PUBLIC_SIMULATE_API=true` — so the seed →
 * simulation → action → hook → table chain is covered end to end.
 */

// `SIMULATION_ENABLED` is captured the first time lib/simulation loads, and
// jest.setup.js has already switched the flag off by then. Jest hoists this
// factory above the imports below, so it is the one remaining place to flip it
// back for this file — the module itself is the real one.
jest.mock("@/lib/simulation", () => {
	process.env.NEXT_PUBLIC_SIMULATE_API = "true";
	return jest.requireActual("@/lib/simulation");
});

import { I18nProvider } from "@/components/elements/i18n-provider";
import QuotesSection from "@/components/section/quotes";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function renderSection() {
	window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return render(
		<I18nProvider>
			<QueryClientProvider client={queryClient}>
				<QuotesSection />
			</QueryClientProvider>
		</I18nProvider>,
	);
}

describe("QuotesSection against the simulated backend", () => {
	it("renders seeded stock quotes without touching fetch", async () => {
		renderSection();

		const row = (
			await screen.findByText("PETR4", {}, { timeout: 3000 })
		).closest("tr");

		expect(within(row).getByText(/R\$\s?38,42/)).toBeInTheDocument();
		expect(within(row).getByText(/\+1,40%/)).toBeInTheDocument();
		expect(global.fetch).not.toHaveBeenCalled();
	});

	it("serves every tab from the seed", async () => {
		const user = userEvent.setup();
		renderSection();

		await screen.findByText("PETR4", {}, { timeout: 3000 });

		const tabs = [
			["Fundos imobiliários", "HGLG11"],
			["Tesouro Direto", "Tesouro Selic 2029"],
			["Moedas", "USD/BRL"],
			["Criptomoedas", "BTC"],
		];

		for (const [tab, expected] of tabs) {
			await user.click(screen.getByRole("tab", { name: tab }));
			expect(
				await screen.findByText(expected, {}, { timeout: 3000 }),
			).toBeInTheDocument();
		}
	});
});
