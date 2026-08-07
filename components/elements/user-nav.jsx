"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function initialsOf(name) {
	if (!name) return "";
	return name
		.split(" ")
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

export function UserNav() {
	const { t } = useTranslation();
	const { data: session } = useSession();

	const CURRENT_USER = {
		name: session?.user?.name ?? "",
		email: session?.user?.email ?? "",
		initials: initialsOf(session?.user?.name),
		avatar: session?.user?.avatar,
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-transparent"
					aria-label={t("layout.myAccount")}
				>
					<Avatar className="h-7 w-7">
						<AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
						<AvatarFallback>{CURRENT_USER.initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end">
				<div className="flex items-center gap-2 p-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
						<AvatarFallback>{CURRENT_USER.initials}</AvatarFallback>
					</Avatar>
					<div className="flex min-w-0 flex-col">
						<p className="truncate text-xs font-medium">{CURRENT_USER.name}</p>
						<p className="truncate text-[11px] text-muted-foreground">
							{CURRENT_USER.email}
						</p>
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild className="gap-2">
					<Link href="/profile">
						<User />
						{t("nav.profile")}
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className="gap-2">
					<Link href="/settings">
						<Settings />
						{t("nav.settings")}
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="gap-2 text-destructive focus:text-destructive"
					onClick={() => signOut({ callbackUrl: "/login" })}
				>
					<LogOut />
					{t("layout.logout")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
