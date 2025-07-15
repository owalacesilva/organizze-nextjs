"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const recentInquiries = [
	{
		title: "Account verification process taking longer than expected",
		date: "15 May 2024",
	},
	{
		title: "Unable to update billing information",
		date: "3 May 2024",
	},
	{
		title: "Feature request: Dark mode for dashboard",
		date: "22 April 2024",
	},
]

function CreateTicketForm() {
	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="space-y-1 sm:space-y-2">
				<label className="text-xs sm:text-sm text-muted-foreground">What the type question do you want?</label>
				<Select>
					<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
						<SelectValue placeholder="Earning" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="earning">Earning</SelectItem>
						<SelectItem value="billing">Billing</SelectItem>
						<SelectItem value="technical">Technical</SelectItem>
						<SelectItem value="feature">Feature Request</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-1 sm:space-y-2">
				<label className="text-xs sm:text-sm text-muted-foreground">Employe Respond</label>
				<Select>
					<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
						<SelectValue placeholder="Earning" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="earning">Earning</SelectItem>
						<SelectItem value="support">Support Team</SelectItem>
						<SelectItem value="technical">Technical Team</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-1 sm:space-y-2">
				<label className="text-xs sm:text-sm text-muted-foreground">What language do you prefer to be answered?</label>
				<Select>
					<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
						<SelectValue placeholder="Earning" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="english">English</SelectItem>
						<SelectItem value="spanish">Spanish</SelectItem>
						<SelectItem value="french">French</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-1 sm:space-y-2">
				<label className="text-xs sm:text-sm text-muted-foreground">
					Please provide a description of the problem you are encountering
				</label>
				<Textarea className="min-h-[120px] sm:min-h-[150px] text-xs sm:text-sm" placeholder="Type your message here." />
			</div>

			<Button className="w-full h-8 sm:h-10 text-xs sm:text-sm">Create</Button>
		</div>
	)
}

export function Support() {
	return (
		<div className="space-y-4 sm:space-y-6">
			<Card>
				<CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Active Support Tickets</CardTitle>
					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm">Open New Ticket</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px] p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto">
							<DialogHeader>
								<DialogTitle className="text-base sm:text-lg">Create Ticket</DialogTitle>
							</DialogHeader>
							<CreateTicketForm />
						</DialogContent>
					</Dialog>
				</CardHeader>
				<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
					<p className="text-xs sm:text-sm text-muted-foreground">
						No active support tickets. Need assistance?{" "}
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="link" className="p-0 h-auto text-xs sm:text-sm">
									Create a new ticket
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[500px] p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto">
								<DialogHeader>
									<DialogTitle className="text-base sm:text-lg">Create Ticket</DialogTitle>
								</DialogHeader>
								<CreateTicketForm />
							</DialogContent>
						</Dialog>{" "}
						to get help from our support team.
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Support Notifications</CardTitle>
					<Button variant="link" className="text-xs sm:text-sm p-0 h-auto justify-start sm:justify-center">
						Dismiss All
					</Button>
				</CardHeader>
				<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
					<p className="text-xs sm:text-sm text-muted-foreground">
						You&apos;re all caught up! No new notifications at this time.
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="p-4 sm:p-6">
					<CardTitle className="text-base sm:text-lg">Recent Support Inquiries</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{recentInquiries.map((inquiry, index) => (
						<div
							key={inquiry.title}
							className={cn(
								"flex items-center justify-between p-3 sm:p-4 hover:bg-muted/50 cursor-pointer",
								index !== recentInquiries.length - 1 && "border-b",
							)}
						>
							<div className="space-y-0.5 sm:space-y-1 pr-2">
								<p className="text-xs sm:text-sm font-medium line-clamp-2">{inquiry.title}</p>
								<p className="text-[10px] sm:text-xs text-muted-foreground">Submitted on {inquiry.date}</p>
							</div>
							<ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	)
}

