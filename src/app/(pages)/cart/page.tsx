'use client'
import Loading from "@/app/loading";
import { CartContext } from "@/components/CartData/CartData";
import Checkout from "@/components/Checkout/Checkout";
import { formatCurrency } from "@/components/Helpers/format";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { CartResponse } from "@/interfaces";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UpdatcountAction } from "./_action/updatCount";
import { RemoveItem } from "./_action/removeItem";
import { DeleteCart } from "./_action/deletCat";


export default function Cart() {
  const { isLoading, cartData, getCart, setCartData } = useContext(CartContext)

  if (typeof cartData?.data?.products[0]?.product == 'string' || cartData == null) {
    getCart()
  }
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [isUpdataCount, setIsUpdataCount] = useState<string | null>(null)
  const [isClear, setIsClear] = useState(false)
  const [loading, setLoading] = useState(false)



  async function removeItem(productId: string) {
    setRemovingId(productId)
    const data = await RemoveItem(productId)
    if (data.status = 'success') {
      toast.success('Product Removed Succesfully')
      setCartData(data)
    }
    setRemovingId(null)

  }
  async function updatItemCount(productId: string, count: number) {
    setIsUpdataCount(productId)
    const data = await UpdatcountAction(productId, count)
    if (data.status = 'success') {
      toast.success('Product Updata Count Succesfully')
      setCartData(data)
    }
    setIsUpdataCount(null)

  }
  async function clearCart() {
    setIsClear(true)
    const data = await DeleteCart()
    if (data.message = 'success') {
      setCartData(data)
    }
    setIsClear(false)

  }
  useEffect(() => {
    if (typeof cartData?.data?.products[0]?.product === 'string' || cartData == null) {
      getCart();
    }
  }, [cartData, getCart]);

  return <>
    {isLoading || typeof cartData?.data?.products[0]?.product === 'string'
      ? <Loading />
      : cartData?.numOfCartItems ?? 0 > 0 ?
        <div className="container min-h-screen ">
          <div className="text-center my-4">
            <h1>Shopping Cart</h1>
            <p className="text-gray-500 my-4"> {cartData?.numOfCartItems} Items in Your Cart</p>
          </div>
          <div className="grid grid-cols-1  gap-6 lg:grid-cols-3 lg:items-start ">
            <div className="lg:col-span-2 space-y-4">
              {cartData?.data.products.map((item) =>
                <Card key={item._id} className="grid grid-cols-3 ">
                  <div className="col-span-1  mx-auto">
                    <Image width={100} height={100} src={item.product.imageCover} className="w-24  object-cover md:w-26" alt={item.product.title} />
                  </div>
                  <CardContent className="col-span-2  ">
                    <div className="flex justify-between ">
                      <div className="">
                        <h2>{item.product.title.split(' ', 3)}</h2>
                        <p className="text-gray-500">{item.product.brand.name}</p>
                        <p className="text-gray-500">{item.product.category.name}</p>
                      </div>
                      <h2> {formatCurrency(item.price)}</h2>
                    </div>
                    <div className="flex mt-5 justify-between items-center">
                      <div className="flex  items-center gap-2">
                        <button
                          disabled={item.count == 1}
                          aria-label="decrease"
                          onClick={() => updatItemCount(item.product.id, item.count - 1)}
                          className="border size-8 rounded-lg cursor-pointer text-lg">
                          -
                        </button>
                        <span className="w-6 text-center font-medium">{isUpdataCount === item.product._id ? <Loader2 className="animate-spin" /> : item.count}</span>
                        <button
                          aria-label="increase"
                          onClick={() => updatItemCount(item.product.id, item.count + 1)}
                          className="border size-8 rounded-lg cursor-pointer text-lg">
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="underline text-red-600 cursor-pointer flex gap-1 items-center">
                        {removingId == item.product.id && <Loader2 className="animate-spin size-5" />}
                        Remove
                      </button>
                    </div>
                    <div className="my-5">
                      <Link href={"/products/" + item.product.id} className="text-gray-600 ">
                        More Details....
                      </Link>
                    </div>

                  </CardContent>

                </Card>
              )}
            </div>
            <div className="lg:col-span-1 sticky top-25">
              <Card className="">
                <CardHeader className="-mb-3">
                  <h2>Order Summary</h2>
                </CardHeader>
                <CardContent className=" col-span-2">
                  <div className="flex justify-between ">
                    <div className="">
                      <p className="text-gray-500">Subtotal ({cartData?.numOfCartItems} items)</p>
                      <p className="text-gray-500">Shopping</p>
                    </div>
                    <div>
                      <h2> {formatCurrency(cartData?.data.totalCartPrice ?? 0)}</h2>
                      <p className="text-green-600 font-bold text-center">Free</p>
                    </div>
                  </div>
                  <hr className="my-4 text-gray-500" />
                  <div className="flex justify-between">
                    <h2> Total</h2>
                    <h2> {formatCurrency(cartData?.data.totalCartPrice ?? 0)}</h2>
                  </div>
                  <Checkout cartId={cartData?.cartId ?? ''} />
                  <Link href='/products'>
                    <Button size='lg' variant={"outline"} className="w-full cursor-pointer mb-4">Continue Shopping</Button>
                  </Link>
                </CardContent>

              </Card>
              <Button
                onClick={() => clearCart()}
                variant={'outline'}
                className="text-red-600 cursor-pointer my-3 flex mx-auto">
                {isClear ? <Loader2 className="animate-spin" /> : <Trash2 />}
                Clear Cart
              </Button>
            </div>
          </div>
        </div> :
        <div className="min-h-[70vh] flex flex-col justify-center items-center gap-2" >
          <h2>Your Cart is Empty</h2>
          <Link href='/products'>
            <Button
              disabled={isClear}
              size='lg'
              onClick={() => setLoading(true)}
              className=" cursor-pointer mb-4 bg-black text-white">
              {loading && <Loader2 className="animate-spin" />} Add ones
            </Button>
          </Link>

        </div>
    }

  </>;
}
