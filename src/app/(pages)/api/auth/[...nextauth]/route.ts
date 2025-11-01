import { authRespones } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authRespones);

export { handler as GET, handler as POST };
