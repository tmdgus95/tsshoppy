import { UserState } from '../store/slice/userSlice';

type Props = {
    user: UserState;
};

export default function User({ user: { photoURL, displayName } }: Props) {
    return (
        <div className='flex items-center shrink-0'>
            <img
                className='w-10 h10 rounded-full mr-2'
                src={photoURL}
                alt={displayName}
            />
            <span className='hidden md:block'>{displayName}</span>
        </div>
    );
}
