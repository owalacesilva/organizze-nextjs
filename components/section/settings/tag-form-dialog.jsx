"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

/** Swatches offered before falling back to the native colour picker. */
export const TAG_COLORS = [
	"#6366f1",
	"#0ea5e9",
	"#14b8a6",
	"#22c55e",
	"#f59e0b",
	"#ef4444",
	"#a855f7",
	"#64748b",
];

const EMPTY_FORM = { name: "", color: TAG_COLORS[0] };

function toFormState(tag) {
	if (!tag) return { ...EMPTY_FORM };
	return { name: tag.name ?? "", color: tag.color ?? TAG_COLORS[0] };
}

/**
 * Create/edit panel for a tag. Passing `tag` switches it to edit mode.
 * `existingNames` powers the duplicate check and excludes the tag being edited.
 */
export function TagFormDialog({
	open,
	onOpenChange,
	tag,
	existingNames = [],
	onSubmit,
	isSubmitting = false,
}) {
	const { t } = useTranslation();
	const [form, setForm] = useState(() => toFormState(tag));
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (open) {
			setForm(toFormState(tag));
			setErrors({});
		}
	}, [open, tag]);

	const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = async (event) => {
		event.preventDefault();

		const name = form.name.trim();
		const nextErrors = {};

		if (!name) {
			nextErrors.name = t("tags.validation.nameRequired");
		} else if (
			existingNames.some(
				(existing) => existing.toLowerCase() === name.toLowerCase(),
			)
		) {
			nextErrors.name = t("tags.validation.nameDuplicated");
		}

		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		await onSubmit({ name, color: form.color });
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent size="sm" closeLabel={t("common.close")}>
				<DialogHeader>
					<DialogTitle>{tag ? t("tags.edit") : t("tags.add")}</DialogTitle>
					<DialogDescription>{t("tags.subtitle")}</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} noValidate>
					<DialogBody>
						<div className="space-y-1">
							<Label htmlFor="tag-name">{t("tags.fields.name")}</Label>
							<Input
								id="tag-name"
								value={form.name}
								onChange={(event) => set("name")(event.target.value)}
								placeholder={t("tags.placeholders.name")}
								aria-invalid={Boolean(errors.name)}
								className={cn(errors.name && "border-destructive")}
							/>
							{errors.name && (
								<p className="text-[11px] text-destructive">{errors.name}</p>
							)}
						</div>

						<fieldset className="space-y-1">
							<legend className="text-xs font-medium leading-none">
								{t("tags.fields.color")}
							</legend>
							<div className="flex flex-wrap items-center gap-1.5 pt-1">
								{TAG_COLORS.map((color) => (
									<button
										key={color}
										type="button"
										onClick={() => set("color")(color)}
										aria-label={color}
										aria-pressed={form.color === color}
										style={{ backgroundColor: color }}
										className={cn(
											"h-6 w-6 rounded-full border-2 border-transparent transition-transform",
											form.color === color && "border-foreground",
										)}
									/>
								))}
								<Input
									type="color"
									value={form.color}
									onChange={(event) => set("color")(event.target.value)}
									aria-label={t("tags.fields.color")}
									className="h-6 w-10 cursor-pointer p-0.5"
								/>
							</div>
						</fieldset>

						<div className="space-y-1">
							<p className="text-xs font-medium">{t("tags.preview")}</p>
							<Badge
								className="border-transparent text-white"
								style={{ backgroundColor: form.color }}
							>
								{form.name.trim() || t("tags.placeholders.name")}
							</Badge>
						</div>
					</DialogBody>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							{t("common.cancel")}
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="animate-spin" />}
							{isSubmitting ? t("common.saving") : t("common.save")}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
