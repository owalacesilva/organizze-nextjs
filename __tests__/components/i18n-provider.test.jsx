import { I18nProvider } from "@/components/elements/i18n-provider";
import { useTranslation } from "@/hooks/useTranslation";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/** jsdom reports `en-US`; each test states the browser language it assumes. */
function setBrowserLanguage(language) {
	Object.defineProperty(window.navigator, "language", {
		value: language,
		configurable: true,
	});
}

function Probe() {
	const { locale, setLocale, t, formatCurrency } = useTranslation();

	return (
		<div>
			<p data-testid="locale">{locale}</p>
			<p data-testid="label">{t("nav.transactions")}</p>
			<p data-testid="money">{formatCurrency(10)}</p>
			<button type="button" onClick={() => setLocale("en")}>
				to-en
			</button>
			<button type="button" onClick={() => setLocale("klingon")}>
				to-bogus
			</button>
		</div>
	);
}

const renderProbe = () =>
	render(
		<I18nProvider>
			<Probe />
		</I18nProvider>,
	);

describe("I18nProvider", () => {
	beforeEach(() => {
		window.localStorage.clear();
		setBrowserLanguage("pt-BR");
	});

	it("translates using the detected locale", () => {
		renderProbe();

		expect(screen.getByTestId("locale")).toHaveTextContent("pt-BR");
		expect(screen.getByTestId("label")).toHaveTextContent("Movimentações");
	});

	it("switches locale, reformats currency and persists the choice", async () => {
		const user = userEvent.setup();
		renderProbe();

		await user.click(screen.getByRole("button", { name: "to-en" }));

		expect(screen.getByTestId("locale")).toHaveTextContent("en");
		expect(screen.getByTestId("label")).toHaveTextContent("Transactions");
		expect(screen.getByTestId("money")).toHaveTextContent("$10.00");
		expect(window.localStorage.getItem(STORAGE_KEY)).toBe("en");
	});

	it("adopts the stored locale on mount and syncs <html lang>", () => {
		window.localStorage.setItem(STORAGE_KEY, "en");
		renderProbe();

		expect(screen.getByTestId("locale")).toHaveTextContent("en");
		expect(document.documentElement.lang).toBe("en");
	});

	it("prefers the stored locale over the browser language", () => {
		setBrowserLanguage("en-US");
		window.localStorage.setItem(STORAGE_KEY, "pt-BR");
		renderProbe();

		expect(screen.getByTestId("locale")).toHaveTextContent("pt-BR");
	});

	it("falls back to the browser language when nothing is stored", () => {
		setBrowserLanguage("en-GB");
		renderProbe();

		expect(screen.getByTestId("locale")).toHaveTextContent("en");
	});

	it("falls back to the default locale for an unsupported browser language", () => {
		setBrowserLanguage("de-DE");
		renderProbe();

		expect(screen.getByTestId("locale")).toHaveTextContent("pt-BR");
	});

	it("ignores a request to switch to an unsupported locale", async () => {
		const user = userEvent.setup();
		renderProbe();

		await user.click(screen.getByRole("button", { name: "to-bogus" }));

		expect(screen.getByTestId("locale")).toHaveTextContent("pt-BR");
	});

	it("throws when used outside the provider", () => {
		const consoleError = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		expect(() => render(<Probe />)).toThrow(/useI18n must be used inside/);

		consoleError.mockRestore();
	});
});
