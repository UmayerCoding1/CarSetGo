import React, { use } from 'react';
import {useQuery} from '@tanstack/react-query'
import { callGetApis } from '../../../../api/api';
import useAuth from '../../../../hooks/useAuth'
const DealershipRequest = () => {
    const {user} = useAuth();
    const {data: dealershipRequests} = useQuery({
        queryKey: ['dealershipRequests'],
        queryFn: async () => {
            const response = await callGetApis(`/dealership/${user?._id}`);
            return response;
        }
    });
    console.log(dealershipRequests);
    
    return (
        <div>
           
        </div>
    );
};

export default DealershipRequest;