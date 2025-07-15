"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, CreditCard, Mail, Phone, Upload, XCircle } from "lucide-react"
import { useState } from "react"

export default function Security() {
	const [addIdDialogOpen, setAddIdDialogOpen] = useState(false)
	const [addEmailDialogOpen, setAddEmailDialogOpen] = useState(false)
	const [addPhoneDialogOpen, setAddPhoneDialogOpen] = useState(false)

	return (
		<div className="space-y-6">
			<div className="grid gap-6 md:grid-cols-3">
				{/* Social Security Card */}
				<Card>
					<CardHeader>
						<CardTitle>Social Security Card</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="rounded-lg bg-primary p-4 flex items-center justify-center h-48">
							<div className="w-full space-y-4 px-4">
								<div className="h-4 bg-white rounded w-3/4"></div>
								<div className="h-4 bg-white rounded w-3/4"></div>
								<div className="h-4 bg-white rounded w-3/4"></div>
								<div className="h-4 bg-white rounded w-3/4"></div>
								<div className="absolute right-16 top-32 bg-white h-20 w-20 rounded-full"></div>
								<div className="absolute right-16 top-52 bg-white h-4 w-12 rounded"></div>
							</div>
						</div>

						<p className="font-medium text-lg">Carla Pascle</p>

						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
								<CreditCard className="h-5 w-5 text-primary" />
							</div>
							<div className="flex-1">
								<p className="font-medium">0024 5687 2254 3698</p>
								<div className="flex items-center text-green-600">
									<CheckCircle className="h-4 w-4 mr-1" />
									<span className="text-sm">Verified</span>
								</div>
							</div>
						</div>

						{/* Add New ID Dialog */}
						<Dialog open={addIdDialogOpen} onOpenChange={setAddIdDialogOpen}>
							<DialogTrigger asChild>
								<Button className="w-full">Add New ID</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add New ID</DialogTitle>
									<DialogDescription>Upload your identification document to verify your identity.</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="id-type">ID Type</Label>
										<Select>
											<SelectTrigger id="id-type">
												<SelectValue placeholder="Select ID type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="passport">Passport</SelectItem>
												<SelectItem value="driver">Driver's License</SelectItem>
												<SelectItem value="national">National ID Card</SelectItem>
												<SelectItem value="social">Social Security Card</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="id-number">ID Number</Label>
										<Input id="id-number" placeholder="Enter ID number" />
									</div>

									<div className="grid gap-2">
										<Label htmlFor="id-expiry">Expiry Date</Label>
										<Input id="id-expiry" type="date" />
									</div>

									<div className="grid gap-2">
										<Label>Upload ID Document</Label>
										<div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2">
											<Upload className="h-8 w-8 text-muted-foreground" />
											<p className="text-sm text-muted-foreground">Drag and drop your ID, or click to browse</p>
											<Input id="id-upload" type="file" className="hidden" />
											<Button variant="outline" size="sm" onClick={() => document.getElementById("id-upload")?.click()}>
												Choose File
											</Button>
											<p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF. Max size: 5MB</p>
										</div>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setAddIdDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setAddIdDialogOpen(false)}>Submit for Verification</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>

				{/* Email Verification */}
				<Card>
					<CardHeader>
						<CardTitle>Email Verification</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div key={`email-${i}`} className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
									<Mail className="h-5 w-5 text-primary" />
								</div>
								<div className="flex-1">
									<p className="font-medium">hello@example.com</p>
									<div className="flex items-center text-green-600">
										<CheckCircle className="h-4 w-4 mr-1" />
										<span className="text-sm">Verified</span>
									</div>
								</div>
							</div>
						))}

						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
								<Mail className="h-5 w-5 text-primary" />
							</div>
							<div className="flex-1">
								<p className="font-medium">hello@example.com</p>
								<div className="flex items-center text-destructive">
									<XCircle className="h-4 w-4 mr-1" />
									<span className="text-sm">Verification pending</span>
								</div>
							</div>
						</div>

						<Input placeholder="hello@example.com" />

						{/* Add New Email Dialog */}
						<Dialog open={addEmailDialogOpen} onOpenChange={setAddEmailDialogOpen}>
							<DialogTrigger asChild>
								<Button className="w-full">Add New Email</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add New Email</DialogTitle>
									<DialogDescription>
										Enter a new email address to add to your account. We'll send a verification code to confirm.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="new-email">Email Address</Label>
										<Input id="new-email" type="email" placeholder="Enter your email address" />
									</div>

									<div className="grid gap-2">
										<Label htmlFor="email-purpose">Purpose</Label>
										<Select>
											<SelectTrigger id="email-purpose">
												<SelectValue placeholder="Select purpose" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="primary">Primary Email</SelectItem>
												<SelectItem value="work">Work Email</SelectItem>
												<SelectItem value="personal">Personal Email</SelectItem>
												<SelectItem value="recovery">Recovery Email</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="grid gap-2">
										<div className="flex items-center justify-between">
											<Label htmlFor="verification-code">Verification Code</Label>
											<Button variant="link" size="sm" className="h-auto p-0">
												Send Code
											</Button>
										</div>
										<Input id="verification-code" placeholder="Enter verification code" />
										<p className="text-xs text-muted-foreground">Enter the 6-digit code sent to your email</p>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setAddEmailDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setAddEmailDialogOpen(false)}>Verify & Add Email</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>

				{/* Phone Verification */}
				<Card>
					<CardHeader>
						<CardTitle>Phone Verification</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div key={`phone-${i}`} className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
									<Phone className="h-5 w-5 text-primary" />
								</div>
								<div className="flex-1">
									<p className="font-medium">+1 135 468 45</p>
									<div className="flex items-center text-green-600">
										<CheckCircle className="h-4 w-4 mr-1" />
										<span className="text-sm">Verified</span>
									</div>
								</div>
							</div>
						))}

						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
								<Phone className="h-5 w-5 text-primary" />
							</div>
							<div className="flex-1">
								<p className="font-medium">+1 135 468 45</p>
								<div className="flex items-center text-destructive">
									<XCircle className="h-4 w-4 mr-1" />
									<span className="text-sm">Verification pending</span>
								</div>
							</div>
						</div>

						<Input placeholder="+1 135 468 45" />

						{/* Add New Phone Dialog */}
						<Dialog open={addPhoneDialogOpen} onOpenChange={setAddPhoneDialogOpen}>
							<DialogTrigger asChild>
								<Button className="w-full">Add New Phone</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add New Phone Number</DialogTitle>
									<DialogDescription>
										Enter a new phone number to add to your account. We'll send a verification code via SMS.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="country-code">Country</Label>
										<Select defaultValue="us">
											<SelectTrigger id="country-code">
												<SelectValue placeholder="Select country" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="us">United States (+1)</SelectItem>
												<SelectItem value="uk">United Kingdom (+44)</SelectItem>
												<SelectItem value="ca">Canada (+1)</SelectItem>
												<SelectItem value="au">Australia (+61)</SelectItem>
												<SelectItem value="in">India (+91)</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="new-phone">Phone Number</Label>
										<Input id="new-phone" placeholder="Enter your phone number" />
									</div>

									<div className="grid gap-2">
										<Label htmlFor="phone-purpose">Purpose</Label>
										<Select>
											<SelectTrigger id="phone-purpose">
												<SelectValue placeholder="Select purpose" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="primary">Primary Phone</SelectItem>
												<SelectItem value="work">Work Phone</SelectItem>
												<SelectItem value="home">Home Phone</SelectItem>
												<SelectItem value="mobile">Mobile Phone</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="grid gap-2">
										<div className="flex items-center justify-between">
											<Label htmlFor="sms-code">SMS Verification Code</Label>
											<Button variant="link" size="sm" className="h-auto p-0">
												Send Code
											</Button>
										</div>
										<Input id="sms-code" placeholder="Enter SMS code" />
										<p className="text-xs text-muted-foreground">Enter the 6-digit code sent to your phone</p>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setAddPhoneDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setAddPhoneDialogOpen(false)}>Verify & Add Phone</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>
			</div>

			{/* Password section from previous implementation */}
			<Card>
				<CardHeader>
					<CardTitle>Password Settings</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="current-password" className="text-sm font-medium">
							Current Password
						</label>
						<Input id="current-password" type="password" />
					</div>
					<div className="space-y-2">
						<label htmlFor="new-password" className="text-sm font-medium">
							New Password
						</label>
						<Input id="new-password" type="password" />
					</div>
					<div className="space-y-2">
						<label htmlFor="confirm-password" className="text-sm font-medium">
							Confirm New Password
						</label>
						<Input id="confirm-password" type="password" />
					</div>
					<Button>Update Password</Button>
				</CardContent>
			</Card>
		</div>
	)
}

