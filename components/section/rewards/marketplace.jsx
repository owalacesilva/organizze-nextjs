"use client";

import {
	usePurchaseTheme,
	useUpdateGamification,
} from "@/app/api/gamification/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { catalogue } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { Check, Coins, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

/**
 * Spend tokens on accent themes.
 *
 * Affordability is re-checked by the store on purchase; the disabled button
 * here is a courtesy, not the rule.
 */
export function Marketplace({ profile, state }) {
	const { t, formatNumber } = useTranslation();
	const purchase = usePurchaseTheme();
	const update = useUpdateGamification();

	const items = catalogue({
		purchases: state.purchases,
		balance: profile.tokens.balance,
		active: state.activeTheme,
	});

	const handleBuy = async (theme) => {
		try {
			await purchase.mutateAsync(theme.id);
			toast.success(
				t("gamification.market.purchased", {
					name: t(`gamification.market.items.${theme.id}`),
				}),
			);
		} catch (error) {
			toast.error(t("gamification.market.purchaseError"), {
				description: error.message,
			});
		}
	};

	const handleApply = async (theme) => {
		try {
			await update.mutateAsync({ activeTheme: theme.id });
		} catch (error) {
			toast.error(t("gamification.market.applyError"), {
				description: error.message,
			});
		}
	};

	const isBusy = purchase.isPending || update.isPending;

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
				<div>
					<CardTitle>{t("gamification.market.title")}</CardTitle>
					<p className="text-xs text-muted-foreground">
						{t("gamification.market.subtitle")}
					</p>
				</div>

				<span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold">
					<Coins className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
					<span className="tabular-nums">
						{formatNumber(profile.tokens.balance)}
					</span>
				</span>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
					{items.map((item) => (
						<div
							key={item.id}
							className={cn(
								"flex flex-col gap-2 rounded-lg border p-3",
								item.active && "border-primary ring-1 ring-primary",
							)}
						>
							<div className="flex items-center gap-2">
								<span
									className="h-8 w-8 shrink-0 rounded-full ring-1 ring-border"
									style={{ backgroundColor: `hsl(${item.swatch})` }}
									aria-hidden="true"
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate text-xs font-medium">
										{t(`gamification.market.items.${item.id}`)}
									</p>
									<p className="text-[11px] text-muted-foreground">
										{item.price === 0
											? t("gamification.market.free")
											: t("gamification.market.price", {
													tokens: formatNumber(item.price),
												})}
									</p>
								</div>

								{item.active && (
									<Badge className="shrink-0 gap-1 border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
										<Check className="h-2.5 w-2.5" />
										{t("gamification.market.active")}
									</Badge>
								)}
							</div>

							{item.active ? null : item.owned ? (
								<Button
									variant="outline"
									size="sm"
									disabled={isBusy}
									onClick={() => handleApply(item)}
								>
									{t("gamification.market.apply")}
								</Button>
							) : (
								<Button
									size="sm"
									className="gap-1.5"
									disabled={isBusy || !item.affordable}
									onClick={() => handleBuy(item)}
								>
									{isBusy ? (
										<Loader2 className="animate-spin" />
									) : item.affordable ? (
										<Coins />
									) : (
										<Lock />
									)}
									{item.affordable
										? t("gamification.market.buy")
										: t("gamification.market.locked")}
								</Button>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
