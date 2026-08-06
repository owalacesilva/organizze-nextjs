"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Check, Languages } from "lucide-react";

export function LanguageToggle({ className }) {
	const { locale, setLocale, locales, t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn("h-8 w-8 rounded-full hover:bg-transparent", className)}
					aria-label={t("layout.changeLanguage")}
				>
					<Languages className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-44">
				<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
					{t("layout.language")}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{locales.map((option) => (
					<DropdownMenuItem
						key={option.code}
						onSelect={() => setLocale(option.code)}
						className="gap-2 text-sm"
					>
						<span aria-hidden>{option.flag}</span>
						<span className="flex-1">{option.label}</span>
						{option.code === locale && <Check className="h-3.5 w-3.5" />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
