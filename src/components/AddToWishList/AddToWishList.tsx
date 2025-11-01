'use client'
import { HeartIcon, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function AddToWishList({ productId }: { productId: string }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const inWishlist = wishlist.includes(productId);

  const [loadingIds, setLoadingIds] = useState(false);

  async function handleClick() {
    setLoadingIds(true);
    if (inWishlist) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
    setLoadingIds(false);
  }

  return (
    <>
      {loadingIds ? (
        <Loader2 className="animate-spin text-red-500" />
      ) : (
        <HeartIcon
          className={`cursor-pointer transition-colors ${inWishlist ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          onClick={handleClick}
        />
      )}
    </>
  );
}
