import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = true; и
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
