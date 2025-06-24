import React, { use } from 'react';
import {useQuery} from '@tanstack/react-query'
import { callGetApis, callPutApis } from '../../../../api/api';
import useAuth from '../../../../hooks/useAuth'
import Table from '../../../../components/ui/table/Table';
import DealershipTavleRow from '../../../../components/seller/DealershipTavleRow';
import Loading from '../../../../components/ui/Loading';
import {toast} from 'sonner'

/* 
 1: todo: create recovary section for dealearship request
*/

const DealershipRequest = () => {
    const {user} = useAuth();
    const {data: dealershipRequests = [], refetch: requestRefetch} = useQuery({
        queryKey: ['dealershipRequests'],
        queryFn: async () => {
            const response = await callGetApis(`/dealership/seller/${user?._id}`);
            return response;
        }
    });
    

   const handleDealearshipRejected = async (id) => {
    const status = 'rejected';

    try {
        const response = await callPutApis('/dealership/rejected', {requestId: id, status})
        .then((res)=> {
            toast.success(res.message, {duration:1000});
            requestRefetch();
        })
        .catch((error) => {
            toast.error(error.message, {duration: 500});
        })

    } catch (error) {
        console.log(error);
        
    }
    
   }

    if (!dealershipRequests && !dealershipRequests?.length) {
        return <Loading />
    }
    


    return (
        <div>
           <Table thValue={["TransactionId",'Name', 'Email', 'Phone',"amount", "Payment date", "buyer",  "payment", 'Status', 'Action']}>
                <DealershipTavleRow 
                  requestsData={dealershipRequests.validDealership}
                  handleDealearshipRejected={handleDealearshipRejected}
                />
           </Table>
        </div>
    );
};

export default DealershipRequest;