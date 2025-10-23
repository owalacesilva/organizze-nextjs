"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	ArrowRightIcon,
	CalendarIcon,
	CreditCardIcon,
	DollarSignIcon,
	FilterIcon,
	HomeIcon,
	SearchIcon,
	ShoppingBagIcon,
	TrendingUpIcon,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

// Transaction data
const transactions = [
	{
		id: 1,
		date: "2025-03-28",
		description: "Salary Deposit",
		account: "Checking Account",
		amount: 3200,
		type: "income",
		category: "Income",
		icon: DollarSignIcon,
		color: "bg-green-500",
		currency: "USD",
	},
	{
		id: 2,
		date: "2025-03-27",
		description: "Grocery Store",
		account: "Checking Account",
		amount: -120,
		type: "expense",
		category: "Food",
		icon: ShoppingBagIcon,
		color: "bg-orange-500",
		currency: "USD",
	},
	{
		id: 3,
		date: "2025-03-25",
		description: "Monthly Transfer",
		account: "Savings Account",
		amount: 500,
		type: "transfer",
		category: "Transfer",
		icon: ArrowRightIcon,
		color: "bg-blue-500",
		currency: "USD",
	},
	{
		id: 4,
		date: "2025-03-22",
		description: "Dividend Payment",
		account: "Investment Account",
		amount: 75,
		type: "income",
		category: "Investment",
		icon: TrendingUpIcon,
		color: "bg-purple-500",
		currency: "USD",
	},
	{
		id: 5,
		date: "2025-03-20",
		description: "Utility Bill",
		account: "Checking Account",
		amount: -85,
		type: "expense",
		category: "Utilities",
		icon: HomeIcon,
		color: "bg-yellow-500",
		currency: "USD",
	},
	{
		id: 6,
		date: "2025-03-18",
		description: "Restaurant",
		account: "Checking Account",
		amount: -65,
		type: "expense",
		category: "Dining",
		icon: CreditCardIcon,
		color: "bg-red-500",
		currency: "USD",
	},
	{
		id: 7,
		date: "2025-03-15",
		description: "Online Shopping",
		account: "Checking Account",
		amount: -120,
		type: "expense",
		category: "Shopping",
		icon: ShoppingBagIcon,
		color: "bg-pink-500",
		currency: "USD",
	},
	{
		id: 8,
		date: "2025-03-10",
		description: "Rent Payment",
		account: "Checking Account",
		amount: -1200,
		type: "expense",
		category: "Housing",
		icon: HomeIcon,
		color: "bg-indigo-500",
		currency: "USD",
	},
	{
		id: 9,
		date: "2025-03-05",
		description: "Freelance Income",
		account: "Checking Account",
		amount: 850,
		type: "income",
		category: "Income",
		icon: DollarSignIcon,
		color: "bg-green-500",
		currency: "USD",
	},
];

function AddTransactionForm() {
	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="space-y-1 sm:space-y-2">
				<label className="text-xs sm:text-sm text-muted-foreground">
					Category
				</label>
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
				<label className="text-xs sm:text-sm text-muted-foreground">
					Account
				</label>
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

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div className="space-y-1 sm:space-y-2">
					<label
						htmlFor="transaction-date"
						className="text-xs sm:text-sm text-muted-foreground"
					>
						Date
					</label>
					<Input
						id="transaction-date"
						type="date"
						className="h-8 sm:h-10 text-xs sm:text-sm"
					/>
				</div>

				<div className="space-y-1 sm:space-y-2">
					<label
						htmlFor="transaction-amount"
						className="text-xs sm:text-sm text-muted-foreground"
					>
						Amount
					</label>
					<Input
						id="transaction-amount"
						type="number"
						className="h-8 sm:h-10 text-xs sm:text-sm"
					/>
				</div>
			</div>

			<div className="space-y-1 sm:space-y-2">
				<label
					htmlFor="transaction-description"
					className="text-xs sm:text-sm text-muted-foreground"
				>
					Description
				</label>
				<Textarea
					id="transaction-description"
					className="min-h-[120px] sm:min-h-[150px] text-xs sm:text-sm"
					placeholder="Type your message here."
				/>
			</div>

			<Button className="w-full h-8 sm:h-10 text-xs sm:text-sm">Submit</Button>
		</div>
	);
}

export const TransactionHistory = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedPeriod, setSelectedPeriod] = useState("all");
	const [activeTab, setActiveTab] = useState("all");

	// Format currency
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);
	};

	// Format date
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
		}).format(date);
	};

	// Filter transactions based on search term and active tab
	const filteredTransactions = transactions.filter((transaction) => {
		// Filter by search term
		const matchesSearch =
			transaction.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
			transaction.account.toLowerCase().includes(searchTerm.toLowerCase());

		// Filter by transaction type
		const matchesType = activeTab === "all" || transaction.type === activeTab;

		return matchesSearch && matchesType;
	});

	return (
		<Card className="border shadow-sm">
			<CardHeader className="p-4 sm:p-6">
				<CardTitle className="text-base sm:text-lg">
					Transaction History
				</CardTitle>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-full sm:w-auto h-8 sm:h-10 text-xs sm:text-sm">
							Add Transaction
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[500px] p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto">
						<DialogHeader>
							<DialogTitle className="text-base sm:text-lg">
								Add Transaction
							</DialogTitle>
						</DialogHeader>
						<AddTransactionForm />
					</DialogContent>
				</Dialog>
				<CardDescription className="text-xs sm:text-sm">
					Your recent financial activities
				</CardDescription>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
					<div className="relative flex-1 max-w-full sm:max-w-sm">
						<SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
						<Input
							placeholder="Search transactions..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9 h-8 sm:h-10 text-xs sm:text-sm"
						/>
					</div>
					<div className="flex gap-1 sm:gap-2">
						<Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
							<SelectTrigger className="w-full sm:w-[180px] h-8 sm:h-10 text-xs sm:text-sm">
								<SelectValue placeholder="Select period" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Transactions</SelectItem>
								<SelectItem value="week">Last 7 Days</SelectItem>
								<SelectItem value="month">Last 30 Days</SelectItem>
								<SelectItem value="quarter">Last 90 Days</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 sm:h-10 sm:w-10"
						>
							<FilterIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="h-8 w-8 sm:h-10 sm:w-10"
						>
							<CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
				<div className="overflow-x-auto -mx-4 sm:mx-0 pb-1 sm:pb-0">
					<div className="px-4 sm:px-0 mb-3 sm:mb-4">
						<Tabs defaultValue="all" onValueChange={setActiveTab}>
							<TabsList className="h-8 sm:h-10">
								<TabsTrigger value="all" className="text-xs sm:text-sm">
									All
								</TabsTrigger>
								<TabsTrigger value="income" className="text-xs sm:text-sm">
									Income
								</TabsTrigger>
								<TabsTrigger value="expense" className="text-xs sm:text-sm">
									Expenses
								</TabsTrigger>
								<TabsTrigger value="transfer" className="text-xs sm:text-sm">
									Transfers
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
				</div>

				<div className="overflow-x-auto -mx-4 sm:mx-0">
					<div className="inline-block min-w-full align-middle px-4 sm:px-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-xs sm:text-sm">Category</TableHead>
									<TableHead className="text-xs sm:text-sm hidden sm:table-cell">
										Date
									</TableHead>
									<TableHead className="text-xs sm:text-sm">
										Description
									</TableHead>
									<TableHead className="text-xs sm:text-sm hidden md:table-cell">
										Account
									</TableHead>
									<TableHead className="text-xs sm:text-sm text-right">
										Amount
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredTransactions.length > 0 ? (
									filteredTransactions.map((transaction) => (
										<TableRow key={transaction.id}>
											<TableCell className="py-2 sm:py-4">
												<div className="flex items-center gap-1.5 sm:gap-2">
													<div
														className={`${transaction.color} p-1.5 sm:p-2 rounded-full`}
													>
														<transaction.icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
													</div>
													<span className="text-xs sm:text-sm">
														{transaction.category}
													</span>
												</div>
											</TableCell>
											<TableCell className="py-2 sm:py-4 text-xs sm:text-sm hidden sm:table-cell">
												{formatDate(transaction.date)}
											</TableCell>
											<TableCell className="py-2 sm:py-4 text-xs sm:text-sm max-w-[120px] sm:max-w-none truncate">
												{transaction.description}
											</TableCell>
											<TableCell className="py-2 sm:py-4 text-xs sm:text-sm hidden md:table-cell">
												{transaction.account}
											</TableCell>
											<TableCell
												className={`py-2 sm:py-4 text-right text-xs sm:text-sm font-medium ${
													transaction.amount > 0
														? "text-green-500"
														: transaction.amount < 0
															? "text-red-500"
															: ""
												}`}
											>
												{transaction.amount > 0 ? "+" : ""}
												{formatCurrency(transaction.amount)}
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={5}
											className="text-center py-6 text-xs sm:text-sm text-muted-foreground"
										>
											No transactions found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>

				{filteredTransactions.length > 0 && (
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
						<p className="text-xs sm:text-sm text-muted-foreground">
							Showing {filteredTransactions.length} of {transactions.length}{" "}
							transactions
						</p>
						<Button
							variant="outline"
							size="sm"
							className="text-xs sm:text-sm h-8 sm:h-9 w-full sm:w-auto"
						>
							View All Transactions
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
