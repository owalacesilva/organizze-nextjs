// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock window.fetch for all tests
global.fetch = jest.fn();

// Reset mocks before each test
beforeEach(() => {
	jest.clearAllMocks();
});
