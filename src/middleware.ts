import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedPages = ["/cart", "/profile"];
const authedPages = ["/login", "/register"];

export default auth((req) => {
  const token = req.auth;

  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/login", process.env.NEXT_PUBLIC_BASE_URL);
      redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authedPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/", process.env.NEXT_PUBLIC_BASE_URL);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/cart", "/profile", "/login", "/register"],
};
