import { Copy, X } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import {toast} from 'sonner';
const DealershipTavleRow = ({requestsData,handleDealershipStatusChange}) => {
   const [isOpenBuyerDetails, setIsOpenBuyerDetails] = useState(false); 
   const [updateRequestStatus,setUpdateRequestStatus] = useState('');
    
    

    const handlePaymentIdCopy = (id) => {
        if(!id) return;

        navigator.clipboard.writeText(id)
        .then(() => toast.success('Payment id copy', {duration: 1000}))
        .catch(() => toast.error('Try agian', {duration: 1000}))
    }
    return (

       <>
        {requestsData?.map((request,inx) => (
              <tr
            key={request._id}
                    className={` hover:bg-gray-50 transition font-medium text-gray-500 border-b border-gray-200 text-sm 
                     
                      `}
                  >
                    

                    <td className='text-center border'>
                        <div className='flex items-center justify-center gap-4'>
                          <p>{request.paymentInfo.paymentId ? request.paymentInfo.paymentId : 'Not paid'}</p>

                          {request.paymentInfo.paymentId &&
                        <Copy onClick={() => handlePaymentIdCopy(request.paymentInfo.paymentId)} size={15} className="text-gray-600 hover:text-black cursor-pointer"/>
                          }
                        </div>
                    </td>


                    <td className='text-center border '>
                        <p>{request?.name}</p>
                    </td>
                    <td className='text-center border '>
                        <p>{request?.email}</p>
                    </td>

                    <td className='text-center border '>
                        <p>{request?.phone}</p>
                    </td>


                    <td className='text-center border '>
                        <p className={`${request?.paymentInfo.paymentAmount ? 'text-green-500' : 'text-red-400'}`}>{request?.paymentInfo.paymentAmount ? request?.paymentInfo.paymentAmount : 'Not paid'}</p>
                    </td>
                    
                    <td className='text-center border '>
                        <p >{request?.paymentInfo.paymentDate ? (new Date(request?.paymentInfo.paymentDate)).toDateString() : 'Not paid'}</p> 
                    </td>

                     <td onClick={() => setIsOpenBuyerDetails(inx)} className='text-center border cursor-pointer'>
                        <p className='text-blue-500 '>See Details</p>
                    </td>

                     <td className='text-center border cursor-pointer'>
                       <p className={`
                         ${request.paymentInfo.paymentStatus === 'pending' && 'text-orange-400'}
                         ${request.paymentInfo.paymentStatus === 'success' && 'text-emerald-400'}
                         ${request.paymentInfo.paymentStatus === 'failed' && 'text-red-400'}
                        `}>{request.paymentInfo.paymentStatus}</p>
                    </td>

                    <td className='text-center border cursor-pointer'>
                         <select className='w-full  outline-none  ' name="" id="" defaultValue={request.status}
                          onChange={(e) => handleDealershipStatusChange(request._id,e.target.value)}
                         >
                          <option value="pending" className={`${request.paymentInfo.paymentStatus === 'success' && 'hidden'}`}>Pending</option>
                          <option value="approved">Approved</option>
                         </select>
                    </td>
                   
                    
                    
                    
                    <td className="py-2 px-4 text-center border">
                      {
                        request.status === 'approved' ? <button  onClick={() => handleDealershipStatusChange(request._id, 'completed')} className='px-3 py-1 bg-emerald-500 text-black rounded hover:bg-emerald-600 transition  cursor-pointer'>
                        <span className="">Completed</span>
                        </button>

                        :
                        <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition  cursor-pointer"
                        onClick={() => handleDealershipStatusChange(request._id, 'rejected')}
                      >
                        Rejected
                      </button>
                      }
                      
                    </td>

                     {isOpenBuyerDetails === inx && <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  bg-white shadow-md border border-gray-300 rounded-lg w-[400px] flex items-center justify-center">
                                <div className=" p-4 rounded">
                                    <X className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsOpenBuyerDetails(false)} size={18}/>
                                  <div>
                                    <h2 className="text-2xl text-black  font-semibold mb-2">Buyer Details</h2>
                                      <div className="flex items-center gap-2"  >
                                        <img className='w-[50px] h-[50px] rounded-full' src={request?.userId.avatar} alt="buyer image"  loading='lazy'/>
                                        <div>     
                                        <p><span className="font-semibold">Name:</span> {request?.userId.fullname}</p>
                                         <p><span className="font-semibold">Email:</span> {request?.userId.email}</p>
                                         <p><span className="font-semibold">Phone:</span> {request?.phone}</p>                                       
                                        </div>
                                      </div>
                                    <div className='bg-gray-100 p-2 mt-2 rounded-sm'>
                                      <p><span className="font-semibold">Payment Amount:</span> {request?.paymentInfo.paymentAmount ? request?.paymentInfo.paymentAmount : 'Not paid'}</p>
                                    <p><span className="font-semibold">Request Date:</span> {request?.createdAt ? (new Date(request?.createdAt)).toDateString() : 'Not paid'}</p>
                                    </div>
                                  </div>
                                        

                                        <div className='bg-gray-100 p-2 mt-2 rounded-sm'>
                                          

                                           <p className='flex items-center  gap-2'><span>Location: </span> <address><span>{request.address.city}</span> - <span>{request.address.state}</span> - <span>{request.address.country}</span></address></p>
                                        </div>
                                </div>
                                
                        </div>}
                  </tr>   

                  
        ))}
       </>
        
    );
};

export default DealershipTavleRow;