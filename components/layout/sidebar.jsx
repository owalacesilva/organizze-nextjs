"use client"
import Link from "next/link"
import { Logo } from "../elements/logo"
import { MainNav } from "./nav"

export function DashboardSidebar() {
	return (
		<>
			{/* Desktop Sidebar */}
			<div className="fixed top-0 left-0 bottom-0 z-50 w-[82px] flex-col bg-primary hidden md:flex">
				<div className="flex h-[88px] items-center justify-center border-b border-white/10">
					<Link href="/" className="flex items-center">
						<Logo iconOnly  size="lg" />
					</Link>
				</div>
				<div className="flex-1 overflow-auto py-4">
					<MainNav variant="desktop" />
				</div>
			</div>

			{/* Mobile Sidebar */}
			<div className="fixed inset-x-0 bottom-16 z-50 flex h-16 bg-primary md:hidden">
				<MainNav variant="mobile" />
			</div>
		</>
	)
}

