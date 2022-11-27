import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
    console.log('ProtectedRoute')
    let jwt = localStorage.getItem('token');
    return (
        jwt ? <Component {...props} /> : <Navigate to="/" />
    )
}

export default ProtectedRoute;