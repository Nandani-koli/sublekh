import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {createUser} from "@/lib/actions";

export const authOptions = {
  debug: true,
  strict: false,
  providers: [
      GitHubProvider({
          clientId: process.env.AUTH_GITHUB_ID,
          clientSecret: process.env.AUTH_GITHUB_SECRET,
          profile(profile) {
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

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
      signIn: async ({ user, account, profile }) => {

          const result = await createUser(user);
          if (result.user) {
              user.dbUser = result.user; 
              return true;
          }
          return false;
      },

      jwt: async ({ token, user }) => {
          if (user?.dbUser) {
              token.user = user.dbUser; 
          }
          return token;
      },
      session: async ({ session, token }) => {
          session.user = {
              _id : token.user._id,
              id: token.user.id,
              name: token.user.name,
              gh_username: token.user.gh_username,
              email: token.user.email,
              image: token.user.image,
          };
          return session;
      },

      redirect: async ({ url, baseUrl }) => {
          return '/dashboard'
      }
  },


} 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
