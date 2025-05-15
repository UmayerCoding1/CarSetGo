import React from 'react';
import Loading from '../components/ui/Loading';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const SellerRoute = ({children}) => {
    const {user,isLoading } = useAuth();        
    
    if(isLoading){
        return <Loading />
    }

    if(user.role === "seller"){
        return children;
    }

    

    return <Navigate to="/" />
};

export default SellerRoute;