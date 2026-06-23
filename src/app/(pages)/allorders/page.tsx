// "use client"

// import Loading from "@/app/loading";
// import { formatCurrency } from "@/components/Helpers/format";
// import { Card, CardContent } from "@/components/ui/card";
// import { OrdersI } from "@/interfaces";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function AllOrders() {
//     const [orders, setOrders] = useState<OrdersI[]>([])
//     const [loading, setLoading] = useState(false)

//     async function getAllOrders() {
//         setLoading(true)
//         const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + localStorage.getItem('userId'))
//         const data = await response.json()
//         setOrders(data)
//         setLoading(false)
//     }
//     useEffect(() => { getAllOrders() }, [])
//     return <>
//         {loading ? <Loading /> :

//             <div>
//                 {orders.map((order) =>
//                     <Card className="my-3" key={order.id}>
//                         <CardContent>

//                             <div key={order.id} className="grid grid-cols-3 items-center">
//                                 <div className="col-span-3 md:col-span-2">
//                                     {order.cartItems.map((item) =>
//                                         <>
//                                             <div key={item._id} className="grid grid-cols-3 my-2 py-2 ">
//                                                 <div className="col-span-1">
//                                                     <Image width={50} height={50} className="w-20" src={item?.product.imageCover} alt="" />
//                                                 </div>
//                                                 <div className="col-span-2">
//                                                     <h4>{item.product.title.split(" ", 4)}</h4>
//                                                     <p className="text-gray-500">{item.product.category.name}</p>
//                                                     <p className="text-gray-500">{item.product.brand.name}</p>
//                                                     <p className="text-gray-500">Items {item.count}</p>
//                                                     <p className="font-semibold"> {formatCurrency(item.price)}</p>

//                                                 </div>
//                                             </div>
//                                             <hr className="w-sm lg:w-xl text-gray-300" />
//                                         </>

//                                     )}

//                                 </div>

//                                 <div className="col-span-3 md:col-span-1 space-y-4 mt-3 md:mt-0">
//                                     <p >Date : {order?.updatedAt}</p>
//                                     <p> Delivered : {order?.isDelivered ? "Delivered " : "Not Delivered "}</p>
//                                     <p> Payment  : {order?.paymentMethodType}</p>
//                                     <p> Paid  : {order?.isPaid ? "Paid " : "Not Paid "}</p>
//                                     <p className="font-semibold"> TotalPrice  :   {formatCurrency(order?.totalOrderPrice)}</p>

//                                 </div>
//                             </div>


//                         </CardContent>
//                     </Card>
//                 )}
//             </div>
//         }
//     </>

// }

"use client"

import Loading from "@/app/loading";
import { formatCurrency } from "@/components/Helpers/format";
import { Card, CardContent } from "@/components/ui/card";
import { OrdersI } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";

export default function AllOrders() {
    const [orders, setOrders] = useState<OrdersI[]>([])
    const [loading, setLoading] = useState(false)
    const { status } = useSession()

    async function getAllOrders() {
        setLoading(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + localStorage.getItem('userId'))
        const data = await response.json()
        setOrders(data)
        setLoading(false)
    }

    useEffect(() => {
        if (status === 'authenticated') {
            getAllOrders()
        }
    }, [status])

    // Not logged in
    if (status === 'unauthenticated') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
                <ShoppingBagIcon className="size-20 text-gray-300 dark:text-gray-600" />
                <h2 className="text-2xl font-semibold dark:text-white">No Orders Yet</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                    You need to place an order first before you can see your orders here.
                </p>
                <Link href="/products">
                    <Button size="lg" className="cursor-pointer bg-black text-white dark:bg-white dark:text-black hover:dark:bg-gray-200">
                        Browse Products
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <>
            {loading ? <Loading /> :
                orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
                        <ShoppingBagIcon className="size-20 text-gray-300 dark:text-gray-600" />
                        <h2 className="text-2xl font-semibold dark:text-white">No Orders Yet</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            You haven&apos;t placed any orders yet. Start shopping and your orders will appear here.
                        </p>
                        <Link href="/products">
                            <Button size="lg" className="cursor-pointer bg-black text-white dark:bg-white dark:text-black hover:dark:bg-gray-200">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        {orders.map((order) =>
                            <Card className="my-3 dark:bg-gray-800 dark:border-gray-700" key={order.id}>
                                <CardContent>
                                    <div key={order.id} className="grid grid-cols-3 items-center">
                                        <div className="col-span-3 md:col-span-2">
                                            {order.cartItems.map((item) =>
                                                <>
                                                    <div key={item._id} className="grid grid-cols-3 my-2 py-2">
                                                        <div className="col-span-1">
                                                            <Image width={50} height={50} className="w-20" src={item?.product.imageCover} alt="" />
                                                        </div>
                                                        <div className="col-span-2">
                                                            <h4 className="dark:text-white">{item.product.title.split(" ", 4)}</h4>
                                                            <p className="text-gray-500 dark:text-gray-400">{item.product.category.name}</p>
                                                            <p className="text-gray-500 dark:text-gray-400">{item.product.brand.name}</p>
                                                            <p className="text-gray-500 dark:text-gray-400">Items {item.count}</p>
                                                            <p className="font-semibold dark:text-gray-200">{formatCurrency(item.price)}</p>
                                                        </div>
                                                    </div>
                                                    <hr className="w-sm lg:w-xl text-gray-300 dark:text-gray-600" />
                                                </>
                                            )}
                                        </div>
                                        <div className="col-span-3 md:col-span-1 space-y-4 mt-3 md:mt-0 dark:text-gray-300">
                                            <p>Date : {order?.updatedAt}</p>
                                            <p>Delivered : {order?.isDelivered ? "Delivered" : "Not Delivered"}</p>
                                            <p>Payment : {order?.paymentMethodType}</p>
                                            <p>Paid : {order?.isPaid ? "Paid" : "Not Paid"}</p>
                                            <p className="font-semibold dark:text-white">TotalPrice : {formatCurrency(order?.totalOrderPrice)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )
            }
        </>
    )
}
