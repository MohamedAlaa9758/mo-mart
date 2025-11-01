"use client"

import Loading from "@/app/loading";
import { formatCurrency } from "@/components/Helpers/format";
import { Card, CardContent } from "@/components/ui/card";
import { OrdersI } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AllOrders() {
    const [orders, setOrders] = useState<OrdersI[]>([])
    const [loading, setLoading] = useState(false)

    async function getAllOrders() {
        setLoading(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + localStorage.getItem('userId'))
        const data = await response.json()
        setOrders(data)
        setLoading(false)
    }
    useEffect(() => { getAllOrders() }, [])
    return <>
        {loading ? <Loading /> :

            <div>
                {orders.map((order) =>
                    <Card className="my-3" key={order.id}>
                        <CardContent>

                            <div key={order.id} className="grid grid-cols-3 items-center">
                                <div className="col-span-3 md:col-span-2">
                                    {order.cartItems.map((item) =>
                                        <>
                                            <div key={item._id} className="grid grid-cols-3 my-2 py-2 ">
                                                <div className="col-span-1">
                                                    <Image width={50} height={50} className="w-20" src={item?.product.imageCover} alt="" />
                                                </div>
                                                <div className="col-span-2">
                                                    <h4>{item.product.title.split(" ", 4)}</h4>
                                                    <p className="text-gray-500">{item.product.category.name}</p>
                                                    <p className="text-gray-500">{item.product.brand.name}</p>
                                                    <p className="text-gray-500">Items {item.count}</p>
                                                    <p className="font-semibold"> {formatCurrency(item.price)}</p>

                                                </div>
                                            </div>
                                            <hr className="w-sm lg:w-xl text-gray-300" />
                                        </>

                                    )}

                                </div>

                                <div className="col-span-3 md:col-span-1 space-y-4 mt-3 md:mt-0">
                                    <p >Date : {order?.updatedAt}</p>
                                    <p> Delivered : {order?.isDelivered ? "Delivered " : "Not Delivered "}</p>
                                    <p> Payment  : {order?.paymentMethodType}</p>
                                    <p> Paid  : {order?.isPaid ? "Paid " : "Not Paid "}</p>
                                    <p className="font-semibold"> TotalPrice  :   {formatCurrency(order?.totalOrderPrice)}</p>

                                </div>
                            </div>


                        </CardContent>
                    </Card>
                )}
            </div>
        }
    </>

}
