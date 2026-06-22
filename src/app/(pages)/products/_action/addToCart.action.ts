// "use server";

// import { getUserToken } from "@/components/Helpers/getUserToken";

// export async function AddToCartAction(productId: string) {
//   const token = await getUserToken();
//   const response = await fetch(`${process.env.URL_API}/cart`, {
//     method: "POST",
//     body: JSON.stringify({ productId }),
//     headers: {
//       token: token + "",
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();
//   return data;
// }

export async function AddToCartAction(productId: string) {
  const token = await getUserToken();

  if (!token) {
    return { statusMsg: "fail", message: "Please login first" };
  }

  const response = await fetch(`${process.env.URL_API}/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
