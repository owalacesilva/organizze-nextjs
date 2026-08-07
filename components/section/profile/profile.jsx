"use client";

import { useGetBudgets } from "@/app/api/budgets/hooks";
import { useGetTransactions } from "@/app/api/transactions/hooks";
import { useGetWallets } from "@/app/api/wallets/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import { normalizeTransaction } from "@/lib/transactions";
import { Settings, User, Wallet } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// Placeholder identity until authentication lands.
const USER = {
	name: "Hafsa Humaira",
	email: "hello@example.com",
	avatar: "/images/avatar/1.jpg",
	initials: "HH",
	memberSince: "2024-03-12",
};

const CHART_DAYS = 14;

/** Daily expense totals for the last `CHART_DAYS`, optionally for one wallet. */
function useDailySpending(transactions, walletId) {
	const { formatDate } = useTranslation();

	return useMemo(() => {
		const days = [];
		const today = new Date();

		for (let offset = CHART_DAYS - 1; offset >= 0; offset--) {
			const date = new Date(today);
			date.setDate(date.getDate() - offset);
			days.push({
				key: date.toISOString().slice(0, 10),
				label: formatDate(date, { day: "2-digit", month: "short" }),
				value: 0,
			});
		}

		const index = new Map(days.map((day) => [day.key, day]));

		for (const transaction of transactions) {
			if (transaction.amount >= 0) continue;
			if (walletId && transaction.wallet?.id !== walletId) continue;

			const day = index.get(String(transaction.date).slice(0, 10));
			if (day) day.value += Math.abs(transaction.amount);
		}

		return days.map((day) => ({
			...day,
			value: Math.round(day.value * 100) / 100,
		}));
	}, [transactions, walletId, formatDate]);
}

function SpendingChart({ data, height = "h-56" }) {
	const { formatCurrency } = useTranslation();

	return (
		<div className={`${height} w-full`}>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
					<defs>
						<linearGradient id="profileSpending" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="hsl(var(--primary))"
								stopOpacity={0.25}
							/>
							<stop
								offset="95%"
								stopColor="hsl(var(--primary))"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<XAxis
						dataKey="label"
						tickLine={false}
						axisLine={false}
						tick={{ fontSize: 9 }}
						stroke="currentColor"
						className="text-muted-foreground"
						interval="preserveStartEnd"
					/>
					<YAxis
						tickLine={false}
						axisLine={false}
						width={48}
						tick={{ fontSize: 9 }}
						stroke="currentColor"
						className="text-muted-foreground"
					/>
					<Tooltip
						formatter={(value) => formatCurrency(value)}
						contentStyle={{
							backgroundColor: "hsl(var(--card))",
							borderColor: "hsl(var(--border))",
							borderRadius: 0,
							fontSize: 12,
							color: "hsl(var(--foreground))",
						}}
					/>
					<Area
						type="monotone"
						dataKey="value"
						stroke="hsl(var(--primary))"
						strokeWidth={2}
						fill="url(#profileSpending)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

function ProfileOverview({ transactions, budgets }) {
	const { t, formatCurrency, formatDate } = useTranslation();
	const spending = useDailySpending(transactions);

	const budgeted = budgets.reduce((total, budget) => total + budget.amount, 0);
	const spent = budgets.reduce((total, budget) => total + (budget.spent ?? 0), 0);
	const percent = budgeted > 0 ? Math.min(100, (spent / budgeted) * 100) : 0;

	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>{t("profile.title")}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex items-start gap-2">
					<Avatar className="h-12 w-12">
						<AvatarImage src={USER.avatar} alt={USER.name} />
						<AvatarFallback>{USER.initials}</AvatarFallback>
					</Avatar>
					<div className="min-w-0 space-y-0.5">
						<p className="truncate text-xs font-medium">{USER.name}</p>
						<p className="truncate text-[11px] text-muted-foreground">
							{USER.email}
						</p>
						<div className="flex flex-wrap items-center gap-1.5">
							<Badge variant="secondary">{t("profile.plan")}</Badge>
							<span className="text-[10px] text-muted-foreground">
								{t("profile.memberSince", {
									date: formatDate(USER.memberSince, { dateStyle: "medium" }),
								})}
							</span>
						</div>
					</div>
				</div>

				<div className="space-y-1.5">
					<div className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground">
							{t("profile.monthlyBudget")}
						</span>
						<span className="font-medium tabular-nums">
							{formatCurrency(spent)} / {formatCurrency(budgeted)}
						</span>
					</div>
					<Progress value={percent} className="h-1.5" />
					<div className="flex items-center justify-between text-[11px]">
						<span className="text-primary">
							{t("profile.spentPercent", { percent: Math.round(percent) })}
						</span>
						<span className="text-muted-foreground">
							{t("profile.remainingPercent", {
								percent: Math.round(100 - percent),
							})}
						</span>
					</div>
				</div>

				<div className="space-y-1">
					<p className="text-xs font-medium">{t("profile.recentSpending")}</p>
					<SpendingChart data={spending} height="h-28" />
				</div>

				<div className="grid grid-cols-3 gap-1">
					<Button variant="outline" className="h-auto flex-col py-1.5" asChild>
						<Link href="/profile">
							<User />
							<span className="text-[10px]">{t("nav.profile")}</span>
						</Link>
					</Button>
					<Button variant="outline" className="h-auto flex-col py-1.5" asChild>
						<Link href="/wallets">
							<Wallet />
							<span className="text-[10px]">{t("nav.wallets")}</span>
						</Link>
					</Button>
					<Button variant="outline" className="h-auto flex-col py-1.5" asChild>
						<Link href="/settings">
							<Settings />
							<span className="text-[10px]">{t("nav.settings")}</span>
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

function WalletPanel({ wallet, transactions, isPrimary }) {
	const { t, formatCurrency } = useTranslation();
	const spending = useDailySpending(transactions, wallet.id);

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-2">
				<div>
					<p className="text-xs font-medium">{wallet.name}</p>
					<p className="text-[11px] text-muted-foreground">
						{isPrimary
							? t("profile.activeWallet")
							: t("profile.secondaryWallet")}{" "}
						· {formatCurrency(wallet.balance, { currency: wallet.currency })}
					</p>
				</div>
				<Button variant="outline" asChild>
					<Link href="/wallets">{t("profile.manage")}</Link>
				</Button>
			</div>

			<SpendingChart data={spending} />
		</div>
	);
}

export function Profile() {
	const { t } = useTranslation();

	const transactionsQuery = useGetTransactions();
	const walletsQuery = useGetWallets();
	const budgetsQuery = useGetBudgets();

	const transactions = useMemo(
		() =>
			(transactionsQuery.data?.transactions ?? []).map(normalizeTransaction),
		[transactionsQuery.data],
	);

	const wallets = walletsQuery.data?.wallets ?? [];
	const budgets = budgetsQuery.data?.budgets ?? [];

	return (
		<div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-12">
			<div className="lg:col-span-4">
				<ProfileOverview transactions={transactions} budgets={budgets} />
			</div>

			<div className="lg:col-span-8">
				<Card className="h-full">
					<CardContent className="p-3">
						{wallets.length === 0 ? (
							<p className="py-10 text-center text-xs text-muted-foreground">
								{t("profile.noWallets")}
							</p>
						) : (
							<Tabs defaultValue={String(wallets[0].id)} className="w-full">
								<div className="overflow-x-auto pb-1">
									<TabsList className="w-full justify-start">
										{wallets.map((wallet) => (
											<TabsTrigger
												key={wallet.id}
												value={String(wallet.id)}
												className="truncate"
											>
												{wallet.name}
											</TabsTrigger>
										))}
									</TabsList>
								</div>

								{wallets.map((wallet, index) => (
									<TabsContent
										key={wallet.id}
										value={String(wallet.id)}
										className="mt-3"
									>
										<WalletPanel
											wallet={wallet}
											transactions={transactions}
											isPrimary={index === 0}
										/>
									</TabsContent>
								))}
							</Tabs>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default Profile;
