import NextAuth from "next-auth";
import { ErorrLoginResponse, SeccessLoginResponse } from "@/interfaces";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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
          } as any;
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = (user as any).user;
        token.token = (user as any).token;
      }
      return token;
    },
    session({ session, token }) {
      session.user = { ...(token.user as any), token: token.token as string };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
