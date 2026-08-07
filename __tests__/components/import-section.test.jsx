import { I18nProvider } from "@/components/elements/i18n-provider";
import StatementImportSection from "@/components/section/import";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("sonner", () => ({
	toast: { success: jest.fn(), error: jest.fn() },
}));

const CATEGORIES = [
	{ id: 10, name: "Alimentação" },
	{ id: 20, name: "Transporte" },
];

const WALLETS = [{ id: 1, name: "Conta principal" }];

const UPLOADS = [
	{
		id: 1,
		fileName: "extrato-fevereiro.csv",
		totalRows: 48,
		importedRows: 48,
		failedRows: 0,
		status: "completed",
		createdAt: "2026-02-20T10:00:00.000Z",
		finishedAt: "2026-02-20T10:00:05.000Z",
	},
	{
		id: 2,
		fileName: "cartao-marco.csv",
		totalRows: 32,
		importedRows: 29,
		failedRows: 3,
		status: "partial",
		createdAt: "2026-03-09T10:00:00.000Z",
		finishedAt: "2026-03-09T10:00:07.000Z",
	},
];

const STATEMENT = [
	"Data;Descrição;Valor;Categoria",
	"09/03/2026;Padaria;-12,50;Alimentação",
	"10/03/2026;Salário;3.000,00;",
	"nao-e-data;;abc;",
].join("\n");

function mockApi({ uploads = UPLOADS } = {}) {
	global.fetch.mockImplementation((url, init = {}) => {
		const ok = (body) =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

		if (String(url).includes("/api/categories")) return ok({ categories: CATEGORIES });
		if (String(url).includes("/api/wallets")) return ok({ wallets: WALLETS });
		if (String(url).includes("/api/transactions")) return ok({ id: 1 });
		if (String(url).includes("/api/imports")) {
			if ((init.method ?? "GET") === "GET") return ok({ imports: uploads });
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
				<StatementImportSection />
			</QueryClientProvider>
		</I18nProvider>,
	);
}

const csvFile = (content = STATEMENT, name = "extrato.csv") =>
	new File([content], name, { type: "text/csv" });

const fileInput = (container) => container.querySelector('input[type="file"]');

describe("StatementImportSection", () => {
	it("only accepts .csv files", async () => {
		mockApi();
		const { container } = renderSection();

		// The picker is filtered by `accept`...
		expect(fileInput(container)).toHaveAttribute("accept", ".csv,text/csv");

		// ...but a drop bypasses it, so the extension is checked in code too.
		const dropZone = screen.getByText("Solte seu CSV aqui").closest("div")
			.parentElement;

		fireEvent.drop(dropZone, {
			dataTransfer: {
				files: [new File(["a,b"], "extrato.txt", { type: "text/plain" })],
			},
		});

		expect(
			await screen.findByText("Só é possível importar arquivos .csv"),
		).toBeInTheDocument();
		expect(screen.queryByText("Relacione as colunas")).not.toBeInTheDocument();
	});

	it("takes a dropped .csv", async () => {
		mockApi();
		renderSection();

		const dropZone = screen.getByText("Solte seu CSV aqui").closest("div")
			.parentElement;

		fireEvent.drop(dropZone, { dataTransfer: { files: [csvFile()] } });

		expect(await screen.findByText("Relacione as colunas")).toBeInTheDocument();
	});

	it("parses the file and guesses the columns from the header", async () => {
		const user = userEvent.setup();
		mockApi();
		const { container } = renderSection();

		await user.upload(fileInput(container), csvFile());

		expect(await screen.findByText("Relacione as colunas")).toBeInTheDocument();
		expect(screen.getByText("extrato.csv · 3 linhas")).toBeInTheDocument();

		// Header row detected, so the first data row is the bakery charge.
		expect(screen.getByText("Padaria")).toBeInTheDocument();
		expect(screen.getByText("-R$ 12,50")).toBeInTheDocument();

		// Two rows are importable, the malformed one is not.
		expect(screen.getByText("2 prontas para importar")).toBeInTheDocument();
		expect(screen.getByText("1 será ignorada")).toBeInTheDocument();
	});

	it("imports only the valid rows, matching categories by name", async () => {
		const user = userEvent.setup();
		mockApi();
		const { container } = renderSection();

		await user.upload(fileInput(container), csvFile());
		await screen.findByText("Relacione as colunas");

		// A fallback category is required before anything can be imported.
		const importButton = screen.getByRole("button", { name: /Importar 2/ });
		expect(importButton).toBeDisabled();

		await user.click(
			screen.getByRole("combobox", {
				name: "Categoria para linhas sem correspondência",
			}),
		);
		await user.click(await screen.findByRole("option", { name: "Transporte" }));

		await user.click(screen.getByRole("button", { name: /Importar 2/ }));

		await waitFor(() => {
			// The history row is a POST too, so scope this to the transactions endpoint.
			const posts = global.fetch.mock.calls.filter(
				([url, init]) =>
					init?.method === "POST" && String(url).includes("/api/transactions"),
			);
			expect(posts).toHaveLength(2);

			const bodies = posts.map(([, init]) => JSON.parse(init.body));
			// "Alimentação" matched the file's own category…
			expect(bodies[0]).toMatchObject({
				description: "Padaria",
				amount: -12.5,
				date: "2026-03-09",
				categoryId: 10,
			});
			// …while the row without one fell back to the chosen category.
			expect(bodies[1]).toMatchObject({
				description: "Salário",
				amount: 3000,
				categoryId: 20,
			});
		});

		expect(
			await screen.findByText("2 movimentações importadas"),
		).toBeInTheDocument();
	});

	it("reports an empty file", async () => {
		const user = userEvent.setup();
		mockApi();
		const { container } = renderSection();

		await user.upload(fileInput(container), csvFile("   ", "vazio.csv"));

		expect(
			await screen.findByText("Este arquivo não tem linhas"),
		).toBeInTheDocument();
	});

	it("lets the columns be remapped by hand", async () => {
		const user = userEvent.setup();
		mockApi();
		const { container } = renderSection();

		await user.upload(
			fileInput(container),
			csvFile("09/03/2026;Padaria;-12,50", "sem-cabecalho.csv"),
		);

		// No header, so nothing is mapped and no row is importable yet.
		expect(await screen.findByText("Relacione as colunas")).toBeInTheDocument();
		expect(screen.getByText("0 pronta para importar")).toBeInTheDocument();

		const pick = async (field, option) => {
			await user.click(screen.getByRole("combobox", { name: field }));
			await user.click(await screen.findByRole("option", { name: option }));
		};

		await pick("Data", "Coluna 1");
		await pick("Descrição", "Coluna 2");
		await pick("Valor", "Coluna 3");

		await waitFor(() =>
			expect(screen.getByText("1 pronta para importar")).toBeInTheDocument(),
		);
	});
});

describe("upload history", () => {
	it("lists every upload with its status", async () => {
		mockApi();
		renderSection();

		expect(await screen.findByText("extrato-fevereiro.csv")).toBeInTheDocument();
		expect(screen.getByText("cartao-marco.csv")).toBeInTheDocument();

		expect(screen.getByText("Concluído")).toBeInTheDocument();
		expect(screen.getByText("Parcialmente importado")).toBeInTheDocument();

		// Row counts come along for the ride.
		expect(screen.getByText(/48 de 48 linhas/)).toBeInTheDocument();
		expect(screen.getByText(/29 de 32 linhas/)).toBeInTheDocument();
	});

	it("shows an empty history", async () => {
		mockApi({ uploads: [] });
		renderSection();

		expect(await screen.findByText("Nada foi importado ainda")).toBeInTheDocument();
	});

	it("records the run and closes it out once every row was attempted", async () => {
		const user = userEvent.setup();
		mockApi();
		const { container } = renderSection();

		await user.upload(fileInput(container), csvFile());
		await screen.findByText("Relacione as colunas");

		await user.click(
			screen.getByRole("combobox", {
				name: "Categoria para linhas sem correspondência",
			}),
		);
		await user.click(await screen.findByRole("option", { name: "Transporte" }));
		await user.click(screen.getByRole("button", { name: /Importar 2/ }));

		await waitFor(() => {
			const calls = global.fetch.mock.calls.filter(([url]) =>
				String(url).includes("/api/imports"),
			);

			const started = calls.find(([, init]) => init?.method === "POST");
			expect(JSON.parse(started[1].body)).toMatchObject({
				fileName: "extrato.csv",
				totalRows: 3,
				status: "processing",
			});

			const finished = calls.find(([, init]) => init?.method === "PUT");
			expect(JSON.parse(finished[1].body)).toMatchObject({
				importedRows: 2,
				failedRows: 0,
				status: "completed",
			});
		});
	});

	it("drops an upload from the history", async () => {
		const user = userEvent.setup();
		mockApi();
		renderSection();

		await user.click(
			await screen.findByRole("button", {
				name: "Remover do histórico: cartao-marco.csv",
			}),
		);

		await waitFor(() => {
			const del = global.fetch.mock.calls.find(
				([url, init]) =>
					String(url).includes("/api/imports/2") && init?.method === "DELETE",
			);
			expect(del).toBeDefined();
		});
	});
});
