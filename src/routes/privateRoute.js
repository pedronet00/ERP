import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('email'); // Verifica se o email está presente

    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
