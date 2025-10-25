import NextAuth, { AuthOptions } from "next-auth";
import { ErorrLoginResponse, SeccessLoginResponse } from "@/interfaces";
import CredentialsProvider from "next-auth/providers/credentials";

export const authRespones: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "MoMart",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data: SeccessLoginResponse | ErorrLoginResponse = await response.json();
        if ("token" in data) {
          return {
            id: data.user.email,
            user: data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authRespones);

export { handler as GET, handler as POST };
