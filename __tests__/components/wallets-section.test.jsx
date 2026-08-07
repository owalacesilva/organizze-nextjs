import { I18nProvider } from "@/components/elements/i18n-provider";
import WalletsSection from "@/components/section/wallets";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("sonner", () => ({
	toast: { success: jest.fn(), error: jest.fn() },
}));

const WALLETS = [
	{
		id: 1,
		name: "Conta principal",
		balance: 1000,
		type: "checking",
		currency: "BRL",
		availableBalance: 1000,
	},
	{
		id: 2,
		name: "Cartão",
		balance: -250,
		type: "credit",
		currency: "BRL",
		availableBalance: 750,
		creditLimit: 1000,
	},
];

function mockApi({ wallets = WALLETS, failList = false } = {}) {
	global.fetch.mockImplementation((url, init = {}) => {
		const ok = (body) =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

		if (String(url).includes("/api/wallets")) {
			if (failList && (init.method ?? "GET") === "GET") {
				return Promise.resolve({ ok: false, status: 500 });
			}
			if ((init.method ?? "GET") === "GET") return ok({ wallets });
			return ok({ id: 99 });
		}
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
				<WalletsSection />
			</QueryClientProvider>
		</I18nProvider>,
	);
}

describe("WalletsSection", () => {
	it("summarises the balances and lists every wallet", async () => {
		mockApi();
		renderSection();

		expect(await screen.findByText("Conta principal")).toBeInTheDocument();
		expect(screen.getByText("Cartão")).toBeInTheDocument();
		expect(screen.getByText("2 carteiras")).toBeInTheDocument();

		// Amounts also show up on the cards, so read them off the summary labels.
		// Intl separates the symbol with a non-breaking space.
		const summary = (label) =>
			screen.getByText(label).nextElementSibling.textContent.replace(/\u00a0/g, " ");

		expect(summary("Saldo total")).toBe("R$ 750,00");
		expect(summary("Saldos positivos")).toBe("R$ 1.000,00");
		expect(summary("Valores devidos")).toBe("R$ 250,00");
	});

	it("creates a wallet from the side panel", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("Conta principal");
		await user.click(screen.getByRole("button", { name: /Nova carteira/ }));

		const panel = await screen.findByRole("dialog");
		await user.type(within(panel).getByLabelText("Nome"), "Poupança");
		await user.type(within(panel).getByLabelText("Saldo atual"), "500");
		await user.click(within(panel).getByRole("button", { name: "Salvar" }));

		await waitFor(() => {
			const post = global.fetch.mock.calls.find(
				([, init]) => init?.method === "POST",
			);
			expect(post).toBeDefined();
			expect(JSON.parse(post[1].body)).toMatchObject({
				name: "Poupança",
				balance: 500,
				type: "checking",
			});
		});
	});

	it("blocks submission when the name is missing", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("Conta principal");
		await user.click(screen.getByRole("button", { name: /Nova carteira/ }));

		const panel = await screen.findByRole("dialog");
		await user.click(within(panel).getByRole("button", { name: "Salvar" }));

		expect(within(panel).getByText("Informe um nome")).toBeInTheDocument();
		expect(
			global.fetch.mock.calls.some(([, init]) => init?.method === "POST"),
		).toBe(false);
	});

	it("shows the empty state when there are no wallets", async () => {
		mockApi({ wallets: [] });
		renderSection();

		expect(
			await screen.findByText("Nenhuma carteira cadastrada"),
		).toBeInTheDocument();
	});

	it("surfaces a load failure with a retry", async () => {
		mockApi({ failList: true });
		renderSection();

		expect(
			await screen.findByText("Não foi possível carregar as carteiras"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Tentar novamente" }),
		).toBeInTheDocument();
	});
});
