"use server";

import { getUserToken } from "@/components/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";

export async function RemoveItem(productId: string) {
  const token = await getUserToken();
  const response = await fetch(` ${process.env.URL_API}/cart/` + productId, {
    method: "DELETE",
    headers: {
      token: token + "",
    },
  });

  const data: CartResponse = await response.json();
  return data;
}
