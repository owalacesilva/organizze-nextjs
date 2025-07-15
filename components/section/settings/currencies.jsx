import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Euro, PoundSterling, JapaneseYenIcon as Yen } from "lucide-react"

export default function Currencies() {
	return (
		<div className="space-y-6">
			{/* Currency Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="border shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
								<DollarSign className="h-5 w-5" />
							</div>
							<div>
								<p className="font-medium">USD</p>
								<p className="text-sm text-muted-foreground">1 USD = 0.92 Euro</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
								<Euro className="h-5 w-5" />
							</div>
							<div>
								<p className="font-medium">Euro</p>
								<p className="text-sm text-muted-foreground">1 USD = 0.92 Euro</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white">
								<PoundSterling className="h-5 w-5" />
							</div>
							<div>
								<p className="font-medium">Pound</p>
								<p className="text-sm text-muted-foreground">1 USD = 0.92 Euro</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border shadow-sm">
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
								<Yen className="h-5 w-5" />
							</div>
							<div>
								<p className="font-medium">Yen</p>
								<p className="text-sm text-muted-foreground">1 USD = 0.92 Euro</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Currency Exchange */}
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Currency Exchange</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Currency</label>
							<Select>
								<SelectTrigger className="bg-background">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="usd">USD</SelectItem>
									<SelectItem value="eur">Euro</SelectItem>
									<SelectItem value="gbp">Pound</SelectItem>
									<SelectItem value="jpy">Yen</SelectItem>
									<SelectItem value="btc">Bitcoin</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Payment Method</label>
							<Select>
								<SelectTrigger className="bg-background">
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="bank">Bank Transfer</SelectItem>
									<SelectItem value="card">Credit Card</SelectItem>
									<SelectItem value="paypal">PayPal</SelectItem>
									<SelectItem value="crypto">Cryptocurrency</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Enter your amount</label>
							<div className="grid grid-cols-2 gap-4">
								<Input defaultValue="0.0214 BTC" />
								<Input defaultValue="125.00 USD" />
							</div>
						</div>

						<div className="pt-2">
							<div className="flex items-center justify-between">
								<span className="text-sm">Monthly Limit</span>
								<span className="font-medium text-primary">$49750 remaining</span>
							</div>
						</div>

						<Button className="w-full">Exchange Now</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Exchange Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between border-b pb-2">
							<span className="text-sm font-medium text-primary">Exchange Amount</span>
							<span>75 USD</span>
						</div>

						<div className="flex items-center justify-between border-b pb-2">
							<span className="text-sm font-medium text-primary">Payment Method</span>
							<span>Bank of America Bank *************5245</span>
						</div>

						<div className="flex items-center justify-between border-b pb-2">
							<span className="text-sm font-medium text-primary">Exchange Rate</span>
							<span>1 USD = 0.92 Euro</span>
						</div>

						<div className="flex items-center justify-between border-b pb-2">
							<span className="text-sm font-medium text-primary">Fee</span>
							<span>$0.75 USD</span>
						</div>

						<div className="flex items-center justify-between border-b pb-2">
							<span className="text-sm font-medium text-primary">Total</span>
							<span>$68.00 Euro</span>
						</div>

						<div className="flex items-center justify-between border-b pb-2">
							<span className="text-sm font-medium text-primary">Vat</span>
							<span>$0.25 Euro</span>
						</div>

						<div className="flex items-center justify-between pt-2">
							<span className="text-sm font-medium text-primary">Sub Total</span>
							<span className="font-medium">$69.00 Euro</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

