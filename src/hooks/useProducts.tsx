import { NewProductType, addNewProduct, getProducts } from '../api/firebase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type MutationProps = {
    product: NewProductType;
    url: string;
};

export default function useProducdts() {
    const queryClient = useQueryClient();

    const ProductsQuery = useQuery(['products'], getProducts, {
        staleTime: 1000 * 60,
    });

    const addProduct = useMutation(
        ({ product, url }: MutationProps) => addNewProduct(product, url),
        { onSuccess: () => queryClient.invalidateQueries(['products']) }
    );

    return { ProductsQuery, addProduct };
}
