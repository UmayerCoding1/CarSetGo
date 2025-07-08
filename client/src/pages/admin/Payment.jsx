import React, { useState } from "react";
import {
  CreditCard,
  ClipboardList,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { callGetApis } from "../../api/api";
import Loading from "../../components/ui/Loading";
const Payment = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [totalPages, setTotalPages] = useState(null);
  

  const {
    data: payments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["payments", page, limit],
    queryFn: async () => {
      const res = await callGetApis(`/payment?page=${page}&limit=${limit}`);
      if (res.success) {
        setTotalPages(res.totalPage);
        return res.payments;
      }
      return [];
    },
  });

  
  

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#06b6d4] px-0 sm:px-4 max-h-screen overflow-auto scrollbar-hide text-white">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">
        <h2 className="text-3xl font-bold mb-8 mt-10 text-cyan-100 drop-shadow flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-emerald-300" /> Payments
        </h2>

        {isLoading ? <Loading /> 
        :
        <div className="bg-white/10 backdrop-blur rounded-2xl shadow-2xl border border-cyan-900 p-6">
          <table className="min-w-full text-sm text-cyan-100">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-900 to-blue-700 text-cyan-100">
                <th className="py-3 px-4 text-left font-semibold">
                  Payment ID
                </th>
                <th className="py-3 px-4 text-left font-semibold">User</th>
                <th className="py-3 px-4 text-left font-semibold">
                  Payment Type
                </th>
                <th className="py-3 px-4 text-left font-semibold">Amount</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-cyan-900 last:border-b-0 hover:bg-cyan-900/30 transition"
                >
                  {/* <td className="py-2 px-4 font-mono text-cyan-200">{p.id}</td> */}
                  <td className="py-2 px-4 font-semibold text-cyan-100">
                    {payment?.transactionId.slice(0, 20)}...
                  </td>

                  <td className="py-2 px-4 text-emerald-200 font-bold">
                    {payment?.userId?.fullname.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-emerald-200 font-bold">
                    ${payment?.paymentType.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-emerald-200 font-bold">
                    {payment?.amount.toLocaleString()}
                  </td>

                  <td className="py-2 px-4 text-cyan-200">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
        

        <div className="mb-32 mt-2 pl-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p>Show rows per page </p>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="border border-white rounded-md px-2 py-1"
            >
              <option className="text-black" value="10">
                10
              </option>
              <option className="text-black" value="15">
                15
              </option>
              <option className="text-black" value="25">
                25
              </option>
              <option className="text-black" value="50">
                50
              </option>
              <option className="text-black" value="100">
                100
              </option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-medium text-xs">
              {Array.from({ length: totalPages }, (_, index) => (
                <button className={`${page === index + 1 && "text-emerald-300 "} `}>
                  {index + 1}
                </button>
              ))}
            </div>
          

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prevPage) => prevPage - 1)}
              className={`font-bold w-8 h-8 flex items-center justify-center ${
                page === 1 ? "hover:bg-gray-500 cursor-not-allowed" : "hover:bg-white"
              }  transition-all duration-300 ease-out rounded-lg`}
            >
              <ChevronLeft
                className={`w-6 h-6 text-cyan-100   ${
                  page === 1 ? "cursor-not-allowed" : "hover:text-black"
                }`}
              />
            </button>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className={`font-bold w-8 h-8 flex items-center justify-center ${
                page === totalPages
                  ? "bg-gray-500 cursor-not-allowed"
                  : "hover:bg-white"
              }  transition-all duration-300 ease-out rounded-lg`}
              disabled={page === totalPages}
            >
              <ChevronRight
                className={`w-6 h-6 text-cyan-100   ${
                  page === totalPages
                    ? "cursor-not-allowed"
                    : "hover:text-black"
                }`}
              />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
