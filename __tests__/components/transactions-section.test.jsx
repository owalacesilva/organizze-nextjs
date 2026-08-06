import { I18nProvider } from "@/components/elements/i18n-provider";
import TransactionsSection from "@/components/section/transactions";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("sonner", () => ({
	toast: { success: jest.fn(), error: jest.fn() },
}));

const CATEGORIES = [
	{ id: 10, name: "Alimentação" },
	{ id: 20, name: "Renda" },
];

// 12 rows so the default page size of 10 actually paginates.
const TRANSACTIONS = [
	{
		id: 1,
		amount: 3000,
		description: "Salário de março",
		date: "2026-03-01",
		category: { id: 20, name: "Renda" },
	},
	...Array.from({ length: 11 }, (_, index) => ({
		id: index + 2,
		amount: -(index + 1) * 10,
		description: `Compra ${index + 1}`,
		date: `2026-02-${String(index + 1).padStart(2, "0")}`,
		category: { id: 10, name: "Alimentação" },
	})),
];

function mockApi({ transactions = TRANSACTIONS, failList = false } = {}) {
	global.fetch.mockImplementation((url, init = {}) => {
		const ok = (body) =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

		if (String(url).includes("/api/categories")) {
			return ok({ categories: CATEGORIES });
		}
		if (String(url).includes("/api/transactions")) {
			if (failList && (init.method ?? "GET") === "GET") {
				return Promise.resolve({ ok: false, status: 500 });
			}
			if ((init.method ?? "GET") === "GET") return ok({ transactions });
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
				<TransactionsSection />
			</QueryClientProvider>
		</I18nProvider>,
	);
}

const rowCount = async () => {
	const table = await screen.findByRole("table");
	return within(table).getAllByRole("row").length - 1; // minus the header
};

describe("TransactionsSection", () => {
	it("shows a table-shaped skeleton before the data lands", async () => {
		let release;
		global.fetch.mockImplementation((url) =>
			String(url).includes("/api/categories")
				? Promise.resolve({ ok: true, json: async () => ({ categories: [] }) })
				: new Promise((resolve) => {
						release = () =>
							resolve({
								ok: true,
								json: async () => ({ transactions: TRANSACTIONS }),
							});
					}),
		);

		const { container } = renderSection();

		expect(screen.getByRole("status")).toHaveTextContent("Carregando...");
		expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
			5,
		);
		expect(screen.queryByRole("table")).not.toBeInTheDocument();

		release();

		expect(await screen.findByRole("table")).toBeInTheDocument();
		expect(container.querySelectorAll(".animate-pulse")).toHaveLength(0);
	});

	it("lists transactions, newest first, paginated", async () => {
		mockApi();
		renderSection();

		expect(await screen.findByText("Salário de março")).toBeInTheDocument();
		expect(await rowCount()).toBe(10);
		expect(screen.getByText("Mostrando 1–10 de 12")).toBeInTheDocument();

		// Newest date leads.
		const table = screen.getByRole("table");
		const firstRow = within(table).getAllByRole("row")[1];
		expect(within(firstRow).getByText("Salário de março")).toBeInTheDocument();
	});

	it("summarises income, expenses and balance for the visible set", async () => {
		mockApi();
		renderSection();

		await screen.findByText("Salário de março");

		// 3000 income; expenses 10+20+…+110 = 660; balance 2340.
		expect(screen.getByText("R$ 3.000,00")).toBeInTheDocument();
		expect(screen.getByText("R$ 660,00")).toBeInTheDocument();
		expect(screen.getByText("R$ 2.340,00")).toBeInTheDocument();
	});

	it("moves to the second page", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("Salário de março");
		await user.click(screen.getByRole("button", { name: "Próxima página" }));

		expect(screen.getByText("Mostrando 11–12 de 12")).toBeInTheDocument();
		expect(await rowCount()).toBe(2);
	});

	it("filters by search and resets pagination", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("Salário de março");
		await user.click(screen.getByRole("button", { name: "Próxima página" }));
		expect(screen.getByText("Mostrando 11–12 de 12")).toBeInTheDocument();

		await user.type(
			screen.getByRole("textbox", { name: "Buscar" }),
			"Salário",
		);

		await waitFor(() =>
			expect(screen.getByText("Mostrando 1–1 de 1")).toBeInTheDocument(),
		);
		expect(await rowCount()).toBe(1);
	});

	it("shows the filtered empty state", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("Salário de março");
		await user.type(
			screen.getByRole("textbox", { name: "Buscar" }),
			"nada corresponde",
		);

		expect(
			await screen.findByText(
				"Nenhuma movimentação corresponde aos filtros aplicados",
			),
		).toBeInTheDocument();
	});

	it("surfaces a load failure with a retry", async () => {
		mockApi({ failList: true });
		renderSection();

		expect(
			await screen.findByText("Não foi possível carregar as movimentações"),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Tentar novamente" }),
		).toBeInTheDocument();
	});

	it("shows the plain empty state when the API returns nothing", async () => {
		mockApi({ transactions: [] });
		renderSection();

		expect(
			await screen.findByText("Nenhuma movimentação encontrada"),
		).toBeInTheDocument();
	});

	it("posts a negative amount when creating an expense", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("Salário de março");
		await user.click(screen.getByRole("button", { name: /Nova movimentação/ }));

		const dialog = await screen.findByRole("dialog");
		await user.type(within(dialog).getByLabelText("Valor"), "42.5");
		await user.type(
			within(dialog).getByLabelText("Descrição"),
			"Padaria",
		);

		await user.click(
			within(dialog).getByRole("combobox", { name: "Categoria" }),
		);
		await user.click(await screen.findByRole("option", { name: "Alimentação" }));

		await user.click(within(dialog).getByRole("button", { name: "Salvar" }));

		await waitFor(() => {
			const post = global.fetch.mock.calls.find(
				([, init]) => init?.method === "POST",
			);
			expect(post).toBeDefined();
			expect(JSON.parse(post[1].body)).toMatchObject({
				amount: -42.5,
				description: "Padaria",
				categoryId: 10,
			});
		});
	});

	it("blocks submission and reports every invalid field", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await screen.findByText("Salário de março");
		await user.click(screen.getByRole("button", { name: /Nova movimentação/ }));

		const dialog = await screen.findByRole("dialog");
		await user.click(within(dialog).getByRole("button", { name: "Salvar" }));

		expect(
			within(dialog).getByText("Informe um valor maior que zero"),
		).toBeInTheDocument();
		expect(
			within(dialog).getByText("Escolha uma categoria"),
		).toBeInTheDocument();
		expect(within(dialog).getByText("Informe a descrição")).toBeInTheDocument();

		expect(
			global.fetch.mock.calls.some(([, init]) => init?.method === "POST"),
		).toBe(false);
	});
});
