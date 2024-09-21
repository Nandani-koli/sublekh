import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import dbConnect from './dbconfig';
import { createUser } from './actions';
export const authOptions = {

    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            profile(profile) {
                console.log(profile, "pppp")
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    gh_username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                };
            },
        }),
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_CLIENT_ID,
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
    ],

    pages: {
        signIn: '/login',
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        signIn: async ({ user, account, profile }) => {

            const result = await createUser(user);
            return result.status;
        },

        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user = {
                ...session.user,
                id: token.sub,
            };
            return session;
        },
    },


} 