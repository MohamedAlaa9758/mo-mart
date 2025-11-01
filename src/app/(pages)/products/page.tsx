import { ProductI } from "@/interfaces";
import React from "react";
import CardDeisgin from "@/components/CardDeisgin/CardDeisgin";

export default async function Product() {
  const respones = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    next: {
      revalidate: 10 * 60,
    },
  });
  const { data: products }: { data: ProductI[] } = await respones.json();

  return (
    <>
      <div className="flex flex-wrap my-4">
        {products.map((product) => (
          <CardDeisgin key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
