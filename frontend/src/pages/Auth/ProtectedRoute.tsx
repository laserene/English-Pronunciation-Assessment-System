import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

export const ProtectedRoute = () => {
    const token = isAuthenticated();

    if (!token) {
        // Not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    // Authenticated, render child routes
    return <Outlet />;
};