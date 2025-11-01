import Image from "next/image";
import React from "react";
import heroImgB from "@/../public/Mo-Mart-w.png";

export default function LogoBlack() {
  return (
    <>
      <div className="flex items-center ">
        <Image width={50} height={50} className="size-9" src={heroImgB} alt="" />
        <h3 className="text-white text-2xl">MoMart</h3>
      </div>
    </>
  );
}
