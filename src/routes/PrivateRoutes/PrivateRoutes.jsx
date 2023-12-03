import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import useLoggedInUser from '../../hooks/useLoggedInUser';

function PrivateRoutes({ children }) {
    const [users, isLoading] = useLoggedInUser();
    const location = useLocation();

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (users) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
}

export default PrivateRoutes;
