"use client";

import {
	useCreateGoal,
	useDeleteGoal,
	useGetGoals,
	useUpdateGoal,
} from "@/app/api/goals/hooks";
import { useGetWallets } from "@/app/api/wallets/hooks";
import { GoalsSkeleton } from "@/components/section/goals/skeleton";
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
import { Badge } from "@/components/ui/badge";
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
	MoreHorizontal,
	Pencil,
	Plus,
	RefreshCw,
	Target,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { GoalDetailsDialog } from "./goal-details-dialog";
import { GoalFormDialog } from "./goal-form-dialog";

function GoalCard({ goal, onSelect, onEdit, onDelete }) {
	const { t, formatCurrency, formatDate } = useTranslation();

	const percent = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
	const remaining = Math.max(0, goal.target - goal.saved);
	const isComplete = percent >= 100;

	return (
		<Card
			onClick={() => onSelect(goal)}
			className="cursor-pointer transition-colors hover:border-primary/50"
		>
			<CardContent className="space-y-2 p-3">
				<div className="flex items-start gap-2">
					<div className="min-w-0 flex-1">
						<p className="truncate text-xs font-medium">{goal.name}</p>
						<p className="text-[11px] text-muted-foreground">
							{goal.deadline
								? `${t("goals.deadline")}: ${formatDate(goal.deadline, { dateStyle: "medium" })}`
								: t("goals.noDeadline")}
						</p>
					</div>

					{isComplete && (
						<Badge className="border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
							{t("goals.completed")}
						</Badge>
					)}

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon-xs"
								onClick={(event) => event.stopPropagation()}
								aria-label={t("common.actions")}
							>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							onClick={(event) => event.stopPropagation()}
						>
							<DropdownMenuItem className="gap-2" onSelect={() => onEdit(goal)}>
								<Pencil />
								{t("common.edit")}
							</DropdownMenuItem>
							<DropdownMenuItem
								className="gap-2 text-destructive focus:text-destructive"
								onSelect={() => onDelete(goal)}
							>
								<Trash2 />
								{t("common.delete")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="flex items-baseline justify-between">
					<span className="text-lg font-semibold tabular-nums">
						{formatCurrency(goal.saved)}
					</span>
					<span className="text-[11px] text-muted-foreground">
						{t("goals.target")}: {formatCurrency(goal.target)}
					</span>
				</div>

				<Progress value={Math.min(100, percent)} className="h-1.5" />

				<div className="flex justify-between text-[11px] text-muted-foreground">
					<span>{t("goals.progress", { percent: Math.round(percent) })}</span>
					<span>
						{t("goals.remaining")}: {formatCurrency(remaining)}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}

export function Goals() {
	const { t, formatCurrency } = useTranslation();

	const [formOpen, setFormOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [selected, setSelected] = useState(null);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [pendingDelete, setPendingDelete] = useState(null);

	const goalsQuery = useGetGoals();
	const walletsQuery = useGetWallets();
	const createMutation = useCreateGoal();
	const updateMutation = useUpdateGoal();
	const deleteMutation = useDeleteGoal();

	const goals = goalsQuery.data?.goals ?? [];
	const wallets = walletsQuery.data?.wallets ?? [];

	const summary = useMemo(
		() =>
			goals.reduce(
				(totals, goal) => {
					totals.saved += goal.saved;
					totals.target += goal.target;
					return totals;
				},
				{ saved: 0, target: 0 },
			),
		[goals],
	);

	const openCreate = () => {
		setEditing(null);
		setFormOpen(true);
	};

	// Leaving the details panel open behind the form would stack two panels.
	const openEdit = (goal) => {
		setDetailsOpen(false);
		setEditing(goal);
		setFormOpen(true);
	};

	const openDelete = (goal) => {
		setDetailsOpen(false);
		setPendingDelete(goal);
	};

	const handleContribute = async (goal, saved) => {
		try {
			await updateMutation.mutateAsync({ id: goal.id, data: { saved } });
			setSelected({ ...goal, saved });
			toast.success(t("goals.contributionAdded"));
		} catch (error) {
			toast.error(t("goals.saveError"), { description: error.message });
		}
	};

	const handleSubmit = async (payload) => {
		try {
			if (editing) {
				await updateMutation.mutateAsync({ id: editing.id, data: payload });
				toast.success(t("goals.updated"));
			} else {
				await createMutation.mutateAsync(payload);
				toast.success(t("goals.created"));
			}
			setFormOpen(false);
			setEditing(null);
		} catch (error) {
			toast.error(t("goals.saveError"), { description: error.message });
		}
	};

	const handleDelete = async () => {
		const target = pendingDelete;
		if (!target) return;

		try {
			await deleteMutation.mutateAsync(target.id);
			toast.success(t("goals.deleted"));
		} catch (error) {
			toast.error(t("goals.deleteError"), { description: error.message });
		} finally {
			setPendingDelete(null);
		}
	};

	if (goalsQuery.isPending) {
		return (
			<div role="status" aria-busy="true">
				<span className="sr-only">{t("common.loading")}</span>
				<GoalsSkeleton />
			</div>
		);
	}

	if (goalsQuery.isError) {
		return (
			<div className="flex flex-col items-center gap-3 py-10 text-center">
				<AlertCircle className="h-6 w-6 text-destructive" />
				<div>
					<p className="text-sm font-medium">{t("goals.loadError")}</p>
					<p className="text-xs text-muted-foreground">
						{goalsQuery.error?.message}
					</p>
				</div>
				<Button variant="outline" onClick={() => goalsQuery.refetch()}>
					{t("common.retry")}
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap items-center gap-2">
				<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
					<span>
						{t("goals.totalSaved")}:{" "}
						<span className="font-medium text-foreground">
							{formatCurrency(summary.saved)}
						</span>
					</span>
					<span>
						{t("goals.totalTarget")}:{" "}
						<span className="font-medium text-foreground">
							{formatCurrency(summary.target)}
						</span>
					</span>
				</div>

				<div className="ml-auto flex items-center gap-2">
					<Button
						variant="outline"
						size="icon"
						onClick={() => goalsQuery.refetch()}
						disabled={goalsQuery.isFetching}
						aria-label={t("common.refresh")}
					>
						<RefreshCw className={cn(goalsQuery.isFetching && "animate-spin")} />
					</Button>
					<Button onClick={openCreate}>
						<Plus />
						{t("goals.add")}
					</Button>
				</div>
			</div>

			{goals.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center gap-2 py-10 text-center">
						<Target className="h-6 w-6 text-muted-foreground" />
						<p className="text-sm font-medium">{t("goals.empty")}</p>
						<p className="text-xs text-muted-foreground">
							{t("goals.emptyHint")}
						</p>
						<Button className="mt-1" onClick={openCreate}>
							<Plus />
							{t("goals.add")}
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
					{goals.map((goal) => (
						<GoalCard
							key={goal.id}
							goal={goal}
							onSelect={(target) => {
								setSelected(target);
								setDetailsOpen(true);
							}}
							onEdit={openEdit}
							onDelete={openDelete}
						/>
					))}
				</div>
			)}

			<GoalDetailsDialog
				goal={selected}
				open={detailsOpen}
				onOpenChange={setDetailsOpen}
				wallets={wallets}
				onEdit={openEdit}
				onDelete={openDelete}
				onContribute={handleContribute}
				isSaving={updateMutation.isPending}
			/>

			<GoalFormDialog
				open={formOpen}
				onOpenChange={(open) => {
					setFormOpen(open);
					if (!open) setEditing(null);
				}}
				goal={editing}
				wallets={wallets}
				onSubmit={handleSubmit}
				isSubmitting={createMutation.isPending || updateMutation.isPending}
			/>

			<AlertDialog
				open={Boolean(pendingDelete)}
				onOpenChange={(open) => !open && setPendingDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t("goals.deleteConfirmTitle")}</AlertDialogTitle>
						<AlertDialogDescription>
							{t("goals.deleteConfirmDescription", {
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
