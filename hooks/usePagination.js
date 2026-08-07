"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * Client-side pagination over an in-memory array.
 *
 * The returned `page` is always clamped to the available range, so shrinking
 * the data set (applying a filter, deleting a row) can never leave the table
 * showing an empty page.
 *
 * @param {Array} items         Full, already-filtered list.
 * @param {object} [options]
 * @param {number} [options.initialPage=1]
 * @param {number} [options.initialPageSize=10]
 * @param {*}      [options.resetKey]  Change it to jump back to page 1 — pass
 *                                     a serialised representation of the active
 *                                     filters.
 *
 * @example
 * const pagination = usePagination(filtered, { resetKey: JSON.stringify(filters) });
 * pagination.pageItems.map(...)
 * <DataTablePagination {...pagination} />
 */
export function usePagination(items = [], options = {}) {
	const {
		initialPage = 1,
		initialPageSize = DEFAULT_PAGE_SIZE_OPTIONS[0],
		resetKey,
	} = options;

	const [requestedPage, setRequestedPage] = useState(initialPage);
	const [pageSize, setPageSizeState] = useState(initialPageSize);

	const totalItems = items.length;
	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
	const page = Math.min(Math.max(requestedPage, 1), totalPages);

	// Skip the mount run so an explicit `initialPage` survives.
	const previousResetKey = useRef(resetKey);
	useEffect(() => {
		if (previousResetKey.current === resetKey) return;
		previousResetKey.current = resetKey;
		setRequestedPage(1);
	}, [resetKey]);

	const setPage = useCallback((next) => {
		setRequestedPage((current) =>
			Math.max(1, typeof next === "function" ? next(current) : next),
		);
	}, []);

	// Keep the first visible row roughly stable when the page size changes.
	const setPageSize = useCallback(
		(next) => {
			const size = Number(next) || DEFAULT_PAGE_SIZE_OPTIONS[0];
			const firstVisibleIndex = (page - 1) * pageSize;

			setPageSizeState(size);
			setRequestedPage(Math.floor(firstVisibleIndex / size) + 1);
		},
		[page, pageSize],
	);

	const pageItems = useMemo(
		() => items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
		[items, page, pageSize],
	);

	return {
		page,
		pageSize,
		totalItems,
		totalPages,
		pageItems,
		// 1-based inclusive range of the rows on screen; `from` is 0 when empty.
		from: totalItems === 0 ? 0 : (page - 1) * pageSize + 1,
		to: Math.min(page * pageSize, totalItems),
		canPrevious: page > 1,
		canNext: page < totalPages,
		setPage,
		setPageSize,
		previous: useCallback(() => setPage((p) => p - 1), [setPage]),
		next: useCallback(() => setPage((p) => p + 1), [setPage]),
		first: useCallback(() => setPage(1), [setPage]),
		last: useCallback(() => setPage(totalPages), [setPage, totalPages]),
		reset: useCallback(() => setPage(1), [setPage]),
	};
}

/**
 * Page numbers to render, with `"ellipsis"` markers where the range is cut.
 * Always yields at most `2 * siblings + 5` entries.
 */
export function getPageRange(page, totalPages, siblings = 1) {
	const maxSlots = siblings * 2 + 5;

	if (totalPages <= maxSlots) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const left = Math.max(page - siblings, 1);
	const right = Math.min(page + siblings, totalPages);
	const showLeftEllipsis = left > 2;
	const showRightEllipsis = right < totalPages - 1;

	const range = [1];
	if (showLeftEllipsis) range.push("ellipsis-left");

	for (let i = showLeftEllipsis ? left : 2; i <= (showRightEllipsis ? right : totalPages - 1); i += 1) {
		range.push(i);
	}

	if (showRightEllipsis) range.push("ellipsis-right");
	range.push(totalPages);

	return range;
}
