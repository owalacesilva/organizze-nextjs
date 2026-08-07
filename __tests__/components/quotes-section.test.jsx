import { I18nProvider } from "@/components/elements/i18n-provider";
import QuotesSection from "@/components/section/quotes";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const UPDATED_AT = "2026-08-07T13:45:00.000Z";

const STOCKS = [
	{
		symbol: "PETR4",
		name: "Petrobras PN",
		sector: "oilGas",
		price: 38.42,
		change: 0.53,
		changePercent: 1.4,
		previousClose: 37.89,
		dayHigh: 38.71,
		dayLow: 37.62,
		volume: 42_318_900,
		marketCap: 501_200_000_000,
		updatedAt: UPDATED_AT,
	},
	{
		symbol: "VALE3",
		name: "Vale ON",
		sector: "mining",
		price: 61.18,
		change: -0.74,
		changePercent: -1.2,
		previousClose: 61.92,
		dayHigh: 62.05,
		dayLow: 60.88,
		volume: 31_204_700,
		marketCap: 278_400_000_000,
		updatedAt: UPDATED_AT,
	},
];

const FIIS = [
	{
		symbol: "HGLG11",
		name: "CSHG Logística",
		segment: "logistics",
		price: 158.42,
		change: 0.87,
		changePercent: 0.55,
		previousClose: 157.55,
		dividendYield: 8.42,
		lastDividend: 1.1,
		priceToBook: 0.96,
		updatedAt: UPDATED_AT,
	},
];

const TREASURY = [
	{
		id: 1,
		name: "Tesouro IPCA+ 2029",
		indexer: "ipca",
		maturity: "2029-05-15",
		rate: 6.42,
		unitPrice: 3487.19,
		minimumInvestment: 34.87,
		updatedAt: UPDATED_AT,
	},
];

const CURRENCIES = [
	{
		code: "USD",
		bid: 5.4231,
		ask: 5.4258,
		change: 0.0187,
		changePercent: 0.35,
		previousClose: 5.4044,
		dayHigh: 5.439,
		dayLow: 5.3902,
		updatedAt: UPDATED_AT,
	},
];

const CRYPTO = [
	{
		symbol: "BTC",
		name: "Bitcoin",
		price: 612_487.3,
		change: 12_834.6,
		changePercent: 2.14,
		high24h: 618_920,
		low24h: 598_310.5,
		volume24h: 178_400_000_000,
		marketCap: 12_100_000_000_000,
		updatedAt: UPDATED_AT,
	},
];

function mockApi({ failStocks = false } = {}) {
	global.fetch.mockImplementation((url) => {
		const ok = (body) =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
		const path = String(url);

		if (path.includes("/api/quotes/stocks")) {
			if (failStocks) return Promise.resolve({ ok: false, status: 500 });
			return ok({ quotes: STOCKS });
		}
		if (path.includes("/api/quotes/fiis")) return ok({ quotes: FIIS });
		if (path.includes("/api/quotes/treasury")) return ok({ quotes: TREASURY });
		if (path.includes("/api/quotes/currencies")) return ok({ quotes: CURRENCIES });
		if (path.includes("/api/quotes/crypto")) return ok({ quotes: CRYPTO });
		return ok({});
	});
}

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

/** Radix only mounts the active tab, so the strip is the way in. */
async function openTab(user, name) {
	await user.click(screen.getByRole("tab", { name }));
}

describe("QuotesSection", () => {
	it("opens on stocks and lists the quotes", async () => {
		mockApi();
		renderSection();

		expect(await screen.findByText("PETR4")).toBeInTheDocument();
		expect(screen.getByText("Petrobras PN")).toBeInTheDocument();
		expect(screen.getByText("VALE3")).toBeInTheDocument();

		// Sector comes from the dictionary, not from the feed.
		expect(screen.getByText("Petróleo e gás")).toBeInTheDocument();
		expect(screen.getByText("Mineração")).toBeInTheDocument();
	});

	it("prices B3 quotes in BRL and signs the daily move", async () => {
		mockApi();
		renderSection();

		const card = await screen.findByRole("button", {
			name: "Ver detalhes de PETR4",
		});
		expect(within(card).getByText(/R\$\s?38,42/)).toBeInTheDocument();
		expect(within(card).getByText(/\+1,40%/)).toBeInTheDocument();
		// The card carries the move in reais too, which a row only implies.
		expect(within(card).getByText(/\+R\$\s?0,53/)).toBeInTheDocument();

		const falling = screen.getByRole("button", {
			name: "Ver detalhes de VALE3",
		});
		expect(within(falling).getByText(/-1,20%/)).toBeInTheDocument();
	});

	it("opens on the card view", async () => {
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		expect(screen.queryByRole("table")).not.toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Ver como tabela" }),
		).toBeInTheDocument();
	});

	it("reaches the details dialog from the keyboard", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		const card = await screen.findByRole("button", {
			name: "Ver detalhes de PETR4",
		});

		card.focus();
		await user.keyboard("{Enter}");

		expect(await screen.findByRole("dialog")).toBeInTheDocument();
	});

	it("filters the visible quotes by ticker", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await user.type(
			screen.getByRole("searchbox", { name: "Buscar cotações..." }),
			"vale",
		);

		await waitFor(() =>
			expect(screen.queryByText("PETR4")).not.toBeInTheDocument(),
		);
		expect(screen.getByText("VALE3")).toBeInTheDocument();
	});

	it("explains an empty search instead of showing a blank table", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await user.type(
			screen.getByRole("searchbox", { name: "Buscar cotações..." }),
			"zzz",
		);

		expect(
			await screen.findByText("Nenhuma cotação corresponde à busca"),
		).toBeInTheDocument();
	});

	it("offers a retry when the feed fails", async () => {
		mockApi({ failStocks: true });
		renderSection();

		expect(
			await screen.findByText("Não foi possível carregar as cotações"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Tentar novamente" }),
		).toBeInTheDocument();
	});

	it("lists real estate funds with their yield", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await openTab(user, "Fundos imobiliários");

		expect(await screen.findByText("HGLG11")).toBeInTheDocument();
		expect(screen.getByText("Logística")).toBeInTheDocument();
		expect(screen.getByText("8,42%")).toBeInTheDocument();
	});

	it("composes the treasury rate from its indexer", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await openTab(user, "Tesouro Direto");

		expect(await screen.findByText("Tesouro IPCA+ 2029")).toBeInTheDocument();
		expect(screen.getByText("IPCA + 6,42%")).toBeInTheDocument();
		// Bonds do not tick, so there is no change column to show.
		expect(
			screen.queryByRole("columnheader", { name: "Variação" }),
		).not.toBeInTheDocument();
	});

	it("quotes currencies against BRL with bid and ask", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await openTab(user, "Moedas");

		expect(await screen.findByText("USD/BRL")).toBeInTheDocument();
		expect(screen.getByText("Dólar americano")).toBeInTheDocument();
		expect(screen.getByText(/R\$\s?5,4231/)).toBeInTheDocument();
		expect(screen.getByText(/R\$\s?5,4258/)).toBeInTheDocument();
	});

	it("switches between the card grid and the table", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await user.click(screen.getByRole("button", { name: "Ver como tabela" }));

		expect(screen.getByRole("table")).toBeInTheDocument();
		expect(screen.getByText("PETR4")).toBeInTheDocument();

		// The button now offers the way back.
		await user.click(screen.getByRole("button", { name: "Ver como cartões" }));
		expect(screen.queryByRole("table")).not.toBeInTheDocument();
	});

	it("keeps the chosen view when moving to another asset class", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await user.click(screen.getByRole("button", { name: "Ver como tabela" }));
		await openTab(user, "Criptomoedas");

		expect(await screen.findByText("BTC")).toBeInTheDocument();
		expect(screen.getByRole("table")).toBeInTheDocument();
	});

	it("opens the details dialog from a card", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await user.click(await screen.findByText("PETR4"));

		const dialog = await screen.findByRole("dialog");
		expect(within(dialog).getByText("Petrobras PN")).toBeInTheDocument();

		// Figures the card does not have room for.
		expect(within(dialog).getByText("Fech. anterior")).toBeInTheDocument();
		expect(within(dialog).getByText(/R\$\s?37,89/)).toBeInTheDocument();
		expect(within(dialog).getByText("Variação (valor)")).toBeInTheDocument();
		expect(within(dialog).getByText(/\+R\$\s?0,53/)).toBeInTheDocument();
		expect(within(dialog).getByText("Volume")).toBeInTheDocument();
		expect(within(dialog).getByText("Valor de mercado")).toBeInTheDocument();
	});

	it("opens the same dialog from a table row", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("VALE3");
		await user.click(screen.getByRole("button", { name: "Ver como tabela" }));
		await user.click(screen.getByText("VALE3"));

		const dialog = await screen.findByRole("dialog");
		expect(within(dialog).getByText("Vale ON")).toBeInTheDocument();
		expect(within(dialog).getByText("Mineração")).toBeInTheDocument();
	});

	it("describes a bond in the dialog without a change figure", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await openTab(user, "Tesouro Direto");
		await user.click(await screen.findByText("Tesouro IPCA+ 2029"));

		const dialog = await screen.findByRole("dialog");
		expect(within(dialog).getByText("IPCA + 6,42%")).toBeInTheDocument();
		expect(within(dialog).getByText("Prazo até o vencimento")).toBeInTheDocument();
		expect(within(dialog).getByText("Investimento mínimo")).toBeInTheDocument();
		expect(within(dialog).queryByText("Variação (valor)")).not.toBeInTheDocument();
	});

	it("shows the dealing spread for a currency", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await openTab(user, "Moedas");
		await user.click(await screen.findByText("USD/BRL"));

		const dialog = await screen.findByRole("dialog");
		expect(within(dialog).getByText("Spread")).toBeInTheDocument();
		// ask 5.4258 - bid 5.4231
		expect(within(dialog).getByText(/R\$\s?0,0027/)).toBeInTheDocument();
	});

	it("lists crypto priced in reais", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("PETR4");
		await openTab(user, "Criptomoedas");

		expect(await screen.findByText("BTC")).toBeInTheDocument();
		expect(screen.getByText("Bitcoin")).toBeInTheDocument();
		expect(screen.getByText(/R\$\s?612\.487,30/)).toBeInTheDocument();
	});
});
