import { act, renderHook } from "@testing-library/react";
import { getPageRange, usePagination } from "@/hooks/usePagination";

const items = (count) => Array.from({ length: count }, (_, index) => index + 1);

describe("usePagination", () => {
	it("slices the first page and reports the visible range", () => {
		const { result } = renderHook(() => usePagination(items(23)));

		expect(result.current.page).toBe(1);
		expect(result.current.totalPages).toBe(3);
		expect(result.current.pageItems).toHaveLength(10);
		expect(result.current.from).toBe(1);
		expect(result.current.to).toBe(10);
		expect(result.current.canPrevious).toBe(false);
		expect(result.current.canNext).toBe(true);
	});

	it("navigates and clamps the last partial page", () => {
		const { result } = renderHook(() => usePagination(items(23)));

		act(() => result.current.last());

		expect(result.current.page).toBe(3);
		expect(result.current.pageItems).toEqual([21, 22, 23]);
		expect(result.current.from).toBe(21);
		expect(result.current.to).toBe(23);
		expect(result.current.canNext).toBe(false);
	});

	it("never advances past the last page or before the first", () => {
		const { result } = renderHook(() => usePagination(items(12)));

		act(() => result.current.previous());
		expect(result.current.page).toBe(1);

		act(() => result.current.next());
		act(() => result.current.next());
		act(() => result.current.next());
		expect(result.current.page).toBe(2);
	});

	it("clamps the page when the data set shrinks under it", () => {
		const { result, rerender } = renderHook(
			({ data }) => usePagination(data),
			{ initialProps: { data: items(30) } },
		);

		act(() => result.current.last());
		expect(result.current.page).toBe(3);

		rerender({ data: items(5) });

		expect(result.current.page).toBe(1);
		expect(result.current.pageItems).toEqual([1, 2, 3, 4, 5]);
	});

	it("reports an empty range for an empty list", () => {
		const { result } = renderHook(() => usePagination([]));

		expect(result.current.totalPages).toBe(1);
		expect(result.current.from).toBe(0);
		expect(result.current.to).toBe(0);
		expect(result.current.pageItems).toEqual([]);
	});

	it("keeps the first visible row roughly stable when the page size changes", () => {
		const { result } = renderHook(() => usePagination(items(100)));

		act(() => result.current.setPage(3)); // rows 21–30
		act(() => result.current.setPageSize(25));

		// Row 21 lives on page 1 of a 25-row page.
		expect(result.current.page).toBe(1);
		expect(result.current.pageSize).toBe(25);
	});

	it("honours initialPage and initialPageSize on mount", () => {
		const { result } = renderHook(() =>
			usePagination(items(50), { initialPage: 2, initialPageSize: 5 }),
		);

		expect(result.current.page).toBe(2);
		expect(result.current.pageItems).toEqual([6, 7, 8, 9, 10]);
	});

	it("returns to page 1 when resetKey changes", () => {
		const { result, rerender } = renderHook(
			({ key }) => usePagination(items(50), { resetKey: key }),
			{ initialProps: { key: "a" } },
		);

		act(() => result.current.setPage(4));
		expect(result.current.page).toBe(4);

		rerender({ key: "b" });
		expect(result.current.page).toBe(1);
	});
});

describe("getPageRange", () => {
	it("lists every page when they all fit", () => {
		expect(getPageRange(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});

	it("elides the tail when near the start", () => {
		expect(getPageRange(2, 20)).toEqual([1, 2, 3, "ellipsis-right", 20]);
	});

	it("elides the head when near the end", () => {
		expect(getPageRange(19, 20)).toEqual([1, "ellipsis-left", 18, 19, 20]);
	});

	it("elides both sides in the middle", () => {
		expect(getPageRange(10, 20)).toEqual([
			1,
			"ellipsis-left",
			9,
			10,
			11,
			"ellipsis-right",
			20,
		]);
	});

	it("always ends on the last page", () => {
		for (const page of [1, 5, 12, 20]) {
			expect(getPageRange(page, 20).at(-1)).toBe(20);
		}
	});
});
