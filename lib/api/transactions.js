// API utilities for transaction management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 * @returns {Promise<object>} API response
 */
async function apiRequest(endpoint, options = {}) {
	const url = `${API_BASE_URL}/api${endpoint}`;

	const config = {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	};

	try {
		const response = await fetch(url, config);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || `HTTP error! status: ${response.status}`);
		}

		return data;
	} catch (error) {
		console.error("API request failed:", error);
		throw error;
	}
}

/**
 * Get all transactions with optional filtering
 * @param {object} filters - Filter options
 * @returns {Promise<object>} Transactions data
 */
export async function getAllTransactions(filters = {}) {
	const queryParams = new URLSearchParams();

	// Add filters to query params
	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			queryParams.append(key, value.toString());
		}
	});

	const queryString = queryParams.toString();
	const endpoint = `/transactions${queryString ? `?${queryString}` : ""}`;

	return await apiRequest(endpoint);
}

/**
 * Get a specific transaction by ID
 * @param {number} id - Transaction ID
 * @returns {Promise<object>} Transaction data
 */
export async function getTransactionById(id) {
	return await apiRequest(`/transactions/${id}`);
}

/**
 * Create a new transaction
 * @param {object} transactionData - Transaction data
 * @returns {Promise<object>} Created transaction data
 */
export async function createTransaction(transactionData) {
	return await apiRequest("/transactions", {
		method: "POST",
		body: JSON.stringify(transactionData),
	});
}

/**
 * Update an existing transaction
 * @param {number} id - Transaction ID
 * @param {object} transactionData - Updated transaction data
 * @returns {Promise<object>} Updated transaction data
 */
export async function updateTransaction(id, transactionData) {
	return await apiRequest(`/transactions/${id}`, {
		method: "PUT",
		body: JSON.stringify(transactionData),
	});
}

/**
 * Delete a transaction
 * @param {number} id - Transaction ID
 * @returns {Promise<object>} Deleted transaction data
 */
export async function deleteTransaction(id) {
	return await apiRequest(`/transactions/${id}`, {
		method: "DELETE",
	});
}

/**
 * Get transactions with pagination
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @param {object} filters - Additional filters
 * @returns {Promise<object>} Paginated transactions data
 */
export async function getTransactionsPaginated(
	page = 1,
	limit = 20,
	filters = {},
) {
	const offset = (page - 1) * limit;

	return await getAllTransactions({
		...filters,
		limit,
		offset,
	});
}

/**
 * Get transaction statistics/summary
 * @param {object} filters - Filter options for statistics
 * @returns {Promise<object>} Transaction statistics
 */
export async function getTransactionStats(filters = {}) {
	const response = await getAllTransactions({
		...filters,
		limit: 1, // We only need the summary, not the transactions
	});

	return {
		summary: response.summary,
		totalCount: response.pagination.total,
	};
}

/**
 * Search transactions by text
 * @param {string} searchTerm - Search term
 * @param {object} additionalFilters - Additional filters
 * @returns {Promise<object>} Search results
 */
export async function searchTransactions(searchTerm, additionalFilters = {}) {
	return await getAllTransactions({
		...additionalFilters,
		search: searchTerm,
	});
}

/**
 * Get transactions by date range
 * @param {string} dateFrom - Start date (YYYY-MM-DD)
 * @param {string} dateTo - End date (YYYY-MM-DD)
 * @param {object} additionalFilters - Additional filters
 * @returns {Promise<object>} Filtered transactions
 */
export async function getTransactionsByDateRange(
	dateFrom,
	dateTo,
	additionalFilters = {},
) {
	return await getAllTransactions({
		...additionalFilters,
		dateFrom,
		dateTo,
	});
}

/**
 * Get transactions by type (income, expense, transfer)
 * @param {string} type - Transaction type
 * @param {object} additionalFilters - Additional filters
 * @returns {Promise<object>} Filtered transactions
 */
export async function getTransactionsByType(type, additionalFilters = {}) {
	return await getAllTransactions({
		...additionalFilters,
		type,
	});
}

/**
 * Get transactions by category
 * @param {string} category - Transaction category
 * @param {object} additionalFilters - Additional filters
 * @returns {Promise<object>} Filtered transactions
 */
export async function getTransactionsByCategory(
	category,
	additionalFilters = {},
) {
	return await getAllTransactions({
		...additionalFilters,
		category,
	});
}

/**
 * Get transactions by account
 * @param {string} account - Account name
 * @param {object} additionalFilters - Additional filters
 * @returns {Promise<object>} Filtered transactions
 */
export async function getTransactionsByAccount(
	account,
	additionalFilters = {},
) {
	return await getAllTransactions({
		...additionalFilters,
		account,
	});
}
