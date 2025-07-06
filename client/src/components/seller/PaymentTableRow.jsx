import { Copy, X } from "lucide-react";
import React, { useState } from "react";
import {toast} from 'sonner';
const PaymentTableRow = ({ paymenstData }) => {
  const [isOpenBuyerAndProductDetails, setIsOpenBuyerAndProductDetails] = useState(false);
  

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
            <p onClick={() => setIsOpenBuyerAndProductDetails(inx)} className="text-blue-500 cursor-pointer">See Details</p>
          </td>

           <td  className="border p-2 text-center">
            <p>${payment.amount}</p>
          </td>
           <td  className="border p-2 text-center">
            <p>${new Date(payment.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"})}</p>
          </td>


           {isOpenBuyerAndProductDetails === inx && <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  bg-white shadow-md border border-gray-300 rounded-lg w-[400px] flex items-center justify-center">
                                <div className=" p-4 rounded">
                                    <X className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsOpenBuyerAndProductDetails(false)} size={18}/>
                                  <div>
                                    <h2 className="text-2xl text-black  font-semibold mb-2">Buyer Details</h2>
                                      <div className="flex items-center gap-2"  >
                                        <img className='w-[50px] h-[50px] rounded-full' src={payment?.userId.avatar} alt="buyer image"  loading='lazy'/>
                                        <div>     
                                        <p><span className="font-semibold">Name:</span> {payment?.userId.fullname}</p>
                                         <p><span className="font-semibold">Email:</span> {payment?.userId.email}</p>
                                         <p><span className="font-semibold">Phone:</span> {payment?.phone}</p>                                       
                                        </div>
                                      </div>
                                   
                                  </div>
                                        

                                        <div className='bg-gray-100 p-2 mt-2 rounded-sm'>
                                          
                                              <p>{payment.bookingId && <span className='flex items-center gap-2'><span>Booking Id:</span> <span>{payment.bookingId}</span></span>}</p>
                                              <p>{payment.dealershipId && <span className='flex items-center gap-2'><span>Dealership Id:</span> <span>{payment.dealershipId}</span></span>}</p>


                                              
                                           {/* <p className='flex items-center  gap-2'><span>Location: </span> <address><span>{payment.address.city}</span> - <span>{payment.address.state}</span> - <span>{payment.address.country}</span></address></p> */}
                                        </div>
                                </div>
                                
                        </div>}
        </tr>
      ))}


      
    </>
  );
};

export default PaymentTableRow;
