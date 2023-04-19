import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    CartProduct,
    addOrUpdatedToCart,
    getCart,
    removeFromCart,
} from '../api/firebase';

export default function useCart() {
    const { uid } = useSelector((state: RootState) => state.user);
    const queryClient = useQueryClient();

    const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
        enabled: !!uid,
    });

    const addOrUpdateItem = useMutation(
        (product: CartProduct) => addOrUpdatedToCart(uid, product),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['carts', uid]);
            },
        }
    );

    const removeItem = useMutation((id: string) => removeFromCart(uid, id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['carts', uid]);
        },
    });

    return { cartQuery, addOrUpdateItem, removeItem };
}
