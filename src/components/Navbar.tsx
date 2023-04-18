import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../api/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { UserState, setUser } from '../store/slice/userSlice';
import { useEffect } from 'react';
import User from './User';
import Button from './ui/Button';

export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        onUserStateChange((user: UserState) => {
            dispatch(
                setUser({
                    displayName: user?.displayName,
                    uid: user?.uid,
                    photoURL: user?.photoURL,
                    isAdmin: user?.isAdmin,
                })
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag />
                <h1>Shoppy</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                <Link to='/carts'>Carts</Link>
                {user && user.isAdmin && (
                    <Link to='/products/new' className='text-2xl'>
                        <BsFillPencilFill />
                    </Link>
                )}
                {user.displayName && <User user={user} />}
                {!user.displayName && <Button text='Login' onClick={login} />}
                {user.displayName && <Button text='Logout' onClick={logout} />}
            </nav>
        </header>
    );
}
