"use client";
import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData: CartResponse | null;
    setCartData: (value: CartResponse | null) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    getCart: () => Promise<void>;
}>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: async () => { },
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const session = useSession();

    const getCart = async () => {
        try {
            if (session.status === "authenticated") {
                const response = await fetch(`${process.env.URL_API}/get-cart`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch cart: ${response.status}`);
                }

                const data = await response.json();
                console.log("🛒 Cart API Response:", data);

                const cartOwner = data?.data?.cartOwner;
                if (cartOwner) {
                    localStorage.setItem("userId", cartOwner);
                } else {
                    console.warn("⚠️ No cartOwner found in API response:", data);
                }

                setCartData(data ?? null);
            } else {
                setCartData(null);
                localStorage.removeItem("userId");
            }
        } catch (error) {
            console.error("❌ Error fetching cart:", error);
            setCartData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCart();
    }, [session.status]);

    return (
        <CartContext.Provider
            value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
