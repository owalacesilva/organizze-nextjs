import { DataTablePagination } from "@/components/elements/data-table-pagination";
import { I18nProvider } from "@/components/elements/i18n-provider";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { usePagination } from "@/hooks/usePagination";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const rows = (count) => Array.from({ length: count }, (_, i) => `row-${i + 1}`);

function Harness({ count, ...props }) {
	const pagination = usePagination(rows(count), { initialPageSize: 5 });

	return (
		<I18nProvider>
			<ul>
				{pagination.pageItems.map((row) => (
					<li key={row}>{row}</li>
				))}
			</ul>
			<DataTablePagination {...pagination} {...props} />
		</I18nProvider>
	);
}

describe("DataTablePagination", () => {
	// Pin the locale so the assertions below can be written in pt-BR.
	beforeEach(() => {
		window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	});

	it("reports the visible range", () => {
		render(<Harness count={12} />);
		expect(screen.getByText("Mostrando 1–5 de 12")).toBeInTheDocument();
	});

	it("renders nothing when there are no rows", () => {
		const { container } = render(<Harness count={0} />);
		expect(container.querySelector("nav")).toBeNull();
	});

	it("advances to the next page and updates the rows", async () => {
		const user = userEvent.setup();
		render(<Harness count={12} />);

		expect(screen.getByText("row-1")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Próxima página" }));

		expect(screen.getByText("Mostrando 6–10 de 12")).toBeInTheDocument();
		expect(screen.getByText("row-6")).toBeInTheDocument();
		expect(screen.queryByText("row-1")).not.toBeInTheDocument();
	});

	it("disables the previous controls on the first page", () => {
		render(<Harness count={12} />);

		expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Primeira página" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Próxima página" })).toBeEnabled();
	});

	it("disables the next controls on the last page", async () => {
		const user = userEvent.setup();
		render(<Harness count={12} />);

		await user.click(screen.getByRole("button", { name: "Última página" }));

		expect(screen.getByText("Mostrando 11–12 de 12")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Próxima página" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Última página" })).toBeDisabled();
	});

	it("jumps straight to a numbered page", async () => {
		const user = userEvent.setup();
		render(<Harness count={12} />);

		await user.click(screen.getByRole("button", { name: "Ir para a página 3" }));

		expect(screen.getByText("Mostrando 11–12 de 12")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Ir para a página 3" }),
		).toHaveAttribute("aria-current", "page");
	});

	it("can hide the page-size selector", () => {
		render(<Harness count={12} showPageSize={false} />);
		expect(screen.queryByLabelText("Linhas por página")).not.toBeInTheDocument();
	});
});
