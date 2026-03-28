'use client'
import Loading from '@/app/loading';
import CardDeisgin from '@/components/CardDeisgin/CardDeisgin';
import { Button } from '@/components/ui/button';
import { WishlistContext } from '@/components/WishlistContext/WishlistContext';
import { ProductI } from '@/interfaces';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';

export default function WishList() {
    const { removeFromWishlist, addToWishlist } = useContext(WishlistContext);
    const [isloading, setIsLoading] = useState(false);
    const [items, setItems] = useState<ProductI[]>([]);
    const { data: session } = useSession();
    const token = (session?.user as { token?: string })?.token ?? null;

    async function getList() {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
                method: 'GET',
                headers: { token },
            });
            const { data } = await response.json();
            setItems(data ?? []);
        } catch (e) {
            console.error('Failed to fetch wishlist items', e);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemove(productId: string) {
        await removeFromWishlist(productId);
        await getList();
    }

    async function handleAdd(productId: string) {
        await addToWishlist(productId);
        await getList();
    }

    useEffect(() => {
        getList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="flex flex-wrap my-4">
            {isloading ? <Loading /> :
                items.length > 0 ?
                    items.map((item) =>
                        <CardDeisgin product={item} key={item.id} />
                    )
                    :
                    <div className="min-h-[70vh] flex flex-col justify-center items-center gap-2 w-full">
                        <h2>Your Wish list is Empty</h2>
                        <Link href='/products'>
                            <Button className="cursor-pointer mb-4 bg-black text-white">
                                Add ones
                            </Button>
                        </Link>
                    </div>
            }
        </div>
    );
}
