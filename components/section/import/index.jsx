"use client";

import { useGetCategories } from "@/app/api/categories/hooks";
import { useCreateTransaction } from "@/app/api/transactions/hooks";
import { useGetWallets } from "@/app/api/wallets/hooks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { parseCsv } from "@/lib/csv";
import {
	STATEMENT_FIELDS,
	buildStatementEntries,
	guessColumns,
	looksLikeHeader,
	resolveCategoryId,
	summarizeEntries,
} from "@/lib/statement";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FileDrop } from "./file-drop";

const PREVIEW_ROWS = 12;
const NONE = "none";

const EMPTY_MAPPING = {
	date: null,
	description: null,
	amount: null,
	category: null,
};

function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(new Error("read-error"));
		reader.onload = () => resolve(String(reader.result ?? ""));
		reader.readAsText(file);
	});
}

export default function StatementImportSection() {
	const { t, formatCurrency, formatDate } = useTranslation();

	const [fileName, setFileName] = useState(null);
	const [rows, setRows] = useState([]);
	const [hasHeader, setHasHeader] = useState(true);
	const [mapping, setMapping] = useState(EMPTY_MAPPING);
	const [fallbackCategoryId, setFallbackCategoryId] = useState("");
	const [walletId, setWalletId] = useState(NONE);
	const [error, setError] = useState(null);
	const [progress, setProgress] = useState(null);
	const [result, setResult] = useState(null);

	const categoriesQuery = useGetCategories();
	const walletsQuery = useGetWallets();
	const createMutation = useCreateTransaction();

	const categories = categoriesQuery.data?.categories ?? [];
	const wallets = walletsQuery.data?.wallets ?? [];

	const columnCount = rows.reduce((max, row) => Math.max(max, row.length), 0);
	const dataRows = hasHeader ? rows.slice(1) : rows;
	const headerRow = hasHeader ? (rows[0] ?? []) : [];

	const entries = useMemo(
		() => buildStatementEntries(dataRows, mapping),
		[dataRows, mapping],
	);

	const summary = useMemo(() => summarizeEntries(entries), [entries]);
	const invalidCount = entries.length - summary.count;

	const handleFile = async (file) => {
		setError(null);
		setResult(null);

		try {
			const parsed = parseCsv(await readFile(file));

			if (parsed.length === 0) {
				setError("import.emptyFile");
				return;
			}

			const header = looksLikeHeader(parsed[0]);
			setFileName(file.name);
			setRows(parsed);
			setHasHeader(header);
			setMapping(header ? guessColumns(parsed[0]) : EMPTY_MAPPING);
		} catch {
			setError("import.readError");
		}
	};

	const reset = () => {
		setFileName(null);
		setRows([]);
		setMapping(EMPTY_MAPPING);
		setError(null);
		setResult(null);
		setProgress(null);
	};

	const toggleHeader = (checked) => {
		setHasHeader(checked);
		setMapping(checked ? guessColumns(rows[0] ?? []) : EMPTY_MAPPING);
	};

	// A column can only feed one field, so picking it elsewhere clears the old one.
	const assignColumn = (field) => (value) => {
		const index = value === NONE ? null : Number(value);

		setMapping((previous) => {
			const next = { ...previous, [field]: index };
			if (index !== null) {
				for (const other of STATEMENT_FIELDS) {
					if (other !== field && next[other] === index) next[other] = null;
				}
			}
			return next;
		});
	};

	const canImport =
		summary.count > 0 && fallbackCategoryId !== "" && progress === null;

	const runImport = async () => {
		const importable = entries.filter((entry) => entry.valid);
		const fallbackId = Number(fallbackCategoryId);
		let imported = 0;
		let failed = 0;

		setResult(null);
		setProgress({ done: 0, total: importable.length });

		// Sequential on purpose: the simulated backend (and most real ones) would
		// rather answer 90 small writes in order than all at once.
		for (const entry of importable) {
			try {
				await createMutation.mutateAsync({
					amount: entry.amount,
					description: entry.description,
					date: entry.date,
					categoryId: resolveCategoryId(entry, categories, fallbackId),
					...(walletId === NONE ? {} : { walletId: Number(walletId) }),
				});
				imported += 1;
			} catch {
				failed += 1;
			}
			setProgress({ done: imported + failed, total: importable.length });
		}

		setProgress(null);
		setResult({ imported, failed });

		if (failed === 0) {
			toast.success(t("import.imported", { count: imported }));
		} else {
			toast.error(t("import.importFailed"), {
				description: t("import.partial", { imported, failed }),
			});
		}
	};

	const columnOptions = Array.from({ length: columnCount }, (_, index) => ({
		value: String(index),
		label: hasHeader
			? (headerRow[index] || t("import.column", { index: index + 1 }))
			: t("import.column", { index: index + 1 }),
	}));

	return (
		<div className="space-y-3">
			<Card>
				<CardContent className="space-y-3 p-3">
					<FileDrop
						fileName={
							fileName
								? t("import.fileSummary", {
										name: fileName,
										count: dataRows.length,
									})
								: null
						}
						onFile={handleFile}
						onError={setError}
					/>

					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription className="text-xs">
								{t(error, { size: 5 })}
							</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>

			{rows.length > 0 && (
				<>
					<Card>
						<CardHeader>
							<CardTitle>{t("import.columnsTitle")}</CardTitle>
							<p className="text-xs text-muted-foreground">
								{t("import.columnsHint")}
							</p>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center gap-2">
								<Checkbox
									id="has-header"
									checked={hasHeader}
									onCheckedChange={toggleHeader}
								/>
								<Label htmlFor="has-header">{t("import.hasHeader")}</Label>
							</div>

							<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
								{STATEMENT_FIELDS.map((field) => (
									<div key={field} className="space-y-1">
										<Label htmlFor={`map-${field}`}>
											{t(`transactions.fields.${field}`)}
										</Label>
										<Select
											value={
												mapping[field] === null ? NONE : String(mapping[field])
											}
											onValueChange={assignColumn(field)}
										>
											<SelectTrigger id={`map-${field}`}>
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={NONE}>
													{t("import.ignore")}
												</SelectItem>
												{columnOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>{t("import.defaults")}</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<div className="space-y-1">
								<Label htmlFor="fallback-category">
									{t("import.defaultCategory")}
								</Label>
								<Select
									value={fallbackCategoryId}
									onValueChange={setFallbackCategoryId}
								>
									<SelectTrigger id="fallback-category">
										<SelectValue
											placeholder={t("transactions.placeholders.selectCategory")}
										/>
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category.id} value={String(category.id)}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<p className="text-[11px] text-muted-foreground">
									{t("import.defaultCategoryHint")}
								</p>
							</div>

							<div className="space-y-1">
								<Label htmlFor="import-wallet">
									{t("import.defaultWallet")}
								</Label>
								<Select value={walletId} onValueChange={setWalletId}>
									<SelectTrigger id="import-wallet">
										<SelectValue
											placeholder={t("transactions.placeholders.selectWallet")}
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={NONE}>{t("common.none")}</SelectItem>
										{wallets.map((wallet) => (
											<SelectItem key={wallet.id} value={String(wallet.id)}>
												{wallet.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="gap-2">
							<CardTitle>{t("import.previewTitle")}</CardTitle>
							<div className="flex flex-wrap items-center gap-2 text-[11px]">
								<Badge variant="secondary">
									{t("import.ready", { count: summary.count })}
								</Badge>
								{invalidCount > 0 && (
									<Badge variant="destructive">
										{t("import.skipped", { count: invalidCount })}
									</Badge>
								)}
								<span className="text-muted-foreground">
									{t("transactions.summary.income")}:{" "}
									{formatCurrency(summary.income)} ·{" "}
									{t("transactions.summary.expenses")}:{" "}
									{formatCurrency(summary.expenses)}
								</span>
							</div>
						</CardHeader>

						<CardContent className="p-0">
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow className="hover:bg-transparent">
											<TableHead className="pl-3">
												{t("transactions.fields.date")}
											</TableHead>
											<TableHead>
												{t("transactions.fields.description")}
											</TableHead>
											<TableHead>
												{t("transactions.fields.category")}
											</TableHead>
											<TableHead className="text-right">
												{t("transactions.fields.amount")}
											</TableHead>
											<TableHead className="pr-3">
												{t("import.status")}
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{entries.slice(0, PREVIEW_ROWS).map((entry) => (
											<TableRow
												key={entry.index}
												className={cn(!entry.valid && "bg-destructive/5")}
											>
												<TableCell className="pl-3">
													{entry.date
														? formatDate(entry.date, { dateStyle: "short" })
														: "—"}
												</TableCell>
												<TableCell className="max-w-[220px] truncate">
													{entry.description || "—"}
												</TableCell>
												<TableCell>{entry.category || "—"}</TableCell>
												<TableCell
													className={cn(
														"text-right tabular-nums",
														entry.amount < 0
															? "text-red-600 dark:text-red-400"
															: "text-emerald-600 dark:text-emerald-400",
													)}
												>
													{entry.amount === null
														? "—"
														: formatCurrency(entry.amount)}
												</TableCell>
												<TableCell className="pr-3">
													{entry.valid ? (
														<span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
															<CheckCircle2 className="h-3 w-3" />
															{t("import.rowOk")}
														</span>
													) : (
														<span className="text-destructive">
															{t("import.rowInvalid", {
																fields: entry.errors
																	.map((field) =>
																		t(`transactions.fields.${field}`),
																	)
																	.join(", "),
															})}
														</span>
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>

							{entries.length > PREVIEW_ROWS && (
								<p className="px-3 py-2 text-[11px] text-muted-foreground">
									{t("import.previewHint", {
										count: PREVIEW_ROWS,
										total: entries.length,
									})}
								</p>
							)}
						</CardContent>
					</Card>

					{result ? (
						<Alert>
							<CheckCircle2 className="h-4 w-4" />
							<AlertDescription className="flex flex-wrap items-center gap-2 text-xs">
								{result.failed === 0
									? t("import.imported", { count: result.imported })
									: t("import.partial", {
											imported: result.imported,
											failed: result.failed,
										})}
								<Button variant="link" size="xs" asChild>
									<Link href="/transactions">
										{t("import.viewTransactions")}
									</Link>
								</Button>
								<Button variant="link" size="xs" onClick={reset}>
									{t("import.startOver")}
								</Button>
							</AlertDescription>
						</Alert>
					) : (
						<div className="flex flex-wrap items-center justify-end gap-2">
							{summary.count === 0 && (
								<p className="mr-auto text-xs text-muted-foreground">
									{t("import.noValidRows")}
								</p>
							)}
							<Button variant="outline" onClick={reset}>
								{t("common.cancel")}
							</Button>
							<Button onClick={runImport} disabled={!canImport}>
								{progress ? (
									<>
										<Loader2 className="animate-spin" />
										{t("import.importing", progress)}
									</>
								) : (
									<>
										<Upload />
										{t("import.importAction", { count: summary.count })}
									</>
								)}
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
