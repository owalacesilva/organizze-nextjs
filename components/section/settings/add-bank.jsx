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
import { Switch } from "@/components/ui/switch"
import { Building, CreditCard, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

export default function AddBank() {
	const [bankDialogOpen, setBankDialogOpen] = useState(false)
	const [cardDialogOpen, setCardDialogOpen] = useState(false)
	const [manageBankDialogOpen, setManageBankDialogOpen] = useState(false)
	const [manageCardDialogOpen, setManageCardDialogOpen] = useState(false)
	const [editBankDialogOpen, setEditBankDialogOpen] = useState(false)
	const [editCardDialogOpen, setEditCardDialogOpen] = useState(false)

	// Function to handle opening the edit bank dialog
	const handleEditBankClick = () => {
		setManageBankDialogOpen(false) // Close the manage dialog
		setEditBankDialogOpen(true) // Open the edit dialog
	}

	// Function to handle opening the edit card dialog
	const handleEditCardClick = () => {
		setManageCardDialogOpen(false) // Close the manage dialog
		setEditCardDialogOpen(true) // Open the edit dialog
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Add Bank Account or Card</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Bank of America */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<Building className="h-6 w-6" />
							</div>
							<div>
								<p className="font-medium">Bank of America</p>
								<p className="text-sm text-muted-foreground">Bank **************5421</p>
								<p className="text-xs text-green-600 font-medium">Verified</p>
							</div>
						</div>

						{/* Manage Bank Dialog */}
						<Dialog open={manageBankDialogOpen} onOpenChange={setManageBankDialogOpen}>
							<DialogTrigger asChild>
								<Button variant="outline" size="sm">
									Manage
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Manage Bank Account</DialogTitle>
									<DialogDescription>Bank of America - Account ending in 5421</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="flex items-center justify-between">
										<Label htmlFor="default-bank">Set as default payment method</Label>
										<Switch id="default-bank" />
									</div>

									<div className="grid gap-2">
										<Label htmlFor="bank-nickname">Account Nickname</Label>
										<Input id="bank-nickname" defaultValue="Bank of America" />
									</div>

									<div className="flex items-center gap-2 mt-2">
										<Button
											variant="outline"
											size="sm"
											className="flex items-center gap-1"
											onClick={handleEditBankClick}
										>
											<Pencil className="h-4 w-4" />
											Edit Details
										</Button>
										<Button variant="destructive" size="sm" className="flex items-center gap-1">
											<Trash2 className="h-4 w-4" />
											Remove Account
										</Button>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setManageBankDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setManageBankDialogOpen(false)}>Save Changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						{/* Edit Bank Details Dialog */}
						<Dialog open={editBankDialogOpen} onOpenChange={setEditBankDialogOpen}>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Edit Bank Account Details</DialogTitle>
									<DialogDescription>Update your bank account information below.</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="edit-bank-name">Bank Name</Label>
										<Input id="edit-bank-name" defaultValue="Bank of America" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="edit-account-number">Account Number</Label>
										<Input id="edit-account-number" defaultValue="••••••••••••5421" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="edit-routing-number">Routing Number</Label>
										<Input id="edit-routing-number" defaultValue="••••••••" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="edit-account-type">Account Type</Label>
										<Select defaultValue="checking">
											<SelectTrigger id="edit-account-type">
												<SelectValue placeholder="Select account type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="checking">Checking</SelectItem>
												<SelectItem value="savings">Savings</SelectItem>
												<SelectItem value="business">Business</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="edit-account-holder">Account Holder Name</Label>
										<Input id="edit-account-holder" defaultValue="John Doe" />
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setEditBankDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setEditBankDialogOpen(false)}>Save Changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					{/* Master Card */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<CreditCard className="h-6 w-6" />
							</div>
							<div>
								<p className="font-medium">Master Card</p>
								<p className="text-sm text-muted-foreground">Credit Card **********5478</p>
								<p className="text-xs text-green-600 font-medium">Verified</p>
							</div>
						</div>

						{/* Manage Card Dialog */}
						<Dialog open={manageCardDialogOpen} onOpenChange={setManageCardDialogOpen}>
							<DialogTrigger asChild>
								<Button variant="outline" size="sm">
									Manage
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Manage Credit Card</DialogTitle>
									<DialogDescription>Master Card - Card ending in 5478</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="flex items-center justify-between">
										<Label htmlFor="default-card">Set as default payment method</Label>
										<Switch id="default-card" defaultChecked />
									</div>

									<div className="grid gap-2">
										<Label htmlFor="card-nickname">Card Nickname</Label>
										<Input id="card-nickname" defaultValue="Master Card" />
									</div>

									<div className="grid gap-2">
										<Label htmlFor="billing-address">Billing Address</Label>
										<Select defaultValue="home">
											<SelectTrigger id="billing-address">
												<SelectValue placeholder="Select billing address" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="home">Home Address</SelectItem>
												<SelectItem value="work">Work Address</SelectItem>
												<SelectItem value="other">Other Address</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="flex items-center gap-2 mt-2">
										<Button
											variant="outline"
											size="sm"
											className="flex items-center gap-1"
											onClick={handleEditCardClick}
										>
											<Pencil className="h-4 w-4" />
											Edit Card Details
										</Button>
										<Button variant="destructive" size="sm" className="flex items-center gap-1">
											<Trash2 className="h-4 w-4" />
											Remove Card
										</Button>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setManageCardDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setManageCardDialogOpen(false)}>Save Changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						{/* Edit Card Details Dialog */}
						<Dialog open={editCardDialogOpen} onOpenChange={setEditCardDialogOpen}>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Edit Card Details</DialogTitle>
									<DialogDescription>Update your credit card information below.</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="edit-card-name">Name on Card</Label>
										<Input id="edit-card-name" defaultValue="John Doe" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="edit-card-number">Card Number</Label>
										<Input id="edit-card-number" defaultValue="•••• •••• •••• 5478" readOnly />
										<p className="text-xs text-muted-foreground">
											For security reasons, you cannot edit the card number. Please add a new card instead.
										</p>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label htmlFor="edit-expiry-date">Expiry Date</Label>
											<Input id="edit-expiry-date" defaultValue="09/25" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="edit-cvv">CVV</Label>
											<Input id="edit-cvv" defaultValue="•••" />
										</div>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="edit-card-type">Card Type</Label>
										<Select defaultValue="mastercard">
											<SelectTrigger id="edit-card-type">
												<SelectValue placeholder="Select card type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="visa">Visa</SelectItem>
												<SelectItem value="mastercard">Mastercard</SelectItem>
												<SelectItem value="amex">American Express</SelectItem>
												<SelectItem value="discover">Discover</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="edit-billing-address">Billing Address</Label>
										<Select defaultValue="home">
											<SelectTrigger id="edit-billing-address">
												<SelectValue placeholder="Select billing address" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="home">Home Address</SelectItem>
												<SelectItem value="work">Work Address</SelectItem>
												<SelectItem value="other">Other Address</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setEditCardDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setEditCardDialogOpen(false)}>Save Changes</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<div className="flex gap-4 pt-4">
						{/* Add New Bank Dialog */}
						<Dialog open={bankDialogOpen} onOpenChange={setBankDialogOpen}>
							<DialogTrigger asChild>
								<Button>Add New Bank</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add New Bank Account</DialogTitle>
									<DialogDescription>Enter your bank account details below to connect your account.</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="bank-name">Bank Name</Label>
										<Input id="bank-name" placeholder="Enter bank name" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="account-number">Account Number</Label>
										<Input id="account-number" placeholder="Enter account number" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="routing-number">Routing Number</Label>
										<Input id="routing-number" placeholder="Enter routing number" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="account-type">Account Type</Label>
										<Select>
											<SelectTrigger id="account-type">
												<SelectValue placeholder="Select account type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="checking">Checking</SelectItem>
												<SelectItem value="savings">Savings</SelectItem>
												<SelectItem value="business">Business</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setBankDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setBankDialogOpen(false)}>Add Bank Account</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						{/* Add New Card Dialog */}
						<Dialog open={cardDialogOpen} onOpenChange={setCardDialogOpen}>
							<DialogTrigger asChild>
								<Button>Add New Card</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add New Card</DialogTitle>
									<DialogDescription>Enter your card details below to add a new payment method.</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="card-name">Name on Card</Label>
										<Input id="card-name" placeholder="Enter name on card" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="card-number">Card Number</Label>
										<Input id="card-number" placeholder="Enter card number" />
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-2">
											<Label htmlFor="expiry-date">Expiry Date</Label>
											<Input id="expiry-date" placeholder="MM/YY" />
										</div>
										<div className="grid gap-2">
											<Label htmlFor="cvv">CVV</Label>
											<Input id="cvv" placeholder="CVV" />
										</div>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="card-type">Card Type</Label>
										<Select>
											<SelectTrigger id="card-type">
												<SelectValue placeholder="Select card type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="visa">Visa</SelectItem>
												<SelectItem value="mastercard">Mastercard</SelectItem>
												<SelectItem value="amex">American Express</SelectItem>
												<SelectItem value="discover">Discover</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline" onClick={() => setCardDialogOpen(false)}>
										Cancel
									</Button>
									<Button onClick={() => setCardDialogOpen(false)}>Add Card</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

