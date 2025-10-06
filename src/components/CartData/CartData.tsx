"use client";
import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void
    getCart: () => void
}>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: () => { }
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    async function getCart() {
        if (session.status == 'authenticated') {
            const response = await fetch("http://localhost:3000/api/get-cart");
            const data = await response.json();
            setCartData(data)
            if (cartData?.data.cartOwner) {
                localStorage.setItem('userId', cartData?.data.cartOwner)

            }
        }
        setIsLoading(false)

    }
    useEffect(() => {
        getCart()
    }, [session.status])
    return <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}>{children}</CartContext.Provider>;
}
