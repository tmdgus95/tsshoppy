import { ReactNode } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type Props = {
    children: ReactNode;
    requireAdmin?: boolean;
};

export default function ProtectedRoute({ children, requireAdmin }: Props) {
    const user = useSelector((state: RootState) => state.user);
    if (!user.displayName || (requireAdmin && !user.isAdmin)) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
}
