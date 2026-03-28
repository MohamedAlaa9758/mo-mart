import { UserResponse } from "@/interfaces";
import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserResponse & { token: string };
  }
  interface User {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    user: UserResponse;
    token: string;
  }
}
