import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React from "react";
import LogoWhite from "../Logo/LogoWhite";
import LogoBlack from "../Logo/LogoBlack";

export default function Footer() {
  return (
    <>
      <div className="border-t-2">
        <div className="container  py-6">
          <div className="md:flex ">
            <div className="w-full px-4 ">
              <div className="pb-3">
                <LogoWhite />
              </div>
              <ul className="text-gray-500">
                <li className="pb-2">
                  Your One-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and
                  excellent customer service
                </li>
                <li className="flex gap-1 items-center pe-2">
                  <MapPinIcon className="size-6" /> <span>123 Shop Street, Octoper City, DC 12345</span>
                </li>
                <li className="flex gap-1 items-center pe-2">
                  <PhoneIcon className="size-5" /> <span>(+20)01020304050</span>
                </li>
                <li className="flex gap-1 items-center pe-2">
                  <MailIcon className="size-5" /> <span>Support@gmail.com</span>
                </li>
              </ul>
            </div>
            <div className="w-full px-4 ">
              <h2 className="pb-3">SHOP</h2>
              <ul className="text-gray-500">
                <li>ELectronics</li>
                <li>Fashion</li>
                <li>Home & Garden</li>
                <li>Sport</li>
                <li>Deals</li>
              </ul>
            </div>
            <div className="w-full px-4 ">
              <h2 className="pb-3">CUSTOMER SERVICE</h2>
              <ul className="text-gray-500">
                <li>Contact Us</li>
                <li>Help Center</li>
                <li>Tracks Your Order</li>
                <li>Returns & Exchanges</li>
                <li>Size Guide</li>
              </ul>
            </div>
            <div className="w-full px-4 ">
              <h2 className="pb-3">ABOUT</h2>
              <ul className="text-gray-500">
                <li>About ShopMart</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Investor Relations</li>
                <li>Sustainaability</li>
              </ul>
            </div>
            <div className="w-full px-4 ">
              <h2 className="pb-3">POLICIES</h2>
              <ul className="text-gray-500">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie policy</li>
                <li>Shipping Policy</li>
                <li>Refund Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black flex justify-center ">
        <LogoBlack />
      </div>
    </>
  );
}
