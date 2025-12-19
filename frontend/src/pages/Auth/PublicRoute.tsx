import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

export const PublicRoute = () => {
    const token = isAuthenticated();

    if (token) {
        // Already authenticated, redirect to home
        return <Navigate to="/" replace />;
    }

    // Not authenticated, render child routes
    return <Outlet />;
};