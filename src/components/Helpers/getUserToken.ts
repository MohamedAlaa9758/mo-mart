// // import { decode } from "next-auth/jwt";
// // import { cookies } from "next/headers";

// // export async function getUserToken() {
// //   const x = (await cookies()).get("next-auth.session-token")?.value;
// //   const accessToken = await decode({ token: x, secret: process.env.NEXTAUTH_SECRET! });
// //   return accessToken?.token;
// // }
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function getUserToken() {
//   const x = (await cookies()).get("authjs.session-token")?.value;
//   const accessToken = await decode({
//     token: x,
//     secret: process.env.NEXTAUTH_SECRET!,
//     salt: "authjs.session-token",
//   });
//   return accessToken?.token;
// }
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const allCookies = await cookies();

  // على Vercel بيكون اسمه مختلف
  const cookieName = process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token";

  const x = allCookies.get(cookieName)?.value;

  const accessToken = await decode({
    token: x,
    secret: process.env.NEXTAUTH_SECRET!,
    salt: cookieName,
  });

  return accessToken?.token;
}
