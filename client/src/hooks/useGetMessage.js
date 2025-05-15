import React from 'react';
 import useSecureApi from './useSecureApi'
 import useAuth from './useAuth';
 import {useQuery} from '@tanstack/react-query';


const useGetMessage = (sellerId) => {
    const secureApi = useSecureApi();
    

    const {data: messages = [],error,refetch: getMessageRefetch} = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const response = await secureApi.get(`/message/${sellerId}`);
            return response.data.messages;
        }
    });
    
     
    return {messages,getMessageRefetch};
};

export default useGetMessage;