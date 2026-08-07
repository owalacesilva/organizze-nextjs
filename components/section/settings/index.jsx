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
import Account from "./account";
import AddBank from "./add-bank";
import Api from "./api";
import Categories from "./categories";
import Currencies from "./currencies";
import General from "./general";
import Profile from "./profile";
import Security from "./security";
import Session from "./session";
import Tags from "./tags";

/** `value` doubles as the dictionary key under `settings.tabs`. */
const TABS = [
	{ value: "account", Component: Account },
	{ value: "general", Component: General },
	{ value: "profile", Component: Profile },
	{ value: "addBank", Component: AddBank },
	{ value: "security", Component: Security },
	{ value: "session", Component: Session },
	{ value: "categories", Component: Categories },
	{ value: "currencies", Component: Currencies },
	{ value: "tags", Component: Tags },
	{ value: "api", Component: Api },
];

export default function SettingsSection() {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(TABS[0].value);

	const activeLabel = t(`settings.tabs.${activeTab}`);

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
			{/* Mobile: the tab strip collapses into a dropdown. */}
			<div className="mb-3 w-full md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-between"
							aria-label={t("settings.menu")}
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
								{t(`settings.tabs.${tab.value}`)}
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
							{t(`settings.tabs.${tab.value}`)}
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
