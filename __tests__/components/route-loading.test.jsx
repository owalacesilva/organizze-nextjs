import AnalyticsLoading from "@/app/analytics/loading";
import BudgetsLoading from "@/app/budgets/loading";
import CategoriesLoading from "@/app/categories/loading";
import DashboardLoading from "@/app/dashboard/loading";
import GoalsLoading from "@/app/goals/loading";
import RootLoading from "@/app/loading";
import ProfileLoading from "@/app/profile/loading";
import SettingsLoading from "@/app/settings/loading";
import TransactionsLoading from "@/app/transactions/loading";
import WalletsLoading from "@/app/wallets/loading";
import { I18nProvider } from "@/components/elements/i18n-provider";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

jest.mock("next/navigation", () => ({
	usePathname: () => "/",
}));

const routes = [
	["/", RootLoading, "Painel"],
	["/dashboard", DashboardLoading, "Painel"],
	["/transactions", TransactionsLoading, "Movimentações"],
	["/analytics", AnalyticsLoading, "Análises"],
	["/wallets", WalletsLoading, "Carteiras"],
	["/budgets", BudgetsLoading, "Orçamentos"],
	["/goals", GoalsLoading, "Metas"],
	["/profile", ProfileLoading, "Perfil"],
	["/settings", SettingsLoading, "Configurações"],
	["/categories", CategoriesLoading, "Categorias"],
];

describe("route loading states", () => {
	beforeEach(() => {
		window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	});

	it.each(routes)(
		"%s renders the chrome and a skeleton",
		(_path, Loading, heading) => {
			const { container } = render(
				<SessionProvider session={null}>
					<I18nProvider>
						<Loading />
					</I18nProvider>
				</SessionProvider>,
			);

			// The sidebar and header must survive the transition, otherwise the
			// whole app appears to blink on every navigation.
			expect(container.querySelector("aside")).toBeInTheDocument();
			expect(container.querySelector("header")).toBeInTheDocument();
			expect(container.querySelector("footer")).toBeInTheDocument();

			// The breadcrumb keeps naming the destination while it loads.
			expect(
				screen.getByRole("heading", { name: heading, level: 1 }),
			).toBeInTheDocument();

			expect(screen.getByRole("status")).toHaveTextContent("Carregando...");
			expect(
				container.querySelectorAll(".animate-pulse").length,
			).toBeGreaterThan(5);
		},
	);
});
