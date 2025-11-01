'use client'
import Loading from "@/app/loading";
import { ItemResponse } from "@/interfaces/itemResponse";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [isloading, setIsloading] = useState(false)
  const [brandData, setBrandData] = useState<ItemResponse | null>(null)

  async function getAllBrands() {
    setIsloading(true)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
      method: 'GET'
    })
    const data: ItemResponse = await response.json()
    setBrandData(data)
    setIsloading(false)

  }

  useEffect(() => {
    getAllBrands()
  }, [])

  return <>
    <h1 className="text-center my-4">All Brands</h1>
    {isloading ? <Loading /> :
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ">
        {brandData?.data.map((brand) =>
          <div
            key={brand._id}
            className=" border p-3 rounded-4xl hover:bg-gray-800 hover:text-white transition delay-50">
            <Link href={'/products/brand/' + brand._id}>
              <Image width={100} height={100} className="w-full cursor-pointer rounded-4xl" src={brand.image} alt="" />
            </Link>
            <h2 className="text-center ">{brand.name}</h2>

          </div>
        )}
      </div>
    }
  </>
}
