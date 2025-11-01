'use client'

import { ProductI } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";
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

    async function getWishlist() {
        setLoading(true);
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDkzODY0NTNjMmZkMjM4YTY2OWU5YSIsIm5hbWUiOiJtb2hhbWVkIGFsYWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1OTA2NjIzMiwiZXhwIjoxNzY2ODQyMjMyfQ.3v2qo6kZHF5_pakDZLeT8rIuUo9kn6pIUy0PYbA01yM",
            },
        });
        const data = await response.json();
        if (data.status === "success") {
            setWishlist(data.data.map((item: ProductI) => item._id));
        }
        setLoading(false);
    }

    async function addToWishlist(productId: string) {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            method: "POST",
            body: JSON.stringify({ productId }),
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDkzODY0NTNjMmZkMjM4YTY2OWU5YSIsIm5hbWUiOiJtb2hhbWVkIGFsYWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1OTA2NjIzMiwiZXhwIjoxNzY2ODQyMjMyfQ.3v2qo6kZHF5_pakDZLeT8rIuUo9kn6pIUy0PYbA01yM",
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (data.status === "success") {
            setWishlist((prev) => [...prev, productId]);
            toast.success("Added to wishlist");
        }
    }

    async function removeFromWishlist(productId: string) {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: "DELETE",
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDkzODY0NTNjMmZkMjM4YTY2OWU5YSIsIm5hbWUiOiJtb2hhbWVkIGFsYWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1OTA2NjIzMiwiZXhwIjoxNzY2ODQyMjMyfQ.3v2qo6kZHF5_pakDZLeT8rIuUo9kn6pIUy0PYbA01yM",
            },
        });
        const data = await response.json();
        if (data.status === "success") {
            setWishlist((prev) => prev.filter((id) => id !== productId));
            toast.success("Removed from wishlist");
        }
    }

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <WishlistContext.Provider
            value={{ wishlist, setWishlist, loading, setLoading, getWishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
}