import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function SiteFooter({ className, ...props }) {
	return (
		<footer
			className={cn("fixed bottom-0 left-0 right-0 z-40 border-t bg-background md:left-[82px]", className)}
			{...props}
		>
			<div className="flex h-16 items-center justify-between px-6">
				<p className="text-sm text-muted-foreground">
					© Copyright <span className="text-[#4318FF]">Evank</span> | All Rights Reserved
				</p>
				<div className="flex items-center space-x-4">
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Facebook className="h-4 w-4" />
						<span className="sr-only">Facebook</span>
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Twitter className="h-4 w-4" />
						<span className="sr-only">Twitter</span>
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Linkedin className="h-4 w-4" />
						<span className="sr-only">LinkedIn</span>
					</Link>
					<Link href="#" className="text-muted-foreground hover:text-foreground">
						<Youtube className="h-4 w-4" />
						<span className="sr-only">YouTube</span>
					</Link>
				</div>
			</div>
		</footer>
	)
}

