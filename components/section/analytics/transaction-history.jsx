"use client";

import TransactionsSection from "@/components/section/transactions";

/**
 * The analytics tab reuses the transactions page wholesale — filters,
 * pagination and CRUD included — so both stay in sync.
 *
 * This used to be a separate implementation that read fields
 * (`loading`, `pagination`, `searchTransactionsByTerm`, …) which
 * `useGetTransactions()` never returned, and threw on render.
 */
export function TransactionHistory() {
	return <TransactionsSection />;
}

export default TransactionHistory;
