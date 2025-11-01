import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const protectedPAges = ["/cart", "/profile"];
const authedPAges = ["/login", "/register"];
export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (protectedPAges.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/login", process.env.NEXT_PUBLIC_BASE_URLL);
      redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  if (authedPAges.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/", process.env.NEXT_PUBLIC_BASE_URL);
      redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);

      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
}
