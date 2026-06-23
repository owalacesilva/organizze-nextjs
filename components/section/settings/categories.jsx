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
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, GripVertical, Loader2, Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useCreateCategory, useGetCategories } from "@/app/api/categories/hooks"

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

const NAME_TO_ICON = {
	beauty: "sparkles",
	bills: "file",
	fees: "file",
	car: "car",
	education: "education",
	entertainment: "entertainment",
	family: "family",
	food: "food",
	drink: "food",
	salary: "salary",
	groceries: "groceries",
	healthcare: "healthcare",
	health: "healthcare",
	home: "home",
	shopping: "shopping",
	sports: "sports",
	hobbies: "hobbies",
	hobby: "hobbies",
	travel: "travel",
	transport: "transport",
	work: "work",
	business: "business",
	client: "client",
	gifts: "gifts",
	gift: "gifts",
	insurance: "insurance",
	loan: "loan",
	income: "salary",
	earnings: "salary",
	other: "other",
}

const getIconNameFromCategoryName = (name = "") => {
	const lower = name.toLowerCase()
	for (const [keyword, iconName] of Object.entries(NAME_TO_ICON)) {
		if (lower.includes(keyword)) return iconName
	}
	return "other"
}

const getIconComponent = (iconName) => {
	switch (iconName) {
		case "sparkles": return <Sparkles className="h-4 w-4" />
		case "file": return <FileText className="h-4 w-4" />
		case "car": return <Car className="h-4 w-4" />
		case "education": return <GraduationCap className="h-4 w-4" />
		case "entertainment": return <Film className="h-4 w-4" />
		case "family": return <Users className="h-4 w-4" />
		case "food": return <Utensils className="h-4 w-4" />
		case "salary": return <DollarSign className="h-4 w-4" />
		case "groceries": return <ShoppingBag className="h-4 w-4" />
		case "healthcare": return <Heart className="h-4 w-4" />
		case "home": return <Home className="h-4 w-4" />
		case "shopping": return <ShoppingCart className="h-4 w-4" />
		case "sports": return <Dumbbell className="h-4 w-4" />
		case "hobbies": return <Briefcase className="h-4 w-4" />
		case "travel": return <Plane className="h-4 w-4" />
		case "transport": return <Bus className="h-4 w-4" />
		case "work": return <Briefcase className="h-4 w-4" />
		case "business": return <Building className="h-4 w-4" />
		case "client": return <UserCheck className="h-4 w-4" />
		case "gifts": return <Gift className="h-4 w-4" />
		case "insurance": return <Umbrella className="h-4 w-4" />
		case "loan": return <Banknote className="h-4 w-4" />
		case "circle-dollar": return <CircleDollarSign className="h-4 w-4" />
		default: return <FileQuestion className="h-4 w-4" />
	}
}

const enrichCategory = (cat) => ({
	...cat,
	iconName: getIconNameFromCategoryName(cat.name),
})

const CategoriesListSkeleton = () => (
	<div className="space-y-1">
		{Array.from({ length: 4 }).map((_, i) => (
			<div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
				<div className="flex items-center gap-3">
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-8 w-8 rounded-full" />
					<Skeleton className="h-4 w-28" />
				</div>
				<div className="flex items-center gap-1">
					<Skeleton className="h-8 w-8 rounded-full" />
					<Skeleton className="h-8 w-8 rounded-full" />
					<Skeleton className="h-8 w-8 rounded-full" />
				</div>
			</div>
		))}
	</div>
)

export default function Categories() {
	const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategories()
	const createCategoryMutation = useCreateCategory()

	const [expenseCategories, setExpenseCategories] = useState([])
	const [incomeCategories, setIncomeCategories] = useState([])

	useEffect(() => {
		if (!categoriesData?.categories) return
		setExpenseCategories(
			categoriesData.categories
				.filter((c) => c.type === "expenses")
				.map(enrichCategory),
		)
		setIncomeCategories(
			categoriesData.categories
				.filter((c) => c.type === "earnings")
				.map(enrichCategory),
		)
	}, [categoriesData])

	const [newForm, setNewForm] = useState({ name: "", type: "", iconName: "", color: "" })

	const handleCreateCategory = async () => {
		if (!newForm.name || !newForm.type) {
			toast.error("Please fill in the required fields (name and type).")
			return
		}

		try {
			await createCategoryMutation.mutateAsync({
				name: newForm.name,
				description: "",
				type: newForm.type,
				color: newForm.color ? `bg-${newForm.color}-500` : "bg-gray-500",
			})
			toast.success("Category created successfully!")
			setNewForm({ name: "", type: "", iconName: "", color: "" })
		} catch {
			toast.error("Failed to create category. Please try again.")
		}
	}

	const [editDialogOpen, setEditDialogOpen] = useState(false)
	const [currentCategory, setCurrentCategory] = useState(null)
	const [draggedCategory, setDraggedCategory] = useState(null)
	const [dragOverCategory, setDragOverCategory] = useState(null)

	const [editForm, setEditForm] = useState({ name: "", iconName: "", color: "" })

	const handleEditClick = (category, type) => {
		setCurrentCategory({ ...category, type })
		setEditForm({
			name: category.name,
			iconName: category.iconName,
			color: category.color?.replace("bg-", "") ?? "",
		})
		setEditDialogOpen(true)
	}

	const handleSaveEdit = () => {
		if (!currentCategory) return
		const updatedCategory = {
			...currentCategory,
			name: editForm.name,
			iconName: editForm.iconName,
			color: `bg-${editForm.color}`,
		}
		if (currentCategory.type === "expenses") {
			setExpenseCategories((prev) => prev.map((cat) => (cat.id === currentCategory.id ? updatedCategory : cat)))
		} else {
			setIncomeCategories((prev) => prev.map((cat) => (cat.id === currentCategory.id ? updatedCategory : cat)))
		}
		setEditDialogOpen(false)
	}

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
			const setter = type === "expenses" ? setExpenseCategories : setIncomeCategories
			const list = type === "expenses" ? [...expenseCategories] : [...incomeCategories]
			const draggedIndex = list.findIndex((cat) => cat.id === draggedCategory.id)
			const dropIndex = list.findIndex((cat) => cat.id === category.id)
			const [removed] = list.splice(draggedIndex, 1)
			list.splice(dropIndex, 0, removed)
			setter(list)
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
					{getIconComponent(category.iconName)}
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
								<Input
									placeholder="category name"
									value={newForm.name}
									onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Type</label>
								<Select value={newForm.type} onValueChange={(value) => setNewForm({ ...newForm, type: value })}>
									<SelectTrigger>
										<SelectValue placeholder="Choose..." />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="expenses">Expense</SelectItem>
										<SelectItem value="earnings">Income</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium">Icon</label>
									<Select value={newForm.iconName} onValueChange={(value) => setNewForm({ ...newForm, iconName: value })}>
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
									<Select value={newForm.color} onValueChange={(value) => setNewForm({ ...newForm, color: value })}>
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

							<Button
								className="w-full"
								onClick={handleCreateCategory}
								disabled={createCategoryMutation.isPending}
							>
								{createCategoryMutation.isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creating...
									</>
								) : (
									"Create new category"
								)}
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="md:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Income Categories</CardTitle>
						</CardHeader>
						<CardContent>
							{isCategoriesLoading ? (
								<CategoriesListSkeleton />
							) : incomeCategories.length === 0 ? (
								<p className="text-sm text-muted-foreground py-2">No income categories yet.</p>
							) : (
								incomeCategories.map((category) => (
									<CategoryItem key={category.id} category={category} type="earnings" />
								))
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Expense Categories</CardTitle>
						</CardHeader>
						<CardContent>
							{isCategoriesLoading ? (
								<CategoriesListSkeleton />
							) : expenseCategories.length === 0 ? (
								<p className="text-sm text-muted-foreground py-2">No expense categories yet.</p>
							) : (
								expenseCategories.map((category) => (
									<CategoryItem key={category.id} category={category} type="expenses" />
								))
							)}
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
