"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import { Analytics } from "./analytics";
import { Balance } from "./balance";
import { Expenses } from "./expenses";
import { Income } from "./income";
import { IncomeVsExpenses } from "./income-vs-expenes";
import { TransactionHistory } from "./transaction-history";

const TABS = [
	{ value: "overview", Component: Analytics },
	{ value: "expenses", Component: Expenses },
	{ value: "income", Component: Income },
	{ value: "incomeVsExpenses", Component: IncomeVsExpenses },
	{ value: "balance", Component: Balance },
	{ value: "history", Component: TransactionHistory },
];

export default function AnalyticsSection() {
	const { t } = useTranslation();

	return (
		<Tabs defaultValue={TABS[0].value} className="w-full">
			<div className="overflow-x-auto">
				<TabsList className="h-9 w-full justify-start bg-transparent p-0">
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
						>
							{t(`analytics.tabs.${tab.value}`)}
						</TabsTrigger>
					))}
				</TabsList>
			</div>

			{TABS.map(({ value, Component }) => (
				<TabsContent key={value} value={value} className="mt-3">
					<Component />
				</TabsContent>
			))}
		</Tabs>
	);
}
