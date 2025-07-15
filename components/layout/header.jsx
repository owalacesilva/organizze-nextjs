"use client"

import { ModeToggle } from "@/components/elements/mode-toggle"
import { UserNav } from "@/components/elements/user-nav"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { UserNotification } from "../elements/user-notification"
// import UserNotification from "../elements/user-notification"

export function DashboardHeader() {
	return (
		<header className="container mx-auto fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:left-[82px]">
			<div className="flex h-[88px] items-center">
				<div className="flex flex-1 items-center justify-between">
					<div className="w-full max-w-md relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input type="search" placeholder="Search here..." className="w-full pl-9 pr-4 focus-visible:ring-0" />
					</div>
					<div className="flex items-center gap-3">
						<ModeToggle />
						<UserNotification />
						<UserNav />
					</div>
				</div>
			</div>
		</header>
	)
}

