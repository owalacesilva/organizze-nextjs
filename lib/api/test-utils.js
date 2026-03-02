/**
 * API Testing Utilities
 * Use these functions to test the transaction API endpoints
 */

const API_BASE = "";

/**
 * Test all API endpoints
 */
export async function runAPITests() {
	console.log("🚀 Starting API Tests...");

	try {
		// Test 1: Get all transactions
		console.log("\n1️⃣ Testing GET /api/transactions");
		const getAllResponse = await fetch(`${API_BASE}/api/transactions`);
		const getAllData = await getAllResponse.json();
		console.log(
			"✅ Get all transactions:",
			getAllData.success ? "PASSED" : "FAILED",
		);
		console.log(`   - Found ${getAllData.data?.length || 0} transactions`);
		console.log(
			`   - Summary: Income: $${getAllData.summary?.totalIncome}, Expenses: $${getAllData.summary?.totalExpenses}`,
		);

		// Test 2: Filter by type
		console.log("\n2️⃣ Testing GET /api/transactions?type=income");
		const incomeResponse = await fetch(
			`${API_BASE}/api/transactions?type=income`,
		);
		const incomeData = await incomeResponse.json();
		console.log(
			"✅ Filter by income:",
			incomeData.success ? "PASSED" : "FAILED",
		);
		console.log(
			`   - Found ${incomeData.data?.length || 0} income transactions`,
		);

		// Test 3: Search transactions
		console.log("\n3️⃣ Testing GET /api/transactions?search=salary");
		const searchResponse = await fetch(
			`${API_BASE}/api/transactions?search=salary`,
		);
		const searchData = await searchResponse.json();
		console.log(
			"✅ Search transactions:",
			searchData.success ? "PASSED" : "FAILED",
		);
		console.log(
			`   - Found ${searchData.data?.length || 0} matching transactions`,
		);

		// Test 4: Create new transaction
		console.log("\n4️⃣ Testing POST /api/transactions");
		const newTransaction = {
			description: "API Test Transaction",
			amount: 25.99,
			type: "expense",
			category: "Shopping",
			account: "Checking Account",
			date: new Date().toISOString().split("T")[0],
		};

		const createResponse = await fetch(`${API_BASE}/api/transactions`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTransaction),
		});
		const createData = await createResponse.json();
		console.log(
			"✅ Create transaction:",
			createData.success ? "PASSED" : "FAILED",
		);

		if (createData.success) {
			const newId = createData.data.id;
			console.log(`   - Created transaction with ID: ${newId}`);

			// Test 5: Get specific transaction
			console.log(`\n5️⃣ Testing GET /api/transactions/${newId}`);
			const getOneResponse = await fetch(
				`${API_BASE}/api/transactions/${newId}`,
			);
			const getOneData = await getOneResponse.json();
			console.log(
				"✅ Get specific transaction:",
				getOneData.success ? "PASSED" : "FAILED",
			);

			// Test 6: Update transaction
			console.log(`\n6️⃣ Testing PUT /api/transactions/${newId}`);
			const updateData = {
				description: "Updated API Test Transaction",
				amount: 30.99,
			};
			const updateResponse = await fetch(
				`${API_BASE}/api/transactions/${newId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updateData),
				},
			);
			const updateResult = await updateResponse.json();
			console.log(
				"✅ Update transaction:",
				updateResult.success ? "PASSED" : "FAILED",
			);

			// Test 7: Delete transaction
			console.log(`\n7️⃣ Testing DELETE /api/transactions/${newId}`);
			const deleteResponse = await fetch(
				`${API_BASE}/api/transactions/${newId}`,
				{
					method: "DELETE",
				},
			);
			const deleteResult = await deleteResponse.json();
			console.log(
				"✅ Delete transaction:",
				deleteResult.success ? "PASSED" : "FAILED",
			);
		}

		// Test 8: Pagination
		console.log(
			"\n8️⃣ Testing pagination GET /api/transactions?limit=3&offset=0",
		);
		const pageResponse = await fetch(
			`${API_BASE}/api/transactions?limit=3&offset=0`,
		);
		const pageData = await pageResponse.json();
		console.log("✅ Pagination:", pageData.success ? "PASSED" : "FAILED");
		console.log(`   - Page size: ${pageData.data?.length || 0}`);
		console.log(`   - Has more: ${pageData.pagination?.hasMore}`);

		console.log("\n🎉 API Tests Completed!");
		return true;
	} catch (error) {
		console.error("❌ API Tests Failed:", error);
		return false;
	}
}

/**
 * Test specific endpoint
 */
export async function testEndpoint(method, endpoint, body = null) {
	try {
		const options = {
			method,
			headers: { "Content-Type": "application/json" },
			...(body && { body: JSON.stringify(body) }),
		};

		const response = await fetch(`${API_BASE}${endpoint}`, options);
		const data = await response.json();

		console.log(`${method} ${endpoint}:`, {
			status: response.status,
			success: data.success,
			data: data.data,
			message: data.message,
		});

		return data;
	} catch (error) {
		console.error(`Error testing ${method} ${endpoint}:`, error);
		throw error;
	}
}

/**
 * Performance test
 */
export async function performanceTest() {
	console.log("⚡ Running Performance Test...");

	const start = performance.now();
	const promises = [];

	// Run 10 concurrent requests
	for (let i = 0; i < 10; i++) {
		promises.push(fetch(`${API_BASE}/api/transactions?limit=5`));
	}

	try {
		await Promise.all(promises);
		const end = performance.now();
		const duration = end - start;

		console.log(
			`✅ 10 concurrent requests completed in ${duration.toFixed(2)}ms`,
		);
		console.log(`   Average: ${(duration / 10).toFixed(2)}ms per request`);

		return { duration, averagePerRequest: duration / 10 };
	} catch (error) {
		console.error("❌ Performance test failed:", error);
		throw error;
	}
}

// Browser console helpers
if (typeof window !== "undefined") {
	window.runAPITests = runAPITests;
	window.testEndpoint = testEndpoint;
	window.performanceTest = performanceTest;

	console.log(`
🧪 API Test utilities loaded!

Available functions:
- runAPITests() - Run all API tests
- testEndpoint(method, endpoint, body) - Test specific endpoint
- performanceTest() - Run performance test

Example usage:
  await runAPITests();
  await testEndpoint('GET', '/api/transactions?type=income');
  await testEndpoint('POST', '/api/transactions', { description: 'Test', amount: 100, type: 'income', category: 'Income', account: 'Test Account', date: '2026-03-01' });
	`);
}
