"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Camera, CheckCircle, Copy, Key, Pencil, QrCode, Share2, Shield, Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function Account() {
	// Dialog states
	const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false)
	const [verifyAccountDialogOpen, setVerifyAccountDialogOpen] = useState(false)
	const [referralDialogOpen, setReferralDialogOpen] = useState(false)
	const [editInfoDialogOpen, setEditInfoDialogOpen] = useState(false)

	// 2FA states
	const [twoFactorMethod, setTwoFactorMethod] = useState("app")
	const [verificationCode, setVerificationCode] = useState("")

	// Verification states
	const [verificationStep, setVerificationStep] = useState(1)
	const [idType, setIdType] = useState("passport")

	// User information states
	const [userInfo, setUserInfo] = useState({
		email: "email@example.com",
		type: "Personal",
		country: "Bangladesh",
	})

	// Referral states
	const [referralLink] = useState("https://Evank.com/ref/hafsa123")

	// Handle copy referral link
	const handleCopyReferralLink = () => {
		navigator.clipboard
			.writeText(referralLink)
			.then(() => {
				alert("Referral link copied to clipboard!")
			})
			.catch((err) => {
				console.error("Failed to copy: ", err)
			})
	}

	// Reset verification step when dialog closes
	const handleVerifyDialogClose = () => {
		setVerifyAccountDialogOpen(false)
		setTimeout(() => setVerificationStep(1), 300) // Reset after dialog animation
	}

	// Handle user info form changes
	const handleUserInfoChange = (field, value) => {
		setUserInfo({
			...userInfo,
			[field]: value,
		})
	}

	// Handle save user info
	const handleSaveUserInfo = () => {
		// Here you would typically send the updated info to your backend
		console.log("Saving user info:", userInfo)
		setEditInfoDialogOpen(false)
	}

	return (
		<>
			{/* Main Content */}
			<div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
				<div className="space-y-4 sm:space-y-6 lg:col-span-2">
					{/* Welcome Card */}
					<Card>
						<CardContent className="p-4 sm:p-6">
							<div className="flex flex-col sm:flex-row sm:items-start gap-4">
								<Image
									src="/images/avatar/1.jpg?height=80&width=80"
									alt="Profile"
									width={60}
									height={60}
									className="rounded-full sm:w-[80px] sm:h-[80px] mx-auto sm:mx-0"
								/>
								<div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
									<div>
										<h1 className="text-lg sm:text-xl font-bold text-primary">Welcome, Hafsa Humaira!</h1>
										<p className="text-xs sm:text-sm text-muted-foreground">
											Looks like you are not verified yet. Verify yourself to use the full potential of Evank.
										</p>
									</div>
									<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
										<Button
											className="gap-2 text-xs sm:text-sm h-8 sm:h-10"
											onClick={() => setVerifyAccountDialogOpen(true)}
										>
											<CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
											Verify account
										</Button>
										<Button
											variant="outline"
											className="gap-2 text-xs sm:text-sm h-8 sm:h-10"
											onClick={() => setTwoFactorDialogOpen(true)}
										>
											<Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
											Two-factor authentication (2FA)
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Verify & Upgrade */}
					<Card>
						<CardHeader className="p-4 sm:p-6">
							<CardTitle className="text-base sm:text-lg">Verify & Upgrade</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 sm:space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
							<div className="flex items-center gap-2 text-sm">
								<span className="font-medium">Account Status : </span>
								<span className="text-amber-500 dark:text-amber-400">Pending</span>
							</div>
							<p className="text-xs sm:text-sm text-muted-foreground">
								Your account is unverified. Get verified to enable funding, trading, and withdrawal.
							</p>
							<Button className="text-xs sm:text-sm h-8 sm:h-10" onClick={() => setVerifyAccountDialogOpen(true)}>
								Get Verified
							</Button>
						</CardContent>
					</Card>

					{/* Information */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
							<CardTitle className="text-base sm:text-lg">Information</CardTitle>
							<Button
								variant="secondary"
								onClick={() => setEditInfoDialogOpen(true)}
								className="h-8 sm:h-10 text-xs sm:text-sm"
							>
								<Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
								Edit
							</Button>
						</CardHeader>
						<CardContent className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 px-4 pb-4 sm:px-6 sm:pb-6">
							<div className="space-y-1">
								<p className="text-xs sm:text-sm text-muted-foreground">USER ID</p>
								<p className="text-sm sm:text-base font-medium">818778</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs sm:text-sm text-muted-foreground">EMAIL ADDRESS</p>
								<p className="text-sm sm:text-base font-medium">{userInfo.email}</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs sm:text-sm text-muted-foreground">JOINED SINCE</p>
								<p className="text-sm sm:text-base font-medium">20/10/2020</p>
							</div>
							<div className="space-y-1">
								<p className="text-xs sm:text-sm text-muted-foreground">TYPE</p>
								<p className="text-sm sm:text-base font-medium">{userInfo.type}</p>
							</div>
							<div className="space-y-1 sm:col-span-2">
								<p className="text-xs sm:text-sm text-muted-foreground">COUNTRY OF RESIDENCE</p>
								<p className="text-sm sm:text-base font-medium">{userInfo.country}</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-4 sm:space-y-6">
					{/* Download App */}
					<Card>
						<CardHeader className="p-4 sm:p-6">
							<CardTitle className="text-base sm:text-lg">Download App</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 sm:space-y-6 px-4 pb-4 sm:px-6 sm:pb-6">
							<div className="space-y-1 sm:space-y-2">
								<h3 className="text-sm sm:text-base font-medium">Get Verified On Our Mobile App</h3>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Verifying your identity on our mobile app more secure, faster, and reliable.
								</p>
							</div>
							<div className="flex flex-col gap-2 sm:gap-3">
								<a
									href="#"
									className="transition-transform hover:scale-105 h-8 sm:h-10"
									target="_blank"
									rel="noopener noreferrer"
								>
									<div className="h-full rounded-md overflow-hidden">
										<svg viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
											<rect width="135" height="40" rx="5" fill="#000" />
											<path
												d="M130 0H5C2.25 0 0 2.25 0 5v30c0 2.75 2.25 5 5 5h125c2.75 0 5-2.25 5-5V5c0-2.75-2.25-5-5-5z"
												fill="#a6a6a6"
											/>
											<path
												d="M130 .8a4.2 4.2 0 0 1 4.2 4.2v30a4.2 4.2 0 0 1-4.2 4.2H5A4.2 4.2 0 0 1 .8 35V5A4.2 4.2 0 0 1 5 .8h125m0-.8H5C2.25 0 0 2.25 0 5v30c0 2.75 2.25 5 5 5h125c2.75 0 5-2.25 5-5V5c0-2.75-2.25-5-5-5z"
												fill="#fff"
											/>
											<path
												d="M47.42 10.24c0 .84-.25 1.51-.75 2-.56.59-1.28.89-2.17.89-.85 0-1.57-.3-2.17-.9-.6-.6-.9-1.35-.9-2.25 0-.89.3-1.65.9-2.25.6-.6 1.32-.9 2.17-.9.42 0 .82.08 1.19.25.37.17.67.39.9.67l-.51.51c-.38-.45-.9-.67-1.58-.67-.61 0-1.13.21-1.57.64-.44.43-.66 1-.66 1.7 0 .71.22 1.27.66 1.7.44.43.97.64 1.57.64.64 0 1.18-.21 1.61-.64.28-.28.44-.67.5-1.16h-2.11V9.8h2.82c.03.16.04.31.04.45zm4.53-2.33h-2.65v1.85h2.39v.7h-2.39v1.85h2.65v.71h-3.4V7.2h3.4v.71zm3.36 5.11h-.75V7.91h-1.64V7.2h4.02v.71h-1.63v5.11zm4.6 0V7.2h.75v5.82h-.75zm4.04 0h-.75V7.91h-1.64V7.2h4.02v.71h-1.63v5.11zm9.23-.75c-.59.6-1.32.9-2.17.9-.85 0-1.58-.3-2.17-.9-.6-.6-.9-1.34-.9-2.24 0-.89.3-1.65.9-2.25.6-.6 1.32-.9 2.17-.9.85 0 1.57.3 2.17.9.59.6.89 1.35.89 2.25 0 .9-.3 1.64-.89 2.24zm-3.77-.5c.44.43.97.64 1.6.64.63 0 1.16-.21 1.6-.64.44-.43.66-.99.66-1.69 0-.7-.22-1.27-.66-1.7-.44-.43-.97-.64-1.6-.64-.63 0-1.16.21-1.6.64-.44.43-.66 1-.66 1.7 0 .7.22 1.26.66 1.69zm5.69 1.25V7.2h.91l2.83 4.53V7.2h.75v5.82h-.78l-2.96-4.74v4.74h-.75z"
												fill="#fff"
												stroke="#fff"
												strokeWidth=".2"
											/>
											<path
												d="M68.14 21.75A4.25 4.25 0 0 0 72.41 26h.06c-.03 0-.06 0-.09-.01.03.01.06.01.09.01h.1v-8.34c0-2.2-1.7-3.42-3.95-3.42-2.25 0-3.95 1.22-3.95 3.42h2.37c0-1.18.67-1.82 1.58-1.82.91 0 1.58.64 1.58 1.82v.74l-2.38.72c-1.7.51-3.01 1.62-3.01 3.42 0 2.04 1.58 3.42 3.33 3.42zm.4-1.54c-.91 0-1.64-.64-1.64-1.58 0-.94.73-1.45 1.52-1.71l1.82-.54v.67c0 1.82-.79 3.16-1.7 3.16zm9.5 1.35V14.44h-2.37v12.1h2.37v-5.01l-.03.03zm3.95.19V14.44h-2.37v7.31h2.37zm-1.19-8.5c.79 0 1.43-.64 1.43-1.42 0-.78-.64-1.42-1.43-1.42-.79 0-1.43.64-1.43 1.42 0 .78.64 1.42 1.43 1.42zm6.93 8.5v-4.46c0-1.45.85-2.2 1.95-2.2 1.03 0 1.64.61 1.64 1.82v4.84h2.37v-5.31c0-2.33-1.34-3.55-3.19-3.55-1.09 0-2.07.48-2.77 1.58v-1.28h-2.37v8.56h2.37zm14.05-4.28c0-2.64-1.95-4.47-4.56-4.47-2.62 0-4.56 1.83-4.56 4.47 0 2.64 1.94 4.47 4.56 4.47 2.61 0 4.56-1.83 4.56-4.47zm-2.38 0c0 1.42-.91 2.33-2.19 2.33-1.28 0-2.19-.91-2.19-2.33 0-1.42.91-2.33 2.19-2.33 1.28 0 2.19.91 2.19 2.33zm10.35 4.28l-3.28-8.56h-2.56l4.62 11.2-.24.61c-.49 1.25-1.07 1.72-2.01 1.72-.27 0-.55-.03-.82-.1v1.99c.4.1.79.16 1.19.16 1.88 0 2.89-.81 3.95-3.42l4.01-12.16h-2.38l-2.48 8.56z"
												fill="#fff"
											/>
											<path
												d="M13.21 8.5c-.42.43-.67 1.03-.67 1.83v29.34c0 .8.25 1.4.67 1.83l.1.1 16.44-16.44v-.38L13.31 8.4l-.1.1z"
												fill="url(#a)"
											/>
											<path
												d="M34.27 29.7l-5.47-5.47v-.38l5.47-5.47.12.07 6.48 3.68c1.85 1.05 1.85 2.77 0 3.82l-6.48 3.68-.12.07z"
												fill="url(#b)"
											/>
											<path d="M34.4 29.63l-5.6-5.6-15.58 15.58c.61.64 1.61.72 2.74.08l18.44-10.06" fill="url(#c)" />
											<path d="M34.4 18.43L15.95 8.37c-1.13-.64-2.13-.56-2.74.08l15.58 15.58 5.6-5.6z" fill="url(#d)" />
											<defs>
												<linearGradient
													id="a"
													x1="21.8"
													y1="173.29"
													x2="5.02"
													y2="156.51"
													gradientTransform="matrix(1 0 0 -1 0 182)"
													gradientUnits="userSpaceOnUse"
												>
													<stop stopColor="#00a0ff" />
													<stop offset=".01" stopColor="#00a1ff" />
													<stop offset=".26" stopColor="#00beff" />
													<stop offset=".51" stopColor="#00d2ff" />
													<stop offset=".76" stopColor="#00dfff" />
													<stop offset="1" stopColor="#00e3ff" />
												</linearGradient>
												<linearGradient
													id="b"
													x1="33.83"
													y1="162"
													x2="9.64"
													y2="162"
													gradientTransform="matrix(1 0 0 -1 0 182)"
													gradientUnits="userSpaceOnUse"
												>
													<stop stopColor="#ffe000" />
													<stop offset=".41" stopColor="#ffbd00" />
													<stop offset=".78" stopColor="#ffa500" />
													<stop offset="1" stopColor="#ff9c00" />
												</linearGradient>
												<linearGradient
													id="c"
													x1="24.83"
													y1="159.7"
													x2="2.07"
													y2="136.95"
													gradientTransform="matrix(1 0 0 -1 0 182)"
													gradientUnits="userSpaceOnUse"
												>
													<stop stopColor="#ff3a44" />
													<stop offset="1" stopColor="#c31162" />
												</linearGradient>
												<linearGradient
													id="d"
													x1="7.3"
													y1="181.82"
													x2="17.46"
													y2="171.66"
													gradientTransform="matrix(1 0 0 -1 0 182)"
													gradientUnits="userSpaceOnUse"
												>
													<stop stopColor="#32a071" />
													<stop offset=".07" stopColor="#2da771" />
													<stop offset=".48" stopColor="#15cf74" />
													<stop offset=".8" stopColor="#06e775" />
													<stop offset="1" stopColor="#00f076" />
												</linearGradient>
											</defs>
										</svg>
									</div>
								</a>
								<a
									href="#"
									className="transition-transform hover:scale-105 h-8 sm:h-10"
									target="_blank"
									rel="noopener noreferrer"
								>
									<div className="h-full rounded-md overflow-hidden">
										<svg viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
											<rect width="135" height="40" rx="5" fill="#000" />
											<g fill="#FFF">
												<path d="M68.137 21.752c-.083-6.738 5.519-10.007 5.78-10.172-3.158-4.61-8.05-5.235-9.782-5.293-4.12-.424-8.122 2.458-10.231 2.458-2.138 0-5.37-2.413-8.842-2.343-4.482.066-8.658 2.651-10.96 6.663-4.727 8.192-1.206 20.251 3.343 26.878 2.265 3.242 4.933 6.873 8.414 6.743 3.402-.14 4.673-2.171 8.776-2.171 4.068 0 5.258 2.171 8.805 2.093 3.65-.065 5.952-3.272 8.15-6.541 2.62-3.722 3.682-7.371 3.733-7.558-.083-.03-7.125-2.717-7.186-10.757zM62.181 6.72c1.844-2.291 3.1-5.41 2.756-8.585-2.667.112-5.995 1.842-7.915 4.094-1.705 1.992-3.226 5.24-2.833 8.293 2.997.225 6.07-1.494 7.992-3.802z" />
												<path d="M48.979 31.602h-2.342l-1.284-4.034h-4.462l-1.224 4.034h-2.281l4.422-13.734h2.777l4.394 13.734zm-4.03-5.728l-1.16-3.586c-.122-.368-.353-1.235-.693-2.6h-.04c-.136.573-.353 1.44-.652 2.6l-1.142 3.586h3.687zM60.366 26.796c0 1.587-.43 2.853-1.292 3.797-.773.846-1.731 1.27-2.874 1.27-1.234 0-2.12-.442-2.658-1.327v4.904h-2.2V25.29c0-1.058-.027-2.143-.082-3.255h1.935l.123 1.57h.04c.694-1.184 1.747-1.776 3.158-1.776 1.102 0 2.02.442 2.756 1.327.736.885 1.103 2.05 1.103 3.494l-.01 1.146zm-2.24.123c0-.91-.205-1.66-.614-2.25-.45-.613-1.053-.92-1.808-.92-.512 0-.976.17-1.393.511-.417.34-.69.786-.817 1.337-.064.258-.096.47-.096.634v1.561c0 .68.208 1.255.625 1.725.417.47.957.705 1.62.705.778 0 1.385-.3 1.822-.899.437-.6.655-1.386.655-2.36l.006-.044zM71.443 26.796c0 1.587-.43 2.853-1.292 3.797-.773.846-1.731 1.27-2.874 1.27-1.234 0-2.12-.442-2.658-1.327v4.904h-2.2V25.29c0-1.058-.027-2.143-.082-3.255h1.935l.123 1.57h.04c.694-1.184 1.747-1.776 3.158-1.776 1.102 0 2.02.442 2.756 1.327.736.885 1.103 2.05 1.103 3.494l-.01 1.146zm-2.24.123c0-.91-.205-1.66-.614-2.25-.45-.613-1.053-.92-1.808-.92-.512 0-.976.17-1.393.511-.417.34-.69.786-.817 1.337-.064.258-.096.47-.096.634v1.561c0 .68.208 1.255.625 1.725.417.47.957.705 1.62.705.778 0 1.385-.3 1.822-.899.437-.6.655-1.386.655-2.36l.006-.044zM83.031 27.837c0 1.146-.4 2.077-1.2 2.794-.88.79-2.107 1.184-3.68 1.184-1.454 0-2.62-.28-3.5-.839l.502-1.827c.95.56 1.992.839 3.125.839.817 0 1.454-.184 1.912-.552.458-.368.687-.859.687-1.47 0-.547-.187-1.008-.56-1.384-.374-.375-.993-.724-1.858-1.045-2.356-.87-3.533-2.143-3.533-3.82 0-1.1.413-2 1.24-2.704.825-.704 1.925-1.056 3.3-1.056 1.23 0 2.25.214 3.06.643l-.54 1.786c-.762-.408-1.62-.613-2.576-.613-.763 0-1.358.185-1.784.553-.366.33-.55.73-.55 1.204 0 .532.206.973.619 1.322.36.316 1.01.657 1.953 1.022 1.157.46 2.006 1 2.55 1.618.543.618.815 1.389.815 2.31l.018.039zM89.118 23.508h-2.423v4.8c0 1.222.428 1.832 1.284 1.832.394 0 .72-.034.976-.102l.06 1.664c-.434.163-1.004.245-1.712.245-.87 0-1.55-.265-2.04-.796-.49-.53-.734-1.422-.734-2.673v-4.97h-1.444v-1.643h1.444v-1.807l2.158-.654v2.46h2.423v1.644h.008zM99.916 26.878c0 1.434-.41 2.61-1.23 3.525-.861.95-2.001 1.424-3.42 1.424-1.37 0-2.46-.455-3.268-1.365-.807-.91-1.21-2.058-1.21-3.442 0-1.444.417-2.628 1.25-3.552.834-.923 1.958-1.384 3.37-1.384 1.37 0 2.474.46 3.309 1.384.8.892 1.2 2.058 1.2 3.401v.009zm-2.28.082c0-.858-.184-1.595-.552-2.209-.43-.736-1.044-1.103-1.84-1.103-.824 0-1.452.368-1.881 1.103-.368.614-.552 1.368-.552 2.26 0 .858.184 1.595.552 2.208.443.736 1.063 1.103 1.867 1.103.782 0 1.395-.375 1.84-1.122.38-.623.566-1.368.566-2.24zM106.937 23.753c-.217-.04-.448-.06-.693-.06-.776 0-1.375.294-1.796.882-.368.531-.552 1.2-.552 2.005v5.322h-2.2l.02-6.944c0-1.143-.027-2.184-.08-3.124h1.913l.08 1.9h.06c.232-.654.599-1.18 1.102-1.577.49-.356 1.022-.532 1.592-.532.204 0 .388.013.552.04v2.088zM118.623 26.347c0 .398-.027.73-.082.997h-6.596c.027.98.347 1.727.96 2.24.557.46 1.278.69 2.16.69.98 0 1.867-.156 2.67-.47l.343 1.524c-.937.408-2.045.612-3.322.612-1.535 0-2.742-.45-3.62-1.352-.88-.9-1.32-2.112-1.32-3.634 0-1.493.409-2.735 1.228-3.728.857-1.05 2.01-1.576 3.46-1.576 1.428 0 2.51.526 3.248 1.576.587.84.88 1.88.88 3.12v.001zm-2.096-.57c.014-.653-.13-1.217-.43-1.69-.382-.613-.97-.92-1.764-.92-.726 0-1.314.298-1.764.899-.368.47-.586 1.042-.654 1.711h4.612z" />
											</g>
										</svg>
									</div>
								</a>
							</div>
						</CardContent>
					</Card>

					{/* Referral Program */}
					<Card>
						<CardHeader className="p-4 sm:p-6">
							<CardTitle className="text-base sm:text-lg">Earn 30% Commission</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 sm:space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
							<p className="text-xs sm:text-sm text-muted-foreground">
								Refer your friends and earn 30% of their trading fees.
							</p>
							<Button className="w-full text-xs sm:text-sm h-8 sm:h-10" onClick={() => setReferralDialogOpen(true)}>
								Referral Program
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Edit Information Dialog */}
			<Dialog open={editInfoDialogOpen} onOpenChange={setEditInfoDialogOpen}>
				<DialogContent className="sm:max-w-[500px] p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-base sm:text-lg">Edit Account Information</DialogTitle>
						<DialogDescription className="text-xs sm:text-sm">
							Update your account information below. Your User ID and join date cannot be changed.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
						<div className="space-y-1 sm:space-y-2">
							<Label htmlFor="edit-email" className="text-xs sm:text-sm">
								Email Address
							</Label>
							<Input
								id="edit-email"
								type="email"
								value={userInfo.email}
								onChange={(e) => handleUserInfoChange("email", e.target.value)}
								className="h-8 sm:h-10 text-xs sm:text-sm"
							/>
							<p className="text-[10px] sm:text-xs text-muted-foreground">
								Changing your email will require verification of the new address.
							</p>
						</div>

						<div className="space-y-1 sm:space-y-2">
							<Label htmlFor="edit-type" className="text-xs sm:text-sm">
								Account Type
							</Label>
							<Select value={userInfo.type} onValueChange={(value) => handleUserInfoChange("type", value)}>
								<SelectTrigger id="edit-type" className="h-8 sm:h-10 text-xs sm:text-sm">
									<SelectValue placeholder="Select account type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Personal">Personal</SelectItem>
									<SelectItem value="Business">Business</SelectItem>
									<SelectItem value="Corporate">Corporate</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-1 sm:space-y-2">
							<Label htmlFor="edit-country" className="text-xs sm:text-sm">
								Country of Residence
							</Label>
							<Select value={userInfo.country} onValueChange={(value) => handleUserInfoChange("country", value)}>
								<SelectTrigger id="edit-country" className="h-8 sm:h-10 text-xs sm:text-sm">
									<SelectValue placeholder="Select country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Bangladesh">Bangladesh</SelectItem>
									<SelectItem value="India">India</SelectItem>
									<SelectItem value="Pakistan">Pakistan</SelectItem>
									<SelectItem value="United States">United States</SelectItem>
									<SelectItem value="United Kingdom">United Kingdom</SelectItem>
									<SelectItem value="Canada">Canada</SelectItem>
									<SelectItem value="Australia">Australia</SelectItem>
								</SelectContent>
							</Select>
							<p className="text-[10px] sm:text-xs text-muted-foreground">
								Changing your country may affect your account's regulatory requirements.
							</p>
						</div>

						<div className="rounded-md bg-muted p-3 sm:p-4">
							<div className="flex items-start gap-2 sm:gap-4">
								<AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5" />
								<div className="space-y-0.5 sm:space-y-1">
									<p className="text-xs sm:text-sm font-medium">Important Information</p>
									<p className="text-[10px] sm:text-xs text-muted-foreground">
										Updating your account information may require additional verification steps. Some changes may take
										24-48 hours to be fully processed.
									</p>
								</div>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setEditInfoDialogOpen(false)}
							className="h-8 sm:h-10 text-xs sm:text-sm"
						>
							Cancel
						</Button>
						<Button onClick={handleSaveUserInfo} className="h-8 sm:h-10 text-xs sm:text-sm">
							Save Changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Two-Factor Authentication Dialog */}
			<Dialog open={twoFactorDialogOpen} onOpenChange={setTwoFactorDialogOpen}>
				<DialogContent className="sm:max-w-[500px] p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-base sm:text-lg">Two-Factor Authentication (2FA)</DialogTitle>
						<DialogDescription className="text-xs sm:text-sm">
							Add an extra layer of security to your account by enabling two-factor authentication.
						</DialogDescription>
					</DialogHeader>

					<Tabs defaultValue="app" onValueChange={setTwoFactorMethod} className="mt-2 sm:mt-4">
						<TabsList className="grid w-full grid-cols-2 h-8 sm:h-10">
							<TabsTrigger value="app" className="text-xs sm:text-sm py-1.5">
								Authenticator App
							</TabsTrigger>
							<TabsTrigger value="sms" className="text-xs sm:text-sm py-1.5">
								SMS Verification
							</TabsTrigger>
						</TabsList>

						<TabsContent value="app" className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
							<div className="flex flex-col items-center space-y-3 sm:space-y-4">
								<div className="bg-muted p-3 sm:p-4 rounded-lg">
									<QrCode className="h-24 w-24 sm:h-32 sm:w-32 text-primary" />
								</div>
								<p className="text-xs sm:text-sm text-center text-muted-foreground">
									Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
								</p>
								<div className="w-full space-y-1 sm:space-y-2">
									<Label htmlFor="verification-code" className="text-xs sm:text-sm">
										Enter verification code
									</Label>
									<Input
										id="verification-code"
										placeholder="Enter 6-digit code"
										value={verificationCode}
										onChange={(e) => setVerificationCode(e.target.value)}
										className="h-8 sm:h-10 text-xs sm:text-sm"
									/>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="sms" className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
							<div className="space-y-3 sm:space-y-4">
								<div className="space-y-1 sm:space-y-2">
									<Label htmlFor="phone-number" className="text-xs sm:text-sm">
										Phone Number
									</Label>
									<Input id="phone-number" placeholder="+1 (555) 123-4567" className="h-8 sm:h-10 text-xs sm:text-sm" />
								</div>
								<Button className="w-full h-8 sm:h-10 text-xs sm:text-sm">Send Verification Code</Button>
								<div className="space-y-1 sm:space-y-2">
									<Label htmlFor="sms-code" className="text-xs sm:text-sm">
										Verification Code
									</Label>
									<Input id="sms-code" placeholder="Enter 6-digit code" className="h-8 sm:h-10 text-xs sm:text-sm" />
								</div>
							</div>
						</TabsContent>
					</Tabs>

					<div className="space-y-2 mt-3 sm:mt-4">
						<div className="flex items-center space-x-2">
							<Checkbox id="backup-codes" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
							<Label htmlFor="backup-codes" className="text-xs sm:text-sm">
								I have saved my backup codes
							</Label>
						</div>
						<p className="text-[10px] sm:text-xs text-muted-foreground">
							Backup codes allow you to access your account if you lose your phone or cannot receive verification codes.
						</p>
						<Button variant="outline" className="w-full gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
							<Key className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
							Download Backup Codes
						</Button>
					</div>

					<DialogFooter className="mt-3 sm:mt-4">
						<Button
							variant="outline"
							onClick={() => setTwoFactorDialogOpen(false)}
							className="h-8 sm:h-10 text-xs sm:text-sm"
						>
							Cancel
						</Button>
						<Button className="h-8 sm:h-10 text-xs sm:text-sm">Enable 2FA</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Verify Account Dialog */}
			<Dialog open={verifyAccountDialogOpen} onOpenChange={handleVerifyDialogClose}>
				<DialogContent className="sm:max-w-[600px] p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-base sm:text-lg">Verify Your Account</DialogTitle>
						<DialogDescription className="text-xs sm:text-sm">
							Complete the verification process to unlock all features of your account.
						</DialogDescription>
					</DialogHeader>

					{verificationStep === 1 && (
						<div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
							<h3 className="text-base sm:text-lg font-medium">Step 1: Personal Information</h3>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
								<div className="space-y-1 sm:space-y-2">
									<Label htmlFor="first-name" className="text-xs sm:text-sm">
										First Name
									</Label>
									<Input id="first-name" placeholder="Enter first name" className="h-8 sm:h-10 text-xs sm:text-sm" />
								</div>
								<div className="space-y-1 sm:space-y-2">
									<Label htmlFor="last-name" className="text-xs sm:text-sm">
										Last Name
									</Label>
									<Input id="last-name" placeholder="Enter last name" className="h-8 sm:h-10 text-xs sm:text-sm" />
								</div>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<Label htmlFor="dob" className="text-xs sm:text-sm">
									Date of Birth
								</Label>
								<Input id="dob" type="date" className="h-8 sm:h-10 text-xs sm:text-sm" />
							</div>

							<div className="space-y-1 sm:space-y-2">
								<Label htmlFor="address" className="text-xs sm:text-sm">
									Address
								</Label>
								<Input id="address" placeholder="Enter your address" className="h-8 sm:h-10 text-xs sm:text-sm" />
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
								<div className="space-y-1 sm:space-y-2">
									<Label htmlFor="city" className="text-xs sm:text-sm">
										City
									</Label>
									<Input id="city" placeholder="Enter city" className="h-8 sm:h-10 text-xs sm:text-sm" />
								</div>
								<div className="space-y-1 sm:space-y-2">
									<Label htmlFor="postal-code" className="text-xs sm:text-sm">
										Postal Code
									</Label>
									<Input id="postal-code" placeholder="Enter postal code" className="h-8 sm:h-10 text-xs sm:text-sm" />
								</div>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<Label htmlFor="country" className="text-xs sm:text-sm">
									Country
								</Label>
								<Select defaultValue="bangladesh">
									<SelectTrigger id="country" className="h-8 sm:h-10 text-xs sm:text-sm">
										<SelectValue placeholder="Select country" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="bangladesh">Bangladesh</SelectItem>
										<SelectItem value="india">India</SelectItem>
										<SelectItem value="pakistan">Pakistan</SelectItem>
										<SelectItem value="usa">United States</SelectItem>
										<SelectItem value="uk">United Kingdom</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<DialogFooter>
								<Button onClick={() => setVerificationStep(2)} className="h-8 sm:h-10 text-xs sm:text-sm">
									Continue to ID Verification
								</Button>
							</DialogFooter>
						</div>
					)}

					{verificationStep === 2 && (
						<div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
							<h3 className="text-base sm:text-lg font-medium">Step 2: ID Verification</h3>

							<div className="space-y-1 sm:space-y-2">
								<Label htmlFor="id-type" className="text-xs sm:text-sm">
									ID Type
								</Label>
								<RadioGroup
									defaultValue="passport"
									onValueChange={setIdType}
									className="flex flex-col space-y-1 sm:space-y-2"
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="passport" id="passport" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
										<Label htmlFor="passport" className="text-xs sm:text-sm">
											Passport
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="driving-license"
											id="driving-license"
											className="h-3.5 w-3.5 sm:h-4 sm:w-4"
										/>
										<Label htmlFor="driving-license" className="text-xs sm:text-sm">
											Driving License
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="national-id" id="national-id" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
										<Label htmlFor="national-id" className="text-xs sm:text-sm">
											National ID Card
										</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<Label htmlFor="id-number" className="text-xs sm:text-sm">
									ID Number
								</Label>
								<Input
									id="id-number"
									placeholder={`Enter your ${idType} number`}
									className="h-8 sm:h-10 text-xs sm:text-sm"
								/>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<Label className="text-xs sm:text-sm">Upload Front Side of ID</Label>
								<div className="border-2 border-dashed rounded-md p-4 sm:p-6 flex flex-col items-center justify-center gap-1 sm:gap-2">
									<Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
									<p className="text-xs sm:text-sm text-center text-muted-foreground">
										Drag and drop your ID, or click to browse
									</p>
									<Input id="id-front" type="file" className="hidden" />
									<Button
										variant="outline"
										size="sm"
										onClick={() => document.getElementById("id-front")?.click()}
										className="h-7 sm:h-8 text-xs"
									>
										Choose File
									</Button>
									<p className="text-[10px] sm:text-xs text-muted-foreground">
										Supported formats: JPG, PNG, PDF. Max size: 5MB
									</p>
								</div>
							</div>

							<div className="space-y-1 sm:space-y-2">
								<Label className="text-xs sm:text-sm">Upload Back Side of ID</Label>
								<div className="border-2 border-dashed rounded-md p-4 sm:p-6 flex flex-col items-center justify-center gap-1 sm:gap-2">
									<Upload className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
									<p className="text-xs sm:text-sm text-center text-muted-foreground">
										Drag and drop your ID, or click to browse
									</p>
									<Input id="id-back" type="file" className="hidden" />
									<Button
										variant="outline"
										size="sm"
										onClick={() => document.getElementById("id-back")?.click()}
										className="h-7 sm:h-8 text-xs"
									>
										Choose File
									</Button>
									<p className="text-[10px] sm:text-xs text-muted-foreground">
										Supported formats: JPG, PNG, PDF. Max size: 5MB
									</p>
								</div>
							</div>

							<DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
								<Button
									variant="outline"
									onClick={() => setVerificationStep(1)}
									className="h-8 sm:h-10 text-xs sm:text-sm order-2 sm:order-1"
								>
									Back
								</Button>
								<Button
									onClick={() => setVerificationStep(3)}
									className="h-8 sm:h-10 text-xs sm:text-sm order-1 sm:order-2"
								>
									Continue to Selfie Verification
								</Button>
							</DialogFooter>
						</div>
					)}

					{verificationStep === 3 && (
						<div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
							<h3 className="text-base sm:text-lg font-medium">Step 3: Selfie Verification</h3>

							<div className="space-y-2">
								<p className="text-xs sm:text-sm text-muted-foreground">
									Please take a clear selfie holding your ID next to your face. Make sure both your face and ID are
									clearly visible.
								</p>

								<div className="border-2 border-dashed rounded-md p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4">
									<Camera className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
									<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
										<Button variant="outline" className="gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
											<Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
											Take Photo
										</Button>
										<Button variant="outline" className="gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
											<Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
											Upload Photo
										</Button>
									</div>
									<p className="text-[10px] sm:text-xs text-center text-muted-foreground">
										Your selfie will be used for identity verification purposes only.
									</p>
								</div>
							</div>

							<div className="rounded-md bg-muted p-3 sm:p-4">
								<div className="flex items-start gap-2 sm:gap-4">
									<AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5" />
									<div className="space-y-0.5 sm:space-y-1">
										<p className="text-xs sm:text-sm font-medium">Verification Tips</p>
										<ul className="text-[10px] sm:text-xs text-muted-foreground list-disc pl-4 space-y-0.5 sm:space-y-1">
											<li>Ensure good lighting when taking your selfie</li>
											<li>Remove glasses, hats, or anything that covers your face</li>
											<li>Hold your ID card next to your face, not covering it</li>
											<li>Make sure all text on your ID is clearly visible</li>
										</ul>
									</div>
								</div>
							</div>

							<DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
								<Button
									variant="outline"
									onClick={() => setVerificationStep(2)}
									className="h-8 sm:h-10 text-xs sm:text-sm order-2 sm:order-1"
								>
									Back
								</Button>
								<Button
									onClick={() => {
										setVerifyAccountDialogOpen(false)
										setTimeout(() => setVerificationStep(1), 300)
									}}
									className="h-8 sm:h-10 text-xs sm:text-sm order-1 sm:order-2"
								>
									Submit Verification
								</Button>
							</DialogFooter>
						</div>
					)}
				</DialogContent>
			</Dialog>

			{/* Referral Program Dialog */}
			<Dialog open={referralDialogOpen} onOpenChange={setReferralDialogOpen}>
				<DialogContent className="sm:max-w-[500px] p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-auto max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-base sm:text-lg">Referral Program</DialogTitle>
						<DialogDescription className="text-xs sm:text-sm">
							Invite friends and earn 30% of their trading fees for life.
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
						<div className="space-y-1 sm:space-y-2">
							<Label className="text-xs sm:text-sm">Your Referral Link</Label>
							<div className="flex">
								<Input value={referralLink} readOnly className="rounded-r-none h-8 sm:h-10 text-xs sm:text-sm" />
								<Button
									variant="secondary"
									className="rounded-l-none gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm"
									onClick={handleCopyReferralLink}
								>
									<Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									Copy
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3 sm:gap-4">
							<div className="bg-muted rounded-lg p-3 sm:p-4 text-center">
								<p className="text-xs sm:text-sm text-muted-foreground">Total Referrals</p>
								<p className="text-xl sm:text-2xl font-bold text-primary">12</p>
							</div>
							<div className="bg-muted rounded-lg p-3 sm:p-4 text-center">
								<p className="text-xs sm:text-sm text-muted-foreground">Total Earnings</p>
								<p className="text-xl sm:text-2xl font-bold text-primary">$128.50</p>
							</div>
						</div>

						<div className="space-y-1 sm:space-y-2">
							<h3 className="text-base sm:text-lg font-medium">Share Your Link</h3>
							<div className="flex flex-col sm:flex-row gap-2">
								<Button variant="outline" className="flex-1 gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
									<Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									Facebook
								</Button>
								<Button variant="outline" className="flex-1 gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
									<Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									Twitter
								</Button>
								<Button variant="outline" className="flex-1 gap-1 sm:gap-2 h-8 sm:h-10 text-xs sm:text-sm">
									<Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
									Email
								</Button>
							</div>
						</div>

						<div className="rounded-md bg-muted p-3 sm:p-4">
							<h4 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm">How it works</h4>
							<ol className="text-[10px] sm:text-xs text-muted-foreground list-decimal pl-4 space-y-0.5 sm:space-y-1">
								<li>Share your unique referral link with friends</li>
								<li>When they sign up using your link, they become your referral</li>
								<li>You earn 30% of their trading fees for life</li>
								<li>Earnings are credited to your account automatically</li>
							</ol>
						</div>
					</div>

					<DialogFooter>
						<Button onClick={() => setReferralDialogOpen(false)} className="h-8 sm:h-10 text-xs sm:text-sm">
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}

