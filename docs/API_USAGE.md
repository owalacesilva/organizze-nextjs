# Transaction API Documentation

This documentation covers the transaction API endpoints and how to use them in your Next.js application.

## API Endpoints

### GET /api/transactions
Get all transactions with optional filtering, pagination, and sorting.

**Query Parameters:**
- `type` - Filter by transaction type (income, expense, transfer)
- `category` - Filter by category
- `account` - Filter by account
- `search` - Search in description, category, and account
- `dateFrom` - Start date for filtering (YYYY-MM-DD)
- `dateTo` - End date for filtering (YYYY-MM-DD)
- `limit` - Number of transactions to return
- `offset` - Number of transactions to skip (for pagination)
- `sortBy` - Field to sort by (date, amount, description, category)
- `sortOrder` - Sort order (asc, desc)

**Example:**
```
GET /api/transactions?type=expense&limit=10&sortBy=date&sortOrder=desc
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "offset": 0,
    "limit": 10,
    "hasMore": true
  },
  "summary": {
    "totalIncome": 5000,
    "totalExpenses": 2000,
    "totalTransfers": 500,
    "netAmount": 3000
  },
  "message": "Transactions retrieved successfully"
}
```

### POST /api/transactions
Create a new transaction.

**Request Body:**
```json
{
  "description": "Grocery shopping",
  "amount": -120.50,
  "type": "expense",
  "category": "Food",
  "account": "Checking Account",
  "date": "2025-03-28",
  "currency": "USD"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "description": "Grocery shopping",
    "amount": -120.50,
    "type": "expense",
    "category": "Food",
    "account": "Checking Account",
    "date": "2025-03-28",
    "icon": "ShoppingBagIcon",
    "color": "bg-orange-500",
    "currency": "USD",
    "createdAt": "2025-03-28T10:30:00Z",
    "updatedAt": "2025-03-28T10:30:00Z"
  },
  "message": "Transaction created successfully"
}
```

### GET /api/transactions/[id]
Get a specific transaction by ID.

### PUT /api/transactions/[id]
Update a specific transaction.

### DELETE /api/transactions/[id]
Delete a specific transaction.

## Using the API Client

### Import the API functions
```javascript
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  searchTransactions,
  getTransactionsByType
} from '@/lib/api/transactions';
```

### Get all transactions
```javascript
const response = await getAllTransactions();
console.log(response.data); // Array of transactions
```

### Get transactions with filtering
```javascript
const response = await getAllTransactions({
  type: 'expense',
  limit: 10,
  search: 'grocery'
});
```

### Create a new transaction
```javascript
const newTransaction = {
  description: 'Coffee shop',
  amount: -5.50,
  type: 'expense',
  category: 'Dining',
  account: 'Checking Account',
  date: '2025-03-28'
};

const response = await createTransaction(newTransaction);
```

### Search transactions
```javascript
const response = await searchTransactions('grocery', {
  type: 'expense',
  dateFrom: '2025-03-01'
});
```

## Using the Custom Hook

### Import the hook
```javascript
import { useTransactions } from '@/hooks/useTransactions';
```

### Basic usage
```javascript
function TransactionList() {
  const {
    transactions,
    loading,
    error,
    addTransaction,
    removeTransaction,
    refreshTransactions
  } = useTransactions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {transactions.map(transaction => (
        <div key={transaction.id}>
          {transaction.description}: {transaction.amount}
        </div>
      ))}
    </div>
  );
}
```

### Adding a new transaction
```javascript
const handleAddTransaction = async () => {
  try {
    await addTransaction({
      description: 'New transaction',
      amount: 100,
      type: 'income',
      category: 'Income',
      account: 'Checking Account',
      date: '2025-03-28'
    });
  } catch (error) {
    console.error('Failed to add transaction:', error);
  }
};
```

### Filtering transactions
```javascript
const {
  transactions,
  filterByType,
  searchTransactionsByTerm
} = useTransactions();

// Filter by type
const handleFilterByType = (type) => {
  filterByType(type);
};

// Search
const handleSearch = (searchTerm) => {
  searchTransactionsByTerm(searchTerm);
};
```

## Error Handling

All API functions return a consistent response format:

```javascript
{
  success: boolean,
  data: any,
  error?: string,
  message: string,
  pagination?: {
    total: number,
    offset: number,
    limit: number,
    hasMore: boolean
  }
}
```

When an error occurs:
- `success` will be `false`
- `error` will contain the error type
- `message` will contain a user-friendly error message

## Features

### Automatic State Management
The `useTransactions` hook automatically manages:
- Loading states
- Error states
- Transaction list updates
- Summary statistics
- Pagination information

### Real-time Updates
When you add, update, or delete transactions:
- The transaction list is automatically updated
- Summary statistics are recalculated
- No need to manually refresh

### Search and Filtering
- Debounced search functionality
- Filter by transaction type (income, expense, transfer)
- Date range filtering
- Category and account filtering

### Pagination Support
- Load more functionality
- Configurable page sizes
- Total count tracking
