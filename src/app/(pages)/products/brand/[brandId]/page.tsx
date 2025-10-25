
import CardDeisgin from '@/components/CardDeisgin/CardDeisgin';
import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params';


export default async function BrandProduct({ params }: { params: Params }) {
    const { brandId } = params;
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products?brand=' + brandId)
    const { data: products }: { data: ProductI[] } = await response.json();


    return <>
        <h1 className='text-center capitalize'>All products in the brand</h1>
        <div className="flex flex-wrap my-4">
            {products.map((product) => (
                <CardDeisgin product={product} key={product.id} />
            ))}
        </div>
    </>
}
