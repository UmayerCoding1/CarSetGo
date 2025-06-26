import React from 'react';
import Table from '../../../components/ui/table/Table';
import PaymentTableRow from '../../../components/seller/PaymentTableRow';

const ReceviedPayment = () => {
    return (
        <div className='p-2'>
            <div>
                {/* all filtering function */}
            </div>

            <div>
                <Table thValue={["TransactionId","payment type","buyer info","amount","date"]}>
                     <PaymentTableRow />
                </Table>
            </div>
        </div>
    );
};

export default ReceviedPayment;