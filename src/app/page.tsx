import { Button } from "@/components/ui/button";
import Link from "next/link";
import heroI from '../../public/Mo-Mart-B.png'
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col justify-center items-center min-h-150 gap-4 text-3xl text-center">
      <Image width={100} height={100} src={heroI} alt="" />
      <h1 className="uppercase text-5xl">Welcome To MoMart</h1>
      <p className="text-gray-600 capitalize  text-2xl">destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and
        excellent customer service</p>
      <div className="flex gap-3">
        <Link href='/products'>
          <Button size='lg' className="w-full cursor-pointer mb-4 bg-black text-white">Shop Now</Button>
        </Link>
        <Link href='/categories'>
          <Button size='lg' variant={"outline"} className="w-full cursor-pointer mb-4">Browes Categories</Button>
        </Link>
      </div>
    </div>
  );
}
