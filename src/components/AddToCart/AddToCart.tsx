"use client";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "../CartData/CartData";
import { AddToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCartData } = useContext(CartContext)
  const session = useSession()
  const router = useRouter()
  async function addProductToCart() {
    if (session.status == 'authenticated') {

      setIsLoading(true);
      const data = await AddToCartAction(productId)
      data.status == "success" && toast.success(data.message);
      setCartData(data)
      setIsLoading(false);
    } else {
      router.push('/login')
    }
  }
  return (
    <>
      <Button disabled={isLoading} className="cursor-pointer bg-black text-white" onClick={addProductToCart}>
        {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCartIcon />} Add To Cart
      </Button>
    </>
  );
}
