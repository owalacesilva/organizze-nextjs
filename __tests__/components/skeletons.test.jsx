import { I18nProvider } from "@/components/elements/i18n-provider";
import {
	SkeletonMetricCards,
	SkeletonPage,
	SkeletonTable,
	SkeletonTableCard,
	SkeletonText,
} from "@/components/elements/skeletons";
import { AnalyticsSkeleton } from "@/components/section/analytics/skeleton";
import { BudgetsSkeleton } from "@/components/section/budgets/skeleton";
import { CategoriesSkeleton } from "@/components/section/categories/skeleton";
import { DashboardSkeleton } from "@/components/section/dashboard/skeleton";
import { GoalsSkeleton } from "@/components/section/goals/skeleton";
import { ProfileSkeleton } from "@/components/section/profile/skeleton";
import { SettingsSkeleton } from "@/components/section/settings/skeleton";
import { TransactionsSkeleton } from "@/components/section/transactions/skeleton";
import { WalletsSkeleton } from "@/components/section/wallets/skeleton";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { render, screen } from "@testing-library/react";

const withI18n = (ui) => render(<I18nProvider>{ui}</I18nProvider>);

const pulses = (container) =>
	container.querySelectorAll(".animate-pulse").length;

describe("skeleton primitives", () => {
	beforeEach(() => {
		window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	});

	it("exposes one polite live region with a translated label", () => {
		withI18n(
			<SkeletonPage>
				<SkeletonText lines={2} />
			</SkeletonPage>,
		);

		const status = screen.getByRole("status");
		expect(status).toHaveAttribute("aria-busy", "true");
		expect(status).toHaveAttribute("aria-live", "polite");
		expect(status).toHaveTextContent("Carregando...");
	});

	it("renders the requested number of text lines", () => {
		const { container } = withI18n(<SkeletonText lines={4} />);
		expect(pulses(container)).toBe(4);
	});

	it("renders one card per metric", () => {
		const { container } = withI18n(<SkeletonMetricCards count={3} />);
		// Each card holds an icon block plus two text bars.
		expect(pulses(container)).toBe(9);
	});

	it("renders header and body rows for a table", () => {
		const { container } = withI18n(<SkeletonTable rows={4} columns={3} />);
		expect(pulses(container)).toBe(3 + 4 * 3);
	});

	it("omits the table header on request", () => {
		const { container } = withI18n(
			<SkeletonTable rows={4} columns={3} header={false} />,
		);
		expect(pulses(container)).toBe(4 * 3);
	});

	it("can drop the toolbar and pagination from a table card", () => {
		const { container: full } = withI18n(
			<SkeletonTableCard rows={2} columns={2} />,
		);
		const { container: bare } = withI18n(
			<SkeletonTableCard
				rows={2}
				columns={2}
				toolbar={false}
				pagination={false}
			/>,
		);

		expect(pulses(bare)).toBe(2 + 2 * 2);
		expect(pulses(full)).toBeGreaterThan(pulses(bare));
	});
});

describe("page skeletons", () => {
	beforeEach(() => {
		window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	});

	const pages = [
		["dashboard", DashboardSkeleton],
		["transactions", TransactionsSkeleton],
		["analytics", AnalyticsSkeleton],
		["wallets", WalletsSkeleton],
		["budgets", BudgetsSkeleton],
		["goals", GoalsSkeleton],
		["profile", ProfileSkeleton],
		["settings", SettingsSkeleton],
		["categories", CategoriesSkeleton],
	];

	it.each(pages)("%s renders a single labelled live region", (_name, Page) => {
		const { container } = withI18n(<Page />);

		// Exactly one live region per page keeps announcements from stacking.
		expect(screen.getAllByRole("status")).toHaveLength(1);
		expect(screen.getByRole("status")).toHaveTextContent("Carregando...");
		expect(pulses(container)).toBeGreaterThan(5);
	});
});
