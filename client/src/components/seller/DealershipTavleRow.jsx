import { X } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

const DealershipTavleRow = ({requestsData,selectedCar}) => {
   const [isOpenBuyerDetails, setIsOpenBuyerDetails] = useState(false); 
    console.log('requestsData', requestsData);
    
    return (

       <>
        {requestsData.map((request,inx) => (
              <tr
            key={request._id}
                    className={` hover:bg-gray-50 transition font-medium text-gray-500 border-b border-gray-200 text-sm`}
                  >
                    

                    <td className='text-center border'>
                        <p>{request.paymentInfo.paymentId ? request.paymentInfo.paymentId : 'Not paid'}</p>
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
                    {/* <td className='text-center '>
                        <p>${car?.price}</p>
                    </td> */}
                    {/* <td className='text-center '>
                        <p>{car?.color}</p>
                    </td> */}
                    
                    
                    
                    <td className="py-2 px-4 text-center">
                      <button
                        className="px-3 py-1 bg-black text-white rounded hover:bg-gray-700 transition  cursor-pointer"
                        // onClick={() => setSelectedCar(request)}
                      >
                        View
                      </button>
                    </td>

                     {isOpenBuyerDetails === inx && <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  bg-white shadow-md rounded-lg w-[400px] flex items-center justify-center">
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
                                    <p><span className="font-semibold">Payment Amount:</span> {request?.paymentInfo.paymentAmount ? request?.paymentInfo.paymentAmount : 'Not paid'}</p>
                                    <p><span className="font-semibold">Payment Date:</span> {request?.paymentInfo.paymentDate ? (new Date(request?.paymentInfo.paymentDate)).toDateString() : 'Not paid'}</p>
                                  </div>
                                        
                                </div>
                                
                        </div>}
                  </tr>   

                  
        ))}
       </>
        
    );
};

export default DealershipTavleRow;