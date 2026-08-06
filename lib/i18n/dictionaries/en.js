const en = {
	common: {
		add: "Add",
		all: "All",
		apply: "Apply",
		cancel: "Cancel",
		clear: "Clear",
		clearAll: "Clear all",
		close: "Close",
		confirm: "Confirm",
		delete: "Delete",
		edit: "Edit",
		error: "Error",
		loading: "Loading...",
		none: "None",
		refresh: "Refresh",
		refreshing: "Refreshing...",
		retry: "Try again",
		save: "Save",
		saving: "Saving...",
		search: "Search",
		searchPlaceholder: "Search here...",
		select: "Select",
	},

	nav: {
		dashboard: "Dashboard",
		transactions: "Transactions",
		wallets: "Wallets",
		budgets: "Budgets",
		goals: "Goals",
		profile: "Profile",
		analytics: "Analytics",
		support: "Support",
		referrals: "Referrals",
		settings: "Settings",
	},

	layout: {
		home: "Home",
		collapseSidebar: "Collapse menu",
		expandSidebar: "Expand menu",
		toggleSidebar: "Toggle sidebar",
		language: "Language",
		changeLanguage: "Change language",
		copyright: "© Copyright {{brand}} | All Rights Reserved",
	},

	pagination: {
		rowsPerPage: "Rows per page",
		showing: "Showing {{from}}–{{to}} of {{total}}",
		empty: "No records",
		page: "Page {{page}} of {{pages}}",
		goToPage: "Go to page {{page}}",
		first: "First page",
		previous: "Previous page",
		next: "Next page",
		last: "Last page",
	},

	filters: {
		title: "Filters",
		show: "Show filters",
		hide: "Hide filters",
		active: "{{count}} active",
		active_plural: "{{count}} active",
		clear: "Clear filters",
	},

	transactions: {
		title: "Transactions",
		subtitle: "Track and manage your financial activity",
		add: "New transaction",
		edit: "Edit transaction",
		details: "Transaction details",
		empty: "No transactions found",
		emptyFiltered: "No transactions match the current filters",
		loadError: "Could not load transactions",
		saveError: "Could not save the transaction",
		deleteError: "Could not delete the transaction",
		created: "Transaction created",
		updated: "Transaction updated",
		deleted: "Transaction deleted",
		deleteConfirmTitle: "Delete transaction?",
		deleteConfirmDescription:
			"This action cannot be undone. The transaction “{{description}}” will be permanently removed.",

		fields: {
			amount: "Amount",
			category: "Category",
			date: "Date",
			description: "Description",
			id: "ID",
			type: "Type",
			wallet: "Wallet",
			actions: "Actions",
		},

		placeholders: {
			search: "Search by description or category...",
			amount: "0.00",
			description: "Describe the transaction...",
			selectCategory: "Select a category",
			selectWallet: "Select a wallet",
			selectType: "Select the type",
		},

		types: {
			all: "All",
			income: "Income",
			expense: "Expense",
		},

		periods: {
			label: "Period",
			all: "All time",
			week: "Last 7 days",
			month: "Last 30 days",
			quarter: "Last 90 days",
			year: "Last 12 months",
		},

		amountRange: {
			min: "Min amount",
			max: "Max amount",
		},

		summary: {
			income: "Income",
			expenses: "Expenses",
			balance: "Balance",
			count: "{{count}} transaction",
			count_plural: "{{count}} transactions",
		},

		validation: {
			amountRequired: "Enter an amount greater than zero",
			categoryRequired: "Choose a category",
			dateRequired: "Enter the date",
			descriptionRequired: "Enter a description",
		},
	},
};

export default en;
