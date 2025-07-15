"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data - replace with your actual data
const data = [
	{ date: "4 Jan", value: 0 },
	{ date: "5 Jan", value: 100 },
	{ date: "6 Jan", value: 90 },
	{ date: "7 Jan", value: 150 },
	{ date: "8 Jan", value: 130 },
	{ date: "9 Jan", value: 200 },
	{ date: "10 Jan", value: 120 },
	{ date: "11 Jan", value: 90 },
	{ date: "12 Jan", value: 150 },
	{ date: "13 Jan", value: 140 },
	{ date: "14 Jan", value: 200 },
	{ date: "15 Jan", value: 320 },
]

export function BalanceTrends() {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle>Balance Trends</CardTitle>
				<div className="flex items-center space-x-2">
					<span className="text-sm text-muted-foreground">Last Month</span>
					<div className="flex items-center text-emerald-600">
						<ArrowUpIcon className="h-4 w-4" />
						<span className="text-sm font-medium">12.25%</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-primary">$221,478</div>
				<div className="h-[330px] w-full pt-4">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={data}
							margin={{
								top: 5,
								right: 10,
								left: 10,
								bottom: 0,
							}}
						>
							<defs>
								<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="rgb(99, 102, 241)" stopOpacity={0.3} />
									<stop offset="95%" stopColor="rgb(99, 102, 241)" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tick={{ fontSize: 12, fill: "#6B7280" }}
								dy={10}
							/>
							<YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} dx={-10} />
							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										return (
											<div className="rounded-lg border bg-background p-2 shadow-sm">
												<div className="grid grid-cols-2 gap-2">
													<div className="flex flex-col">
														<span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
														<span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
													</div>
													<div className="flex flex-col">
														<span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
														<span className="font-bold">${payload[0].value}</span>
													</div>
												</div>
											</div>
										)
									}
									return null
								}}
							/>
							<Area
								type="monotone"
								dataKey="value"
								stroke="rgb(99, 102, 241)"
								strokeWidth={2}
								fill="url(#colorValue)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

