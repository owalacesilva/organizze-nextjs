"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { isCsvFileName } from "@/lib/csv";
import { FileSpreadsheet, Upload } from "lucide-react";
import { useRef, useState } from "react";

export const MAX_FILE_SIZE_MB = 5;

/**
 * Drop zone that only ever hands back a `.csv`.
 *
 * The extension is checked on top of the `accept` attribute because `accept`
 * is a filter, not a guarantee — drag and drop bypasses it entirely.
 *
 * @param onFile  Called with the accepted File.
 * @param onError Called with a dictionary key when the file is rejected.
 */
export function FileDrop({ onFile, onError, fileName }) {
	const { t } = useTranslation();
	const inputRef = useRef(null);
	const [dragging, setDragging] = useState(false);

	const accept = (file) => {
		if (!file) return;

		if (!isCsvFileName(file.name)) {
			onError("import.onlyCsv");
			return;
		}
		if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
			onError("import.tooLarge");
			return;
		}

		onFile(file);
	};

	return (
		<div
			onDragOver={(event) => {
				event.preventDefault();
				setDragging(true);
			}}
			onDragLeave={() => setDragging(false)}
			onDrop={(event) => {
				event.preventDefault();
				setDragging(false);
				accept(event.dataTransfer.files?.[0]);
			}}
			className={cn(
				"flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
				dragging ? "border-primary bg-accent/50" : "border-border",
			)}
		>
			{fileName ? (
				<FileSpreadsheet className="h-7 w-7 text-primary" />
			) : (
				<Upload className="h-7 w-7 text-muted-foreground" />
			)}

			<div className="space-y-0.5">
				<p className="text-xs font-medium">
					{fileName ?? t("import.dropTitle")}
				</p>
				<p className="text-[11px] text-muted-foreground">
					{t("import.dropHint", { size: MAX_FILE_SIZE_MB })}
				</p>
			</div>

			<input
				ref={inputRef}
				type="file"
				accept=".csv,text/csv"
				className="hidden"
				onChange={(event) => {
					accept(event.target.files?.[0]);
					// Let the same file be picked again after a reset.
					event.target.value = "";
				}}
			/>

			<Button variant="outline" onClick={() => inputRef.current?.click()}>
				{fileName ? t("import.replaceFile") : t("import.chooseFile")}
			</Button>
		</div>
	);
}
