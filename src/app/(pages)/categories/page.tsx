'use client'
import Loading from "@/app/loading";
import { ItemResponse } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Categories() {

  const [isloading, setIsloading] = useState(false)
  const [categoriesData, setCategoriesData] = useState<ItemResponse | null>(null)
  async function getAllCategories() {
    setIsloading(true)
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
      method: 'GET'
    })
    const data: ItemResponse = await response.json()
    setCategoriesData(data)
    setIsloading(false)

  }

  useEffect(() => {
    getAllCategories()
  }, [])
  return <>
    <h1 className="text-center my-4">All Categories</h1>
    {isloading ? <Loading /> :
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {categoriesData?.data.map((category) =>
          <div
            key={category._id}
            className=" border p-3 rounded-4xl hover:bg-gray-800 hover:text-white transition delay-50">
            <Link href={'/products/category/' + category._id}>
              <Image width={150} height={150} className="w-full h-75 cursor-pointer rounded-4xl" src={category.image} alt={category.name} />
            </Link>
            <h2 className="text-center ">{category.name}</h2>
          </div>
        )}
      </div>
    }
  </>
}
