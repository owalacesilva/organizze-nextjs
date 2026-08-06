// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock window.fetch for all tests
global.fetch = jest.fn();

// Radix primitives (Select, Dialog, Collapsible…) call browser APIs that jsdom
// does not implement. Stub them so component tests can drive real interactions.
if (typeof window !== "undefined") {
	const noop = () => {};

	window.HTMLElement.prototype.scrollIntoView = noop;
	window.HTMLElement.prototype.hasPointerCapture = () => false;
	window.HTMLElement.prototype.setPointerCapture = noop;
	window.HTMLElement.prototype.releasePointerCapture = noop;

	global.ResizeObserver ??= class ResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	};

	window.matchMedia ??= (query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: noop,
		removeListener: noop,
		addEventListener: noop,
		removeEventListener: noop,
		dispatchEvent: () => false,
	});
}

// Reset mocks before each test
beforeEach(() => {
	jest.clearAllMocks();
});
