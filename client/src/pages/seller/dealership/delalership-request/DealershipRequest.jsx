import React, { use } from 'react';
import {useQuery} from '@tanstack/react-query'
import { callGetApis } from '../../../../api/api';
import useAuth from '../../../../hooks/useAuth'
import Table from '../../../../components/ui/table/Table';
import DealershipTavleRow from '../../../../components/seller/DealershipTavleRow';
import Loading from '../../../../components/ui/Loading';
const DealershipRequest = () => {
    const {user} = useAuth();
    const {data: dealershipRequests} = useQuery({
        queryKey: ['dealershipRequests'],
        queryFn: async () => {
            const response = await callGetApis(`/dealership/seller/${user?._id}`);
            return response;
        }
    });
    
    if (!dealershipRequests && !dealershipRequests?.length) {
        return <Loading />
    }
    
    return (
        <div>
           <Table thValue={["TransactionId",'Name', 'Email', 'Phone',"amount", "Payment date", "buyer", 'Address', "payment", 'Status', 'Action']}>
                <DealershipTavleRow 
                  requestsData={dealershipRequests.dealership}
                />
           </Table>
        </div>
    );
};

export default DealershipRequest;