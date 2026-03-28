'use client'

import Navbar from "@/components/Navbar/Navbar";
import CartContextProvider from "@/components/CartData/CartData";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { WishlistContextProvider } from "@/components/WishlistContext/WishlistContext";
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

export default function Provider({ children }: { children: ReactNode }) {
    return <>
        <SessionProvider>
            <WishlistContextProvider>
                <CartContextProvider>
                    <Navbar />
                    <main className="max-w-7xl mx-auto px-4 py-4">
                        <Toaster />
                        {children}</main>
                    <Footer />
                </CartContextProvider>
            </WishlistContextProvider>
        </SessionProvider>
    </>
}
