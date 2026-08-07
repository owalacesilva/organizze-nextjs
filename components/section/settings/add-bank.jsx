"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useTranslation";
import { Building, CreditCard, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const ACCOUNT_TYPES = ["checking", "savings", "business"];
const CARD_TYPES = ["visa", "mastercard", "amex", "elo"];
const BILLING_ADDRESSES = ["home", "work", "other"];

// Placeholder payment methods until a banking endpoint exists.
const BANK = { name: "Banco do Brasil", digits: "5421" };
const CARD = { name: "Mastercard", digits: "5478" };

export default function AddBank() {
	const { t } = useTranslation();

	const [manageBankOpen, setManageBankOpen] = useState(false);
	const [editBankOpen, setEditBankOpen] = useState(false);
	const [manageCardOpen, setManageCardOpen] = useState(false);
	const [editCardOpen, setEditCardOpen] = useState(false);
	const [addBankOpen, setAddBankOpen] = useState(false);
	const [addCardOpen, setAddCardOpen] = useState(false);

	// Swap the manage panel for the edit panel so only one is on screen.
	const openEditBank = () => {
		setManageBankOpen(false);
		setEditBankOpen(true);
	};

	const openEditCard = () => {
		setManageCardOpen(false);
		setEditCardOpen(true);
	};

	return (
		<div className="space-y-3">
			<Card>
				<CardHeader>
					<CardTitle>{t("settings.bank.title")}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<Building className="h-4 w-4" />
							</div>
							<div>
								<p className="text-xs font-medium">{BANK.name}</p>
								<p className="text-[11px] text-muted-foreground">
									•••• {BANK.digits}
								</p>
								<p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
									{t("settings.bank.verified")}
								</p>
							</div>
						</div>

						<Dialog open={manageBankOpen} onOpenChange={setManageBankOpen}>
							<DialogTrigger asChild>
								<Button variant="outline">{t("settings.bank.manage")}</Button>
							</DialogTrigger>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>
										{t("settings.bank.manageBankTitle")}
									</DialogTitle>
									<DialogDescription>
										{t("settings.bank.manageBankDescription", {
											name: BANK.name,
											digits: BANK.digits,
										})}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="flex items-center justify-between gap-2">
										<Label htmlFor="default-bank">
											{t("settings.bank.defaultMethod")}
										</Label>
										<Switch id="default-bank" />
									</div>

									<div className="space-y-1">
										<Label htmlFor="bank-nickname">
											{t("settings.bank.nickname")}
										</Label>
										<Input id="bank-nickname" defaultValue={BANK.name} />
									</div>

									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											className="gap-1"
											onClick={openEditBank}
										>
											<Pencil />
											{t("settings.bank.editDetails")}
										</Button>
										<Button variant="destructive" className="gap-1">
											<Trash2 />
											{t("settings.bank.removeAccount")}
										</Button>
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setManageBankOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setManageBankOpen(false)}>
										{t("settings.bank.saveChanges")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Dialog open={editBankOpen} onOpenChange={setEditBankOpen}>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>{t("settings.bank.editBankTitle")}</DialogTitle>
									<DialogDescription>
										{t("settings.bank.editBankDescription")}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="space-y-1">
										<Label htmlFor="edit-bank-name">
											{t("settings.bank.bankName")}
										</Label>
										<Input id="edit-bank-name" defaultValue={BANK.name} />
									</div>
									<div className="space-y-1">
										<Label htmlFor="edit-account-number">
											{t("settings.bank.accountNumber")}
										</Label>
										<Input
											id="edit-account-number"
											defaultValue={`••••••••${BANK.digits}`}
										/>
									</div>
									<div className="space-y-1">
										<Label htmlFor="edit-routing-number">
											{t("settings.bank.routingNumber")}
										</Label>
										<Input id="edit-routing-number" defaultValue="••••" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="edit-account-type">
											{t("settings.bank.accountType")}
										</Label>
										<Select defaultValue="checking">
											<SelectTrigger id="edit-account-type">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{ACCOUNT_TYPES.map((type) => (
													<SelectItem key={type} value={type}>
														{t(`settings.bank.accountTypes.${type}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-1">
										<Label htmlFor="edit-account-holder">
											{t("settings.bank.accountHolder")}
										</Label>
										<Input id="edit-account-holder" defaultValue="Hafsa Humaira" />
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setEditBankOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setEditBankOpen(false)}>
										{t("settings.bank.saveChanges")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2">
							<div className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
								<CreditCard className="h-4 w-4" />
							</div>
							<div>
								<p className="text-xs font-medium">{CARD.name}</p>
								<p className="text-[11px] text-muted-foreground">
									•••• {CARD.digits}
								</p>
								<p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
									{t("settings.bank.verified")}
								</p>
							</div>
						</div>

						<Dialog open={manageCardOpen} onOpenChange={setManageCardOpen}>
							<DialogTrigger asChild>
								<Button variant="outline">{t("settings.bank.manage")}</Button>
							</DialogTrigger>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>
										{t("settings.bank.manageCardTitle")}
									</DialogTitle>
									<DialogDescription>
										{t("settings.bank.manageCardDescription", {
											name: CARD.name,
											digits: CARD.digits,
										})}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="flex items-center justify-between gap-2">
										<Label htmlFor="default-card">
											{t("settings.bank.defaultMethod")}
										</Label>
										<Switch id="default-card" defaultChecked />
									</div>

									<div className="space-y-1">
										<Label htmlFor="card-nickname">
											{t("settings.bank.cardNickname")}
										</Label>
										<Input id="card-nickname" defaultValue={CARD.name} />
									</div>

									<div className="space-y-1">
										<Label htmlFor="billing-address">
											{t("settings.bank.billingAddress")}
										</Label>
										<Select defaultValue="home">
											<SelectTrigger id="billing-address">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{BILLING_ADDRESSES.map((value) => (
													<SelectItem key={value} value={value}>
														{t(`settings.bank.billingAddresses.${value}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											className="gap-1"
											onClick={openEditCard}
										>
											<Pencil />
											{t("settings.bank.editCardDetails")}
										</Button>
										<Button variant="destructive" className="gap-1">
											<Trash2 />
											{t("settings.bank.removeCard")}
										</Button>
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setManageCardOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setManageCardOpen(false)}>
										{t("settings.bank.saveChanges")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Dialog open={editCardOpen} onOpenChange={setEditCardOpen}>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>{t("settings.bank.editCardTitle")}</DialogTitle>
									<DialogDescription>
										{t("settings.bank.editCardDescription")}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="space-y-1">
										<Label htmlFor="edit-card-name">
											{t("settings.bank.nameOnCard")}
										</Label>
										<Input id="edit-card-name" defaultValue="Hafsa Humaira" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="edit-card-number">
											{t("settings.bank.cardNumber")}
										</Label>
										<Input
											id="edit-card-number"
											defaultValue={`•••• •••• •••• ${CARD.digits}`}
											readOnly
										/>
										<p className="text-[10px] text-muted-foreground">
											{t("settings.bank.cardNumberHint")}
										</p>
									</div>
									<div className="grid grid-cols-2 gap-2">
										<div className="space-y-1">
											<Label htmlFor="edit-expiry">
												{t("settings.bank.expiryDate")}
											</Label>
											<Input id="edit-expiry" defaultValue="09/28" />
										</div>
										<div className="space-y-1">
											<Label htmlFor="edit-cvv">{t("settings.bank.cvv")}</Label>
											<Input id="edit-cvv" defaultValue="•••" />
										</div>
									</div>
									<div className="space-y-1">
										<Label htmlFor="edit-card-type">
											{t("settings.bank.cardType")}
										</Label>
										<Select defaultValue="mastercard">
											<SelectTrigger id="edit-card-type">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{CARD_TYPES.map((type) => (
													<SelectItem key={type} value={type}>
														{t(`settings.bank.cardTypes.${type}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setEditCardOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setEditCardOpen(false)}>
										{t("settings.bank.saveChanges")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>

					<div className="flex gap-2 pt-1">
						<Dialog open={addBankOpen} onOpenChange={setAddBankOpen}>
							<DialogTrigger asChild>
								<Button>{t("settings.bank.addBank")}</Button>
							</DialogTrigger>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>{t("settings.bank.addBankTitle")}</DialogTitle>
									<DialogDescription>
										{t("settings.bank.addBankDescription")}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="space-y-1">
										<Label htmlFor="bank-name">
											{t("settings.bank.bankName")}
										</Label>
										<Input id="bank-name" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="account-number">
											{t("settings.bank.accountNumber")}
										</Label>
										<Input id="account-number" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="routing-number">
											{t("settings.bank.routingNumber")}
										</Label>
										<Input id="routing-number" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="account-type">
											{t("settings.bank.accountType")}
										</Label>
										<Select>
											<SelectTrigger id="account-type">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{ACCOUNT_TYPES.map((type) => (
													<SelectItem key={type} value={type}>
														{t(`settings.bank.accountTypes.${type}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setAddBankOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setAddBankOpen(false)}>
										{t("settings.bank.addBank")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Dialog open={addCardOpen} onOpenChange={setAddCardOpen}>
							<DialogTrigger asChild>
								<Button>{t("settings.bank.addCard")}</Button>
							</DialogTrigger>
							<DialogContent closeLabel={t("common.close")}>
								<DialogHeader>
									<DialogTitle>{t("settings.bank.addCardTitle")}</DialogTitle>
									<DialogDescription>
										{t("settings.bank.addCardDescription")}
									</DialogDescription>
								</DialogHeader>

								<DialogBody>
									<div className="space-y-1">
										<Label htmlFor="card-name">
											{t("settings.bank.nameOnCard")}
										</Label>
										<Input id="card-name" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="card-number">
											{t("settings.bank.cardNumber")}
										</Label>
										<Input id="card-number" />
									</div>
									<div className="grid grid-cols-2 gap-2">
										<div className="space-y-1">
											<Label htmlFor="expiry-date">
												{t("settings.bank.expiryDate")}
											</Label>
											<Input id="expiry-date" placeholder="MM/AA" />
										</div>
										<div className="space-y-1">
											<Label htmlFor="cvv">{t("settings.bank.cvv")}</Label>
											<Input id="cvv" />
										</div>
									</div>
									<div className="space-y-1">
										<Label htmlFor="card-type">
											{t("settings.bank.cardType")}
										</Label>
										<Select>
											<SelectTrigger id="card-type">
												<SelectValue placeholder={t("common.select")} />
											</SelectTrigger>
											<SelectContent>
												{CARD_TYPES.map((type) => (
													<SelectItem key={type} value={type}>
														{t(`settings.bank.cardTypes.${type}`)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</DialogBody>

								<DialogFooter>
									<Button
										variant="outline"
										onClick={() => setAddCardOpen(false)}
									>
										{t("common.cancel")}
									</Button>
									<Button onClick={() => setAddCardOpen(false)}>
										{t("settings.bank.addCard")}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
