import React from "react";
import heroImgW from "@/../public/Mo-Mart-B.png";
import Image from "next/image";

export default function LogoWhite() {
  return (
    <>
      <div className="flex items-center ">
        <Image width={50} height={50} className="size-9" src={heroImgW} alt="" />
        <h2>MoMart</h2>
      </div>
    </>
  );
}
