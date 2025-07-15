"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, Wallet, Wallet2, WalletIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo({
	className,
	size = "md",
	variant = "auto", // "light", "dark", or "auto"
	vertical = false,
	iconOnly = false,
	companyName = "Evank",
	// Background customization props
	bgShape = "rounded", // "rounded", "square", "circle"
	bgGradient = false, // false or true (uses theme colors)
	bgOpacity = 1, // 0 to 1
	bgPattern = null, // null or "dots", "lines", "grid"
	bgBorder = false, // false or true (uses theme colors)
}) {
	const { theme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Only access the theme after component has mounted to avoid hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	// Determine if we should use dark mode - only use client-side detection after mounting
	const isDark = variant === "dark" || (variant === "auto" && mounted && resolvedTheme === "dark")

	// Simplified size mappings
	const iconSize = {
		sm: { container: "h-6 w-6", icon: 14 },
		md: { container: "h-8 w-8", icon: 18 },
		lg: { container: "h-10 w-10", icon: 22 },
		xl: { container: "h-12 w-12", icon: 26 },
	}[size]

	const textSize = {
		sm: "text-lg",
		md: "text-xl",
		lg: "text-2xl",
		xl: "text-3xl",
	}[size]

	// Shape classes
	const shapeClasses = {
		rounded: "rounded-md",
		square: "rounded-none",
		circle: "rounded-full",
	}

	// Theme-based color classes - use Tailwind's dark mode classes for consistent server/client rendering
	const bgColorClass = "bg-primary dark:bg-slate-800"
	const iconColorClass = "text-primary-foreground dark:text-white"
	const textColorClass = "text-slate-900 dark:text-slate-100"
	const borderColorClass = "border-primary/80 dark:border-slate-700"

	// Pattern classes
	const getPatternClass = () => {
		if (!bgPattern) return ""

		switch (bgPattern) {
			case "dots":
				return "bg-dots"
			case "lines":
				return "bg-lines"
			case "grid":
				return "bg-grid"
			default:
				return ""
		}
	}

	// Gradient classes
	const gradientClass = bgGradient
		? "bg-gradient-to-r from-primary to-primary/80 dark:from-slate-800 dark:to-slate-900"
		: ""

	// Border classes
	const borderClass = bgBorder ? "border border-primary/80 dark:border-slate-700" : ""

	// Opacity classes
	const opacityClass = bgOpacity < 1 ? `opacity-${Math.round(bgOpacity * 100)}` : ""

	// Icon component
	const IconComponent = (
		<div
			className={cn(
				"flex items-center justify-center relative overflow-hidden",
				iconSize.container,
				shapeClasses[bgShape] || "rounded-md",
				bgGradient ? gradientClass : bgColorClass,
				borderClass,
				opacityClass,
				getPatternClass(),
				iconOnly ? className : "",
				// Apply variant-specific classes
				variant === "dark" && "bg-slate-800",
				variant === "light" && "bg-primary",
			)}
		>
			{/* Pattern overlay if needed */}
			{bgPattern && <div className="absolute inset-0 opacity-10 mix-blend-overlay" />}

			<WalletIcon
				size={iconSize.icon}
				className={cn(
					"relative z-10",
					iconColorClass,
					// Apply variant-specific classes
					variant === "dark" && "text-white",
					variant === "light" && "text-primary-foreground",
				)}
			/>
		</div>
	)

	// If icon only, return just the icon
	if (iconOnly) {
		return IconComponent
	}

	// Full logo with text
	return (
		<div className={cn("flex items-center", vertical ? "flex-col gap-2" : "flex-row gap-3", className)}>
			{IconComponent}
			<span
				className={cn(
					"font-bold tracking-tight",
					textSize,
					textColorClass,
					// Apply variant-specific classes
					variant === "dark" && "text-slate-100",
					variant === "light" && "text-slate-900",
				)}
			>
				{companyName}
			</span>
		</div>
	)
}
