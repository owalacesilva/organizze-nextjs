import {
	SidebarProvider,
	useSidebar,
} from "@/components/layout/sidebar-context";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const STORAGE_KEY = "organizze.sidebar.collapsed";

function Probe() {
	const { collapsed, toggle, setCollapsed } = useSidebar();

	return (
		<div>
			<p data-testid="state">{collapsed ? "collapsed" : "expanded"}</p>
			<button type="button" onClick={toggle}>
				toggle
			</button>
			<button type="button" onClick={() => setCollapsed(true)}>
				collapse
			</button>
		</div>
	);
}

const renderProbe = (props) =>
	render(
		<SidebarProvider {...props}>
			<Probe />
		</SidebarProvider>,
	);

describe("SidebarProvider", () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	it("defaults to expanded", () => {
		renderProbe();
		expect(screen.getByTestId("state")).toHaveTextContent("expanded");
	});

	it("toggles and persists the new state", async () => {
		const user = userEvent.setup();
		renderProbe();

		await user.click(screen.getByRole("button", { name: "toggle" }));

		expect(screen.getByTestId("state")).toHaveTextContent("collapsed");
		expect(window.localStorage.getItem(STORAGE_KEY)).toBe("true");

		await user.click(screen.getByRole("button", { name: "toggle" }));

		expect(screen.getByTestId("state")).toHaveTextContent("expanded");
		expect(window.localStorage.getItem(STORAGE_KEY)).toBe("false");
	});

	it("restores the stored state on mount", () => {
		window.localStorage.setItem(STORAGE_KEY, "true");
		renderProbe();

		expect(screen.getByTestId("state")).toHaveTextContent("collapsed");
	});

	it("prefers the stored state over defaultCollapsed", () => {
		window.localStorage.setItem(STORAGE_KEY, "false");
		renderProbe({ defaultCollapsed: true });

		expect(screen.getByTestId("state")).toHaveTextContent("expanded");
	});

	it("toggles on Ctrl+B", async () => {
		const user = userEvent.setup();
		renderProbe();

		await user.keyboard("{Control>}b{/Control}");

		expect(screen.getByTestId("state")).toHaveTextContent("collapsed");
	});

	it("throws when used outside the provider", () => {
		const consoleError = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		expect(() => render(<Probe />)).toThrow(/useSidebar must be used inside/);

		consoleError.mockRestore();
	});
});
