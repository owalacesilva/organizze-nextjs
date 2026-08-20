"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Crypto from "./crypto";
import Currencies from "./currencies";
import Fiis from "./fiis";
import Stocks from "./stocks";
import Treasury from "./treasury";

const TABS = [
	{ value: "stocks", Component: Stocks },
	{ value: "fiis", Component: Fiis },
	{ value: "treasury", Component: Treasury },
	{ value: "currencies", Component: Currencies },
	{ value: "crypto", Component: Crypto },
];

export default function QuotesSection() {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(TABS[0].value);
	const [view, setView] = useState("cards");

	const activeLabel = t(`quotes.tabs.${activeTab}`);

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
			<div className="mb-3 w-full md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-between"
							aria-label={t("quotes.menu")}
						>
							{activeLabel}
							<ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
						{TABS.map((tab) => (
							<DropdownMenuItem
								key={tab.value}
								onSelect={() => setActiveTab(tab.value)}
								className={cn(activeTab === tab.value && "bg-muted")}
							>
								{t(`quotes.tabs.${tab.value}`)}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="hidden overflow-x-auto md:block">
				<TabsList className="h-9 w-full justify-start bg-transparent p-0">
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="h-full border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
						>
							{t(`quotes.tabs.${tab.value}`)}
						</TabsTrigger>
					))}
				</TabsList>
			</div>

			{TABS.map(({ value, Component }) => (
				<TabsContent key={value} value={value} className="mt-3">
					<Component view={view} onViewChange={setView} />
				</TabsContent>
			))}
		</Tabs>
	);
}
