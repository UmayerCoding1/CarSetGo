import React from 'react';
import Loading from '../components/ui/Loading';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user,isLoading } = useAuth();        
    
    if(isLoading){
        return <Loading />
    }

    if(user.role === "admin"){
        return children;
    }

    

    return <Navigate to="/sign-in" />
};

export default AdminRoute;