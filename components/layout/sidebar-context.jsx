"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";

const SidebarContext = createContext(null);

const STORAGE_KEY = "organizze.sidebar.collapsed";
const TOGGLE_SHORTCUT = "b";

const useIsomorphicLayoutEffect =
	typeof window === "undefined" ? () => {} : useLayoutEffect;

export function SidebarProvider({ children, defaultCollapsed = false }) {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);

	useIsomorphicLayoutEffect(() => {
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY);
			if (stored !== null) setCollapsed(stored === "true");
		} catch {}
	}, []);

	const persist = useCallback((next) => {
		try {
			window.localStorage.setItem(STORAGE_KEY, String(next));
		} catch {}
	}, []);

	const toggle = useCallback(() => {
		setCollapsed((current) => {
			persist(!current);
			return !current;
		});
	}, [persist]);

	const set = useCallback(
		(next) => {
			setCollapsed(next);
			persist(next);
		},
		[persist],
	);

	useEffect(() => {
		const onKeyDown = (event) => {
			if (
				event.key.toLowerCase() === TOGGLE_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggle();
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [toggle]);

	const value = useMemo(
		() => ({ collapsed, toggle, setCollapsed: set }),
		[collapsed, toggle, set],
	);

	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error("useSidebar must be used inside a <SidebarProvider>");
	}

	return context;
}
