"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function UserNotification() {
	const [notifications, setNotifications] = useState([
		{
			id: "1",
			title: "New message from Alice",
			description: "Hey, I just sent you some ETH. Did you receive it?",
			timestamp: "2 min ago",
			image: "/images/avatar/1.jpg?height=40&width=40",
			read: false,
		},
		{
			id: "2",
			title: "Transaction completed",
			description: "Your transfer of 0.5 ETH to Bob has been confirmed.",
			timestamp: "1 hour ago",
			image: "/images/avatar/2.jpg?height=40&width=40",
			read: false,
		},
		{
			id: "3",
			title: "Security alert",
			description: "Unusual activity detected on your account. Please verify.",
			timestamp: "3 hours ago",
			image: "/images/avatar/3.jpg?height=40&width=40",
			read: false,
		},
		{
			id: "4",
			title: "Price alert: ETH",
			description: "Ethereum has increased by 5% in the last 24 hours.",
			timestamp: "5 hours ago",
			image: "/images/avatar/4.jpg?height=40&width=40",
			read: true,
		},
	])

	const unreadCount = notifications.filter((n) => !n.read).length

	const markAsRead = (id) => {
		setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative hover:bg-transparent">
					<Bell className="h-4 w-4" />
					{unreadCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
						>
							{unreadCount}
						</Badge>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-80">
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ScrollArea className="h-[300px]">
					{notifications.map((notification) => (
						<DropdownMenuItem key={notification.id} onSelect={() => markAsRead(notification.id)}>
							<div className="flex items-start space-x-4 p-2">
								<Image
									src={notification.image || "/images/avatar/5.jpg"}
									alt=""
									width={40}
									height={40}
									className="rounded-full"
								/>
								<div className="flex-1 space-y-1">
									<p className="text-sm font-medium leading-none">{notification.title}</p>
									<p className="text-sm text-muted-foreground">{notification.description}</p>
									<p className="text-xs text-muted-foreground">{notification.timestamp}</p>
								</div>
								{!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
							</div>
						</DropdownMenuItem>
					))}
				</ScrollArea>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-center text-sm text-muted-foreground cursor-pointer">
					View all notifications
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

