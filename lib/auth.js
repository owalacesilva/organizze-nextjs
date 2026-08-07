import { SIMULATION_ENABLED, simulatedAuth } from "@/lib/simulation";
import CredentialsProvider from "next-auth/providers/credentials";

async function verifyCredentials(email, password) {
	if (SIMULATION_ENABLED) return simulatedAuth.verifyCredentials(email, password);

	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) return null;
	return await response.json();
}

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const user = await verifyCredentials(
					credentials?.email,
					credentials?.password,
				);

				if (!user) return null;
				return user;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.avatar = user.avatar;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
				session.user.avatar = token.avatar;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
