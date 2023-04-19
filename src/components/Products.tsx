import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export type Product = {
    category: string;
    description?: string;
    id: string;
    image: string;
    options: string[];
    price: number;
    title: string;
};

export default function Products() {
    const {
        isLoading,
        error,
        data: products,
    } = useQuery(['products'], getProducts);

    return (
        <>
            {isLoading && <p>로딩중...</p>}
            {error && <p>에러가 났어요...</p>}

            <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </ul>
        </>
    );
}
