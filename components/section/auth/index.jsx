"use client";

import { BRAND_NAME } from "@/lib/brand";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "./AuthForm";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/40 p-4">
			<Link href="/" className="flex flex-col items-center gap-1">
				<Image
					src="/images/logo.png"
					alt={BRAND_NAME}
					width={120}
					height={40}
					className="h-8 w-auto dark:hidden"
					priority
				/>
				<Image
					src="/images/logo-white.png"
					alt={BRAND_NAME}
					width={120}
					height={40}
					className="hidden h-8 w-auto dark:block"
					priority
				/>
			</Link>

			<div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card shadow-lg">
				<AuthForm />
			</div>
		</div>
	);
}
