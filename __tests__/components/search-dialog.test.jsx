import { I18nProvider } from "@/components/elements/i18n-provider";
import { DashboardHeader } from "@/components/layout/header";
import { SidebarProvider } from "@/components/layout/sidebar-context";
import { STORAGE_KEY } from "@/lib/i18n/config";
<<<<<<< HEAD
=======
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
>>>>>>> 3db3392 (Issue/5 (#9))
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionProvider } from "next-auth/react";

const push = jest.fn();

jest.mock("next/navigation", () => ({
	usePathname: () => "/",
	useRouter: () => ({ push: (...args) => push(...args) }),
}));

function renderHeader() {
	window.localStorage.setItem(STORAGE_KEY, "pt-BR");

<<<<<<< HEAD
	return render(
		<SessionProvider session={null}>
			<I18nProvider>
				<SidebarProvider>
					<DashboardHeader />
				</SidebarProvider>
			</I18nProvider>
=======
	// The header now carries a token balance, so it needs a query client.
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	return render(
		<SessionProvider session={null}>
			<QueryClientProvider client={queryClient}>
				<I18nProvider>
					<SidebarProvider>
						<DashboardHeader />
					</SidebarProvider>
				</I18nProvider>
			</QueryClientProvider>
>>>>>>> 3db3392 (Issue/5 (#9))
		</SessionProvider>,
	);
}

const openSearch = async (user) => {
	await user.click(screen.getByRole("button", { name: "Buscar" }));
	return screen.findByRole("dialog");
};

describe("global search", () => {
	it("opens the dialog when the header search is clicked", async () => {
		const user = userEvent.setup();
		renderHeader();

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

		const dialog = await openSearch(user);
		expect(within(dialog).getByRole("combobox")).toHaveFocus();
	});

	it("opens on the intro state with suggestions to try", async () => {
		const user = userEvent.setup();
		renderHeader();

		const dialog = await openSearch(user);

		expect(
			within(dialog).getByText("Encontre funcionalidades do sistema"),
		).toBeInTheDocument();
		expect(
			within(dialog).getByText("Use a busca para ir direto ao que você precisa"),
		).toBeInTheDocument();
		expect(
			within(dialog).getByText("Tente pesquisar palavras como:"),
		).toBeInTheDocument();
		expect(within(dialog).getByText("Em teste")).toBeInTheDocument();
	});

	it("runs a suggestion when it is picked", async () => {
		const user = userEvent.setup();
		renderHeader();

		const dialog = await openSearch(user);
		await user.click(within(dialog).getByRole("button", { name: "Cotações" }));

		expect(
			within(dialog).queryByText("Encontre funcionalidades do sistema"),
		).not.toBeInTheDocument();
		expect(await within(dialog).findByRole("option")).toHaveTextContent(
			"Cotações",
		);
	});

	it("finds a page by a keyword that is not in its name", async () => {
		const user = userEvent.setup();
		renderHeader();

		const dialog = await openSearch(user);
		await user.type(within(dialog).getByRole("combobox"), "bitcoin");

		const options = await within(dialog).findAllByRole("option");
		expect(options).toHaveLength(1);
		expect(options[0]).toHaveTextContent("Cotações");
	});

	it("matches without accents", async () => {
		const user = userEvent.setup();
		renderHeader();

		const dialog = await openSearch(user);
		await user.type(within(dialog).getByRole("combobox"), "orcamento");

		expect(await within(dialog).findByRole("option")).toHaveTextContent(
			"Orçamentos",
		);
	});

	it("navigates to the chosen page and closes", async () => {
		const user = userEvent.setup();
		renderHeader();

		const dialog = await openSearch(user);
		await user.type(within(dialog).getByRole("combobox"), "metas");
		await user.click(await within(dialog).findByRole("option"));

		expect(push).toHaveBeenCalledWith("/goals");
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("says so when nothing matches", async () => {
		const user = userEvent.setup();
		renderHeader();

		const dialog = await openSearch(user);
		await user.type(within(dialog).getByRole("combobox"), "zzzzz");

		expect(await within(dialog).findByText("Nada encontrado")).toBeInTheDocument();
		expect(within(dialog).queryAllByRole("option")).toHaveLength(0);
	});

	it("forgets the previous query when reopened", async () => {
		const user = userEvent.setup();
		renderHeader();

		let dialog = await openSearch(user);
		await user.type(within(dialog).getByRole("combobox"), "metas");
		await user.keyboard("{Escape}");

		dialog = await openSearch(user);
		expect(
			within(dialog).getByText("Encontre funcionalidades do sistema"),
		).toBeInTheDocument();
	});

	it("opens with the keyboard shortcut", async () => {
		const user = userEvent.setup();
		renderHeader();

		await user.keyboard("{Control>}k{/Control}");

		expect(await screen.findByRole("dialog")).toBeInTheDocument();
	});
});
