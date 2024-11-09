// import NextAuth from "next-auth"
// import { authOptions } from "@/lib/auth"

// export const handler = NextAuth(authOptions)


// export { handler as GET, handler as POST }

// // import { handlers } from "@/lib/auth"
// // export const { GET, POST } = handlers

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        // Add other providers here
    ],
    pages: {
        signIn: '/login', // Optional: Custom sign-in page path
    },
    session: {
        strategy: "jwt", // Use JWT strategy (recommended for serverless)
    },
    secret: process.env.NEXTAUTH_SECRET, // Add a secret for JWT encryption

    callbacks: {
        async signIn({ user, account, profile }) {
            // Optional: Perform any custom checks or actions on sign-in
            return true;
        },
        async session({ session, token }) {
            // Attach additional data to the session object if needed
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            // Add additional token fields if needed
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
