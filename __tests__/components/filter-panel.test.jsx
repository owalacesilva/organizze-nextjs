import { FilterPanel } from "@/components/elements/filter-panel";
import { I18nProvider } from "@/components/elements/i18n-provider";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderPanel = (props = {}) =>
	render(
		<I18nProvider>
			<FilterPanel {...props}>
				<input aria-label="a filter" />
			</FilterPanel>
		</I18nProvider>,
	);

describe("FilterPanel", () => {
	// Pin the locale so the assertions below can be written in pt-BR.
	beforeEach(() => {
		window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	});

	it("starts collapsed and hides its controls", () => {
		renderPanel();

		expect(screen.getByRole("button", { name: "Mostrar filtros" })).toBeInTheDocument();
		expect(screen.queryByLabelText("a filter")).not.toBeInTheDocument();
	});

	it("reveals the controls when opened", async () => {
		const user = userEvent.setup();
		renderPanel();

		await user.click(screen.getByRole("button", { name: "Mostrar filtros" }));

		expect(screen.getByLabelText("a filter")).toBeVisible();
		expect(screen.getByRole("button", { name: "Ocultar filtros" })).toBeInTheDocument();
	});

	it("honours defaultOpen", () => {
		renderPanel({ defaultOpen: true });
		expect(screen.getByLabelText("a filter")).toBeVisible();
	});

	it("shows a pluralised active count and a clear button", () => {
		renderPanel({ activeCount: 2, onClear: jest.fn() });

		expect(screen.getByText("2 ativos")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Limpar filtros/ })).toBeInTheDocument();
	});

	it("uses the singular form for one active filter", () => {
		renderPanel({ activeCount: 1, onClear: jest.fn() });
		expect(screen.getByText("1 ativo")).toBeInTheDocument();
	});

	it("hides the clear button when nothing is active", () => {
		renderPanel({ activeCount: 0, onClear: jest.fn() });
		expect(screen.queryByRole("button", { name: /Limpar filtros/ })).not.toBeInTheDocument();
	});

	it("calls onClear", async () => {
		const user = userEvent.setup();
		const onClear = jest.fn();
		renderPanel({ activeCount: 1, onClear });

		await user.click(screen.getByRole("button", { name: /Limpar filtros/ }));

		expect(onClear).toHaveBeenCalledTimes(1);
	});

	it("supports being controlled", async () => {
		const user = userEvent.setup();
		const onOpenChange = jest.fn();
		render(
			<I18nProvider>
				<FilterPanel open={false} onOpenChange={onOpenChange}>
					<input aria-label="a filter" />
				</FilterPanel>
			</I18nProvider>,
		);

		await user.click(screen.getByRole("button", { name: "Mostrar filtros" }));

		expect(onOpenChange).toHaveBeenCalledWith(true);
		// Still closed: the parent owns the state.
		expect(screen.queryByLabelText("a filter")).not.toBeInTheDocument();
	});
});
