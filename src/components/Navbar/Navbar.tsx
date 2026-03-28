'use client'
import React, { useContext } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Loader2, MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import LogoWhite from "../Logo/LogoWhite";
import { CartContext } from "../CartData/CartData";
import { signOut, useSession } from "next-auth/react";
export default function Navbar() {

  const session = useSession()

  const { cartData, isLoading } = useContext(CartContext)
  return (
    <>
      <nav className="py-4 bg-gray-100 shadow text-2xl font-semibold sticky top-0 z-10 w-full">
        <div className="container  px-2 xl:px-8">
          <div className="  flex justify-between items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0 md:hidden">
                <MenuIcon className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={"/products"}>
                  <DropdownMenuItem>Products</DropdownMenuItem>
                </Link>
                <Link href={"/categories"}>
                  <DropdownMenuItem>Categories</DropdownMenuItem>
                </Link>
                <Link href={"/brands"}>
                  <DropdownMenuItem>Brands</DropdownMenuItem>
                </Link>
                <Link href={"/wishlist"}>
                  <DropdownMenuItem>Wish-List</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href={"/"}>
              <LogoWhite />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild >
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/wishlist">Wish-List</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-0">
                  <UserIcon className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session.status == 'authenticated' ? <>
                    <Link href={"/profile"}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => signOut({
                      callbackUrl: '/'
                    })}>Logout</DropdownMenuItem>
                  </>
                    :
                    <>
                      <Link href={"/login"}>
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href={"/register"}>
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                    </>
                  }


                </DropdownMenuContent>
              </DropdownMenu>
              {session.status == "authenticated" &&
                <Link href={'/cart'}>
                  <div className=" relative p-2 cursor-pointer">
                    <ShoppingCartIcon className="" />
                    <div className=" size-4  flex justify-center items-center rounded-full bg-black text-white absolute top-0 end-0">
                      <span className="text-xs">{isLoading ? <Loader2 size={10} className="animate-spin" /> : cartData?.numOfCartItems}</span>
                    </div>
                  </div>
                </Link>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
