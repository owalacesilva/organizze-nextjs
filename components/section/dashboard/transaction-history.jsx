"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useDashboardData } from "./use-dashboard-data";

const VISIBLE_ROWS = 6;

export function TransactionHistory() {
	const { t, formatCurrency, formatDate } = useTranslation();
	const { transactions } = useDashboardData();

	const rows = transactions.slice(0, VISIBLE_ROWS);

	return (
		<Card>
			<CardHeader className="flex-row items-center justify-between space-y-0">
				<CardTitle>{t("transactions.recent")}</CardTitle>
				<Button variant="link" size="xs" asChild>
					<Link href="/transactions">{t("common.viewAll")}</Link>
				</Button>
			</CardHeader>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead className="pl-3">
								{t("transactions.fields.description")}
							</TableHead>
							<TableHead>{t("transactions.fields.category")}</TableHead>
							<TableHead className="hidden sm:table-cell">
								{t("transactions.fields.date")}
							</TableHead>
							<TableHead className="pr-3 text-right">
								{t("transactions.fields.amount")}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="py-6 text-center text-muted-foreground"
								>
									{t("transactions.empty")}
								</TableCell>
							</TableRow>
						) : (
							rows.map((transaction) => (
								<TableRow key={transaction.id}>
									<TableCell className="max-w-[180px] truncate pl-3">
										{transaction.description}
									</TableCell>
									<TableCell>
										<Badge variant="outline">
											{transaction.categoryName || t("dashboard.uncategorized")}
										</Badge>
									</TableCell>
									<TableCell className="hidden sm:table-cell">
										{formatDate(transaction.date, { dateStyle: "short" })}
									</TableCell>
									<TableCell
										className={cn(
											"pr-3 text-right font-medium tabular-nums",
											transaction.amount < 0
												? "text-red-600 dark:text-red-400"
												: "text-emerald-600 dark:text-emerald-400",
										)}
									>
										{transaction.amount > 0 ? "+" : ""}
										{formatCurrency(transaction.amount)}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
