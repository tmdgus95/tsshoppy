import { useQuery } from '@tanstack/react-query';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { getCart } from '../api/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
export default function CartStatus() {
    const { uid } = useSelector((state: RootState) => state.user);
    const { data: products } = useQuery(['carts'], () => getCart(uid));
    return (
        <div className='relative'>
            <AiOutlineShoppingCart className='text-4xl' />
            {products && (
                <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2'>
                    {products.length}
                </p>
            )}
        </div>
    );
}
