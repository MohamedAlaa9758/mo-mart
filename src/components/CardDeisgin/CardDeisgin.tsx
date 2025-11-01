import React from 'react'
import AddToWishList from '../AddToWishList/AddToWishList'
import Image from 'next/image'
import StarIcon from '../StarIcon/StarIcon'
import Link from 'next/link'
import AddToCart from '../AddToCart/AddToCart'
import { ProductI } from '@/interfaces'

export default function CardDeisgin({ product }: { product: ProductI }) {
    return <>
        <div className="w-full md:w-1/2  lg:w-1/3 px-1 my-2 relative  ">
            <div className=" absolute top-2 end-4 ">
                <AddToWishList productId={product.id} />
            </div>
            <div className=" p-1 rounded-2xl flex gap-2 border-1  ">
                <Image width={200} height={200} className="text-center w-1/2 rounded-2xl" src={product.imageCover} alt={product.title} />
                <div className=" w-full py-7 pe-3 lg:px-1 flex flex-col justify-center gap-2   ">
                    <h3 className="text-lg font-semibold"> {product.title.split(" ", 2)}</h3>
                    <p>{product.category.name}</p>
                    <p>{product.brand.name}</p>
                    <div className="flex justify-between pt-2">
                        <div className="flex">
                            <StarIcon />
                            <p>{product.ratingsAverage}</p>
                        </div>
                    </div>
                    <p>
                        Price : <span className="text font-bold">{product.price}</span> EGP
                    </p>
                    <Link href={"/products/" + product.id} className="text-gray-600  hover:text-black">
                        More Details....
                    </Link>
                    <AddToCart productId={product.id} />
                </div>
            </div>
        </div>

    </>
}
