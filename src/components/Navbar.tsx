import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChnage } from '../api/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUser } from '../store/slice/user';
import { useEffect } from 'react';
import User from './User';

export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        onUserStateChnage((user: any) => {
            dispatch(
                setUser({
                    displayName: user?.displayName,
                    uid: user?.uid,
                    photoURL: user?.photoURL,
                })
            );
        });
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
                <Link to='/products/new' className='text-2xl'>
                    <BsFillPencilFill />
                </Link>
                {user.displayName && <User user={user} />}
                {!user.displayName && <button onClick={login}>Login</button>}
                {user.displayName && <button onClick={logout}>Logout</button>}
            </nav>
        </header>
    );
}
