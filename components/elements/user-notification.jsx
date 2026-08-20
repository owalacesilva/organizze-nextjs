"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowLeftRight, Bell, PiggyBank, Target } from "lucide-react";
import { useState } from "react";

const SAMPLE_NOTIFICATIONS = [
	{ id: "1", key: "transactionCreated", icon: ArrowLeftRight, minutesAgo: 2 },
	{ id: "2", key: "budgetExceeded", icon: PiggyBank, minutesAgo: 55 },
	{ id: "3", key: "goalReached", icon: Target, minutesAgo: 180 },
	{ id: "4", key: "securityAlert", icon: AlertTriangle, minutesAgo: 320 },
];

function useRelativeTime() {
	const { t } = useTranslation();

	return (minutes) =>
		minutes < 60
			? t("notifications.minutesAgo", { count: minutes })
			: t("notifications.hoursAgo", { count: Math.round(minutes / 60) });
}

export function UserNotification() {
	const { t } = useTranslation();
	const relativeTime = useRelativeTime();
	const [readIds, setReadIds] = useState(() => new Set(["4"]));

	const unreadCount = SAMPLE_NOTIFICATIONS.filter(
		(notification) => !readIds.has(notification.id),
	).length;

	const markAsRead = (id) =>
		setReadIds((previous) => new Set(previous).add(id));

	const markAllRead = () =>
		setReadIds(new Set(SAMPLE_NOTIFICATIONS.map(({ id }) => id)));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative hover:bg-transparent"
					aria-label={t("layout.notifications")}
				>
					<Bell />
					{unreadCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center px-1 text-[9px]"
						>
							{unreadCount}
						</Badge>
					)}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-80">
				<DropdownMenuLabel className="flex items-center justify-between gap-2">
					{t("layout.notifications")}
					{unreadCount > 0 && (
						<Button variant="link" size="xs" onClick={markAllRead}>
							{t("layout.markAllRead")}
						</Button>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{SAMPLE_NOTIFICATIONS.length === 0 ? (
					<p className="p-3 text-center text-xs text-muted-foreground">
						{t("layout.notificationsEmpty")}
					</p>
				) : (
					<ScrollArea className="h-64">
						{SAMPLE_NOTIFICATIONS.map((notification) => {
							const isRead = readIds.has(notification.id);
							const Icon = notification.icon;

							return (
								<DropdownMenuItem
									key={notification.id}
									onSelect={() => markAsRead(notification.id)}
									className="items-start gap-2 py-2"
								>
									<Icon className="mt-0.5 shrink-0 text-muted-foreground" />
									<div className="flex-1 space-y-0.5">
										<p
											className={cn(
												"text-xs leading-tight",
												!isRead && "font-medium",
											)}
										>
											{t(`notifications.samples.${notification.key}.title`)}
										</p>
										<p className="text-[11px] text-muted-foreground">
											{t(
												`notifications.samples.${notification.key}.description`,
											)}
										</p>
										<p className="text-[10px] text-muted-foreground">
											{relativeTime(notification.minutesAgo)}
										</p>
									</div>
									{!isRead && (
										<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
									)}
								</DropdownMenuItem>
							);
						})}
					</ScrollArea>
				)}

				<DropdownMenuSeparator />
				<DropdownMenuItem className="justify-center text-muted-foreground">
					{t("notifications.viewAll")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
