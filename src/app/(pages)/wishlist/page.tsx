'use client'
import Loading from '@/app/loading';
import CardDeisgin from '@/components/CardDeisgin/CardDeisgin';
import { Button } from '@/components/ui/button';
import { WishlistContext } from '@/components/WishlistContext/WishlistContext';
import { ProductI } from '@/interfaces';
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';

export default function WishList({ productId }: { productId: string }) {
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
    const inWishlist = wishlist.includes(productId);
    const [isloading, setIsLoading] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [items, setItems] = useState<ProductI[]>([]);
    async function getList() {
        setIsLoading(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                method: 'GET',
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDkzODY0NTNjMmZkMjM4YTY2OWU5YSIsIm5hbWUiOiJtb2hhbWVkIGFsYWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1OTA2NjIzMiwiZXhwIjoxNzY2ODQyMjMyfQ.3v2qo6kZHF5_pakDZLeT8rIuUo9kn6pIUy0PYbA01yM'
                }
            }
        )
        const { data } = await response.json()

        setItems(data)
        setIsLoading(false)
    }
    async function handleClick() {
        setIsRemoving(true);
        if (inWishlist) {
            await removeFromWishlist(productId);
        } else {
            await addToWishlist(productId);
        }
        await getList()
        setIsRemoving(false);
    }
    useEffect(() => {
        getList()
    }, [])

    return <>
        <div className="flex flex-wrap my-4">

            {isloading ? <Loading /> :
                items.length > 0 ?
                    items?.map((item) =>
                        <CardDeisgin product={item} key={item.id} />

                    )
                    :
                    <div className="min-h-[70vh] flex flex-col justify-center items-center gap-2 w-full" >
                        <h2>Your Wish list is Empty</h2>
                        <Link href='/products'>
                            <Button
                                onClick={() => handleClick()}
                                className=" cursor-pointer mb-4 bg-black text-white">
                                Add ones
                            </Button>
                        </Link>

                    </div>

            }
        </div>



    </>
}
