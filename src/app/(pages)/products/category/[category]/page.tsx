
import CardDeisgin from '@/components/CardDeisgin/CardDeisgin';
import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params';

export default async function CategoryProduct({ params }: { params: Params }) {
    const { category } = params;
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products?category=' + category)
    const { data: products }: { data: ProductI[] } = await response.json();
    return <>
        <h1 className='text-center capitalize'>All products in the category </h1>
        <div className="flex flex-wrap my-4">
            {products.map((product) => (
                <CardDeisgin product={product} key={product.id} />
            ))}
        </div>
    </>
}
