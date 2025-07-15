"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Account from './account'
import AddBank from './add-bank'
import Api from './api'
import Categories from './categories'
import Currencies from './currencies'
import General from './general'
import Profile from './profile'
import Security from './security'
import Session from './session'
// import Support from './support'

const menuItems = [
	"Account",
	"General",
	"Profile",
	"Add Bank",
	"Security",
	"Session",
	"Categories",
	"Currencies",
	"Api",
	// "Support",
]

export default function SettingsSection() {
	const [activeTab, setActiveTab] = useState("account")

	const handleTabChange = (value) => {
		setActiveTab(value)
	}

	return (
		<div className="w-full">
			{/* Mobile view - Dropdown menu */}
			<div className="md:hidden w-full mb-6">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="w-full justify-between">
							{menuItems.find(item => item.toLowerCase().replace(" ", "-") === activeTab)}
							<ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-full">
						{menuItems.map((item) => (
							<DropdownMenuItem
								key={item}
								onClick={() => handleTabChange(item.toLowerCase().replace(" ", "-"))}
								className={activeTab === item.toLowerCase().replace(" ", "-") ? "bg-muted" : ""}
							>
								{item}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Desktop view - Horizontal tabs */}
			<Tabs
				defaultValue="account"
				value={activeTab}
				onValueChange={handleTabChange}
				className="w-full"
			>
				<div className="hidden md:block overflow-x-auto">
					<TabsList className="h-16 w-full justify-start rounded-none bg-transparent p-0">
						{menuItems.map((item) => (
							<TabsTrigger
								key={item}
								value={item.toLowerCase().replace(" ", "-")}
								className="h-full rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
							>
								{item}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				<div className="py-6">
					<TabsContent value="account">
						<Account />
					</TabsContent>
					<TabsContent value="general">
						<General />
					</TabsContent>
					<TabsContent value="profile">
						<Profile />
					</TabsContent>
					<TabsContent value="add-bank">
						<AddBank />
					</TabsContent>
					<TabsContent value="security">
						<Security />
					</TabsContent>
					<TabsContent value="session">
						<Session />
					</TabsContent>
					<TabsContent value="categories">
						<Categories />
					</TabsContent>
					<TabsContent value="currencies">
						<Currencies />
					</TabsContent>
					<TabsContent value="api">
						<Api />
					</TabsContent>
				</div>

			</Tabs>
		</div>
	)
}