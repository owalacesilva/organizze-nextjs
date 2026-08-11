jest.mock("sonner", () => ({
	toast: { success: jest.fn(), error: jest.fn(), warning: jest.fn() },
}));

import { I18nProvider } from "@/components/elements/i18n-provider";
import { LaunchpadQuest } from "@/components/section/dashboard/launchpad-quest";
import { StreakCard } from "@/components/section/dashboard/streak-card";
import { TrophyRoom } from "@/components/section/profile/trophy-room";
import { STORAGE_KEY } from "@/lib/i18n/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const EMPTY_STATE = {
	purchases: [],
	activeTheme: "default",
	leaderboardOptIn: false,
	celebratedBadges: [],
};

function today(offset = 0) {
	const date = new Date();
	date.setDate(date.getDate() - offset);
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Everything the page needs, served over `fetch` like the other sections. */
function mockApi({ transactions = [], budgets = [], goals = [], wallets = [] } = {}) {
	global.fetch.mockImplementation((url) => {
		const ok = (body) =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
		const path = String(url);

		if (path.includes("/api/gamification")) {
			return ok({ state: EMPTY_STATE, peers: [] });
		}
		if (path.includes("/api/transactions")) return ok({ transactions });
		if (path.includes("/api/budgets")) return ok({ budgets });
		if (path.includes("/api/goals")) return ok({ goals });
		if (path.includes("/api/wallets")) return ok({ wallets });
		return ok({});
	});
}

function renderWidget(ui) {
	window.localStorage.setItem(STORAGE_KEY, "pt-BR");
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});

	return render(
		<I18nProvider>
			<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
		</I18nProvider>,
	);
}

describe("StreakCard", () => {
	it("shows the flame with the current run", async () => {
		mockApi({ transactions: [0, 1, 2].map((d) => ({ amount: -10, date: today(d) })) });
		renderWidget(<StreakCard />);

		expect(
			await screen.findByText("3 dias seguidos", {}, { timeout: 3000 }),
		).toBeInTheDocument();
		expect(screen.getByText("Registrado")).toBeInTheDocument();
	});

	it("invites a first entry when there is no streak", async () => {
		mockApi({ transactions: [] });
		renderWidget(<StreakCard />);

		expect(
			await screen.findByText(
				"Registre uma movimentação para começar",
				{},
				{ timeout: 3000 },
			),
		).toBeInTheDocument();
	});

	it("points at the next milestone", async () => {
		mockApi({ transactions: [0, 1].map((d) => ({ amount: -10, date: today(d) })) });
		renderWidget(<StreakCard />);

		expect(
			await screen.findByText(
				/Faltam 5 para o marco de 7 dias/,
				{},
				{ timeout: 3000 },
			),
		).toBeInTheDocument();
	});
});

describe("LaunchpadQuest", () => {
	it("tracks the three setup steps", async () => {
		mockApi({ wallets: [{ id: 1 }] });
		renderWidget(<LaunchpadQuest />);

		expect(
			await screen.findByText("Decolagem Financeira", {}, { timeout: 3000 }),
		).toBeInTheDocument();
		expect(screen.getByText("1/3 concluídos")).toBeInTheDocument();
		expect(screen.getByText("Crie um orçamento por categoria")).toBeInTheDocument();
	});

	it("promises the founding bonus", async () => {
		mockApi({ wallets: [{ id: 1 }] });
		renderWidget(<LaunchpadQuest />);

		expect(
			await screen.findByText(/500 tokens/, {}, { timeout: 3000 }),
		).toBeInTheDocument();
	});

	it("disappears once every step is done", async () => {
		mockApi({
			wallets: [{ id: 1 }],
			budgets: [{ id: 1, amount: 100 }],
			goals: [{ id: 1, target: 100, saved: 0 }],
		});
		const { container } = renderWidget(<LaunchpadQuest />);

		// Nothing to wait for — assert the widget stays empty after the fetches.
		await screen.findByText((_, element) => element === container, {}).catch(() => {});
		expect(screen.queryByText("Decolagem Financeira")).not.toBeInTheDocument();
	});
});

describe("TrophyRoom", () => {
	it("lists unlocked badges alongside locked ones", async () => {
		mockApi({
			transactions: [{ amount: -10, date: today(0) }],
			budgets: [{ id: 1, amount: 100, spent: 10 }],
		});
		renderWidget(<TrophyRoom />);

		expect(
			await screen.findByText("Primeiro Passo", {}, { timeout: 3000 }),
		).toBeInTheDocument();
		// Locked, and far off.
		expect(screen.getByText("Mestre do Trimestre")).toBeInTheDocument();
	});

	it("counts how many are unlocked", async () => {
		mockApi({ transactions: [{ amount: -10, date: today(0) }] });
		renderWidget(<TrophyRoom />);

		expect(
			await screen.findByText(/^\d+ de \d+$/, {}, { timeout: 3000 }),
		).toBeInTheDocument();
	});

	it("explains how to unlock a locked badge", async () => {
		const user = userEvent.setup();
		mockApi({ transactions: [{ amount: -10, date: today(0) }] });
		renderWidget(<TrophyRoom />);

		const locked = await screen.findByText(
			"Mestre do Trimestre",
			{},
			{ timeout: 3000 },
		);

		await user.hover(locked);

		const tip = await screen.findByRole("tooltip");
		expect(
			within(tip).getByText(
				"Registre uma movimentação todos os dias por 90 dias.",
			),
		).toBeInTheDocument();
	});

	it("shows progress towards a locked badge", async () => {
		mockApi({
			transactions: [0, 1, 2].map((d) => ({ amount: -10, date: today(d) })),
		});
		renderWidget(<TrophyRoom />);

		// weekStreak: 3 of 7 days.
		expect(await screen.findByText("3 / 7", {}, { timeout: 3000 })).toBeInTheDocument();
	});
});
