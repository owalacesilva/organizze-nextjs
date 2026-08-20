"use client";

import { useDeleteImport, useGetImports } from "@/app/api/imports/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	CheckCircle2,
	FileSpreadsheet,
	Loader2,
	OctagonAlert,
	Trash2,
	TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";

const STATUS = {
	processing: {
		icon: Loader2,
		iconClass: "animate-spin text-muted-foreground",
		badge: "bg-muted text-muted-foreground",
	},
	completed: {
		icon: CheckCircle2,
		iconClass: "text-emerald-600 dark:text-emerald-400",
		badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	},
	partial: {
		icon: TriangleAlert,
		iconClass: "text-amber-600 dark:text-amber-400",
		badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	},
	failed: {
		icon: OctagonAlert,
		iconClass: "text-destructive",
		badge: "bg-destructive/10 text-destructive",
	},
};

export function UploadHistory() {
	const { t, formatDate } = useTranslation();

	const importsQuery = useGetImports();
	const deleteMutation = useDeleteImport();

	const uploads = importsQuery.data?.imports ?? [];

	const handleDelete = async (upload) => {
		try {
			await deleteMutation.mutateAsync(upload.id);
			toast.success(t("import.uploadRemoved"));
		} catch (error) {
			toast.error(t("common.error"), { description: error.message });
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("import.historyTitle")}</CardTitle>
				<p className="text-xs text-muted-foreground">
					{t("import.historyHint")}
				</p>
			</CardHeader>

			<CardContent>
				{importsQuery.isPending ? (
					<div className="space-y-2" role="status" aria-busy="true">
						<span className="sr-only">{t("common.loading")}</span>
						{Array.from({ length: 2 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
							<div key={index} className="flex items-center gap-2">
								<Skeleton className="h-7 w-7 shrink-0 rounded-full" />
								<div className="w-full space-y-1.5">
									<Skeleton className="h-2.5 w-40" />
									<Skeleton className="h-2 w-28" />
								</div>
								<Skeleton className="h-4 w-20 shrink-0" />
							</div>
						))}
					</div>
				) : importsQuery.isError ? (
					<div className="flex flex-col items-center gap-2 py-6 text-center">
						<AlertCircle className="h-5 w-5 text-destructive" />
						<p className="text-xs font-medium">{t("import.historyError")}</p>
						<Button variant="outline" onClick={() => importsQuery.refetch()}>
							{t("common.retry")}
						</Button>
					</div>
				) : uploads.length === 0 ? (
					<div className="flex flex-col items-center gap-2 py-6 text-center">
						<FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
						<p className="text-xs text-muted-foreground">
							{t("import.historyEmpty")}
						</p>
					</div>
				) : (
					<ul className="divide-y">
						{uploads.map((upload) => {
							const status = STATUS[upload.status] ?? STATUS.processing;
							const Icon = status.icon;

							return (
								<li key={upload.id} className="flex items-center gap-2 py-2">
									<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
										<Icon className={cn("h-3.5 w-3.5", status.iconClass)} />
									</span>

									<div className="min-w-0 flex-1">
										<p className="truncate text-xs font-medium">
											{upload.fileName}
										</p>
										<p className="truncate text-[11px] text-muted-foreground">
											{t("import.uploadedAt", {
												date: formatDate(upload.createdAt, {
													dateStyle: "short",
													timeStyle: "short",
												}),
											})}{" "}
											·{" "}
											{t("import.rowsSummary", {
												imported: upload.importedRows,
												total: upload.totalRows,
											})}
											{upload.failedRows > 0 &&
												` · ${t("import.skipped", { count: upload.failedRows })}`}
										</p>
									</div>

									<Badge
										className={cn("shrink-0 border-transparent", status.badge)}
									>
										{t(`import.statuses.${upload.status}`)}
									</Badge>

									<Button
										variant="ghost"
										size="icon-sm"
										className="shrink-0 text-muted-foreground hover:text-destructive"
										aria-label={`${t("import.removeUpload")}: ${upload.fileName}`}
										disabled={upload.status === "processing"}
										onClick={() => handleDelete(upload)}
									>
										<Trash2 />
									</Button>
								</li>
							);
						})}
					</ul>
				)}
			</CardContent>
		</Card>
	);
}
