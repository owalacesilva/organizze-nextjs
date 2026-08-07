import { withAuth } from "next-auth/middleware";

export default withAuth({
	pages: {
		signIn: "/signIn",
	},
});

export const config = {
	matcher: [
		"/((?!api|signIn|_next/static|_next/image|favicon.ico|images|manifest.json).*)",
	],
};
