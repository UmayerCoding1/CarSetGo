import { Copy } from "lucide-react";
import React from "react";

const PaymentTableRow = ({ paymenstData }) => {
  console.log(paymenstData);

  return (
    <>
      {paymenstData?.map((payment, inx) => (
        <tr className="" key={inx}>
          <td className="border p-2">
            <div>
              <p>{payment.transactionId?.slice(0, 20)}</p>
              {payment.transactionId && (
                <Copy
                  onClick={() =>
                    handlePaymentIdCopy(request.paymentInfo.paymentId)
                  }
                  size={15}
                  className="text-gray-600 hover:text-black cursor-pointer"
                />
              )}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default PaymentTableRow;
