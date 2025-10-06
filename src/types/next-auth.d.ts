import { UserResponse } from "@/interfaces";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserResponse;
  }
  interface User {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
