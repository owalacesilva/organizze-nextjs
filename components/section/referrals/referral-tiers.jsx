"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Info } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const referralTiers = [
	{ name: "Bronze", percentage: 5, minReferrals: 0, maxReferrals: 5 },
	{ name: "Silver", percentage: 7, minReferrals: 5, maxReferrals: 15 },
	{ name: "Gold", percentage: 10, minReferrals: 15, maxReferrals: 30 },
	{ name: "Platinum", percentage: 15, minReferrals: 30, maxReferrals: null },
]

export function ReferralTiers() {
	const currentReferrals = 12
	const [isMobile, setIsMobile] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)
	const [showTopArrow, setShowTopArrow] = useState(false)
	const [showBottomArrow, setShowBottomArrow] = useState(true)
	const sliderRef = useRef(null)
	const containerRef = useRef(null)

	// Find current tier
	const currentTier = referralTiers.find(
		(tier) =>
			currentReferrals >= tier.minReferrals && (tier.maxReferrals === null || currentReferrals < tier.maxReferrals),
	)

	// Calculate progress to next tier
	const nextTier = referralTiers.find((tier) => tier.minReferrals > currentReferrals)
	const progressPercentage = nextTier
		? ((currentReferrals - currentTier.minReferrals) / (nextTier.minReferrals - currentTier.minReferrals)) * 100
		: 100

	// Find the index of the current tier
	useEffect(() => {
		const currentTierIndex = referralTiers.findIndex(
			(tier) =>
				currentReferrals >= tier.minReferrals && (tier.maxReferrals === null || currentReferrals < tier.maxReferrals),
		)
		setActiveIndex(currentTierIndex)
	}, [currentReferrals])

	// Check if viewport is mobile
	useEffect(() => {
		const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
		checkIfMobile()
		window.addEventListener("resize", checkIfMobile)
		return () => window.removeEventListener("resize", checkIfMobile)
	}, [])

	// Check scroll position to show/hide arrows
	const checkScrollPosition = () => {
		if (sliderRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = sliderRef.current
			setShowTopArrow(scrollTop > 0)
			setShowBottomArrow(scrollTop < scrollHeight - clientHeight - 5) // 5px buffer
		}
	}

	useEffect(() => {
		const slider = sliderRef.current
		if (slider) {
			slider.addEventListener("scroll", checkScrollPosition)
			// Initial check
			checkScrollPosition()
			return () => slider.removeEventListener("scroll", checkScrollPosition)
		}
	}, [])

	// Scroll to active tier on initial load
	useEffect(() => {
		if (sliderRef.current && !isMobile) {
			const tierElements = sliderRef.current.querySelectorAll(".tier-card")
			if (tierElements[activeIndex]) {
				const containerHeight = sliderRef.current.clientHeight
				const tierHeight = tierElements[activeIndex].offsetHeight
				const scrollPosition = tierElements[activeIndex].offsetTop - containerHeight / 2 + tierHeight / 2

				sliderRef.current.scrollTo({
					top: scrollPosition,
					behavior: "smooth",
				})
			}
		}
	}, [activeIndex, isMobile])

	// Carousel navigation for mobile
	const goToPrevious = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1)
		}
	}

	const goToNext = () => {
		if (activeIndex < referralTiers.length - 1) {
			setActiveIndex(activeIndex + 1)
		}
	}

	// Vertical slider navigation for desktop
	const scrollUp = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				top: -200,
				behavior: "smooth",
			})
		}
	}

	const scrollDown = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				top: 200,
				behavior: "smooth",
			})
		}
	}

	return (
		<Card className="border-primary/10 overflow-hidden">
			<CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 p-4 sm:p-6 pb-2">
				<CardTitle className="text-base sm:text-lg">Referral Tiers</CardTitle>
				<div className="rounded-full bg-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-primary">
					Current Bonus: {currentTier.percentage}%
				</div>
			</CardHeader>
			<CardContent className="p-3 sm:p-4 md:p-6">
				{/* Mobile view with carousel */}
				{isMobile && (
					<div className="md:hidden">
						<div className="flex items-center justify-between mb-3 sm:mb-4">
							<button
								onClick={goToPrevious}
								disabled={activeIndex === 0}
								className={cn(
									"p-1.5 sm:p-2 rounded-full border border-primary/20 transition-all",
									activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/10",
								)}
								aria-label="Previous tier"
							>
								<ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
							</button>

							<div className="text-xs sm:text-sm font-medium">
								{activeIndex + 1} of {referralTiers.length}
							</div>

							<button
								onClick={goToNext}
								disabled={activeIndex === referralTiers.length - 1}
								className={cn(
									"p-1.5 sm:p-2 rounded-full border border-primary/20 transition-all",
									activeIndex === referralTiers.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/10",
								)}
								aria-label="Next tier"
							>
								<ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
							</button>
						</div>

						<div className="overflow-hidden">
							<div
								className="flex transition-transform duration-300 ease-in-out"
								style={{ transform: `translateX(-${activeIndex * 100}%)` }}
							>
								{referralTiers.map((tier) => {
									const isActive = currentReferrals >= tier.minReferrals
									const isCurrentTier =
										currentReferrals >= tier.minReferrals &&
										(tier.maxReferrals === null || currentReferrals < tier.maxReferrals)

									return (
										<div
											key={tier.name}
											className={cn(
												"p-3 sm:p-4 rounded-lg border transition-all w-full flex-shrink-0 tier-card",
												isCurrentTier ? "border-primary bg-primary/5 shadow-sm" : "border-muted bg-muted/30",
											)}
										>
											<div className="flex justify-between items-center mb-1 sm:mb-2">
												<div className="text-sm sm:text-base font-medium">{tier.name}</div>
												<div
													className={cn(
														"text-xs sm:text-sm font-semibold",
														isActive ? "text-primary" : "text-muted-foreground",
													)}
												>
													{tier.percentage}%
												</div>
											</div>
											<div className="text-xs sm:text-sm text-muted-foreground">
												{tier.minReferrals} - {tier.maxReferrals ?? "∞"} referrals
											</div>
											{isCurrentTier && (
												<div className="mt-2">
													<div className="flex justify-between text-[10px] sm:text-xs mb-1">
														<span>Progress to next tier</span>
														<span>
															{currentReferrals}/{nextTier?.minReferrals || "∞"}
														</span>
													</div>
													<Progress value={progressPercentage} className="h-1 sm:h-1.5" />
												</div>
											)}
										</div>
									)
								})}
							</div>
						</div>

						{/* Carousel indicators */}
						<div className="flex justify-center mt-3 sm:mt-4 gap-1">
							{referralTiers.map((_, index) => (
								<button
									key={index}
									onClick={() => setActiveIndex(index)}
									className={cn(
										"h-1.5 sm:h-2 rounded-full transition-all",
										index === activeIndex ? "bg-primary w-3 sm:w-4" : "bg-primary/30 w-1.5 sm:w-2",
									)}
									aria-label={`Go to tier ${index + 1}`}
								/>
							))}
						</div>
					</div>
				)}

				{/* Desktop view with vertical slider */}
				<div className={cn("relative", isMobile ? "hidden" : "block")}>
					{/* Vertical tier cards slider */}
					<div className="grid grid-cols-12 gap-3 sm:gap-6 mt-2 sm:mt-4 mb-4 sm:mb-8">
						{/* Left side: Progress info */}
						<div className="col-span-7 rounded-lg bg-muted/30 p-3 sm:p-4 text-xs sm:text-sm border border-primary/10">
							<p className="flex items-center gap-1 sm:gap-2 font-medium text-primary">
								<Info className="h-3 w-3 sm:h-4 sm:w-4" />
								<span>How to increase your tier</span>
							</p>
							<p className="mt-1 sm:mt-2 text-muted-foreground">
								Invite more friends to use our platform. Each successful referral counts toward your tier progression.
								Higher tiers earn higher commission percentages on all referral earnings.
							</p>

							<div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary/10">
								<h4 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Your Progress</h4>
								<div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
									<div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary"></div>
									<span className="text-xs sm:text-sm">
										Current Tier: <span className="font-medium">{currentTier.name}</span>
									</span>
								</div>
								<div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
									<div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary/30"></div>
									<span className="text-xs sm:text-sm">
										Current Referrals: <span className="font-medium">{currentReferrals}</span>
									</span>
								</div>
								<div className="flex items-center gap-1 sm:gap-2">
									<div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-muted-foreground"></div>
									<span className="text-xs sm:text-sm">
										Next Tier: <span className="font-medium">{nextTier?.name || "Max tier reached"}</span>
									</span>
								</div>
							</div>
						</div>

						{/* Right side: Vertical slider */}
						<div ref={containerRef} className="col-span-5 relative h-[250px] sm:h-[300px] md:h-[350px]">
							{showTopArrow && (
								<Button
									variant="outline"
									size="icon"
									className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10 rounded-full bg-background border-primary/20 shadow-md h-6 w-6 sm:h-8 sm:w-8"
									onClick={scrollUp}
									aria-label="Scroll up"
								>
									<ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
								</Button>
							)}

							<div
								ref={sliderRef}
								className="flex flex-col overflow-y-auto gap-3 sm:gap-4 pr-1 sm:pr-2 h-full scrollbar-hide snap-y snap-mandatory"
								style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
							>
								{referralTiers.map((tier) => {
									const isActive = currentReferrals >= tier.minReferrals
									const isCurrentTier =
										currentReferrals >= tier.minReferrals &&
										(tier.maxReferrals === null || currentReferrals < tier.maxReferrals)

									return (
										<div
											key={tier.name}
											className={cn(
												"p-3 sm:p-4 rounded-lg border transition-all flex-shrink-0 snap-center tier-card",
												isCurrentTier ? "border-primary bg-primary/5 shadow-md" : "border-muted bg-muted/30",
											)}
										>
											<div className="flex justify-between items-center mb-1 sm:mb-2">
												<div className="text-xs sm:text-sm font-medium">{tier.name}</div>
												<div
													className={cn(
														"px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold",
														isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
													)}
												>
													{tier.percentage}%
												</div>
											</div>
											<div className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
												{tier.minReferrals} - {tier.maxReferrals ?? "∞"} referrals
											</div>

											{isCurrentTier ? (
												<div className="mt-1 sm:mt-2">
													<div className="flex justify-between text-[10px] sm:text-xs mb-1">
														<span className="font-medium text-primary">Current Tier</span>
														<span>
															{currentReferrals}/{nextTier?.minReferrals || "∞"}
														</span>
													</div>
													<Progress value={progressPercentage} className="h-1 sm:h-1.5" />
												</div>
											) : isActive ? (
												<div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-primary font-medium">
													Tier Achieved
												</div>
											) : (
												<div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground">
													Need {tier.minReferrals - currentReferrals} more referrals
												</div>
											)}
										</div>
									)
								})}
							</div>

							{showBottomArrow && (
								<Button
									variant="outline"
									size="icon"
									className="absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 z-10 rounded-full bg-background border-primary/20 shadow-md h-6 w-6 sm:h-8 sm:w-8"
									onClick={scrollDown}
									aria-label="Scroll down"
								>
									<ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
								</Button>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

