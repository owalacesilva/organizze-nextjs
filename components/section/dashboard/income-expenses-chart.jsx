"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
	{ month: "Jan", income: 5, expenses: 4 },
	{ month: "Feb", income: 6, expenses: 5 },
	{ month: "Mar", income: 4.5, expenses: 3.5 },
	{ month: "Apr", income: 5.5, expenses: 4.5 },
	{ month: "May", income: 3, expenses: 2 },
	{ month: "Jun", income: 6, expenses: 5 },
	{ month: "Jul", income: 4.5, expenses: 3.5 },
	{ month: "Aug", income: 6, expenses: 5 },
	{ month: "Sep", income: 8, expenses: 7 },
	{ month: "Oct", income: 3, expenses: 2 },
]

export function IncomeExpensesChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Monthly Income vs Expenses</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[350px] w-full">
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
												<div className="grid grid-cols-2 gap-2">
													<div className="flex flex-col">
														<span className="text-[0.70rem] uppercase text-muted-foreground">Income</span>
														<span className="font-bold">${payload[0].value}k</span>
													</div>
													<div className="flex flex-col">
														<span className="text-[0.70rem] uppercase text-muted-foreground">Expenses</span>
														<span className="font-bold">${payload[1].value}k</span>
													</div>
												</div>
											</div>
										)
									}
									return null
								}}
							/>
							<Bar dataKey="income" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={8} />
							<Bar dataKey="expenses" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={8} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}

