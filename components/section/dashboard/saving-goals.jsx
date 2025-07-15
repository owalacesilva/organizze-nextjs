import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const goals = [
	{
		name: "Vacation",
		progress: 80,
		color: "rgb(255, 99, 132)",
		lightColor: "rgba(255, 99, 132, 0.2)",
	},
	{
		name: "Gift",
		progress: 90,
		color: "rgb(75, 192, 112)",
		lightColor: "rgba(75, 192, 112, 0.2)",
	},
	{
		name: "New Car",
		progress: 95,
		color: "rgb(66, 153, 225)",
		lightColor: "rgba(66, 153, 225, 0.2)",
	},
	{
		name: "Laptop",
		progress: 99,
		color: "rgb(251, 191, 36)",
		lightColor: "rgba(251, 191, 36, 0.2)",
	},
]

function CircularProgress({ value, color, lightColor, size = 120 }) {
	const strokeWidth = 8
	const radius = (size - strokeWidth) / 2
	const circumference = radius * 2 * Math.PI
	const offset = circumference - (value / 100) * circumference

	return (
		<div className="relative" style={{ width: size, height: size }}>
			{/* Background circle */}
			<svg className="absolute" width={size} height={size}>
				<circle
					className="transition-all duration-300"
					stroke={lightColor}
					strokeWidth={strokeWidth}
					fill="none"
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
			</svg>

			{/* Progress circle */}
			<svg className="absolute -rotate-90" width={size} height={size}>
				<circle
					className="transition-all duration-300"
					stroke={color}
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					fill="none"
					r={radius}
					cx={size / 2}
					cy={size / 2}
				/>
			</svg>

			{/* Percentage text */}
			<div className="absolute inset-0 flex items-center justify-center text-2xl font-medium" style={{ color }}>
				{value}%
			</div>
		</div>
	)
}

export function SavingGoals() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Saving Goals</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-8">
					{goals.map((goal) => (
						<div key={goal.name} className="flex flex-col items-center gap-3">
							<CircularProgress value={goal.progress} color={goal.color} lightColor={goal.lightColor} />
							<span className="font-medium text-sm">{goal.name}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

