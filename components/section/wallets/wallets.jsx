"use client";

import {
	useCreateWallet,
	useDeleteWallet,
	useGetWallets,
	useUpdateWallet,
} from "@/app/api/wallets/hooks";
import { WalletsSkeleton } from "@/components/section/wallets/skeleton";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	Banknote,
	Building2,
	CreditCard,
	LineChart,
	MoreHorizontal,
	Pencil,
	PiggyBank,
	Plus,
	RefreshCw,
	Trash2,
	Wallet as WalletIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { WalletFormDialog } from "./wallet-form-dialog";

const TYPE_ICONS = {
	checking: Building2,
	savings: PiggyBank,
	credit: CreditCard,
	cash: Banknote,
	investment: LineChart,
};

function SummaryCard({ label, value, tone = "default" }) {
	return (
		<Card>
			<CardContent className="p-3">
				<p className="text-[11px] uppercase tracking-wide text-muted-foreground">
					{label}
				</p>
				<p
					className={cn(
						"mt-1 text-lg font-semibold tabular-nums",
						tone === "positive" && "text-emerald-600 dark:text-emerald-400",
						tone === "negative" && "text-red-600 dark:text-red-400",
					)}
				>
					{value}
				</p>
			</CardContent>
		</Card>
	);
}

function WalletCard({ wallet, onEdit, onDelete }) {
	const { t, formatCurrency } = useTranslation();
	const Icon = TYPE_ICONS[wallet.type] ?? WalletIcon;
	const currency = wallet.currency;

	const usage =
		wallet.type === "credit" && wallet.creditLimit
			? Math.min(100, (Math.abs(wallet.balance) / wallet.creditLimit) * 100)
			: null;

	return (
		<Card>
			<CardContent className="space-y-2 p-3">
				<div className="flex items-start gap-2">
					<div className="rounded-full bg-muted p-1.5">
						<Icon className="h-4 w-4 text-primary" />
					</div>

					<div className="min-w-0 flex-1">
						<p className="truncate text-xs font-medium">{wallet.name}</p>
						<p className="text-[11px] text-muted-foreground">
							{t(`wallets.types.${wallet.type}`)}
						</p>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon-xs"
								aria-label={t("common.actions")}
							>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								className="gap-2"
								onSelect={() => onEdit(wallet)}
							>
								<Pencil />
								{t("common.edit")}
							</DropdownMenuItem>
							<DropdownMenuItem
								className="gap-2 text-destructive focus:text-destructive"
								onSelect={() => onDelete(wallet)}
							>
								<Trash2 />
								{t("common.delete")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<p
					className={cn(
						"text-lg font-semibold tabular-nums",
						wallet.balance < 0 && "text-red-600 dark:text-red-400",
					)}
				>
					{formatCurrency(wallet.balance, { currency })}
				</p>

				{usage === null ? (
					<p className="text-[11px] text-muted-foreground">
						{t("wallets.availableBalance")}:{" "}
						<span className="font-medium text-foreground">
							{formatCurrency(wallet.availableBalance ?? wallet.balance, {
								currency,
							})}
						</span>
					</p>
				) : (
					<div className="space-y-1">
						<Progress value={usage} className="h-1.5" />
						<div className="flex justify-between text-[11px] text-muted-foreground">
							<span>
								{t("wallets.availableBalance")}:{" "}
								{formatCurrency(wallet.availableBalance ?? 0, { currency })}
							</span>
							<span>
								{t("wallets.creditLimit")}:{" "}
								{formatCurrency(wallet.creditLimit ?? 0, { currency })}
							</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export function Wallets() {
	const { t, formatCurrency } = useTranslation();

	const [formOpen, setFormOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [pendingDelete, setPendingDelete] = useState(null);

	const walletsQuery = useGetWallets();
	const createMutation = useCreateWallet();
	const updateMutation = useUpdateWallet();
	const deleteMutation = useDeleteWallet();

	const wallets = walletsQuery.data?.wallets ?? [];

	const summary = useMemo(
		() =>
			wallets.reduce(
				(totals, wallet) => {
					totals.total += wallet.balance;
					if (wallet.balance < 0) {
						totals.owed += Math.abs(wallet.balance);
					} else {
						totals.positive += wallet.balance;
					}
					return totals;
				},
				{ total: 0, positive: 0, owed: 0 },
			),
		[wallets],
	);

	const openCreate = () => {
		setEditing(null);
		setFormOpen(true);
	};

	const handleSubmit = async (payload) => {
		try {
			if (editing) {
				await updateMutation.mutateAsync({ id: editing.id, data: payload });
				toast.success(t("wallets.updated"));
			} else {
				await createMutation.mutateAsync(payload);
				toast.success(t("wallets.created"));
			}
			setFormOpen(false);
			setEditing(null);
		} catch (error) {
			toast.error(t("wallets.saveError"), { description: error.message });
		}
	};

	const handleDelete = async () => {
		const target = pendingDelete;
		if (!target) return;

		try {
			await deleteMutation.mutateAsync(target.id);
			toast.success(t("wallets.deleted"));
		} catch (error) {
			toast.error(t("wallets.deleteError"), { description: error.message });
		} finally {
			setPendingDelete(null);
		}
	};

	if (walletsQuery.isPending) {
		return (
			<div role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<WalletsSkeleton />
			</div>
		);
	}

	if (walletsQuery.isError) {
		return (
			<div className="flex flex-col items-center gap-3 py-10 text-center">
				<AlertCircle className="h-6 w-6 text-destructive" />
				<div>
					<p className="text-sm font-medium">{t("wallets.loadError")}</p>
					<p className="text-xs text-muted-foreground">
						{walletsQuery.error?.message}
					</p>
				</div>
				<Button variant="outline" onClick={() => walletsQuery.refetch()}>
					{t("common.retry")}
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap items-center gap-2">
				<p className="text-xs text-muted-foreground">
					{t("wallets.count", { count: wallets.length })}
				</p>

				<div className="ml-auto flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={() => walletsQuery.refetch()}
						disabled={walletsQuery.isFetching}
						aria-label={t("common.refresh")}
					>
						<RefreshCw className={cn(walletsQuery.isFetching && "animate-spin")} />
					</Button>
					<Button onClick={openCreate}>
						<Plus />
						{t("wallets.add")}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<SummaryCard
					label={t("wallets.totalBalance")}
					value={formatCurrency(summary.total)}
				/>
				<SummaryCard
					label={t("wallets.positiveBalances")}
					value={formatCurrency(summary.positive)}
					tone="positive"
				/>
				<SummaryCard
					label={t("wallets.negativeBalances")}
					value={formatCurrency(summary.owed)}
					tone="negative"
				/>
			</div>

			{wallets.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center gap-2 py-10 text-center">
						<WalletIcon className="h-6 w-6 text-muted-foreground" />
						<p className="text-sm font-medium">{t("wallets.empty")}</p>
						<p className="text-xs text-muted-foreground">
							{t("wallets.emptyHint")}
						</p>
						<Button className="mt-1" onClick={openCreate}>
							<Plus />
							{t("wallets.add")}
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
					{wallets.map((wallet) => (
						<WalletCard
							key={wallet.id}
							wallet={wallet}
							onEdit={(target) => {
								setEditing(target);
								setFormOpen(true);
							}}
							onDelete={setPendingDelete}
						/>
					))}
				</div>
			)}

			<WalletFormDialog
				open={formOpen}
				onOpenChange={(open) => {
					setFormOpen(open);
					if (!open) setEditing(null);
				}}
				wallet={editing}
				onSubmit={handleSubmit}
				isSubmitting={createMutation.isPending || updateMutation.isPending}
			/>

			<AlertDialog
				open={Boolean(pendingDelete)}
				onOpenChange={(open) => !open && setPendingDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t("wallets.deleteConfirmTitle")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t("wallets.deleteConfirmDescription", {
								name: pendingDelete?.name ?? "",
							})}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={deleteMutation.isPending}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{t("common.delete")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
