"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
	{ month: "Jan", cat1: 15, cat2: 15, cat3: 18 },
	{ month: "Feb", cat1: 20, cat2: 15, cat3: 15 },
	{ month: "Mar", cat1: 25, cat2: 25, cat3: 25 },
	{ month: "Apr", cat1: 20, cat2: 20, cat3: 25 },
	{ month: "May", cat1: 25, cat2: 20, cat3: 27 },
	{ month: "Jun", cat1: 15, cat2: 10, cat3: 13 },
	{ month: "Jul", cat1: 15, cat2: 15, cat3: 15 },
	{ month: "Aug", cat1: 20, cat2: 20, cat3: 22 },
	{ month: "Sep", cat1: 15, cat2: 20, cat3: 25 },
	{ month: "Oct", cat1: 15, cat2: 15, cat3: 15 },
	{ month: "Nov", cat1: 25, cat2: 20, cat3: 23 },
	{ month: "Dec", cat1: 20, cat2: 20, cat3: 25 },
	{ month: "Jan", cat1: 20, cat2: 20, cat3: 25 },
	{ month: "Feb", cat1: 15, cat2: 15, cat3: 18 },
	{ month: "Mar", cat1: 15, cat2: 10, cat3: 15 },
	{ month: "Apr", cat1: 15, cat2: 15, cat3: 20 },
	{ month: "May", cat1: 20, cat2: 15, cat3: 20 },
	{ month: "Jun", cat1: 15, cat2: 15, cat3: 15 },
]

export function WeeklyExpenses() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Weekly Expenses</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[300px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={data}
							margin={{
								top: 5,
								right: 10,
								left: 10,
								bottom: 20,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
							<XAxis
								dataKey="month"
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
												<div className="grid gap-2">
													{payload.map((entry, index) => (
														<div key={index} className="flex items-center justify-between gap-2">
															<span className="text-[0.70rem] uppercase text-muted-foreground">
																Category {index + 1}
															</span>
															<span className="font-bold">${entry.value}</span>
														</div>
													))}
													<div className="border-t pt-2">
														<div className="flex items-center justify-between gap-2">
															<span className="text-[0.70rem] uppercase text-muted-foreground">Total</span>
															<span className="font-bold">${payload.reduce((sum, entry) => sum + entry.value, 0)}</span>
														</div>
													</div>
												</div>
											</div>
										)
									}
									return null
								}}
							/>
							<Bar dataKey="cat1" stackId="stack" fill="#818CF8" radius={[4, 4, 0, 0]} />
							<Bar dataKey="cat2" stackId="stack" fill="#6366F1" radius={[4, 4, 0, 0]} />
							<Bar dataKey="cat3" stackId="stack" fill="#4F46E5" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

