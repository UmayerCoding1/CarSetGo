import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/ui/Loading';
const PrivetRoute = ({children}) => {
    const {user,isLoading } = useAuth();
    const location = useLocation();
    if(isLoading){
        return <Loading />
    }


    if(user){
        return children;
    }
    return <Navigate to="/sign-in" state={{from: location}}/>
};

export default PrivetRoute;