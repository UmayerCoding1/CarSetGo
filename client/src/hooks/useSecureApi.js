import axios from 'axios';
import React from 'react';
const secureApi = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true
})
const useSecureApi = () => {
    secureApi.interceptors.request.use(function (config) {
        const token = localStorage.getItem('xytz5T').split('+')[1];
        console.log(token);
        
         config.headers.Authorization = `Bearer ${token}`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
    return secureApi
};

export default useSecureApi;