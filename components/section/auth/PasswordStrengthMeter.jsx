"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

const LEVELS = {
	tooWeak: { width: "10%", tone: "bg-destructive" },
	weak: { width: "35%", tone: "bg-amber-500" },
	medium: { width: "70%", tone: "bg-yellow-500" },
	strong: { width: "100%", tone: "bg-emerald-500" },
};

/** Cheap heuristic: length first, then character variety. */
function scorePassword(password) {
	if (password.length < 6) return "tooWeak";
	if (password.length < 10) return "weak";

	const varied =
		/[A-Z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[^a-zA-Z0-9\s]/.test(password);

	return varied ? "strong" : "medium";
}

export function PasswordStrengthMeter({ password = "" }) {
	const { t } = useTranslation();

	if (!password) return null;

	const level = scorePassword(password);
	const { width, tone } = LEVELS[level];

	return (
		<div className="space-y-1 pt-1">
			<div className="flex items-center justify-between text-[10px]">
				<span className="text-muted-foreground">
					{t("auth.strength.label")}:{" "}
					<span className="font-medium text-foreground">
						{t(`auth.strength.${level}`)}
					</span>
				</span>
				<span className="text-muted-foreground">{password.length}/20</span>
			</div>
			<div className="h-1 w-full overflow-hidden rounded-full bg-muted">
				<div className={cn("h-full transition-all", tone)} style={{ width }} />
			</div>
		</div>
	);
}

export default PasswordStrengthMeter;
