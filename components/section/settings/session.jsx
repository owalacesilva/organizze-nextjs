"use client";

import { DataTablePagination } from "@/components/elements/data-table-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { useTranslation } from "@/hooks/useTranslation";
import { CheckCircle, FileText, XCircle } from "lucide-react";

const WEB_SESSIONS = [
	{ id: 1, hoursAgo: 2, browser: "Chrome (Windows)", ip: "187.54.239.254", location: "São Paulo, BR", current: true },
	{ id: 2, hoursAgo: 26, browser: "Safari (macOS)", ip: "187.54.239.211", location: "São Paulo, BR", current: false },
	{ id: 3, hoursAgo: 96, browser: "Firefox (Linux)", ip: "201.17.44.10", location: "Lisboa, PT", current: false },
];

const CONFIRMED_DEVICES = [
	{ id: 1, hoursAgo: 24, browser: "Chrome (Windows)", ip: "187.54.239.254", location: "São Paulo, BR", current: true },
	{ id: 2, hoursAgo: 192, browser: "Safari (iOS)", ip: "187.54.239.101", location: "São Paulo, BR", current: false },
	{ id: 3, hoursAgo: 360, browser: "Firefox (Linux)", ip: "201.17.44.10", location: "Lisboa, PT", current: false },
];

const ACTIVITY = [
	{ id: 1, action: "secondFactor", source: "api", ip: "187.54.239.254", location: "São Paulo, BR", hoursAgo: 1 },
	{ id: 2, action: "signin", source: "web", ip: "187.54.239.254", location: "São Paulo, BR", hoursAgo: 2 },
	{ id: 3, action: "deviceConfirmed", source: "web", ip: "187.54.239.211", location: "São Paulo, BR", hoursAgo: 26 },
	{ id: 4, action: "signout", source: "web", ip: "187.54.239.211", location: "São Paulo, BR", hoursAgo: 30 },
	{ id: 5, action: "secondFactor", source: "web", ip: "201.17.44.10", location: "Lisboa, PT", hoursAgo: 96 },
	{ id: 6, action: "signin", source: "api", ip: "201.17.44.10", location: "Lisboa, PT", hoursAgo: 100 },
	{ id: 7, action: "signout", source: "api", ip: "201.17.44.10", location: "Lisboa, PT", hoursAgo: 360 },
];

function CurrentFlag({ current }) {
	return current ? (
		<CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
	) : (
		<XCircle className="h-3.5 w-3.5 text-muted-foreground" />
	);
}

export default function Session() {
	const { t } = useTranslation();
	const activityPagination = usePagination(ACTIVITY, { initialPageSize: 5 });

	const relative = (hours) => t("notifications.hoursAgo", { count: hours });

	const deviceTable = (rows, firstColumnKey) => (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead className="pl-3">
						{t(`settings.session.columns.${firstColumnKey}`)}
					</TableHead>
					<TableHead>{t("settings.session.columns.browser")}</TableHead>
					<TableHead>{t("settings.session.columns.ipAddress")}</TableHead>
					<TableHead>{t("settings.session.columns.near")}</TableHead>
					<TableHead className="pr-3">
						{t("settings.session.columns.current")}
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.id}>
						<TableCell className="pl-3">{relative(row.hoursAgo)}</TableCell>
						<TableCell>{row.browser}</TableCell>
						<TableCell className="font-mono">{row.ip}</TableCell>
						<TableCell>{row.location}</TableCell>
						<TableCell className="pr-3">
							<CurrentFlag current={row.current} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);

	return (
		<div className="space-y-3">
			<Card>
				<CardHeader>
					<CardTitle>{t("settings.session.thirdParty")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-start gap-2">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
							<FileText className="h-4 w-4 text-amber-600" />
						</div>
						<div className="space-y-1.5">
							<p className="text-xs font-medium">
								{t("settings.session.thirdPartyEmpty")}
							</p>
							<p className="text-[11px] text-muted-foreground">
								{t("settings.session.thirdPartyHint")}
							</p>
							<Button className="mt-1">
								{t("settings.session.authorizeNow")}
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("settings.session.webSessions")}</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{deviceTable(WEB_SESSIONS, "signedIn")}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("settings.session.confirmedDevices")}</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{deviceTable(CONFIRMED_DEVICES, "confirmed")}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("settings.session.accountActivity")}</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="pl-3">
									{t("settings.session.columns.action")}
								</TableHead>
								<TableHead>{t("settings.session.columns.source")}</TableHead>
								<TableHead>{t("settings.session.columns.ipAddress")}</TableHead>
								<TableHead>{t("settings.session.columns.location")}</TableHead>
								<TableHead className="pr-3">
									{t("settings.session.columns.when")}
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{activityPagination.pageItems.map((activity) => (
								<TableRow key={activity.id}>
									<TableCell className="pl-3">
										{t(`settings.session.actions.${activity.action}`)}
									</TableCell>
									<TableCell>
										{t(`settings.session.sources.${activity.source}`)}
									</TableCell>
									<TableCell className="font-mono">{activity.ip}</TableCell>
									<TableCell>{activity.location}</TableCell>
									<TableCell className="pr-3">
										{relative(activity.hoursAgo)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<DataTablePagination
						{...activityPagination}
						pageSizeOptions={[5, 10, 25]}
						className="px-3"
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("settings.session.closeAccount")}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					<p className="text-xs">
						{t("settings.session.closeAccountHint")}{" "}
						<span className="text-destructive">
							{t("settings.session.cannotBeUndone")}
						</span>
					</p>
					<Button variant="destructive">
						{t("settings.session.closeAccountAction")}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
