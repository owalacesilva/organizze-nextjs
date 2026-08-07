"use client";

import {
	useCreateCategory,
	useDeleteCategory,
	useGetCategories,
	useUpdateCategory,
} from "@/app/api/categories/hooks";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
	Banknote,
	Briefcase,
	Building,
	Bus,
	Car,
	DollarSign,
	Dumbbell,
	FileQuestion,
	FileText,
	Film,
	Gift,
	GraduationCap,
	Heart,
	Home,
	Loader2,
	Pencil,
	Plane,
	ShoppingBag,
	ShoppingCart,
	Sparkles,
	Trash2,
	Umbrella,
	Users,
	Utensils,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TAG_COLORS } from "./tag-form-dialog";

const ICONS = {
	sparkles: Sparkles,
	file: FileText,
	car: Car,
	education: GraduationCap,
	entertainment: Film,
	family: Users,
	food: Utensils,
	salary: DollarSign,
	groceries: ShoppingBag,
	healthcare: Heart,
	home: Home,
	shopping: ShoppingCart,
	sports: Dumbbell,
	hobbies: Briefcase,
	travel: Plane,
	transport: Bus,
	work: Briefcase,
	business: Building,
	gifts: Gift,
	insurance: Umbrella,
	loan: Banknote,
	other: FileQuestion,
};

const ICON_NAMES = Object.keys(ICONS);

/**
 * Categories carry no icon of their own, so one is inferred from the name.
 * Keywords are listed in both languages the app ships with.
 */
const NAME_TO_ICON = [
	[["beleza", "beauty"], "sparkles"],
	[["conta", "bill", "fatura", "document"], "file"],
	[["carro", "car", "veíc", "veic"], "car"],
	[["educa", "curso", "education", "school"], "education"],
	[["lazer", "entertain", "cinema", "streaming"], "entertainment"],
	[["família", "familia", "family"], "family"],
	[["aliment", "food", "restaurante", "delivery"], "food"],
	[["salário", "salario", "salary", "renda"], "salary"],
	[["mercado", "grocer", "supermerc"], "groceries"],
	[["saúde", "saude", "health", "farm"], "healthcare"],
	[["moradia", "casa", "home", "aluguel", "rent"], "home"],
	[["compras", "shopping"], "shopping"],
	[["esporte", "sport", "academia", "gym"], "sports"],
	[["hobby", "hobbies"], "hobbies"],
	[["viagem", "travel", "trip"], "travel"],
	[["transporte", "transport", "uber", "combust"], "transport"],
	[["trabalho", "work", "freela"], "work"],
	[["negócio", "negocio", "business"], "business"],
	[["presente", "gift"], "gifts"],
	[["seguro", "insurance"], "insurance"],
	[["empréstimo", "emprestimo", "loan"], "loan"],
	[["investimento", "invest", "dividendo"], "salary"],
];

function iconNameFor(name = "") {
	const lower = name.toLowerCase();
	for (const [keywords, icon] of NAME_TO_ICON) {
		if (keywords.some((keyword) => lower.includes(keyword))) return icon;
	}
	return "other";
}

function CategoryIcon({ name, iconName, color, className }) {
	const Icon = ICONS[iconName ?? iconNameFor(name)] ?? FileQuestion;

	return (
		<span
			className={cn(
				"flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white",
				className,
			)}
			style={{ backgroundColor: color || TAG_COLORS[0] }}
		>
			<Icon className="h-3.5 w-3.5" />
		</span>
	);
}

function ListSkeleton() {
	return (
		<div className="space-y-1">
			{Array.from({ length: 4 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length placeholder
				<div key={index} className="flex items-center gap-2 py-2">
					<Skeleton className="h-7 w-7 shrink-0" />
					<Skeleton className="h-3 w-32" />
					<Skeleton className="ml-auto h-7 w-16" />
				</div>
			))}
		</div>
	);
}

const EMPTY_FORM = { name: "", type: "expenses", color: TAG_COLORS[0] };

export default function Categories() {
	const { t } = useTranslation();

	const categoriesQuery = useGetCategories();
	const createMutation = useCreateCategory();
	const updateMutation = useUpdateCategory();
	const deleteMutation = useDeleteCategory();

	const [form, setForm] = useState(EMPTY_FORM);
	const [editing, setEditing] = useState(null);
	const [editForm, setEditForm] = useState(EMPTY_FORM);
	const [pendingDelete, setPendingDelete] = useState(null);

	const categories = categoriesQuery.data?.categories ?? [];
	const income = categories.filter((category) => category.type === "earnings");
	const expenses = categories.filter((category) => category.type === "expenses");

	const handleCreate = async () => {
		if (!form.name.trim()) {
			toast.error(t("categories.validation.nameRequired"));
			return;
		}

		try {
			await createMutation.mutateAsync({
				name: form.name.trim(),
				description: "",
				type: form.type,
				color: form.color,
			});
			toast.success(t("categories.created"));
			setForm(EMPTY_FORM);
		} catch (error) {
			toast.error(t("categories.saveError"), { description: error.message });
		}
	};

	const handleUpdate = async () => {
		if (!editing) return;

		if (!editForm.name.trim()) {
			toast.error(t("categories.validation.nameRequired"));
			return;
		}

		try {
			await updateMutation.mutateAsync({
				id: editing.id,
				data: {
					name: editForm.name.trim(),
					type: editForm.type,
					color: editForm.color,
				},
			});
			toast.success(t("categories.updated"));
			setEditing(null);
		} catch (error) {
			toast.error(t("categories.saveError"), { description: error.message });
		}
	};

	const handleDelete = async () => {
		const target = pendingDelete;
		if (!target) return;

		try {
			await deleteMutation.mutateAsync(target.id);
			toast.success(t("categories.deleted"));
		} catch (error) {
			toast.error(t("categories.deleteError"), { description: error.message });
		} finally {
			setPendingDelete(null);
		}
	};

	const openEdit = (category) => {
		setEditing(category);
		setEditForm({
			name: category.name,
			type: category.type,
			color: category.color ?? TAG_COLORS[0],
		});
	};

	const list = (rows, emptyKey) => {
		if (categoriesQuery.isPending) return <ListSkeleton />;
		if (rows.length === 0) {
			return (
				<p className="py-4 text-center text-xs text-muted-foreground">
					{t(emptyKey)}
				</p>
			);
		}

		return (
			<ul className="divide-y">
				{rows.map((category) => (
					<li key={category.id} className="flex items-center gap-2 py-1.5">
						<CategoryIcon name={category.name} color={category.color} />
						<span className="truncate text-xs">{category.name}</span>
						<span className="ml-auto flex items-center gap-1">
							<Button
								variant="ghost"
								size="icon-sm"
								aria-label={`${t("common.edit")} ${category.name}`}
								onClick={() => openEdit(category)}
							>
								<Pencil />
							</Button>
							<Button
								variant="ghost"
								size="icon-sm"
								className="text-destructive hover:text-destructive"
								aria-label={`${t("common.delete")} ${category.name}`}
								onClick={() => setPendingDelete(category)}
							>
								<Trash2 />
							</Button>
						</span>
					</li>
				))}
			</ul>
		);
	};

	const colorSwatches = (value, onChange) => (
		<div className="flex flex-wrap items-center gap-1.5 pt-1">
			{TAG_COLORS.map((color) => (
				<button
					key={color}
					type="button"
					onClick={() => onChange(color)}
					aria-label={color}
					aria-pressed={value === color}
					style={{ backgroundColor: color }}
					className={cn(
						"h-6 w-6 rounded-full border-2 border-transparent",
						value === color && "border-foreground",
					)}
				/>
			))}
		</div>
	);

	return (
		<div className="space-y-3">
			<div className="grid gap-3 md:grid-cols-3">
				<Card className="h-fit">
					<CardHeader>
						<CardTitle>{t("settings.categories.createTitle")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="space-y-1">
							<Label htmlFor="category-name">
								{t("categories.fields.name")}
							</Label>
							<Input
								id="category-name"
								value={form.name}
								onChange={(event) =>
									setForm({ ...form, name: event.target.value })
								}
								placeholder={t("categories.placeholders.name")}
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="category-type">
								{t("categories.fields.type")}
							</Label>
							<Select
								value={form.type}
								onValueChange={(value) => setForm({ ...form, type: value })}
							>
								<SelectTrigger id="category-type">
									<SelectValue
										placeholder={t("categories.placeholders.selectType")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="expenses">
										{t("categories.types.expenses")}
									</SelectItem>
									<SelectItem value="earnings">
										{t("categories.types.earnings")}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<fieldset className="space-y-1">
							<legend className="text-xs font-medium">
								{t("categories.fields.color")}
							</legend>
							{colorSwatches(form.color, (color) =>
								setForm({ ...form, color }),
							)}
						</fieldset>

						<div className="flex items-center gap-2">
							<CategoryIcon name={form.name} color={form.color} />
							<span className="text-[11px] text-muted-foreground">
								{t("settings.categories.preview")}
							</span>
						</div>

						<Button
							className="w-full"
							onClick={handleCreate}
							disabled={createMutation.isPending}
						>
							{createMutation.isPending && <Loader2 className="animate-spin" />}
							{createMutation.isPending
								? t("common.saving")
								: t("categories.add")}
						</Button>
					</CardContent>
				</Card>

				<div className="space-y-3 md:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>{t("settings.categories.incomeTitle")}</CardTitle>
						</CardHeader>
						<CardContent>
							{list(income, "settings.categories.emptyIncome")}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>{t("settings.categories.expenseTitle")}</CardTitle>
						</CardHeader>
						<CardContent>
							{list(expenses, "settings.categories.emptyExpense")}
						</CardContent>
					</Card>
				</div>
			</div>

			<Dialog
				open={Boolean(editing)}
				onOpenChange={(open) => !open && setEditing(null)}
			>
				<DialogContent size="sm" closeLabel={t("common.close")}>
					<DialogHeader>
						<DialogTitle>{t("categories.edit")}</DialogTitle>
						<DialogDescription>{t("categories.subtitle")}</DialogDescription>
					</DialogHeader>

					<DialogBody>
						<div className="space-y-1">
							<Label htmlFor="edit-category-name">
								{t("categories.fields.name")}
							</Label>
							<Input
								id="edit-category-name"
								value={editForm.name}
								onChange={(event) =>
									setEditForm({ ...editForm, name: event.target.value })
								}
							/>
						</div>

						<div className="space-y-1">
							<Label htmlFor="edit-category-type">
								{t("categories.fields.type")}
							</Label>
							<Select
								value={editForm.type}
								onValueChange={(value) =>
									setEditForm({ ...editForm, type: value })
								}
							>
								<SelectTrigger id="edit-category-type">
									<SelectValue
										placeholder={t("categories.placeholders.selectType")}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="expenses">
										{t("categories.types.expenses")}
									</SelectItem>
									<SelectItem value="earnings">
										{t("categories.types.earnings")}
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<fieldset className="space-y-1">
							<legend className="text-xs font-medium">
								{t("categories.fields.color")}
							</legend>
							{colorSwatches(editForm.color, (color) =>
								setEditForm({ ...editForm, color }),
							)}
						</fieldset>

						<div className="flex items-center gap-2">
							<CategoryIcon name={editForm.name} color={editForm.color} />
							<span className="text-[11px] text-muted-foreground">
								{t("settings.categories.preview")}
							</span>
						</div>
					</DialogBody>

					<DialogFooter>
						<Button variant="outline" onClick={() => setEditing(null)}>
							{t("common.cancel")}
						</Button>
						<Button onClick={handleUpdate} disabled={updateMutation.isPending}>
							{updateMutation.isPending && <Loader2 className="animate-spin" />}
							{updateMutation.isPending ? t("common.saving") : t("common.save")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog
				open={Boolean(pendingDelete)}
				onOpenChange={(open) => !open && setPendingDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t("categories.deleteConfirmTitle")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t("categories.deleteConfirmDescription", {
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
