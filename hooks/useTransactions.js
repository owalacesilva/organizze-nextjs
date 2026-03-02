import { useState, useEffect, useCallback } from "react";
import {
	getAllTransactions,
	getTransactionById,
	createTransaction,
	updateTransaction,
	deleteTransaction,
	searchTransactions,
	getTransactionsByType,
} from "@/lib/api/transactions";

/**
 * Custom hook for managing transactions
 * @param {object} initialFilters - Initial filter state
 * @returns {object} Transaction state and methods
 */
export function useTransactions(initialFilters = {}) {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		total: 0,
		offset: 0,
		limit: 20,
		hasMore: false,
	});
	const [summary, setSummary] = useState({
		totalIncome: 0,
		totalExpenses: 0,
		totalTransfers: 0,
		netAmount: 0,
	});

	// Fetch transactions with filters
	const fetchTransactions = useCallback(async (filters = {}) => {
		setLoading(true);
		setError(null);

		try {
			const response = await getAllTransactions(filters);

			if (response.success) {
				setTransactions(response.data);
				setPagination(response.pagination);
				setSummary(response.summary);
			} else {
				throw new Error(response.message || "Failed to fetch transactions");
			}
		} catch (err) {
			setError(err.message);
			console.error("Error fetching transactions:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	// Load more transactions (for pagination)
	const loadMoreTransactions = useCallback(
		async (filters = {}) => {
			if (!pagination.hasMore || loading) return;

			setLoading(true);
			setError(null);

			try {
				const newFilters = {
					...filters,
					offset: pagination.offset + pagination.limit,
					limit: pagination.limit,
				};

				const response = await getAllTransactions(newFilters);

				if (response.success) {
					setTransactions((prev) => [...prev, ...response.data]);
					setPagination(response.pagination);
				} else {
					throw new Error(
						response.message || "Failed to load more transactions",
					);
				}
			} catch (err) {
				setError(err.message);
				console.error("Error loading more transactions:", err);
			} finally {
				setLoading(false);
			}
		},
		[pagination, loading],
	);

	// Create a new transaction
	const addTransaction = useCallback(async (transactionData) => {
		setLoading(true);
		setError(null);

		try {
			const response = await createTransaction(transactionData);

			if (response.success) {
				// Add the new transaction to the beginning of the list
				setTransactions((prev) => [response.data, ...prev]);

				// Update summary
				setSummary((prev) => {
					const newSummary = { ...prev };
					if (response.data.type === "income") {
						newSummary.totalIncome += response.data.amount;
					} else if (response.data.type === "expense") {
						newSummary.totalExpenses += Math.abs(response.data.amount);
					} else if (response.data.type === "transfer") {
						newSummary.totalTransfers += Math.abs(response.data.amount);
					}
					newSummary.netAmount += response.data.amount;
					return newSummary;
				});

				return response.data;
			} else {
				throw new Error(response.message || "Failed to create transaction");
			}
		} catch (err) {
			setError(err.message);
			console.error("Error creating transaction:", err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	// Update an existing transaction
	const editTransaction = useCallback(async (id, transactionData) => {
		setLoading(true);
		setError(null);

		try {
			const response = await updateTransaction(id, transactionData);

			if (response.success) {
				// Update the transaction in the list
				setTransactions((prev) =>
					prev.map((transaction) =>
						transaction.id === id ? response.data : transaction,
					),
				);
				return response.data;
			} else {
				throw new Error(response.message || "Failed to update transaction");
			}
		} catch (err) {
			setError(err.message);
			console.error("Error updating transaction:", err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	// Delete a transaction
	const removeTransaction = useCallback(async (id) => {
		setLoading(true);
		setError(null);

		try {
			const response = await deleteTransaction(id);

			if (response.success) {
				// Remove the transaction from the list
				setTransactions((prev) => {
					const transactionToRemove = prev.find((t) => t.id === id);

					// Update summary
					if (transactionToRemove) {
						setSummary((prevSummary) => {
							const newSummary = { ...prevSummary };
							if (transactionToRemove.type === "income") {
								newSummary.totalIncome -= transactionToRemove.amount;
							} else if (transactionToRemove.type === "expense") {
								newSummary.totalExpenses -= Math.abs(
									transactionToRemove.amount,
								);
							} else if (transactionToRemove.type === "transfer") {
								newSummary.totalTransfers -= Math.abs(
									transactionToRemove.amount,
								);
							}
							newSummary.netAmount -= transactionToRemove.amount;
							return newSummary;
						});
					}

					return prev.filter((transaction) => transaction.id !== id);
				});

				return response.data;
			} else {
				throw new Error(response.message || "Failed to delete transaction");
			}
		} catch (err) {
			setError(err.message);
			console.error("Error deleting transaction:", err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	// Search transactions
	const searchTransactionsByTerm = useCallback(
		async (searchTerm, additionalFilters = {}) => {
			setLoading(true);
			setError(null);

			try {
				const response = await searchTransactions(
					searchTerm,
					additionalFilters,
				);

				if (response.success) {
					setTransactions(response.data);
					setPagination(response.pagination);
					setSummary(response.summary);
				} else {
					throw new Error(response.message || "Failed to search transactions");
				}
			} catch (err) {
				setError(err.message);
				console.error("Error searching transactions:", err);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	// Filter transactions by type
	const filterByType = useCallback(async (type, additionalFilters = {}) => {
		setLoading(true);
		setError(null);

		try {
			const response = await getTransactionsByType(type, additionalFilters);

			if (response.success) {
				setTransactions(response.data);
				setPagination(response.pagination);
				setSummary(response.summary);
			} else {
				throw new Error(response.message || "Failed to filter transactions");
			}
		} catch (err) {
			setError(err.message);
			console.error("Error filtering transactions:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	// Refresh transactions (re-fetch with current filters)
	const refreshTransactions = useCallback(
		(filters = initialFilters) => {
			fetchTransactions(filters);
		},
		[fetchTransactions, initialFilters],
	);

	// Initial load
	useEffect(() => {
		fetchTransactions(initialFilters);
	}, [fetchTransactions, initialFilters]);

	return {
		// State
		transactions,
		loading,
		error,
		pagination,
		summary,

		// Methods
		fetchTransactions,
		loadMoreTransactions,
		addTransaction,
		editTransaction,
		removeTransaction,
		searchTransactionsByTerm,
		filterByType,
		refreshTransactions,

		// Helper methods
		clearError: () => setError(null),
	};
}

/**
 * Custom hook for managing a single transaction
 * @param {number} id - Transaction ID
 * @returns {object} Single transaction state and methods
 */
export function useTransaction(id) {
	const [transaction, setTransaction] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchTransaction = useCallback(async () => {
		if (!id) return;

		setLoading(true);
		setError(null);

		try {
			const response = await getTransactionById(id);

			if (response.success) {
				setTransaction(response.data);
			} else {
				throw new Error(response.message || "Failed to fetch transaction");
			}
		} catch (err) {
			setError(err.message);
			console.error("Error fetching transaction:", err);
		} finally {
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchTransaction();
	}, [fetchTransaction]);

	return {
		transaction,
		loading,
		error,
		refetch: fetchTransaction,
		clearError: () => setError(null),
	};
}
