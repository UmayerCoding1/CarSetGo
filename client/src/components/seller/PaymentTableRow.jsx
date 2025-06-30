import { Copy } from "lucide-react";
import React from "react";
import {toast} from 'sonner';
const PaymentTableRow = ({ paymenstData }) => {
  console.log(paymenstData);

  const handlePaymentIdCopy = (id) => {
    
    
    if(!id) return;

    navigator.clipboard.writeText(id)
   .then(() => toast.success('Payment id copy', {duration: 1000}))
   .catch(() => toast.error('Try agian', {duration: 1000}))
  }
  return (
    <>
      {paymenstData?.map((payment, inx) => (
        <tr className="" key={inx}>
          <td className="border p-2 w-32">
            <div className="flex items-center gap-3">
              <p>{payment.transactionId?.slice(0, 20)}</p>
              {payment.transactionId && (
                <Copy
                  onClick={() =>
                    handlePaymentIdCopy(payment?.transactionId)
                  }
                  size={15}
                  className="text-gray-600 hover:text-black cursor-pointer"
                />
              )}
            </div>
          </td>

          <td  className="border p-2 text-center">
            <p>{payment.paymentType}</p>
          </td>
          <td  className="border p-2 text-center">
            <p className="text-blue-500 cursor-pointer">See Details</p>
          </td>

           <td  className="border p-2 text-center">
            <p>${payment.amount}</p>
          </td>
           <td  className="border p-2 text-center">
            <p>${new Date(payment.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"})}</p>
          </td>
        </tr>
      ))}
    </>
  );
};

export default PaymentTableRow;
