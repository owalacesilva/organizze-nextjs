import { NextResponse } from "next/server";

// Mock transaction data (in a real app, this would come from a database)
const transactions = [
	{
		id: 1,
		date: "2025-03-28",
		description: "Salary Deposit",
		account: "Checking Account",
		amount: 3200,
		type: "income",
		category: "Income",
		icon: "DollarSignIcon",
		color: "bg-green-500",
		currency: "USD",
		createdAt: "2025-03-28T10:00:00Z",
		updatedAt: "2025-03-28T10:00:00Z",
	},
	{
		id: 2,
		date: "2025-03-27",
		description: "Grocery Store",
		account: "Checking Account",
		amount: -120,
		type: "expense",
		category: "Food",
		icon: "ShoppingBagIcon",
		color: "bg-orange-500",
		currency: "USD",
		createdAt: "2025-03-27T15:30:00Z",
		updatedAt: "2025-03-27T15:30:00Z",
	},
	{
		id: 3,
		date: "2025-03-25",
		description: "Monthly Transfer",
		account: "Savings Account",
		amount: 500,
		type: "transfer",
		category: "Transfer",
		icon: "ArrowRightIcon",
		color: "bg-blue-500",
		currency: "USD",
		createdAt: "2025-03-25T09:15:00Z",
		updatedAt: "2025-03-25T09:15:00Z",
	},
	{
		id: 4,
		date: "2025-03-22",
		description: "Dividend Payment",
		account: "Investment Account",
		amount: 75,
		type: "income",
		category: "Investment",
		icon: "TrendingUpIcon",
		color: "bg-purple-500",
		currency: "USD",
		createdAt: "2025-03-22T12:00:00Z",
		updatedAt: "2025-03-22T12:00:00Z",
	},
	{
		id: 5,
		date: "2025-03-20",
		description: "Utility Bill",
		account: "Checking Account",
		amount: -85,
		type: "expense",
		category: "Utilities",
		icon: "HomeIcon",
		color: "bg-yellow-500",
		currency: "USD",
		createdAt: "2025-03-20T14:45:00Z",
		updatedAt: "2025-03-20T14:45:00Z",
	},
	{
		id: 6,
		date: "2025-03-18",
		description: "Restaurant",
		account: "Checking Account",
		amount: -65,
		type: "expense",
		category: "Dining",
		icon: "CreditCardIcon",
		color: "bg-red-500",
		currency: "USD",
		createdAt: "2025-03-18T19:20:00Z",
		updatedAt: "2025-03-18T19:20:00Z",
	},
	{
		id: 7,
		date: "2025-03-15",
		description: "Online Shopping",
		account: "Checking Account",
		amount: -120,
		type: "expense",
		category: "Shopping",
		icon: "ShoppingBagIcon",
		color: "bg-pink-500",
		currency: "USD",
		createdAt: "2025-03-15T11:30:00Z",
		updatedAt: "2025-03-15T11:30:00Z",
	},
	{
		id: 8,
		date: "2025-03-10",
		description: "Rent Payment",
		account: "Checking Account",
		amount: -1200,
		type: "expense",
		category: "Housing",
		icon: "HomeIcon",
		color: "bg-indigo-500",
		currency: "USD",
		createdAt: "2025-03-10T08:00:00Z",
		updatedAt: "2025-03-10T08:00:00Z",
	},
	{
		id: 9,
		date: "2025-03-05",
		description: "Freelance Income",
		account: "Checking Account",
		amount: 850,
		type: "income",
		category: "Income",
		icon: "DollarSignIcon",
		color: "bg-green-500",
		currency: "USD",
		createdAt: "2025-03-05T16:45:00Z",
		updatedAt: "2025-03-05T16:45:00Z",
	},
];

// GET /api/transactions - Get all transactions with optional filtering
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract query parameters
		const type = searchParams.get("type"); // income, expense, transfer
		const category = searchParams.get("category");
		const account = searchParams.get("account");
		const dateFrom = searchParams.get("dateFrom");
		const dateTo = searchParams.get("dateTo");
		const search = searchParams.get("search");
		const limit = parseInt(searchParams.get("limit")) || null;
		const offset = parseInt(searchParams.get("offset")) || 0;
		const sortBy = searchParams.get("sortBy") || "date";
		const sortOrder = searchParams.get("sortOrder") || "desc";

		let filteredTransactions = [...transactions];

		// Filter by type
		if (type && type !== "all") {
			filteredTransactions = filteredTransactions.filter(
				(t) => t.type === type,
			);
		}

		// Filter by category
		if (category) {
			filteredTransactions = filteredTransactions.filter((t) =>
				t.category.toLowerCase().includes(category.toLowerCase()),
			);
		}

		// Filter by account
		if (account) {
			filteredTransactions = filteredTransactions.filter((t) =>
				t.account.toLowerCase().includes(account.toLowerCase()),
			);
		}

		// Filter by date range
		if (dateFrom) {
			filteredTransactions = filteredTransactions.filter(
				(t) => new Date(t.date) >= new Date(dateFrom),
			);
		}

		if (dateTo) {
			filteredTransactions = filteredTransactions.filter(
				(t) => new Date(t.date) <= new Date(dateTo),
			);
		}

		// Filter by search term
		if (search) {
			const searchLower = search.toLowerCase();
			filteredTransactions = filteredTransactions.filter(
				(t) =>
					t.description.toLowerCase().includes(searchLower) ||
					t.category.toLowerCase().includes(searchLower) ||
					t.account.toLowerCase().includes(searchLower),
			);
		}

		// Sort transactions
		filteredTransactions.sort((a, b) => {
			let aValue = a[sortBy];
			let bValue = b[sortBy];

			if (sortBy === "date") {
				aValue = new Date(aValue);
				bValue = new Date(bValue);
			}

			if (sortBy === "amount") {
				aValue = parseFloat(aValue);
				bValue = parseFloat(bValue);
			}

			if (sortOrder === "asc") {
				return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
			} else {
				return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
			}
		});

		// Pagination
		const totalCount = filteredTransactions.length;
		if (limit) {
			filteredTransactions = filteredTransactions.slice(offset, offset + limit);
		}

		// Calculate summary statistics
		const summary = {
			totalIncome: transactions
				.filter((t) => t.type === "income")
				.reduce((sum, t) => sum + t.amount, 0),
			totalExpenses: Math.abs(
				transactions
					.filter((t) => t.type === "expense")
					.reduce((sum, t) => sum + t.amount, 0),
			),
			totalTransfers: transactions
				.filter((t) => t.type === "transfer")
				.reduce((sum, t) => sum + Math.abs(t.amount), 0),
			netAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
		};

		return NextResponse.json({
			success: true,
			data: filteredTransactions,
			pagination: {
				total: totalCount,
				offset,
				limit,
				hasMore: limit ? offset + limit < totalCount : false,
			},
			summary,
			message: "Transactions retrieved successfully",
		});
	} catch (error) {
		console.error("Error fetching transactions:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch transactions",
				message: error.message,
			},
			{ status: 500 },
		);
	}
}

// POST /api/transactions - Create a new transaction
export async function POST(request) {
	try {
		const body = await request.json();

		// Validate required fields
		const { description, amount, type, category, account, date } = body;

		if (!description || !amount || !type || !category || !account || !date) {
			return NextResponse.json(
				{
					success: false,
					error: "Missing required fields",
					message:
						"Description, amount, type, category, account, and date are required",
				},
				{ status: 400 },
			);
		}

		// Create new transaction
		const newTransaction = {
			id: Math.max(...transactions.map((t) => t.id)) + 1,
			description,
			amount: parseFloat(amount),
			type,
			category,
			account,
			date,
			icon: getIconForCategory(category),
			color: getColorForCategory(category),
			currency: body.currency || "USD",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// Add to transactions array (in a real app, this would be saved to database)
		transactions.unshift(newTransaction);

		return NextResponse.json(
			{
				success: true,
				data: newTransaction,
				message: "Transaction created successfully",
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating transaction:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to create transaction",
				message: error.message,
			},
			{ status: 500 },
		);
	}
}

// Helper function to get icon for category
function getIconForCategory(category) {
	const iconMap = {
		Income: "DollarSignIcon",
		Food: "ShoppingBagIcon",
		Transfer: "ArrowRightIcon",
		Investment: "TrendingUpIcon",
		Utilities: "HomeIcon",
		Dining: "CreditCardIcon",
		Shopping: "ShoppingBagIcon",
		Housing: "HomeIcon",
	};
	return iconMap[category] || "DollarSignIcon";
}

// Helper function to get color for category
function getColorForCategory(category) {
	const colorMap = {
		Income: "bg-green-500",
		Food: "bg-orange-500",
		Transfer: "bg-blue-500",
		Investment: "bg-purple-500",
		Utilities: "bg-yellow-500",
		Dining: "bg-red-500",
		Shopping: "bg-pink-500",
		Housing: "bg-indigo-500",
	};
	return colorMap[category] || "bg-gray-500";
}
