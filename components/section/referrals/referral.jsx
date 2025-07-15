"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Check, ChevronRight, Copy, Facebook, Gift, Info, Instagram, TrendingUp, Twitter, Users } from "lucide-react"
import { useState } from "react"
import { Area, AreaChart, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { ReferralTiers } from "./referral-tiers"

const referralTiers = [
	{ name: "Bronze", percentage: 5, minReferrals: 0, maxReferrals: 5 },
	{ name: "Silver", percentage: 7, minReferrals: 5, maxReferrals: 15 },
	{ name: "Gold", percentage: 10, minReferrals: 15, maxReferrals: 30 },
	{ name: "Platinum", percentage: 15, minReferrals: 30, maxReferrals: null },
]

const referralHistory = [
	{ month: "Jan", referrals: 2, earnings: 25 },
	{ month: "Feb", referrals: 3, earnings: 35 },
	{ month: "Mar", referrals: 1, earnings: 15 },
	{ month: "Apr", referrals: 5, earnings: 60 },
	{ month: "May", referrals: 4, earnings: 45 },
	{ month: "Jun", referrals: 7, earnings: 80 },
]

const recentReferrals = [
	{ name: "John D.", date: "2 days ago", status: "Active", earnings: 15 },
	{ name: "Sarah M.", date: "5 days ago", status: "Active", earnings: 22 },
	{ name: "Alex K.", date: "1 week ago", status: "Pending", earnings: 0 },
]

function SocialButton({ icon: Icon, href, label, color }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md transition-all duration-300"
						asChild
					>
						<a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
							<Icon className="h-4 w-4 sm:h-5 sm:w-5" />
						</a>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p className="text-xs sm:text-sm">Share on {label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

function ReferralStats({ data }) {
	return (
		<div className="h-28 sm:h-32 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
					<defs>
						<linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
							<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
						</linearGradient>
					</defs>
					<RechartsTooltip
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								return (
									<div className="rounded-lg border bg-background p-2 shadow-sm">
										<div className="grid gap-1">
											<p className="text-xs sm:text-sm font-medium">{payload[0].payload.month}</p>
											<p className="text-xs">Referrals: {payload[0].value}</p>
											<p className="text-xs">Earnings: ${payload[0].payload.earnings}</p>
										</div>
									</div>
								)
							}
							return null
						}}
					/>
					<Area
						type="monotone"
						dataKey="referrals"
						stroke="hsl(var(--primary))"
						strokeWidth={2}
						fill="url(#colorReferrals)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export function Referral() {
	const [copied, setCopied] = useState(false)
	const [activeTab, setActiveTab] = useState("link")
	const referralLink = "https://example.com/ref/123456"
	const currentReferrals = 12
	const currentEarnings = 111
	const currentTier = referralTiers.find(
		(tier) =>
			currentReferrals >= tier.minReferrals && (tier.maxReferrals === null || currentReferrals < tier.maxReferrals),
	)

	// Calculate progress to next tier
	const nextTier = referralTiers.find((tier) => tier.minReferrals > currentReferrals)
	const progressPercentage = nextTier
		? ((currentReferrals - currentTier.minReferrals) / (nextTier.minReferrals - currentTier.minReferrals)) * 100
		: 100

	const handleCopy = () => {
		navigator.clipboard.writeText(referralLink)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="space-y-4 sm:space-y-6 md:space-y-8">
			<div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
				<div>
					<Card>
						<CardHeader className="p-4 sm:p-6">
							<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
								Your Credit
								<span className="ml-auto rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
									{currentTier.name} Tier
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0 sm:pt-0">
							<div className="grid grid-cols-2 gap-3 sm:gap-4">
								<div className="space-y-1">
									<div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
										<Users className="h-3 w-3 sm:h-4 sm:w-4" />
										<span>Invited</span>
									</div>
									<div className="text-xl sm:text-2xl font-bold text-primary">{currentReferrals}</div>
								</div>
								<div className="space-y-1">
									<div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
										<Gift className="h-3 w-3 sm:h-4 sm:w-4" />
										<span>Earnings</span>
									</div>
									<div className="text-xl sm:text-2xl font-bold text-primary">${currentEarnings}</div>
								</div>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<div className="flex items-center justify-between text-xs sm:text-sm">
									<span className="text-muted-foreground">Next tier: {nextTier?.name || "Max tier reached"}</span>
									<span className="font-medium">
										{currentReferrals}/{nextTier?.minReferrals || "∞"}
									</span>
								</div>
								<Progress value={progressPercentage} className="h-1.5 sm:h-2" />
							</div>

							<Button className="w-full h-8 sm:h-10 text-xs sm:text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all">
								CLAIM REWARDS
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-4 sm:space-y-6 md:col-span-2">
					<Card>
						<Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
							<CardHeader className="bg-card/80 pb-0 p-3 sm:p-4 md:p-6 md:pb-0">
								<TabsList className="grid w-full grid-cols-3 bg-muted/50 p-0.5 sm:p-1 rounded-lg">
									<TabsTrigger
										value="link"
										className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all duration-200 py-1 sm:py-2 text-xs sm:text-sm"
									>
										Referral Link
									</TabsTrigger>
									<TabsTrigger
										value="stats"
										className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all duration-200 py-1 sm:py-2 text-xs sm:text-sm"
									>
										Statistics
									</TabsTrigger>
									<TabsTrigger
										value="history"
										className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all duration-200 py-1 sm:py-2 text-xs sm:text-sm"
									>
										Recent Referrals
									</TabsTrigger>
								</TabsList>
							</CardHeader>
							<CardContent className="p-3 sm:p-4 md:p-6">
								<TabsContent value="link" className="mt-0 space-y-4 sm:space-y-6">
									<div className="flex items-start gap-2">
										<div className="rounded-full bg-primary/10 p-1.5 sm:p-2 text-primary">
											<Info className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
										</div>
										<p className="text-xs sm:text-sm text-muted-foreground">
											Earn {currentTier.percentage}% of the Coins your referrals earn through an offer! Share this link
											with them to get started.
										</p>
									</div>

									<div className="space-y-3 sm:space-y-4">
										<div className="flex items-center gap-2">
											<Input
												readOnly
												value={referralLink}
												className="font-mono text-xs sm:text-sm h-8 sm:h-10 bg-muted/30 border-primary/20 focus-visible:ring-primary/30"
											/>
											<Button
												variant={copied ? "default" : "outline"}
												size="icon"
												onClick={handleCopy}
												className={cn(
													"h-8 w-8 sm:h-10 sm:w-10 shrink-0 transition-all duration-300",
													copied ? "bg-green-600 text-white" : "border-primary/20 text-primary hover:bg-primary/10",
												)}
											>
												{copied ? (
													<Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
												) : (
													<Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
												)}
												<span className="sr-only">Copy referral link</span>
											</Button>
										</div>

										<div>
											<p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-muted-foreground">Share with:</p>
											<div className="flex flex-wrap items-center gap-2 sm:gap-4">
												<SocialButton icon={Facebook} href="#" label="Facebook" color="blue" />
												<SocialButton icon={Twitter} href="#" label="Twitter" color="sky" />
												<SocialButton icon={Instagram} href="#" label="Instagram" color="pink" />
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																variant="outline"
																size="icon"
																className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md transition-all duration-300"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="16"
																	height="16"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	className="sm:w-5 sm:h-5"
																>
																	<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
																</svg>
																<span className="sr-only">Share on WhatsApp</span>
															</Button>
														</TooltipTrigger>
														<TooltipContent>
															<p className="text-xs sm:text-sm">Share on WhatsApp</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="stats" className="mt-0 space-y-4 sm:space-y-6">
									<div className="flex items-center justify-between">
										<h3 className="text-sm sm:text-base md:text-lg font-medium">Referral Performance</h3>
										<div className="flex items-center gap-1 text-xs sm:text-sm text-primary">
											<TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
											<span>+23% this month</span>
										</div>
									</div>

									<ReferralStats data={referralHistory} />

									<div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4">
										<div className="rounded-lg bg-muted/30 p-2 sm:p-3 border border-primary/5 shadow-sm">
											<div className="text-xs sm:text-sm text-muted-foreground">Total Referrals</div>
											<div className="text-base sm:text-xl font-bold">{currentReferrals}</div>
										</div>
										<div className="rounded-lg bg-muted/30 p-2 sm:p-3 border border-primary/5 shadow-sm">
											<div className="text-xs sm:text-sm text-muted-foreground">Active Referrals</div>
											<div className="text-base sm:text-xl font-bold">8</div>
										</div>
										<div className="rounded-lg bg-muted/30 p-2 sm:p-3 border border-primary/5 shadow-sm">
											<div className="text-xs sm:text-sm text-muted-foreground">Conversion Rate</div>
											<div className="text-base sm:text-xl font-bold">67%</div>
										</div>
										<div className="rounded-lg bg-muted/30 p-2 sm:p-3 border border-primary/5 shadow-sm">
											<div className="text-xs sm:text-sm text-muted-foreground">Avg. Earnings</div>
											<div className="text-base sm:text-xl font-bold">$9.25</div>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="history" className="mt-0 space-y-3 sm:space-y-4">
									<div className="space-y-2 sm:space-y-4">
										{recentReferrals.map((referral, index) => (
											<div
												key={index}
												className="flex items-center justify-between rounded-lg border border-primary/10 p-3 sm:p-4 transition-colors hover:bg-muted/20 shadow-sm"
											>
												<div className="space-y-0.5 sm:space-y-1">
													<div className="text-sm sm:text-base font-medium">{referral.name}</div>
													<div className="text-xs sm:text-sm text-muted-foreground">{referral.date}</div>
												</div>
												<div className="text-right">
													<div
														className={cn(
															"text-xs sm:text-sm font-medium",
															referral.status === "Active" ? "text-primary" : "text-amber-600",
														)}
													>
														{referral.status}
													</div>
													<div className="text-xs sm:text-sm text-muted-foreground">
														{referral.earnings > 0 ? `$${referral.earnings}` : "-"}
													</div>
												</div>
											</div>
										))}
									</div>

									<Button
										variant="outline"
										className="w-full h-8 sm:h-10 text-xs sm:text-sm border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
									>
										View All Referrals
										<ChevronRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
									</Button>
								</TabsContent>
							</CardContent>
						</Tabs>
					</Card>

					<ReferralTiers />
				</div>
			</div>
		</div>
	)
}

