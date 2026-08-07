"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { BRAND_NAME } from "@/lib/brand";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AuthForm from "./AuthForm";

const SOCIAL_LINKS = [
	{ key: "facebook", Icon: Facebook },
	{ key: "twitter", Icon: Twitter },
	{ key: "linkedin", Icon: Linkedin },
	{ key: "github", Icon: Github },
];

export default function LoginPage() {
	const { t } = useTranslation();

	return (
		<div className="flex min-h-screen items-center justify-center p-0">
			<div className="flex min-h-[500px] w-full max-w-4xl overflow-hidden rounded-xl border shadow-lg">
				<div className="relative hidden w-1/2 bg-primary md:block">
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/1.jpg"
							alt=""
							fill
							className="object-cover opacity-50"
							priority
						/>
					</div>

					<div className="relative z-10 flex h-full flex-col justify-between p-3 text-primary-foreground lg:p-8">
						<Link href="/">
							<Image
								src="/images/logo-white.png"
								alt={BRAND_NAME}
								width={96}
								height={32}
								className="h-8 w-auto"
							/>
							<p className="mt-3 text-sm font-semibold">
								{t("auth.welcome", { brand: BRAND_NAME })}
							</p>
						</Link>

						<div className="space-y-2">
							<div className="flex gap-2">
								{SOCIAL_LINKS.map(({ key, Icon }) => (
									<Link
										key={key}
										href="#"
										aria-label={key}
										className="rounded-full bg-primary-foreground/20 p-2 transition-colors hover:bg-primary-foreground/30"
									>
										<Icon size={16} />
									</Link>
								))}
							</div>

							<div className="space-y-1 text-xs">
								<Link href="#" className="block hover:underline">
									{t("auth.twoFactorHelp")}
								</Link>
								<Link href="#" className="block hover:underline">
									{t("auth.privacyPolicy")}
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="flex w-full flex-col md:w-1/2">
					<AuthForm />
				</div>
			</div>
		</div>
	);
}
