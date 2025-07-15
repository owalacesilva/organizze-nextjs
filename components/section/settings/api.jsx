import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"

export default function Api() {
	const apiKeys = [
		{ id: 1, key: "69e3871f-31c3-45ad-9c68-5a5fa5e78b43", active: true },
		{ id: 2, key: "69e3871f-31c3-45ad-9c68-5a5fa5e78b43", active: false },
		{ id: 3, key: "69e3871f-31c3-45ad-9c68-5a5fa5e78b43", active: false },
		{ id: 4, key: "69e3871f-31c3-45ad-9c68-5a5fa5e78b43", active: false },
		{ id: 5, key: "69e3871f-31c3-45ad-9c68-5a5fa5e78b43", active: false },
	]

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Create API Key</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-2">
							<label className="text-sm font-medium">Generate New Key</label>
							<Input />
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Confirm Passphrase</label>
							<Input type="password" />
						</div>
					</div>

					<Button className="mt-6 bg-indigo-600 hover:bg-indigo-700">Save</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Your API Keys</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Key</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="w-[100px]">Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{apiKeys.map((apiKey) => (
								<TableRow key={apiKey.id}>
									<TableCell className="font-mono text-sm">{apiKey.key}</TableCell>
									<TableCell>
										<Switch checked={apiKey.active} />
									</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-muted-foreground hover:text-destructive"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}

