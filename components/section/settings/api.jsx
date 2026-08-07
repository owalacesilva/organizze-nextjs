"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { Trash2 } from "lucide-react";

// Placeholder keys until the API-key endpoint exists.
const API_KEYS = [
	{ id: 1, key: "69e3871f-31c3-45ad-9c68-5a5fa5e78b43", active: true },
	{ id: 2, key: "b1c1d2e3-4f56-4789-9abc-0123456789ab", active: false },
	{ id: 3, key: "77a2c4de-9f01-4b23-8c45-6789abcdef01", active: false },
];

export default function Api() {
	const { t } = useTranslation();

	return (
		<div className="space-y-3">
			<Card>
				<CardHeader>
					<CardTitle>{t("settings.api.createTitle")}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid gap-3 md:grid-cols-2">
						<div className="space-y-1">
							<Label htmlFor="api-key-name">
								{t("settings.api.generateKey")}
							</Label>
							<Input id="api-key-name" />
						</div>

						<div className="space-y-1">
							<Label htmlFor="api-passphrase">
								{t("settings.api.confirmPassphrase")}
							</Label>
							<Input id="api-passphrase" type="password" />
						</div>
					</div>

					<Button>{t("common.save")}</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("settings.api.keysTitle")}</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="pl-3">{t("settings.api.key")}</TableHead>
								<TableHead>{t("settings.api.status")}</TableHead>
								<TableHead className="w-16 pr-3">
									{t("common.actions")}
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{API_KEYS.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={3}
										className="py-6 text-center text-muted-foreground"
									>
										{t("settings.api.empty")}
									</TableCell>
								</TableRow>
							) : (
								API_KEYS.map((apiKey) => (
									<TableRow key={apiKey.id}>
										<TableCell className="pl-3 font-mono">
											{apiKey.key}
										</TableCell>
										<TableCell>
											<Switch
												defaultChecked={apiKey.active}
												aria-label={t("settings.api.status")}
											/>
										</TableCell>
										<TableCell className="pr-3">
											<Button
												variant="ghost"
												size="icon-sm"
												className="text-muted-foreground hover:text-destructive"
												aria-label={t("common.delete")}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
