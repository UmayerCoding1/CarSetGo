import axios from 'axios';
import React from 'react';
const secureApi = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true
})
const useSecureApi = () => {
   
    return secureApi
};

export default useSecureApi;