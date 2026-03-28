// "use client";
// import { CartResponse } from "@/interfaces";
// import { useSession } from "next-auth/react";
// import { createContext, ReactNode, useEffect, useState } from "react";

// export const CartContext = createContext<{
//     cartData: CartResponse | null;
//     setCartData: (value: CartResponse | null) => void;
//     isLoading: boolean;
//     setIsLoading: (value: boolean) => void;
//     getCart: () => Promise<void>;
// }>({
//     cartData: null,
//     setCartData: () => { },
//     isLoading: false,
//     setIsLoading: () => { },
//     getCart: async () => { },
// });

// export default function CartContextProvider({ children }: { children: ReactNode }) {
//     const [cartData, setCartData] = useState<CartResponse | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const session = useSession();

//     const getCart = async () => {
//         try {
//             if (session.status === "authenticated") {
//                 console.log("Session data:", session);
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-cart`);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch cart: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log("🛒 Cart API Response:", data);

//                 const cartOwner = data?.data?.cartOwner;
//                 if (cartOwner) {
//                     if (typeof window !== "undefined") {
//                         if (cartOwner) {
//                             localStorage.setItem("userId", cartOwner);
//                         } else {
//                             console.warn("⚠️ No cartOwner found in API response:", data);
//                         }
//                     }

//                     // localStorage.setItem("userId", cartOwner);
//                 } else {
//                     console.warn("⚠️ No cartOwner found in API response:", data);
//                 }

//                 setCartData(data ?? null);
//             } else {
//                 setCartData(null);
//                 if (typeof window !== "undefined") {
//                     localStorage.removeItem("userId");
//                 }
//                 // localStorage.removeItem("userId");
//             }
//         } catch (error) {
//             console.error("❌ Error fetching cart:", error);
//             setCartData(null);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (session.status !== "loading") getCart();
//     }, [session.status]);

//     return (
//         <CartContext.Provider
//             value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// }

"use client";

import { CartResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";

type CartContextValue = {
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextValue>({
  cartData: null,
  setCartData: () => { },
  isLoading: false,
  setIsLoading: () => { },
  getCart: async () => { },
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  const getCart = useCallback(async () => {
    setIsLoading(true);

    try {
      if (status !== "authenticated") {
        setCartData(null);
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/get-cart", { cache: "no-store" });

      if (!res.ok) {
        if (res.status === 401) {
          console.warn("Unauthorized: user is not logged in.");
        }
        setCartData(null);
        throw new Error(`Failed to fetch cart: ${res.status}`);
      }

      const data = await res.json();
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  // 🔄 Fetch cart when session status changes
  useEffect(() => {
    getCart();
  }, [getCart]);

  // 🧩 Save cart owner ID safely after hydration
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (cartData?.data?.cartOwner) {
      try {
        localStorage.setItem("userId", cartData.data.cartOwner);
      } catch (e) {
        console.warn("Could not write userId to localStorage", e);
      }
    }
  }, [cartData]);

  return (
    <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}>
      {children}
    </CartContext.Provider>
  );
}
