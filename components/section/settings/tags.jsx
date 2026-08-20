"use client";

import {
	useCreateTag,
	useDeleteTag,
	useGetTags,
	useUpdateTag,
} from "@/app/api/tags/hooks";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { AlertCircle, Pencil, Plus, Tag as TagIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TagFormDialog } from "./tag-form-dialog";

export default function Tags() {
	const { t } = useTranslation();

	const [formOpen, setFormOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [pendingDelete, setPendingDelete] = useState(null);

	const tagsQuery = useGetTags();
	const createMutation = useCreateTag();
	const updateMutation = useUpdateTag();
	const deleteMutation = useDeleteTag();

	const tags = tagsQuery.data?.tags ?? [];

	const existingNames = tags
		.filter((tag) => tag.id !== editing?.id)
		.map((tag) => tag.name);

	const openCreate = () => {
		setEditing(null);
		setFormOpen(true);
	};

	const handleSubmit = async (payload) => {
		try {
			if (editing) {
				await updateMutation.mutateAsync({ id: editing.id, data: payload });
				toast.success(t("tags.updated"));
			} else {
				await createMutation.mutateAsync(payload);
				toast.success(t("tags.created"));
			}
			setFormOpen(false);
			setEditing(null);
		} catch (error) {
			toast.error(t("tags.saveError"), { description: error.message });
		}
	};

	const handleDelete = async () => {
		const target = pendingDelete;
		if (!target) return;

		try {
			await deleteMutation.mutateAsync(target.id);
			toast.success(t("tags.deleted"));
		} catch (error) {
			toast.error(t("tags.deleteError"), { description: error.message });
		} finally {
			setPendingDelete(null);
		}
	};

	return (
		<div className="space-y-3">
			<Card>
				<CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
					<div>
						<CardTitle>{t("tags.title")}</CardTitle>
						<p className="text-xs text-muted-foreground">{t("tags.subtitle")}</p>
					</div>
					<Button onClick={openCreate}>
						<Plus />
						{t("tags.add")}
					</Button>
				</CardHeader>

				<CardContent>
					{tagsQuery.isPending ? (
						<div
							className="flex flex-wrap gap-2"
							role="status"
							aria-busy="true"
						>
							<span className="sr-only">{t("common.loading")}</span>
							{Array.from({ length: 4 }).map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
								<Skeleton key={index} className="h-9 w-32" />
							))}
						</div>
					) : tagsQuery.isError ? (
						<div className="flex flex-col items-center gap-2 py-8 text-center">
							<AlertCircle className="h-5 w-5 text-destructive" />
							<p className="text-xs font-medium">{t("tags.loadError")}</p>
							<Button variant="outline" onClick={() => tagsQuery.refetch()}>
								{t("common.retry")}
							</Button>
						</div>
					) : tags.length === 0 ? (
						<div className="flex flex-col items-center gap-2 py-8 text-center">
							<TagIcon className="h-5 w-5 text-muted-foreground" />
							<p className="text-xs font-medium">{t("tags.empty")}</p>
							<p className="text-[11px] text-muted-foreground">
								{t("tags.emptyHint")}
							</p>
						</div>
					) : (
						<ul className="divide-y rounded-md border">
							{tags.map((tag) => (
								<li
									key={tag.id}
									className="flex items-center gap-2 px-2 py-1.5"
								>
									<Badge
										className="border-transparent text-white"
										style={{ backgroundColor: tag.color }}
									>
										{tag.name}
									</Badge>

									<span className="ml-auto flex items-center gap-1">
										<Button
											variant="ghost"
											size="icon-sm"
											aria-label={`${t("common.edit")} ${tag.name}`}
											onClick={() => {
												setEditing(tag);
												setFormOpen(true);
											}}
										>
											<Pencil />
										</Button>
										<Button
											variant="ghost"
											size="icon-sm"
											className="text-destructive hover:text-destructive"
											aria-label={`${t("common.delete")} ${tag.name}`}
											onClick={() => setPendingDelete(tag)}
										>
											<Trash2 />
										</Button>
									</span>
								</li>
							))}
						</ul>
					)}

					{tags.length > 0 && (
						<p className="mt-2 text-[11px] text-muted-foreground">
							{t("tags.count", { count: tags.length })}
						</p>
					)}
				</CardContent>
			</Card>

			<TagFormDialog
				open={formOpen}
				onOpenChange={(open) => {
					setFormOpen(open);
					if (!open) setEditing(null);
				}}
				tag={editing}
				existingNames={existingNames}
				onSubmit={handleSubmit}
				isSubmitting={createMutation.isPending || updateMutation.isPending}
			/>

			<AlertDialog
				open={Boolean(pendingDelete)}
				onOpenChange={(open) => !open && setPendingDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{t("tags.deleteConfirmTitle")}</AlertDialogTitle>
						<AlertDialogDescription>
							{t("tags.deleteConfirmDescription", {
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
