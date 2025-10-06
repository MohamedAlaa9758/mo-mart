import AddToCart from "@/components/AddToCart/AddToCart";
import ImageSlider from "@/components/ImageSlider/ImageSlider";
import StarIcon from "@/components/StarIcon/StarIcon";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductI } from "@/interfaces";
import { HeartIcon } from "lucide-react";
import { Params } from "next/dist/server/request/params";
export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = params;

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products/" + productId);
  const { data: product }: { data: ProductI } = await response.json();

  return (
    <>
      <Card className="grid md:grid-cols-3 items-center my-5 mx-2 relative ">
        <div className=" absolute top-2 end-4 ">
          <HeartIcon />
        </div>

        <div className="md:col-span-1  ">
          <ImageSlider images={product.images} altContent={product.title} />
        </div>
        <div className="md:col-span-2 space-y-5 p-4">
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle className="text-2xl">{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>{product.category.name}</CardDescription>
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <StarIcon />
                <p>{product.ratingsAverage}</p>
              </div>
              <div className="flex">
                <p>Remaining : {product.ratingsQuantity}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>
                <span className="font-semibold">{product.price}</span> EGP
              </p>
              <div className="flex">
                <p>Quantity : {product.quantity}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <AddToCart productId={product.id} />
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
