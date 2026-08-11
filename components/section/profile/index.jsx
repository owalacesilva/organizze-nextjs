"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";
import { Profile } from "./profile";
import { TrophyRoom } from "./trophy-room";

/** `value` doubles as the dictionary key under `profile.tabs`. */
const TABS = [
	{ value: "overview", Component: Profile },
	{ value: "trophyRoom", Component: TrophyRoom },
];

export default function ProfileSection() {
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
							{t(`profile.tabs.${tab.value}`)}
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
