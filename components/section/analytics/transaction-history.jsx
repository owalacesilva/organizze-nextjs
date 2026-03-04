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
	Loader2,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useTransactions } from "@/hooks/useTransactions";
import { useGetTransactionById } from "@/app/api/transactions/hooks";

// Icon mapping for dynamic icon rendering
const iconMap = {
	DollarSignIcon: DollarSignIcon,
	ShoppingBagIcon: ShoppingBagIcon,
	ArrowRightIcon: ArrowRightIcon,
	TrendingUpIcon: TrendingUpIcon,
	HomeIcon: HomeIcon,
	CreditCardIcon: CreditCardIcon,
};

function AddTransactionForm({ onSubmit, loading = false }) {
	const [formData, setFormData] = useState({
		category: "",
		account: "",
		date: "",
		amount: "",
		description: "",
		type: "expense",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!formData.category ||
			!formData.account ||
			!formData.date ||
			!formData.amount ||
			!formData.description
		) {
			alert("Please fill in all fields");
			return;
		}

		try {
			await onSubmit({
				...formData,
				amount:
					formData.type === "expense"
						? -Math.abs(parseFloat(formData.amount))
						: parseFloat(formData.amount),
			});

			// Reset form
			setFormData({
				category: "",
				account: "",
				date: "",
				amount: "",
				description: "",
				type: "expense",
			});
		} catch (error) {
			console.error("Error submitting transaction:", error);
			alert("Failed to add transaction. Please try again.");
		}
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
			<div className="space-y-1 sm:space-y-2">
				<label
					htmlFor="transaction-type"
					className="text-xs sm:text-sm text-muted-foreground"
				>
					Type
				</label>
				<Select
					value={formData.type}
					onValueChange={(value) => handleInputChange("type", value)}
				>
					<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="income">Income</SelectItem>
						<SelectItem value="expense">Expense</SelectItem>
						<SelectItem value="transfer">Transfer</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-1 sm:space-y-2">
				<label
					htmlFor="transaction-category"
					className="text-xs sm:text-sm text-muted-foreground"
				>
					Category
				</label>
				<Select
					value={formData.category}
					onValueChange={(value) => handleInputChange("category", value)}
				>
					<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
						<SelectValue placeholder="Select category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Income">Income</SelectItem>
						<SelectItem value="Food">Food</SelectItem>
						<SelectItem value="Transfer">Transfer</SelectItem>
						<SelectItem value="Investment">Investment</SelectItem>
						<SelectItem value="Utilities">Utilities</SelectItem>
						<SelectItem value="Dining">Dining</SelectItem>
						<SelectItem value="Shopping">Shopping</SelectItem>
						<SelectItem value="Housing">Housing</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-1 sm:space-y-2">
				<label
					htmlFor="transaction-account"
					className="text-xs sm:text-sm text-muted-foreground"
				>
					Account
				</label>
				<Select
					value={formData.account}
					onValueChange={(value) => handleInputChange("account", value)}
				>
					<SelectTrigger className="h-8 sm:h-10 text-xs sm:text-sm">
						<SelectValue placeholder="Select account" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Checking Account">Checking Account</SelectItem>
						<SelectItem value="Savings Account">Savings Account</SelectItem>
						<SelectItem value="Investment Account">
							Investment Account
						</SelectItem>
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
						value={formData.date}
						onChange={(e) => handleInputChange("date", e.target.value)}
						className="h-8 sm:h-10 text-xs sm:text-sm"
						required
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
						step="0.01"
						min="0"
						value={formData.amount}
						onChange={(e) => handleInputChange("amount", e.target.value)}
						className="h-8 sm:h-10 text-xs sm:text-sm"
						required
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
					value={formData.description}
					onChange={(e) => handleInputChange("description", e.target.value)}
					className="min-h-[120px] sm:min-h-[150px] text-xs sm:text-sm"
					placeholder="Enter transaction description..."
					required
				/>
			</div>

			<Button
				type="submit"
				className="w-full h-8 sm:h-10 text-xs sm:text-sm"
				disabled={loading}
			>
				{loading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Adding...
					</>
				) : (
					"Add Transaction"
				)}
			</Button>
		</form>
	);
}

const typeConfig = {
	income: {
		label: "Income",
		variant: "default",
		className: "bg-green-100 text-green-700 border-green-200",
	},
	expense: {
		label: "Expense",
		variant: "destructive",
		className: "bg-red-100 text-red-700 border-red-200",
	},
	transfer: {
		label: "Transfer",
		variant: "secondary",
		className: "bg-blue-100 text-blue-700 border-blue-200",
	},
};

function TransactionDetailModal({ transaction, open, onClose }) {
	if (!transaction) return null;

	const IconComponent = iconMap[transaction.icon] || DollarSignIcon;
	const config = typeConfig[transaction.type] || typeConfig.expense;

	const formatCurrencyFull = (value) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: transaction.currency || "USD",
			minimumFractionDigits: 2,
		}).format(value);

	const formatDateFull = (dateString) =>
		new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(new Date(dateString));

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[460px] w-[calc(100%-2rem)] sm:w-auto p-0 overflow-hidden">
				<div
					className={`${transaction.color} p-6 flex flex-col items-center gap-3`}
				>
					<div className="bg-white/20 p-3 rounded-full">
						<IconComponent className="h-7 w-7 text-white" />
					</div>
					<div className="text-center">
						<p className="text-white/80 text-xs font-medium uppercase tracking-wider">
							{transaction.category}
						</p>
						<p className="text-white font-semibold text-lg mt-0.5 leading-tight">
							{transaction.description}
						</p>
					</div>
					<p
						className={`text-2xl font-bold ${
							transaction.amount > 0 ? "text-white" : "text-white/90"
						}`}
					>
						{transaction.amount > 0 ? "+" : ""}
						{formatCurrencyFull(transaction.amount)}
					</p>
				</div>

				<div className="p-6 space-y-4">
					<DialogHeader className="sr-only">
						<DialogTitle>Transaction Details</DialogTitle>
						<DialogDescription>
							Details for the {transaction.category} transaction.
						</DialogDescription>
					</DialogHeader>

					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Type</span>
						<Badge className={config.className}>{config.label}</Badge>
					</div>

					<Separator />

					<div className="grid grid-cols-1 gap-3">
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Account</span>
							<span className="text-sm font-medium">{transaction.account}</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Date</span>
							<span className="text-sm font-medium">
								{formatDateFull(transaction.date)}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Currency</span>
							<span className="text-sm font-medium">
								{transaction.currency || "USD"}
							</span>
						</div>
						{transaction.id && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-muted-foreground">ID</span>
								<span className="text-xs font-mono text-muted-foreground">
									#{transaction.id}
								</span>
							</div>
						)}
					</div>

					<Separator />

					<DialogClose asChild>
						<Button variant="outline" className="w-full h-9 text-sm">
							Close
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export const TransactionHistory = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedPeriod, setSelectedPeriod] = useState("all");
	const [activeTab, setActiveTab] = useState("all");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [isDetailOpen, setIsDetailOpen] = useState(false);

	// Use the custom hook for transaction management
	const {
		transactions,
		loading,
		error,
		pagination,
		summary,
		addTransaction,
		searchTransactionsByTerm,
		filterByType,
		refreshTransactions,
		clearError,
	} = useTransactions();

	const { transaction: transactionDetail } = useGetTransactionById(
		selectedTransaction ? selectedTransaction.id : null,
		{
			enabled: !!selectedTransaction,
		},
	);

	// Handle search with debouncing
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (searchTerm.trim()) {
				searchTransactionsByTerm(searchTerm, {
					type: activeTab !== "all" ? activeTab : undefined,
				});
			} else if (activeTab !== "all") {
				filterByType(activeTab);
			} else {
				refreshTransactions();
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [
		searchTerm,
		activeTab,
		searchTransactionsByTerm,
		filterByType,
		refreshTransactions,
	]);

	// Handle tab change
	const handleTabChange = (newTab) => {
		setActiveTab(newTab);
		if (newTab === "all") {
			if (searchTerm.trim()) {
				searchTransactionsByTerm(searchTerm);
			} else {
				refreshTransactions();
			}
		} else {
			filterByType(newTab, searchTerm.trim() ? { search: searchTerm } : {});
		}
	};

	// Handle adding new transaction
	const handleAddTransaction = async (transactionData) => {
		try {
			await addTransaction(transactionData);
			setIsDialogOpen(false);
		} catch (error) {
			// Error is handled in the hook, but we could show a toast here
			console.error("Failed to add transaction:", error);
		}
	};

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

	// Get icon component from string
	const getIconComponent = (iconName) => {
		const IconComponent = iconMap[iconName] || DollarSignIcon;
		return IconComponent;
	};

	return (
		<>
			<Card className="border shadow-sm">
				<CardHeader className="p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
						<div>
							<CardTitle className="text-base sm:text-lg">
								Transaction History
							</CardTitle>
							<CardDescription className="text-xs sm:text-sm">
								Your recent financial activities
							</CardDescription>
						</div>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
								<AddTransactionForm
									onSubmit={handleAddTransaction}
									loading={loading}
								/>
							</DialogContent>
						</Dialog>
					</div>

					{error && (
						<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
							<div className="flex justify-between items-center">
								<p className="text-sm text-red-600">{error}</p>
								<Button
									variant="ghost"
									size="sm"
									onClick={clearError}
									className="text-red-600 hover:text-red-800"
								>
									×
								</Button>
							</div>
						</div>
					)}

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
							<Tabs value={activeTab} onValueChange={handleTabChange}>
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
							{loading ? (
								<div className="flex items-center justify-center py-8">
									<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
									<span className="ml-2 text-sm text-muted-foreground">
										Loading transactions...
									</span>
								</div>
							) : (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="text-xs sm:text-sm">
												Category
											</TableHead>
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
										{transactions.length > 0 ? (
											transactions.map((transaction) => {
												const IconComponent = getIconComponent(
													transaction.icon,
												);
												return (
													<TableRow
														key={transaction.id}
														className="cursor-pointer hover:bg-muted/60 transition-colors"
														onClick={() => {
															setSelectedTransaction(transaction);
															setIsDetailOpen(true);
														}}
													>
														<TableCell className="py-2 sm:py-4">
															<div className="flex items-center gap-1.5 sm:gap-2">
																<div
																	className={`${transaction.color} p-1.5 sm:p-2 rounded-full`}
																>
																	<IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
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
												);
											})
										) : (
											<TableRow>
												<TableCell
													colSpan={5}
													className="text-center py-6 text-xs sm:text-sm text-muted-foreground"
												>
													{searchTerm
														? "No transactions found matching your search"
														: "No transactions found"}
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							)}
						</div>
					</div>

					{transactions.length > 0 && !loading && (
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
							<div className="text-xs sm:text-sm text-muted-foreground space-y-1">
								<p>
									Showing {transactions.length}
									{pagination.total && ` of ${pagination.total}`} transactions
								</p>
								{summary && (
									<div className="flex flex-wrap gap-4 text-xs">
										<span className="text-green-600">
											Income: {formatCurrency(summary.totalIncome)}
										</span>
										<span className="text-red-600">
											Expenses: {formatCurrency(summary.totalExpenses)}
										</span>
										<span className="text-blue-600">
											Net: {formatCurrency(summary.netAmount)}
										</span>
									</div>
								)}
							</div>
							<Button
								variant="outline"
								size="sm"
								className="text-xs sm:text-sm h-8 sm:h-9 w-full sm:w-auto"
								onClick={() => refreshTransactions()}
								disabled={loading}
							>
								{loading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Refreshing...
									</>
								) : (
									"Refresh"
								)}
							</Button>
						</div>
					)}
				</CardContent>
			</Card>

			<TransactionDetailModal
				transaction={selectedTransaction}
				open={isDetailOpen}
				onClose={(open) => {
					setIsDetailOpen(open);
					if (!open) setSelectedTransaction(null);
				}}
			/>
		</>
	);
};
