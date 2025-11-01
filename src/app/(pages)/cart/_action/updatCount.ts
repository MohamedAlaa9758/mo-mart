"use server";

import { getUserToken } from "@/components/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";

export async function UpdatcountAction(productId: string, count: number) {
  const token = await getUserToken();
  const response = await fetch(` ${process.env.URL_API}/cart/` + productId, {
    method: "PUT",
    body: JSON.stringify({ count }),
    headers: {
      token: token + "",
      "Content-Type": "application/json",
    },
  });

  const data: CartResponse = await response.json();
  return data;
}
