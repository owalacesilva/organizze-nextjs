import { NextResponse } from "next/server";

// Mock transaction data (same as in route.js)
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
	// ... (include all other transactions for completeness)
];

// GET /api/transactions/[id] - Get a specific transaction
export async function GET(request, { params }) {
	try {
		const { id } = params;
		const transactionId = parseInt(id);

		if (isNaN(transactionId)) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid transaction ID",
					message: "Transaction ID must be a number",
				},
				{ status: 400 },
			);
		}

		const transaction = transactions.find((t) => t.id === transactionId);

		if (!transaction) {
			return NextResponse.json(
				{
					success: false,
					error: "Transaction not found",
					message: `Transaction with ID ${transactionId} does not exist`,
				},
				{ status: 404 },
			);
		}

		return NextResponse.json({
			success: true,
			data: transaction,
			message: "Transaction retrieved successfully",
		});
	} catch (error) {
		console.error("Error fetching transaction:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch transaction",
				message: error.message,
			},
			{ status: 500 },
		);
	}
}

// PUT /api/transactions/[id] - Update a specific transaction
export async function PUT(request, { params }) {
	try {
		const { id } = params;
		const transactionId = parseInt(id);
		const body = await request.json();

		if (isNaN(transactionId)) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid transaction ID",
					message: "Transaction ID must be a number",
				},
				{ status: 400 },
			);
		}

		const transactionIndex = transactions.findIndex(
			(t) => t.id === transactionId,
		);

		if (transactionIndex === -1) {
			return NextResponse.json(
				{
					success: false,
					error: "Transaction not found",
					message: `Transaction with ID ${transactionId} does not exist`,
				},
				{ status: 404 },
			);
		}

		// Update transaction
		const updatedTransaction = {
			...transactions[transactionIndex],
			...body,
			id: transactionId, // Ensure ID cannot be changed
			updatedAt: new Date().toISOString(),
		};

		transactions[transactionIndex] = updatedTransaction;

		return NextResponse.json({
			success: true,
			data: updatedTransaction,
			message: "Transaction updated successfully",
		});
	} catch (error) {
		console.error("Error updating transaction:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to update transaction",
				message: error.message,
			},
			{ status: 500 },
		);
	}
}

// DELETE /api/transactions/[id] - Delete a specific transaction
export async function DELETE(request, { params }) {
	try {
		const { id } = params;
		const transactionId = parseInt(id);

		if (isNaN(transactionId)) {
			return NextResponse.json(
				{
					success: false,
					error: "Invalid transaction ID",
					message: "Transaction ID must be a number",
				},
				{ status: 400 },
			);
		}

		const transactionIndex = transactions.findIndex(
			(t) => t.id === transactionId,
		);

		if (transactionIndex === -1) {
			return NextResponse.json(
				{
					success: false,
					error: "Transaction not found",
					message: `Transaction with ID ${transactionId} does not exist`,
				},
				{ status: 404 },
			);
		}

		// Remove transaction
		const deletedTransaction = transactions.splice(transactionIndex, 1)[0];

		return NextResponse.json({
			success: true,
			data: deletedTransaction,
			message: "Transaction deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting transaction:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to delete transaction",
				message: error.message,
			},
			{ status: 500 },
		);
	}
}
