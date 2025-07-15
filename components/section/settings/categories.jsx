"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, GripVertical, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

// Icons for categories
import {
	Banknote,
	Briefcase,
	Building,
	Bus,
	Car,
	CircleDollarSign,
	DollarSign,
	Dumbbell,
	FileQuestion,
	FileText,
	Film,
	Gift,
	GraduationCap,
	Heart,
	Home,
	Plane,
	ShoppingBag,
	ShoppingCart,
	Sparkles,
	Umbrella,
	UserCheck,
	Users,
	Utensils,
} from "lucide-react"

export default function Categories() {
	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [currentCategory, setCurrentCategory] = useState(null)
	const [draggedCategory, setDraggedCategory] = useState(null)
	const [dragOverCategory, setDragOverCategory] = useState(null)

	const [expenseCategories, setExpenseCategories] = useState([
		{ id: 1, name: "Beauty", icon: <Sparkles className="h-4 w-4" />, color: "bg-pink-500", iconName: "sparkles" },
		{ id: 2, name: "Bills & Fees", icon: <FileText className="h-4 w-4" />, color: "bg-teal-500", iconName: "file" },
		{ id: 3, name: "Car", icon: <Car className="h-4 w-4" />, color: "bg-cyan-500", iconName: "car" },
		{
			id: 4,
			name: "Education",
			icon: <GraduationCap className="h-4 w-4" />,
			color: "bg-blue-500",
			iconName: "education",
		},
		{
			id: 5,
			name: "Entertainment",
			icon: <Film className="h-4 w-4" />,
			color: "bg-blue-500",
			iconName: "entertainment",
		},
		{ id: 6, name: "Family", icon: <Users className="h-4 w-4" />, color: "bg-indigo-500", iconName: "family" },
		{ id: 7, name: "Food & Drink", icon: <Utensils className="h-4 w-4" />, color: "bg-purple-500", iconName: "food" },
		{ id: 8, name: "Salary", icon: <DollarSign className="h-4 w-4" />, color: "bg-purple-500", iconName: "salary" },
		{
			id: 9,
			name: "Groceries",
			icon: <ShoppingBag className="h-4 w-4" />,
			color: "bg-pink-500",
			iconName: "groceries",
		},
		{ id: 10, name: "Healthcare", icon: <Heart className="h-4 w-4" />, color: "bg-red-500", iconName: "healthcare" },
		{ id: 11, name: "Home", icon: <Home className="h-4 w-4" />, color: "bg-purple-500", iconName: "home" },
		{ id: 12, name: "Shopping", icon: <ShoppingCart className="h-4 w-4" />, color: "bg-red-500", iconName: "shopping" },
		{ id: 13, name: "Sports", icon: <Dumbbell className="h-4 w-4" />, color: "bg-orange-500", iconName: "sports" },
		{ id: 14, name: "Hobbies", icon: <Briefcase className="h-4 w-4" />, color: "bg-green-500", iconName: "hobbies" },
		{ id: 15, name: "Travel", icon: <Plane className="h-4 w-4" />, color: "bg-teal-500", iconName: "travel" },
		{ id: 16, name: "Transport", icon: <Bus className="h-4 w-4" />, color: "bg-cyan-500", iconName: "transport" },
		{ id: 17, name: "Work", icon: <Briefcase className="h-4 w-4" />, color: "bg-indigo-500", iconName: "work" },
	])

	const [incomeCategories, setIncomeCategories] = useState([
		{
			id: 1,
			name: "Salary",
			icon: <CircleDollarSign className="h-4 w-4" />,
			color: "bg-purple-500",
			iconName: "salary",
		},
		{ id: 2, name: "Business", icon: <Building className="h-4 w-4" />, color: "bg-red-500", iconName: "business" },
		{ id: 3, name: "Client", icon: <UserCheck className="h-4 w-4" />, color: "bg-orange-500", iconName: "client" },
		{ id: 4, name: "Gifts", icon: <Gift className="h-4 w-4" />, color: "bg-amber-500", iconName: "gifts" },
		{ id: 5, name: "Insurance", icon: <Umbrella className="h-4 w-4" />, color: "bg-amber-500", iconName: "insurance" },
		{ id: 6, name: "Loan", icon: <Banknote className="h-4 w-4" />, color: "bg-green-500", iconName: "loan" },
		{ id: 7, name: "Other", icon: <FileQuestion className="h-4 w-4" />, color: "bg-teal-500", iconName: "other" },
	])

	// Form state for editing
	const [editForm, setEditForm] = useState({
		name: "",
		iconName: "",
		color: "",
	})

	// Handle opening the edit dialog
	const handleEditClick = (category, type) => {
		setCurrentCategory({ ...category, type })
		setEditForm({
			name: category.name,
			iconName: category.iconName,
			color: category.color.replace("bg-", ""),
		})
		setEditDialogOpen(true)
	}

	// Handle saving the edited category
	const handleSaveEdit = () => {
		if (currentCategory) {
			const updatedCategory = {
				...currentCategory,
				name: editForm.name,
				iconName: editForm.iconName,
				color: `bg-${editForm.color}`,
				icon: getIconComponent(editForm.iconName),
			}

			if (currentCategory.type === "expense") {
				setExpenseCategories(expenseCategories.map((cat) => (cat.id === currentCategory.id ? updatedCategory : cat)))
			} else {
				setIncomeCategories(incomeCategories.map((cat) => (cat.id === currentCategory.id ? updatedCategory : cat)))
			}
		}
		setEditDialogOpen(false)
	}

	// Get icon component based on name
	const getIconComponent = (iconName) => {
		switch (iconName) {
			case "sparkles":
				return <Sparkles className="h-4 w-4" />
			case "file":
				return <FileText className="h-4 w-4" />
			case "car":
				return <Car className="h-4 w-4" />
			case "education":
				return <GraduationCap className="h-4 w-4" />
			case "entertainment":
				return <Film className="h-4 w-4" />
			case "family":
				return <Users className="h-4 w-4" />
			case "food":
				return <Utensils className="h-4 w-4" />
			case "salary":
				return <DollarSign className="h-4 w-4" />
			case "groceries":
				return <ShoppingBag className="h-4 w-4" />
			case "healthcare":
				return <Heart className="h-4 w-4" />
			case "home":
				return <Home className="h-4 w-4" />
			case "shopping":
				return <ShoppingCart className="h-4 w-4" />
			case "sports":
				return <Dumbbell className="h-4 w-4" />
			case "hobbies":
				return <Briefcase className="h-4 w-4" />
			case "travel":
				return <Plane className="h-4 w-4" />
			case "transport":
				return <Bus className="h-4 w-4" />
			case "work":
				return <Briefcase className="h-4 w-4" />
			case "business":
				return <Building className="h-4 w-4" />
			case "client":
				return <UserCheck className="h-4 w-4" />
			case "gifts":
				return <Gift className="h-4 w-4" />
			case "insurance":
				return <Umbrella className="h-4 w-4" />
			case "loan":
				return <Banknote className="h-4 w-4" />
			case "other":
				return <FileQuestion className="h-4 w-4" />
			default:
				return <FileQuestion className="h-4 w-4" />
		}
	}

	// Drag and drop handlers
	const handleDragStart = (e, category, type) => {
		setDraggedCategory({ ...category, type })
	}

	const handleDragOver = (e, category) => {
		e.preventDefault()
		setDragOverCategory(category)
	}

	const handleDrop = (e, category, type) => {
		e.preventDefault()

		if (draggedCategory && draggedCategory.type === type) {
			if (type === "expense") {
				const updatedCategories = [...expenseCategories]
				const draggedIndex = updatedCategories.findIndex((cat) => cat.id === draggedCategory.id)
				const dropIndex = updatedCategories.findIndex((cat) => cat.id === category.id)

				const [removed] = updatedCategories.splice(draggedIndex, 1)
				updatedCategories.splice(dropIndex, 0, removed)

				setExpenseCategories(updatedCategories)
			} else {
				const updatedCategories = [...incomeCategories]
				const draggedIndex = updatedCategories.findIndex((cat) => cat.id === draggedCategory.id)
				const dropIndex = updatedCategories.findIndex((cat) => cat.id === category.id)

				const [removed] = updatedCategories.splice(draggedIndex, 1)
				updatedCategories.splice(dropIndex, 0, removed)

				setIncomeCategories(updatedCategories)
			}
		}

		setDraggedCategory(null)
		setDragOverCategory(null)
	}

	const handleDragEnd = () => {
		setDraggedCategory(null)
		setDragOverCategory(null)
	}

	const CategoryItem = ({ category, type }) => (
		<div
			className={`flex items-center justify-between py-3 border-b last:border-0 ${dragOverCategory?.id === category.id ? "bg-muted/50" : ""}`}
			draggable
			onDragStart={(e) => handleDragStart(e, category, type)}
			onDragOver={(e) => handleDragOver(e, category)}
			onDrop={(e) => handleDrop(e, category, type)}
			onDragEnd={handleDragEnd}
		>
			<div className="flex items-center gap-3">
				<GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
				<div className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${category.color}`}>
					{category.icon}
				</div>
				<span>{category.name}</span>
			</div>
			<div className="flex items-center gap-1">
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 rounded-full"
					onClick={() => handleEditClick(category, type)}
				>
					<Pencil className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
					<Eye className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10">
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)

	return (
		<div className="space-y-6">
			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle>Create a new categories</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Name</label>
								<Input placeholder="category name" />
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Type</label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Choose..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="expense">Expense</SelectItem>
										<SelectItem value="income">Income</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Icon</label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Choose..." />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="sparkles">Beauty</SelectItem>
											<SelectItem value="file">Document</SelectItem>
											<SelectItem value="car">Car</SelectItem>
											<SelectItem value="education">Education</SelectItem>
											<SelectItem value="entertainment">Entertainment</SelectItem>
											<SelectItem value="family">Family</SelectItem>
											<SelectItem value="food">Food</SelectItem>
											<SelectItem value="salary">Salary</SelectItem>
											<SelectItem value="groceries">Groceries</SelectItem>
											<SelectItem value="healthcare">Healthcare</SelectItem>
											<SelectItem value="home">Home</SelectItem>
											<SelectItem value="shopping">Shopping</SelectItem>
											<SelectItem value="sports">Sports</SelectItem>
											<SelectItem value="hobbies">Hobbies</SelectItem>
											<SelectItem value="travel">Travel</SelectItem>
											<SelectItem value="transport">Transport</SelectItem>
											<SelectItem value="work">Work</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Color</label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Choose..." />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="red">Red</SelectItem>
											<SelectItem value="orange">Orange</SelectItem>
											<SelectItem value="amber">Amber</SelectItem>
											<SelectItem value="yellow">Yellow</SelectItem>
											<SelectItem value="lime">Lime</SelectItem>
											<SelectItem value="green">Green</SelectItem>
											<SelectItem value="emerald">Emerald</SelectItem>
											<SelectItem value="teal">Teal</SelectItem>
											<SelectItem value="cyan">Cyan</SelectItem>
											<SelectItem value="sky">Sky</SelectItem>
											<SelectItem value="blue">Blue</SelectItem>
											<SelectItem value="indigo">Indigo</SelectItem>
											<SelectItem value="violet">Violet</SelectItem>
											<SelectItem value="purple">Purple</SelectItem>
											<SelectItem value="fuchsia">Fuchsia</SelectItem>
											<SelectItem value="pink">Pink</SelectItem>
											<SelectItem value="rose">Rose</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<Button className="w-full">Create new category</Button>
						</CardContent>
					</Card>
				</div>


				<div className="md:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Income Categories</CardTitle>
						</CardHeader>
						<CardContent>
							{incomeCategories.map((category) => (
								<CategoryItem key={category.id} category={category} type="income" />
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Expense Categories</CardTitle>
						</CardHeader>
						<CardContent>
							{expenseCategories.map((category) => (
								<CategoryItem key={category.id} category={category} type="expense" />
							))}
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Edit Category Dialog */}
			<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Category</DialogTitle>
						<DialogDescription>Make changes to the category details below.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="edit-name">Name</Label>
							<Input
								id="edit-name"
								value={editForm.name}
								onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="edit-icon">Icon</Label>
							<Select
								value={editForm.iconName}
								onValueChange={(value) => setEditForm({ ...editForm, iconName: value })}
							>
								<SelectTrigger id="edit-icon">
									<SelectValue placeholder="Choose icon" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="sparkles">Beauty</SelectItem>
									<SelectItem value="file">Document</SelectItem>
									<SelectItem value="car">Car</SelectItem>
									<SelectItem value="education">Education</SelectItem>
									<SelectItem value="entertainment">Entertainment</SelectItem>
									<SelectItem value="family">Family</SelectItem>
									<SelectItem value="food">Food</SelectItem>
									<SelectItem value="salary">Salary</SelectItem>
									<SelectItem value="groceries">Groceries</SelectItem>
									<SelectItem value="healthcare">Healthcare</SelectItem>
									<SelectItem value="home">Home</SelectItem>
									<SelectItem value="shopping">Shopping</SelectItem>
									<SelectItem value="sports">Sports</SelectItem>
									<SelectItem value="hobbies">Hobbies</SelectItem>
									<SelectItem value="travel">Travel</SelectItem>
									<SelectItem value="transport">Transport</SelectItem>
									<SelectItem value="work">Work</SelectItem>
									<SelectItem value="business">Business</SelectItem>
									<SelectItem value="client">Client</SelectItem>
									<SelectItem value="gifts">Gifts</SelectItem>
									<SelectItem value="insurance">Insurance</SelectItem>
									<SelectItem value="loan">Loan</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="edit-color">Color</Label>
							<Select value={editForm.color} onValueChange={(value) => setEditForm({ ...editForm, color: value })}>
								<SelectTrigger id="edit-color">
									<SelectValue placeholder="Choose color" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="red-500">Red</SelectItem>
									<SelectItem value="orange-500">Orange</SelectItem>
									<SelectItem value="amber-500">Amber</SelectItem>
									<SelectItem value="yellow-500">Yellow</SelectItem>
									<SelectItem value="lime-500">Lime</SelectItem>
									<SelectItem value="green-500">Green</SelectItem>
									<SelectItem value="emerald-500">Emerald</SelectItem>
									<SelectItem value="teal-500">Teal</SelectItem>
									<SelectItem value="cyan-500">Cyan</SelectItem>
									<SelectItem value="sky-500">Sky</SelectItem>
									<SelectItem value="blue-500">Blue</SelectItem>
									<SelectItem value="indigo-500">Indigo</SelectItem>
									<SelectItem value="violet-500">Violet</SelectItem>
									<SelectItem value="purple-500">Purple</SelectItem>
									<SelectItem value="fuchsia-500">Fuchsia</SelectItem>
									<SelectItem value="pink-500">Pink</SelectItem>
									<SelectItem value="rose-500">Rose</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="flex items-center gap-3 mt-2">
							<div className={`flex h-8 w-8 items-center justify-center rounded-full text-white bg-${editForm.color}`}>
								{getIconComponent(editForm.iconName)}
							</div>
							<span className="text-sm">Preview</span>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setEditDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSaveEdit}>Save Changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

