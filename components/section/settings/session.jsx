import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, FileText, XCircle } from "lucide-react"

export default function Session() {
	const webSessions = [
		{
			id: 1,
			signedIn: "1 day ago",
			browser: "Chrome (Windows)",
			ipAddress: "250.364.239.254",
			location: "Bangladesh, Dhaka",
			current: true,
		},
		{
			id: 2,
			signedIn: "1 day ago",
			browser: "Chrome (Windows)",
			ipAddress: "250.364.239.254",
			location: "Bangladesh, Dhaka",
			current: true,
		},
		{
			id: 3,
			signedIn: "1 day ago",
			browser: "Chrome (Windows)",
			ipAddress: "250.364.239.254",
			location: "Bangladesh, Dhaka",
			current: true,
		},
	]

	const confirmedDevices = [
		{
			id: 1,
			confirmed: "1 day ago",
			browser: "Chrome (Windows)",
			ipAddress: "250.364.239.254",
			location: "Bangladesh, Dhaka",
			current: true,
		},
		{
			id: 2,
			confirmed: "8 days ago",
			browser: "Chrome (Windows)",
			ipAddress: "250.364.239.254",
			location: "Bangladesh, Dhaka",
			current: true,
		},
		{
			id: 3,
			confirmed: "15 days ago",
			browser: "Chrome (Windows)",
			ipAddress: "250.364.239.254",
			location: "Bangladesh, Dhaka",
			current: true,
		},
	]

	const accountActivity = [
		{
			id: 1,
			action: "verified second factor",
			source: "api",
			ipAddress: "157.119.239.254",
			location: "Bangladesh",
			when: "about 1 hour ago",
		},
		{
			id: 2,
			action: "verified second factor",
			source: "api",
			ipAddress: "157.119.239.254",
			location: "Bangladesh",
			when: "about 2 hours ago",
		},
		{
			id: 3,
			action: "device confirmation completed",
			source: "web",
			ipAddress: "157.119.239.214",
			location: "Bangladesh",
			when: "8 days ago",
		},
		{
			id: 4,
			action: "signin",
			source: "web",
			ipAddress: "157.119.239.214",
			location: "Bangladesh",
			when: "8 days ago",
		},
		{
			id: 5,
			action: "verified second factor",
			source: "web",
			ipAddress: "157.119.239.214",
			location: "Bangladesh",
			when: "8 days ago",
		},
		{
			id: 6,
			action: "signout",
			source: "api",
			ipAddress: "157.119.239.214",
			location: "Bangladesh",
			when: "15 days ago",
		},
		{
			id: 7,
			action: "verified second factor",
			source: "web",
			ipAddress: "157.119.239.214",
			location: "Bangladesh",
			when: "15 days ago",
		},
	]

	return (
		<div className="space-y-6">
			{/* Third-Party Applications */}
			<Card>
				<CardHeader>
					<CardTitle>Third-Party Applications</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-start gap-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
							<FileText className="h-5 w-5 text-amber-600" />
						</div>
						<div className="space-y-2">
							<p className="font-medium">You haven't authorized any applications yet.</p>
							<p className="text-sm text-muted-foreground">
								After connecting an application with your account, you can manage or revoke its access here.
							</p>
							<Button className="mt-2 bg-indigo-600 hover:bg-indigo-700">Authorize now</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Web Sessions */}
			<Card>
				<CardHeader>
					<CardTitle>Web Sessions</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Signed in</TableHead>
								<TableHead>Browser</TableHead>
								<TableHead>IP Address</TableHead>
								<TableHead>Near</TableHead>
								<TableHead>Current</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{webSessions.map((session) => (
								<TableRow key={session.id}>
									<TableCell className="text-sm">{session.signedIn}</TableCell>
									<TableCell className="text-sm">{session.browser}</TableCell>
									<TableCell className="text-sm">{session.ipAddress}</TableCell>
									<TableCell className="text-sm">{session.location}</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<CheckCircle className="h-4 w-4 text-green-500" />
											<XCircle className="h-4 w-4 text-red-500" />
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Confirmed Devices */}
			<Card>
				<CardHeader>
					<CardTitle>Confirmed Devices</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Confirmed</TableHead>
								<TableHead>Browser</TableHead>
								<TableHead>IP Address</TableHead>
								<TableHead>Near</TableHead>
								<TableHead>Current</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{confirmedDevices.map((device) => (
								<TableRow key={device.id}>
									<TableCell className="text-sm">{device.confirmed}</TableCell>
									<TableCell className="text-sm">{device.browser}</TableCell>
									<TableCell className="text-sm">{device.ipAddress}</TableCell>
									<TableCell className="text-sm">{device.location}</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<CheckCircle className="h-4 w-4 text-green-500" />
											<XCircle className="h-4 w-4 text-red-500" />
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Account Activity */}
			<Card>
				<CardHeader>
					<CardTitle>Account Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Action</TableHead>
								<TableHead>Source</TableHead>
								<TableHead>IP Address</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>When</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{accountActivity.map((activity) => (
								<TableRow key={activity.id}>
									<TableCell className="text-sm">{activity.action}</TableCell>
									<TableCell className="text-sm">{activity.source}</TableCell>
									<TableCell className="text-sm">{activity.ipAddress}</TableCell>
									<TableCell className="text-sm">
										<span className="text-blue-600 hover:underline cursor-pointer">{activity.location}</span>
									</TableCell>
									<TableCell className="text-sm">
										<span className="text-blue-600 hover:underline cursor-pointer">{activity.when}</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Close Account */}
			<Card>
				<CardHeader>
					<CardTitle>Close Account</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm mb-4">
						Withdraw funds and close your account - <span className="text-red-500">this cannot be undone</span>
					</p>
					<Button variant="destructive">Close Account</Button>
				</CardContent>
			</Card>
		</div>
	)
}

