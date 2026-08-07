"use client";

import { FilterField, FilterPanel } from "@/components/elements/filter-panel";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { PERIOD_DAYS, countActiveFilters } from "@/lib/transactions";

const PERIOD_OPTIONS = ["all", ...Object.keys(PERIOD_DAYS)];
const TYPE_OPTIONS = ["all", "income", "expense"];

export function TransactionFilters({
	filters,
	onChange,
	onClear,
	categories = [],
}) {
	const { t } = useTranslation();
	const set = (key) => (value) => onChange({ ...filters, [key]: value });

	return (
		<FilterPanel activeCount={countActiveFilters(filters)} onClear={onClear}>
			<FilterField label={t("transactions.fields.type")} htmlFor="filter-type">
				<Select value={filters.type} onValueChange={set("type")}>
					<SelectTrigger id="filter-type">
						<SelectValue placeholder={t("transactions.placeholders.selectType")} />
					</SelectTrigger>
					<SelectContent>
						{TYPE_OPTIONS.map((option) => (
							<SelectItem key={option} value={option}>
								{t(`transactions.types.${option}`)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FilterField>

			<FilterField
				label={t("transactions.periods.label")}
				htmlFor="filter-period"
			>
				<Select value={filters.period} onValueChange={set("period")}>
					<SelectTrigger id="filter-period">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{PERIOD_OPTIONS.map((option) => (
							<SelectItem key={option} value={option}>
								{t(`transactions.periods.${option}`)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FilterField>

			<FilterField
				label={t("transactions.fields.category")}
				htmlFor="filter-category"
			>
				<Select value={filters.categoryId} onValueChange={set("categoryId")}>
					<SelectTrigger id="filter-category">
						<SelectValue
							placeholder={t("transactions.placeholders.selectCategory")}
						/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">{t("common.all")}</SelectItem>
						{categories.map((category) => (
							<SelectItem key={category.id} value={String(category.id)}>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FilterField>

			<div className="grid grid-cols-2 gap-2">
				<FilterField
					label={t("transactions.amountRange.min")}
					htmlFor="filter-min-amount"
				>
					<Input
						id="filter-min-amount"
						type="number"
						min="0"
						step="0.01"
						inputMode="decimal"
						value={filters.minAmount}
						onChange={(event) => set("minAmount")(event.target.value)}
						placeholder="0"
					/>
				</FilterField>
				<FilterField
					label={t("transactions.amountRange.max")}
					htmlFor="filter-max-amount"
				>
					<Input
						id="filter-max-amount"
						type="number"
						min="0"
						step="0.01"
						inputMode="decimal"
						value={filters.maxAmount}
						onChange={(event) => set("maxAmount")(event.target.value)}
						placeholder="—"
					/>
				</FilterField>
			</div>
		</FilterPanel>
	);
}
