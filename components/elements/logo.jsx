"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, Wallet, Wallet2, WalletIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo({
	className,
	size = "md",
	variant = "auto",
	vertical = false,
	iconOnly = false,
	companyName = "Evank",
	bgShape = "rounded",
	bgGradient = false,
	bgOpacity = 1,
	bgPattern = null,
	bgBorder = false,
}) {
	const { theme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const isDark = variant === "dark" || (variant === "auto" && mounted && resolvedTheme === "dark")

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

	const shapeClasses = {
		rounded: "rounded-md",
		square: "rounded-none",
		circle: "rounded-full",
	}

	const bgColorClass = "bg-primary dark:bg-slate-800"
	const iconColorClass = "text-primary-foreground dark:text-white"
	const textColorClass = "text-slate-900 dark:text-slate-100"
	const borderColorClass = "border-primary/80 dark:border-slate-700"

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

	const gradientClass = bgGradient
		? "bg-gradient-to-r from-primary to-primary/80 dark:from-slate-800 dark:to-slate-900"
		: ""

	const borderClass = bgBorder ? "border border-primary/80 dark:border-slate-700" : ""

	const opacityClass = bgOpacity < 1 ? `opacity-${Math.round(bgOpacity * 100)}` : ""

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
				variant === "dark" && "bg-slate-800",
				variant === "light" && "bg-primary",
			)}
		>
			{bgPattern && <div className="absolute inset-0 opacity-10 mix-blend-overlay" />}

			<WalletIcon
				size={iconSize.icon}
				className={cn(
					"relative z-10",
					iconColorClass,
					variant === "dark" && "text-white",
					variant === "light" && "text-primary-foreground",
				)}
			/>
		</div>
	)

	if (iconOnly) {
		return IconComponent
	}

	return (
		<div className={cn("flex items-center", vertical ? "flex-col gap-2" : "flex-row gap-3", className)}>
			{IconComponent}
			<span
				className={cn(
					"font-bold tracking-tight",
					textSize,
					textColorClass,
					variant === "dark" && "text-slate-100",
					variant === "light" && "text-slate-900",
				)}
			>
				{companyName}
			</span>
		</div>
	)
}
