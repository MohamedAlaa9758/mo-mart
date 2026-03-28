'use client'

import { ProductI } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export const WishlistContext = createContext<{
    wishlist: string[];
    setWishlist: (value: string[]) => void;
    loading: boolean;
    setLoading: (value: boolean) => void;
    getWishlist: () => void;
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
}>({
    wishlist: [],
    setWishlist: () => { },
    loading: false,
    setLoading: () => { },
    getWishlist: () => { },
    addToWishlist: async () => { },
    removeFromWishlist: async () => { },
});

export function WishlistContextProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();

    // Get token from session (set in jwt callback)
    const token = (session?.user as { token?: string })?.token ?? null;

    const getWishlist = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token },
            });
            const data = await response.json();
            if (data.status === "success") {
                setWishlist(data.data.map((item: ProductI) => item._id));
            }
        } catch (e) {
            console.error("Failed to fetch wishlist", e);
        } finally {
            setLoading(false);
        }
    }, [token]);

    async function addToWishlist(productId: string) {
        if (!token) return;
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: { token, "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.status === "success") {
            setWishlist((prev) => [...prev, productId]);
            toast.success("Added to wishlist");
        }
    }

    async function removeFromWishlist(productId: string) {
        if (!token) return;
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: "DELETE",
            headers: { token },
        });
        const data = await response.json();
        if (data.status === "success") {
            setWishlist((prev) => prev.filter((id) => id !== productId));
            toast.success("Removed from wishlist");
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            getWishlist();
        } else if (status === "unauthenticated") {
            setWishlist([]);
        }
    }, [status, getWishlist]);

    return (
        <WishlistContext.Provider
            value={{ wishlist, setWishlist, loading, setLoading, getWishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
}
