"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function General() {
	const [currency, setCurrency] = useState("USD")
	const [timeZone, setTimeZone] = useState("(GMT-12:00) International Date Line West")
	const [notifications, setNotifications] = useState({
		digitalCurrency: true,
		merchantOrder: false,
		recommendations: false,
	})

	const handleNotificationChange = (key) => {
		setNotifications({
			...notifications,
			[key]: !notifications[key],
		})
	}

	return (
		<div className="space-y-6">
			{/* Preferences Section */}
			<Card>
				<CardHeader>
					<CardTitle>Preferences</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label>Primary Currency</Label>
							<Select value={currency} onValueChange={setCurrency}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select currency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="USD">USD</SelectItem>
									<SelectItem value="EUR">EUR</SelectItem>
									<SelectItem value="GBP">GBP</SelectItem>
									<SelectItem value="JPY">JPY</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label>Time Zone</Label>
							<Select value={timeZone} onValueChange={setTimeZone}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select time zone" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="(GMT-12:00) International Date Line West">
										(GMT-12:00) International Date Line West
									</SelectItem>
									<SelectItem value="(GMT-11:00) Midway Island, Samoa">(GMT-11:00) Midway Island, Samoa</SelectItem>
									<SelectItem value="(GMT-10:00) Hawaii">(GMT-10:00) Hawaii</SelectItem>
									<SelectItem value="(GMT-09:00) Alaska">(GMT-09:00) Alaska</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button>Save</Button>
				</CardFooter>
			</Card>

			{/* Notifications Section */}
			<Card>
				<CardHeader>
					<CardTitle>Notifications</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<Label htmlFor="digital-currency" className="text-muted-foreground">
								I send or receive digital currency
							</Label>
							<Switch
								id="digital-currency"
								checked={notifications.digitalCurrency}
								onCheckedChange={() => handleNotificationChange("digitalCurrency")}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="merchant-order" className="text-muted-foreground">
								I receive merchant order
							</Label>
							<Switch
								id="merchant-order"
								checked={notifications.merchantOrder}
								onCheckedChange={() => handleNotificationChange("merchantOrder")}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="recommendations" className="text-muted-foreground">
								There are recommendation for my account
							</Label>
							<Switch
								id="recommendations"
								checked={notifications.recommendations}
								onCheckedChange={() => handleNotificationChange("recommendations")}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button>Save</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

