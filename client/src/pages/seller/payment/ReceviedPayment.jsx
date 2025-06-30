import React from 'react';
import Table from '../../../components/ui/table/Table';
import PaymentTableRow from '../../../components/seller/PaymentTableRow';
import {useQuery} from '@tanstack/react-query'
import { callGetApis } from '../../../api/api';
import Loading from '../../../components/ui/Loading';
const ReceviedPayment = () => {

    const {data: payments = []} = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            try {
                const res = await callGetApis('/payment/seller');

                if(res.success){
                    return res.payments;
                } else {
                    return [];
                }
            } catch (error) {
                console.log(error);
            }
        }
    });


    if (!payments && payments.length < 0) {
        return <Loading />
    }
   
    
    return (
        <div className='p-2'>
            <div>
                {/* all filtering function */}
            </div>

            <div>
                <Table thValue={["TransactionId","payment type","buyer info","amount","date"]}>
                     <PaymentTableRow  
                      paymenstData={payments}
                     />
                </Table>
            </div>
        </div>
    );
};

export default ReceviedPayment;