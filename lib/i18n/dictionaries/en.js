const en = {
	common: {
		actions: "Actions",
		add: "Add",
		all: "All",
		apply: "Apply",
		back: "Back",
		cancel: "Cancel",
		clear: "Clear",
		clearAll: "Clear all",
		close: "Close",
		color: "Color",
		confirm: "Confirm",
		copied: "Copied to clipboard",
		copy: "Copy",
		create: "Create",
		delete: "Delete",
		disable: "Disable",
		edit: "Edit",
		enable: "Enable",
		error: "Error",
		loading: "Loading...",
		name: "Name",
		next: "Next",
		none: "None",
		notSet: "Not set",
		optional: "optional",
		previous: "Previous",
		refresh: "Refresh",
		refreshing: "Refreshing...",
		remove: "Remove",
		retry: "Try again",
		save: "Save",
		saving: "Saving...",
		search: "Search",
		searchPlaceholder: "Search here...",
		select: "Select",
		total: "Total",
		viewAll: "View all",
	},

	nav: {
		dashboard: "Dashboard",
		transactions: "Transactions",
		import: "Import",
		insights: "Insights",
		wallets: "Wallets",
		budgets: "Budgets",
		goals: "Goals",
		quotes: "Quotes",
		profile: "Profile",
		analytics: "Analytics",
		categories: "Categories",
		settings: "Settings",
	},

	layout: {
		home: "Home",
		breadcrumb: "Breadcrumb",
		collapseSidebar: "Collapse menu",
		expandSidebar: "Expand menu",
		toggleSidebar: "Toggle sidebar",
		language: "Language",
		changeLanguage: "Change language",
		copyright: "© Copyright {{brand}} | All Rights Reserved",
		theme: "Theme",
		toggleTheme: "Toggle theme",
		themeLight: "Light",
		themeDark: "Dark",
		themeSystem: "System",
		notifications: "Notifications",
		notificationsEmpty: "No notifications",
		markAllRead: "Mark all as read",
		myAccount: "My account",
		logout: "Log out",
	},

	notifications: {
		viewAll: "View all notifications",
		minutesAgo: "{{count}} minute ago",
		minutesAgo_plural: "{{count}} minutes ago",
		hoursAgo: "{{count}} hour ago",
		hoursAgo_plural: "{{count}} hours ago",

		samples: {
			transactionCreated: {
				title: "Transaction recorded",
				description: "A new expense was added to your checking account.",
			},
			budgetExceeded: {
				title: "Budget limit reached",
				description: "Your groceries budget is at 100% for this month.",
			},
			goalReached: {
				title: "Goal milestone",
				description: "Your emergency fund passed 40% of the target.",
			},
			securityAlert: {
				title: "New sign-in",
				description: "A new device signed in to your account.",
			},
		},
	},

	auth: {
		welcome: "Welcome to {{brand}}",
		twoFactorHelp: "Trouble with two-factor authentication?",
		privacyPolicy: "Privacy policy",

		signIn: {
			title: "Sign in",
			submit: "Sign in",
			submitting: "Signing in...",
			noAccount: "Don't have an account? Sign up",
			forgot: "Forgot your password?",
			error: "Invalid email or password",
			mockHint: "Demo account: {{email}} / {{password}}",
		},

		signUp: {
			title: "Create account",
			submit: "Create account",
			hasAccount: "Already have an account? Sign in",
			passwordMismatch: "The passwords do not match",
		},

		reset: {
			title: "Reset password",
			submit: "Send reset link",
			remember: "Remembered your password? Sign in",
			sent: "We sent a reset link to your e-mail",
		},

		phone: {
			title: "Phone verification",
			willSend: "We'll send a verification code to {{phone}}",
			sendOtp: "Send code",
			otp: "Verification code",
			otpPlaceholder: "Enter the code",
			verify: "Verify code",
		},

		email: {
			title: "E-mail verification",
			verifying: "Verifying your e-mail",
			confirming: "Confirming {{email}}",
			moment: "This only takes a moment...",
			verified: "E-mail verified",
			verifiedDescription: "Your e-mail address has been confirmed",
			redirecting: "Taking you to the dashboard...",
		},

		success: {
			title: "All set",
			message: "Your account has been created and verified.",
			continue: "Continue",
		},

		fields: {
			email: "E-mail",
			emailPlaceholder: "Enter your e-mail",
			password: "Password",
			passwordPlaceholder: "Enter your password",
			createPassword: "Create a password",
			confirmPassword: "Confirm password",
			confirmPasswordPlaceholder: "Repeat the password",
			phone: "Phone",
			phonePlaceholder: "Enter your phone number",
			showPassword: "Show password",
			hidePassword: "Hide password",
		},

		strength: {
			label: "Password strength",
			tooWeak: "Too weak",
			weak: "Weak",
			medium: "Medium",
			strong: "Strong",
		},
	},

	countries: {
		br: "Brazil",
		us: "United States",
		pt: "Portugal",
		ca: "Canada",
		uk: "United Kingdom",
		de: "Germany",
		fr: "France",
		jp: "Japan",
	},

	search: {
		title: "Search",
		placeholder: "Search for features...",
		beta: "In testing",
		group: "Pages",
		emptyTitle: "Find features across the system",
		emptyDescription: "Use the search to go straight to what you need",
		trySearching: "Try searching for words like:",
		noResults: "Nothing found",
		noResultsHint: 'No feature matches "{{term}}"',

		// Comma-separated synonyms, so a search lands on the right page even
		// when the word typed is nowhere in its title.
		keywords: {
			dashboard: "dashboard, home, overview, summary, balance",
			transactions: "transactions, entries, expenses, income, statement, spending",
			wallets: "wallets, accounts, cards, bank, balance",
			budgets: "budgets, limits, planning, spending cap",
			goals: "goals, targets, savings, reserve",
			quotes: "quotes, stocks, market, real estate funds, treasury, currencies, dollar, crypto, bitcoin",
			analytics: "analytics, charts, reports, trends",
			insights: "insights, recommendations, tips, alerts",
			import: "import, csv, statement, spreadsheet, upload",
			categories: "categories, groups, classification, labels",
			profile: "profile, account, personal details, name, photo",
			settings: "settings, preferences, security, tags, language, api",
		},
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
		expandRow: "Show details",
		collapseRow: "Hide details",
		expandAll: "Expand all rows",
		collapseAll: "Collapse all rows",
		recent: "Recent transactions",

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

	import: {
		title: "Import statement",
		subtitle: "Bring transactions in from a bank statement in CSV",
		nav: "Import",

		historyTitle: "Uploads",
		historyHint: "Every statement you've brought in, newest first",
		historyEmpty: "Nothing has been imported yet",
		historyError: "Could not load the upload history",
		uploadedAt: "Sent {{date}}",
		rowsSummary: "{{imported}} of {{total}} rows",
		removeUpload: "Remove from the history",
		uploadRemoved: "Removed from the history",

		statuses: {
			processing: "Importing",
			completed: "Completed",
			partial: "Partly imported",
			failed: "Failed",
		},

		dropTitle: "Drop your CSV here",
		dropHint: "or click to choose a file — .csv only, up to {{size}} MB",
		chooseFile: "Choose file",
		replaceFile: "Choose another file",
		fileSummary: "{{name}} · {{count}} row",
		fileSummary_plural: "{{name}} · {{count}} rows",

		onlyCsv: "Only .csv files can be imported",
		emptyFile: "This file has no rows",
		readError: "Could not read the file",
		tooLarge: "The file is larger than {{size}} MB",

		columnsTitle: "Match the columns",
		columnsHint: "We guessed from the header — adjust anything that looks wrong.",
		hasHeader: "First row holds the column names",
		ignore: "Do not import",
		column: "Column {{index}}",

		defaults: "Defaults",
		defaultCategory: "Category for unmatched rows",
		defaultCategoryHint:
			"Used whenever the file has no category, or names one we don't know.",
		defaultWallet: "Wallet",

		previewTitle: "Preview",
		previewHint: "Showing the first {{count}} of {{total}} rows",
		ready: "{{count}} ready to import",
		ready_plural: "{{count}} ready to import",
		skipped: "{{count}} will be skipped",
		skipped_plural: "{{count}} will be skipped",
		status: "Status",
		rowOk: "Ready",
		rowInvalid: "Missing: {{fields}}",

		importAction: "Import {{count}} transaction",
		importAction_plural: "Import {{count}} transactions",
		importing: "Importing {{done}} of {{total}}...",
		imported: "{{count}} transaction imported",
		imported_plural: "{{count}} transactions imported",
		importFailed: "Could not import the statement",
		partial: "{{imported}} imported, {{failed}} failed",
		noValidRows: "No row in this file can be imported yet",
		startOver: "Import another file",
		viewTransactions: "See the transactions",
	},

	wallets: {
		title: "Wallets",
		subtitle: "Accounts, cards and cash you keep track of",
		add: "New wallet",
		edit: "Edit wallet",
		empty: "No wallets yet",
		emptyHint: "Create a wallet to start organising your balances.",
		loadError: "Could not load wallets",
		saveError: "Could not save the wallet",
		deleteError: "Could not delete the wallet",
		created: "Wallet created",
		updated: "Wallet updated",
		deleted: "Wallet deleted",
		deleteConfirmTitle: "Delete wallet?",
		deleteConfirmDescription:
			"This action cannot be undone. The wallet “{{name}}” will be permanently removed.",
		totalBalance: "Total balance",
		availableBalance: "Available balance",
		creditLimit: "Credit limit",
		positiveBalances: "Positive balances",
		negativeBalances: "Amounts owed",
		balanceOverTime: "Balance over time",
		distribution: "Balance by wallet",
		count: "{{count}} wallet",
		count_plural: "{{count}} wallets",

		fields: {
			name: "Name",
			type: "Type",
			balance: "Current balance",
			currency: "Currency",
			creditLimit: "Credit limit",
		},

		placeholders: {
			name: "e.g. Checking account",
			balance: "0.00",
			creditLimit: "0.00",
			selectType: "Select the type",
			selectCurrency: "Select the currency",
		},

		types: {
			checking: "Checking account",
			savings: "Savings",
			credit: "Credit card",
			cash: "Cash",
			investment: "Investments",
		},

		validation: {
			nameRequired: "Enter a name",
			typeRequired: "Choose a type",
			balanceInvalid: "Enter a valid balance",
			creditLimitInvalid: "Enter a valid credit limit",
		},
	},

	budgets: {
		title: "Budgets",
		subtitle: "Spending limits per category",
		add: "New budget",
		edit: "Edit budget",
		empty: "No budgets yet",
		emptyHint: "Set a limit per category to keep spending on track.",
		loadError: "Could not load budgets",
		saveError: "Could not save the budget",
		deleteError: "Could not delete the budget",
		created: "Budget created",
		updated: "Budget updated",
		deleted: "Budget deleted",
		deleteConfirmTitle: "Delete budget?",
		deleteConfirmDescription:
			"This action cannot be undone. The budget “{{name}}” will be permanently removed.",
		spent: "Spent",
		limit: "Limit",
		remaining: "Remaining",
		exceededBy: "Over by {{amount}}",
		usage: "{{percent}}% used",
		allCategories: "All categories",
		totalBudgeted: "Total budgeted",
		totalSpent: "Total spent",
		monthlyTrend: "Monthly spending trend",
		details: "Budget details",
		dailyAverage: "Daily average",
		projected: "Projected for the month",
		daysLeft: "{{count}} day left in the month",
		daysLeft_plural: "{{count}} days left in the month",
		onTrack: "On track",
		spendingFast: "Spending faster than planned",
		willExceed: "At this rate the limit is passed before the month ends",
		relatedTransactions: "Transactions in this budget",
		noTransactions: "Nothing charged to this budget yet",
		spentOf: "{{spent}} of {{limit}}",

		fields: {
			name: "Name",
			amount: "Amount",
			period: "Period",
			category: "Category",
		},

		placeholders: {
			name: "e.g. Groceries",
			amount: "0.00",
			selectPeriod: "Select the period",
			selectCategory: "Select a category",
		},

		periods: {
			week: "Weekly",
			month: "Monthly",
			quarter: "Quarterly",
			year: "Yearly",
		},

		validation: {
			nameRequired: "Enter a name",
			amountRequired: "Enter an amount greater than zero",
			periodRequired: "Choose a period",
		},
	},

	goals: {
		title: "Goals",
		subtitle: "What you are saving towards",
		add: "New goal",
		edit: "Edit goal",
		empty: "No goals yet",
		emptyHint: "Create a goal to track how much you have put aside.",
		loadError: "Could not load goals",
		saveError: "Could not save the goal",
		deleteError: "Could not delete the goal",
		created: "Goal created",
		updated: "Goal updated",
		deleted: "Goal deleted",
		deleteConfirmTitle: "Delete goal?",
		deleteConfirmDescription:
			"This action cannot be undone. The goal “{{name}}” will be permanently removed.",
		saved: "Saved",
		target: "Target",
		remaining: "Remaining",
		completed: "Completed",
		deadline: "Deadline",
		noDeadline: "No deadline",
		totalSaved: "Total saved",
		totalTarget: "Total target",
		progress: "{{percent}}% of the target",
		details: "Goal details",
		monthlyNeeded: "Needed per month",
		monthsLeft: "{{count}} month to the deadline",
		monthsLeft_plural: "{{count}} months to the deadline",
		overdue: "The deadline has passed",
		onTrack: "On track",
		addContribution: "Add to this goal",
		contributionAmount: "Amount to add",
		contribute: "Add",
		contributionAdded: "Goal updated",
		contributionInvalid: "Enter an amount greater than zero",
		completedHint: "Target reached — nice one.",
		linkedWallet: "Money kept in",

		fields: {
			name: "Name",
			target: "Target amount",
			saved: "Already saved",
			deadline: "Deadline",
			wallet: "Wallet",
		},

		placeholders: {
			name: "e.g. Emergency fund",
			target: "0.00",
			saved: "0.00",
			selectWallet: "Select a wallet",
		},

		validation: {
			nameRequired: "Enter a name",
			targetRequired: "Enter an amount greater than zero",
			savedInvalid: "The saved amount cannot exceed the target",
		},
	},

	quotes: {
		title: "Quotes",
		subtitle: "Market prices across stocks, funds, bonds, currencies and crypto",
		menu: "Asset class",
		searchPlaceholder: "Search quotes...",
		updatedAt: "Updated at {{time}}",
		loadError: "The quotes could not be loaded",
		empty: "No quotes available",
		noMatches: "No quotes match your search",
		noMatchesHint: 'Nothing found for "{{term}}"',
		viewDetails: "View details for {{name}}",

		view: {
			table: "Table",
			cards: "Cards",
			showTable: "Show as table",
			showCards: "Show as cards",
		},

		details: {
			matured: "Matured",
			yearsToMaturity: "{{count}} year left",
			yearsToMaturity_plural: "{{count}} years left",
		},

		tabs: {
			stocks: "Stocks",
			fiis: "Real estate funds",
			treasury: "Treasury bonds",
			currencies: "Currencies",
			crypto: "Crypto",
		},

		columns: {
			symbol: "Ticker",
			asset: "Asset",
			bond: "Bond",
			pair: "Pair",
			sector: "Sector",
			segment: "Segment",
			indexer: "Index",
			maturity: "Maturity",
			rate: "Annual rate",
			unitPrice: "Unit price",
			minimumInvestment: "Minimum",
			price: "Price",
			change: "Change",
			change24h: "24h",
			dayRange: "Day range",
			range24h: "24h range",
			volume: "Volume",
			volume24h: "24h volume",
			marketCap: "Market cap",
			dividendYield: "Dividend yield",
			lastDividend: "Last dividend",
			priceToBook: "P/BV",
			bid: "Bid",
			ask: "Ask",
			previousClose: "Prev. close",
			changeValue: "Change amount",
			spread: "Spread",
			annualisedDividend: "Annualised dividend",
			timeToMaturity: "Time to maturity",
		},

		sectors: {
			beverages: "Beverages",
			carRental: "Car rental",
			financial: "Financials",
			health: "Health",
			industrials: "Industrials",
			mining: "Mining",
			oilGas: "Oil and gas",
			pulpPaper: "Pulp and paper",
			retail: "Retail",
			utilities: "Utilities",
		},

		segments: {
			corporate: "Office space",
			fundOfFunds: "Fund of funds",
			hybrid: "Hybrid",
			logistics: "Logistics",
			malls: "Shopping malls",
			receivables: "Receivables",
		},

		indexers: {
			ipca: "Inflation",
			prefixado: "Fixed rate",
			selic: "Floating",
		},

		// The annual rate reads as a spread over an index, or as a flat rate.
		rateFormat: {
			ipca: "IPCA + {{rate}}%",
			prefixado: "{{rate}}%",
			selic: "SELIC + {{rate}}%",
		},

		currencyNames: {
			ARS: "Argentine peso",
			AUD: "Australian dollar",
			CAD: "Canadian dollar",
			CHF: "Swiss franc",
			EUR: "Euro",
			GBP: "Pound sterling",
			JPY: "Japanese yen",
			USD: "US dollar",
		},
	},

	tags: {
		title: "Tags",
		subtitle: "Labels you can attach to transactions",
		add: "New tag",
		edit: "Edit tag",
		empty: "No tags yet",
		emptyHint: "Create a tag to group transactions across categories.",
		loadError: "Could not load tags",
		saveError: "Could not save the tag",
		deleteError: "Could not delete the tag",
		created: "Tag created",
		updated: "Tag updated",
		deleted: "Tag deleted",
		deleteConfirmTitle: "Delete tag?",
		deleteConfirmDescription:
			"This action cannot be undone. The tag “{{name}}” will be permanently removed.",
		count: "{{count}} tag",
		count_plural: "{{count}} tags",
		preview: "Preview",

		fields: {
			name: "Name",
			color: "Color",
		},

		placeholders: {
			name: "e.g. Recurring",
		},

		validation: {
			nameRequired: "Enter a name",
			nameDuplicated: "A tag with this name already exists",
		},
	},

	categories: {
		title: "Categories",
		subtitle: "How your income and expenses are grouped",
		add: "New category",
		edit: "Edit category",
		empty: "No categories yet",
		created: "Category created",
		updated: "Category updated",
		deleted: "Category deleted",
		saveError: "Could not save the category",
		deleteError: "Could not delete the category",
		deleteConfirmTitle: "Delete category?",
		deleteConfirmDescription:
			"This action cannot be undone. The category “{{name}}” will be permanently removed.",

		fields: {
			name: "Name",
			description: "Description",
			color: "Color",
			type: "Type",
			available: "Available",
		},

		placeholders: {
			name: "Category name",
			description: "What belongs in this category?",
			selectType: "Select the type",
		},

		types: {
			earnings: "Income",
			expenses: "Expenses",
		},

		validation: {
			nameRequired: "Enter a name",
			typeRequired: "Choose a type",
		},
	},

	settings: {
		title: "Settings",
		subtitle: "Preferences for your account and workspace",
		menu: "Settings section",

		tabs: {
			account: "Account",
			general: "General",
			profile: "Profile",
			addBank: "Add bank",
			security: "Security",
			session: "Sessions",
			categories: "Categories",
			currencies: "Currencies",
			tags: "Tags",
			api: "API",
		},

		general: {
			preferences: "Preferences",
			primaryCurrency: "Primary currency",
			timeZone: "Time zone",
			notifications: "Notifications",
			notifyMoney: "Money is sent or received",
			notifyMerchant: "A merchant order arrives",
			notifyRecommendations: "There are recommendations for my account",
			saved: "Preferences saved",
		},

		profileForm: {
			userProfile: "User profile",
			avatarHint: "Maximum file size is 20 MB",
			chooseFile: "Choose file",
			noFileChosen: "No file chosen",
			credentials: "Sign-in details",
			newEmail: "New e-mail",
			newPassword: "New password",
			twoFactorHint: "Enable two-factor authentication on the security tab",
			personalInformation: "Personal information",
			fullName: "Full name",
		},

		api: {
			createTitle: "Create API key",
			generateKey: "Generate new key",
			confirmPassphrase: "Confirm passphrase",
			keysTitle: "Your API keys",
			key: "Key",
			status: "Status",
			empty: "No API keys yet",
		},

		currencies: {
			rate: "1 {{from}} = {{rate}} {{to}}",
			exchangeTitle: "Currency exchange",
			currency: "Currency",
			paymentMethod: "Payment method",
			amount: "Amount",
			monthlyLimit: "Monthly limit",
			remaining: "{{amount}} remaining",
			exchangeNow: "Exchange now",
			detailsTitle: "Exchange details",
			exchangeAmount: "Amount",
			exchangeRate: "Rate",
			fee: "Fee",
			vat: "VAT",
			subtotal: "Subtotal",

			methods: {
				bank: "Bank transfer",
				card: "Credit card",
				pix: "Pix",
				wallet: "Digital wallet",
			},
		},

		session: {
			thirdParty: "Third-party applications",
			thirdPartyEmpty: "You haven't authorized any applications yet.",
			thirdPartyHint:
				"Once an application is connected to your account you can manage or revoke its access here.",
			authorizeNow: "Authorize an application",
			webSessions: "Web sessions",
			confirmedDevices: "Confirmed devices",
			accountActivity: "Account activity",
			closeAccount: "Close account",
			closeAccountHint: "Withdraw your funds and close your account —",
			cannotBeUndone: "this cannot be undone.",
			closeAccountAction: "Close my account",

			columns: {
				signedIn: "Signed in",
				confirmed: "Confirmed",
				browser: "Browser",
				ipAddress: "IP address",
				near: "Near",
				current: "Current",
				action: "Action",
				source: "Source",
				location: "Location",
				when: "When",
			},

			actions: {
				signin: "Signed in",
				signout: "Signed out",
				secondFactor: "Second factor verified",
				deviceConfirmed: "Device confirmed",
			},

			sources: {
				api: "API",
				web: "Web",
			},
		},

		security: {
			idCardTitle: "Identity document",
			emailTitle: "E-mail verification",
			phoneTitle: "Phone verification",
			verified: "Verified",
			pending: "Verification pending",
			chooseFile: "Choose file",
			dropHint: "Drag and drop your document, or click to browse",
			formatsHint: "Supported formats: JPG, PNG, PDF. Max size: 5 MB",

			addId: "Add new document",
			addIdDescription: "Upload an identification document to verify your identity.",
			idType: "Document type",
			idNumber: "Document number",
			idNumberPlaceholder: "Enter the document number",
			expiryDate: "Expiry date",
			uploadId: "Upload document",
			submitVerification: "Submit for verification",

			addEmail: "Add new e-mail",
			addEmailDescription:
				"Enter a new e-mail address. We'll send a code to confirm it.",
			emailAddress: "E-mail address",
			emailPlaceholder: "Enter your e-mail address",
			purpose: "Purpose",
			verificationCode: "Verification code",
			sendCode: "Send code",
			emailCodeHint: "Enter the 6-digit code sent to your e-mail",
			verifyAddEmail: "Verify and add",

			addPhone: "Add new phone",
			addPhoneDescription:
				"Enter a new phone number. We'll send a code by SMS to confirm it.",
			country: "Country",
			phoneNumber: "Phone number",
			phonePlaceholder: "Enter your phone number",
			smsCode: "SMS code",
			smsCodeHint: "Enter the 6-digit code sent to your phone",
			verifyAddPhone: "Verify and add",

			idTypes: {
				passport: "Passport",
				driver: "Driver's license",
				national: "National ID card",
			},

			purposes: {
				primary: "Primary",
				work: "Work",
				personal: "Personal",
				recovery: "Recovery",
			},

			passwordTitle: "Password",
			currentPassword: "Current password",
			newPassword: "New password",
			confirmPassword: "Confirm new password",
			updatePassword: "Update password",
		},

		bank: {
			title: "Bank accounts and cards",
			manage: "Manage",
			verified: "Verified",
			addBank: "Add bank account",
			addCard: "Add card",
			saveChanges: "Save changes",
			defaultMethod: "Set as default payment method",

			manageBankTitle: "Manage bank account",
			manageBankDescription: "{{name}} — account ending in {{digits}}",
			nickname: "Account nickname",
			editDetails: "Edit details",
			removeAccount: "Remove account",

			editBankTitle: "Edit bank account",
			editBankDescription: "Update your bank account details below.",
			bankName: "Bank name",
			accountNumber: "Account number",
			routingNumber: "Routing number",
			accountType: "Account type",
			accountHolder: "Account holder",

			manageCardTitle: "Manage card",
			manageCardDescription: "{{name}} — card ending in {{digits}}",
			cardNickname: "Card nickname",
			billingAddress: "Billing address",
			editCardDetails: "Edit card details",
			removeCard: "Remove card",

			editCardTitle: "Edit card",
			editCardDescription: "Update your card details below.",
			nameOnCard: "Name on card",
			cardNumber: "Card number",
			cardNumberHint:
				"For security reasons the card number cannot be edited. Add a new card instead.",
			expiryDate: "Expiry date",
			cvv: "CVV",
			cardType: "Card type",

			addBankTitle: "New bank account",
			addBankDescription: "Enter your bank details to connect the account.",
			addCardTitle: "New card",
			addCardDescription: "Enter your card details to add a payment method.",

			accountTypes: {
				checking: "Checking",
				savings: "Savings",
				business: "Business",
			},

			billingAddresses: {
				home: "Home address",
				work: "Work address",
				other: "Other address",
			},

			cardTypes: {
				visa: "Visa",
				mastercard: "Mastercard",
				amex: "American Express",
				elo: "Elo",
			},
		},

		account: {
			welcome: "Welcome, {{name}}!",
			unverifiedHint:
				"Your account isn't verified yet. Verify it to unlock every feature.",
			verifyAccount: "Verify account",
			twoFactor: "Two-factor authentication (2FA)",

			verifyUpgrade: "Verification",
			status: "Account status",
			statusPending: "Pending",
			unverifiedDescription:
				"An unverified account cannot move money in or out. Get verified to enable it.",
			getVerified: "Get verified",

			information: "Information",
			userId: "User ID",
			emailAddress: "E-mail address",
			joinedSince: "Member since",
			type: "Type",
			countryOfResidence: "Country of residence",

			downloadApp: "Mobile app",
			downloadAppHint:
				"Verifying your identity in the mobile app is faster and more secure.",
			appStore: "App Store",
			googlePlay: "Google Play",

			editTitle: "Edit account information",
			editDescription:
				"Your user ID and the date you joined cannot be changed.",
			emailChangeHint:
				"Changing your e-mail requires verifying the new address.",
			accountType: "Account type",
			countryChangeHint:
				"Changing your country may affect the rules that apply to your account.",
			importantTitle: "Good to know",
			importantHint:
				"Updating your details may require extra verification. Some changes take up to 48 hours.",
			saveChanges: "Save changes",

			twoFactorTitle: "Two-factor authentication",
			twoFactorDescription:
				"Add an extra layer of security by requiring a second step at sign-in.",
			authenticatorApp: "Authenticator app",
			smsVerification: "SMS",
			qrHint:
				"Scan this QR code with your authenticator app (Google Authenticator, Authy, …).",
			enterCode: "Verification code",
			codePlaceholder: "6-digit code",
			phoneNumber: "Phone number",
			sendCode: "Send code",
			backupCodesSaved: "I have saved my backup codes",
			backupCodesHint:
				"Backup codes let you in if you lose your phone or can't receive codes.",
			downloadBackupCodes: "Download backup codes",
			enable2fa: "Enable 2FA",

			verifyTitle: "Verify your account",
			verifyDescription: "Complete the steps below to unlock every feature.",
			step1: "Step 1: personal information",
			step2: "Step 2: document",
			step3: "Step 3: selfie",
			continueToId: "Continue to the document",
			continueToSelfie: "Continue to the selfie",
			submitVerification: "Submit verification",
			idTypeLabel: "Document type",
			idNumberPlaceholder: "Enter your document number",
			uploadFront: "Front of the document",
			uploadBack: "Back of the document",
			selfieHint:
				"Take a clear selfie holding your document next to your face. Both must be readable.",
			takePhoto: "Take photo",
			uploadPhoto: "Upload photo",
			selfieDisclaimer: "Your selfie is used for identity verification only.",
			tipsTitle: "Tips",
			tip1: "Make sure the lighting is good",
			tip2: "Remove glasses, hats or anything covering your face",
			tip3: "Hold the document beside your face, without covering it",
			tip4: "Every piece of text on the document must be readable",

			accountTypes: {
				personal: "Personal",
				business: "Business",
				corporate: "Corporate",
			},

			idTypes: {
				passport: "Passport",
				driving: "Driver's license",
				national: "National ID card",
			},
		},

		categories: {
			createTitle: "New category",
			incomeTitle: "Income categories",
			expenseTitle: "Expense categories",
			emptyIncome: "No income categories yet",
			emptyExpense: "No expense categories yet",
			icon: "Icon",
			choose: "Choose...",
			preview: "Preview",

			icons: {
				sparkles: "Beauty",
				file: "Documents",
				car: "Car",
				education: "Education",
				entertainment: "Entertainment",
				family: "Family",
				food: "Food",
				salary: "Salary",
				groceries: "Groceries",
				healthcare: "Health",
				home: "Home",
				shopping: "Shopping",
				sports: "Sports",
				hobbies: "Hobbies",
				travel: "Travel",
				transport: "Transport",
				work: "Work",
				business: "Business",
				gifts: "Gifts",
				insurance: "Insurance",
				loan: "Loan",
				other: "Other",
			},
		},
	},

	dashboard: {
		title: "Dashboard",
		subtitle: "An overview of your finances",
		totalBalance: "Total balance",
		periodChange: "Change in the period",
		periodExpenses: "Expenses in the period",
		periodIncome: "Income in the period",
		lastMonth: "Last month {{value}}",
		balanceTrends: "Balance trends",
		expensesBreakdown: "Expenses breakdown",
		monthlyBudgets: "Monthly budgets",
		incomeVsExpenses: "Income vs expenses",
		weeklyExpenses: "Weekly expenses",
		paymentsHistory: "Payment history",
		savingGoals: "Saving goals",
		transactionHistory: "Transaction history",
		periodLabel: "Last 30 days",
		vsPrevious: "vs previous period",
		expensesByCategory: "Expenses by category",
		noBudgets: "No budgets set",
		noGoals: "No goals set",
		uncategorized: "Uncategorized",
		empty: "Nothing to show yet",
	},

	insights: {
		title: "Insights",
		subtitle: "What your numbers are saying this month",
		empty: "Not enough activity this month to say anything useful yet",
		emptyHint: "Add a few transactions — or import a statement — and come back.",
		refreshed: "Based on {{month}}",

		summary: {
			income: "Income this month",
			expenses: "Spent this month",
			net: "Left over",
			savingsRate: "Savings rate",
		},

		sections: {
			attention: "Needs your attention",
			context: "Worth knowing",
			wins: "Going well",
			whereItGoes: "Where the money goes",
		},

		recurringTitle: "Recurring charges",
		recurringEmpty: "Nothing repeats across the last three months yet",
		recurringMonthly: "{{amount}} a month",

		items: {
			spendingUp: {
				title: "Spending is up",
				body: "You've spent {{current}} so far — {{percent}}% more than by this point last month ({{previous}}).",
			},
			spendingDown: {
				title: "Spending is down",
				body: "You've spent {{current}} so far — {{percent}}% less than by this point last month ({{previous}}).",
			},
			spendingSteady: {
				title: "Spending is steady",
				body: "{{current}} so far, in line with last month.",
			},
			savingsRate: {
				title: "You're keeping {{percent}}% of what came in",
				body: "That's {{saved}} still unspent this month.",
			},
			spendingOverIncome: {
				title: "Spending more than you earned",
				body: "This month is {{percent}}% past your income — {{saved}} in the red.",
			},
			topCategory: {
				title: "{{category}} leads the month",
				body: "{{amount}}, which is {{percent}}% of everything spent.",
			},
			budgetExceeded: {
				title: "A budget has been passed",
				body: "{{name}} is at {{percent}}% of its limit. {{count}} budget needs attention.",
			},
			budgetAtRisk: {
				title: "A budget is heading over",
				body: "At this rate {{name}} ends the month around {{projected}}.",
			},
			budgetsHealthy: {
				title: "Budgets are on track",
				body: "All {{count}} of them are pacing within their limits.",
			},
			goalOverdue: {
				title: "A goal has passed its deadline",
				body: "{{name}} didn't make it in time — worth a new date or a new target.",
			},
			goalPace: {
				title: "{{name}} needs {{amount}} a month",
				body: "It's {{percent}}% funded and that's the pace to finish on time.",
			},
			creditUsage: {
				title: "{{name}} is close to its limit",
				body: "{{percent}}% of the credit line is already committed.",
			},
			recurring: {
				title: "{{count}} charges repeat every month",
				body: "About {{amount}} a month, led by {{top}}.",
			},
			incomeUp: {
				title: "Income is up",
				body: "{{current}} came in this month — {{percent}}% more than by this point last month.",
			},
			incomeDown: {
				title: "Income is down",
				body: "{{current}} so far — {{percent}}% less than by this point last month ({{previous}}).",
			},
			projectedSpending: {
				title: "On track to spend {{projected}}",
				body: "That's where the month lands if the current pace holds.",
			},
			projectedOverIncome: {
				title: "This month is heading past your income",
				body: "At this pace you'll spend {{projected}} — {{gap}} more than came in.",
			},
			categorySpike: {
				title: "{{category}} is running hot",
				body: "{{amount}} so far, {{percent}}% above the {{average}} it usually reaches by now.",
			},
			categoryDrop: {
				title: "{{category}} has cooled off",
				body: "{{amount}} so far, {{percent}}% below the {{average}} it usually reaches by now.",
			},
			budgetRoom: {
				title: "{{name}} still has room",
				body: "{{amount}} unspent with the month nearly over — that could go towards a goal.",
			},
			goalCompleted: {
				title: "{{name}} is done",
				body: "Target reached. {{count}} goal is complete.",
				body_plural: "Target reached. {{count}} goals are complete.",
			},
			emergencyStrong: {
				title: "{{months}} months of cover",
				body: "{{amount}} set aside — comfortably more than a typical month of spending.",
			},
			emergencyCoverage: {
				title: "{{months}} months of cover",
				body: "{{amount}} set aside, measured against your usual monthly spending.",
			},
			emergencyThin: {
				title: "Less than a month of cover",
				body: "{{amount}} set aside against a typical month of spending.",
			},
			possibleDuplicate: {
				title: "Possible duplicate charge",
				body: "{{description}} of {{amount}} shows up twice within a few days — worth a check.",
				body_plural: "{{count}} charges show up twice within a few days, starting with {{description}} of {{amount}}.",
			},
			uncategorized: {
				title: "Rows without a category",
				body: "{{count}} row this month has no category, worth {{amount}}.",
				body_plural: "{{count}} rows this month have no category, worth {{amount}} together.",
			},
			weekdayPattern: {
				title: "{{weekday}} is your most expensive day",
				body: "{{percent}}% of the month's spending lands on {{weekday}} — {{amount}}.",
			},
			smallCharges: {
				title: "Small charges add up",
				body: "{{count}} small charge accounts for {{amount}}, {{percent}}% of the month.",
				body_plural: "{{count}} small charges add up to {{amount}}, {{percent}}% of the month.",
			},
			walletConcentration: {
				title: "Most spending goes through {{name}}",
				body: "{{percent}}% of the month — {{amount}}.",
			},
			biggestExpense: {
				title: "One charge dominates the month",
				body: "{{description}} took {{amount}} — {{percent}}% of everything spent.",
			},
		},
	},

	topExpenses: {
		title: "Biggest expenses of the month",
		subtitle: "Where most of {{month}} went",
		empty: "No expenses recorded this month",
		share: "{{percent}}% of the month",
		total: "Top {{count}} add up to {{amount}}",
		rank: "#{{position}}",
	},

	analytics: {
		title: "Analytics",
		subtitle: "Trends across your income and spending",

		tabs: {
			overview: "Overview",
			expenses: "Expenses",
			income: "Income",
			incomeVsExpenses: "Income vs expenses",
			balance: "Balance",
			history: "Transaction history",
		},

		totalIncome: "Total income",
		totalExpenses: "Total expenses",
		netBalance: "Net balance",
		byCategory: "By category",
		byMonth: "By month",
		averagePerMonth: "Monthly average",
		biggestExpense: "Biggest expense",
		biggestIncome: "Biggest income",
		savingsRate: "Savings rate",
		savings: "Savings",
		activeCategories: "Active categories",
		share: "Share",
		balanceEvolution: "Balance evolution",
		empty: "Not enough data for this period",
	},

	profile: {
		title: "Profile",
		subtitle: "Your personal details",
		personalInfo: "Personal information",
		contact: "Contact",
		preferences: "Preferences",
		memberSince: "Member since {{date}}",
		editProfile: "Edit profile",
		plan: "Premium",
		monthlyBudget: "Monthly budget",
		spentPercent: "{{percent}}% spent",
		remainingPercent: "{{percent}}% remaining",
		recentSpending: "Recent spending",
		activeWallet: "Main wallet",
		secondaryWallet: "Secondary wallet",
		manage: "Manage",
		noWallets: "No wallets connected",
		saved: "Profile updated",

		fields: {
			firstName: "First name",
			lastName: "Last name",
			email: "E-mail",
			phone: "Phone",
			birthDate: "Date of birth",
			address: "Address",
			city: "City",
			postalCode: "Postal code",
			country: "Country",
			language: "Language",
			currency: "Currency",
		},
	},
};

export default en;
