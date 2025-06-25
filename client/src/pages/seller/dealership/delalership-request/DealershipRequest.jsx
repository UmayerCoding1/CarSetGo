import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { callGetApis, callPutApis } from "../../../../api/api";
import useAuth from "../../../../hooks/useAuth";
import Table from "../../../../components/ui/table/Table";
import DealershipTavleRow from "../../../../components/seller/DealershipTavleRow";
import Loading from "../../../../components/ui/Loading";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { useState } from "react";

/* 
 1: todo: create recovary section for dealearship request
 2: todo: implement pegination
*/

const DealershipRequest = () => {
 const [dealershipTranIdSearch, setDealershipTranIdSearch] = useState('');
 const [searchInput,setSearchInput] = useState('');

  const { user } = useAuth();
  const { data: dealershipRequests = [], refetch: requestRefetch } = useQuery({
    queryKey: ["dealershipRequests"],
    queryFn: async () => {
      const response = await callGetApis(`/dealership/seller/${user?._id}`);
      return response;
    },
  });

  const handleDealershipStatusChange = async (id, status) => {
    try {
      await callPutApis("/dealership/status", { requestId: id, status })
        .then((res) => {
          toast.success(res.message, { duration: 1000 });
          requestRefetch();
        })
        .catch((error) => {
          toast.error(error.message, { duration: 500 });
        });
    } catch (error) {
      console.log(error);
    }
  };


  console.log(dealershipTranIdSearch);
  
  if (!dealershipRequests && !dealershipRequests?.length) {
    return <Loading />;
  }

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Dealership Request</h1>
      <div className="p-3 lg:flex items-center justify-between ">
        <form onSubmit={(e) => {e.preventDefault()
          setDealershipTranIdSearch(searchInput);
        }}  className=" w-full lg:w-96 border border-gray-400 rounded-lg flex items-center p-2">
          <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder="Search form transaction Id" className="flex-1 h-10 outline-none" />
          <button  className="bg-black text-white h-10 w-10 flex items-center justify-center rounded-xl">
             <Search size={15}/>
          </button>
        </form>
        <div>
          s
        </div>
      </div>




      <div className="overflow-x-auto">
        <Table
          thValue={[
            "TransactionId",
            "Name",
            "Email",
            "Phone",
            "amount",
            "Payment date",
            "buyer",
            "payment",
            "Status",
            "Action",
          ]}
        >
          <DealershipTavleRow
            requestsData={dealershipRequests.validDealership}
            handleDealershipStatusChange={handleDealershipStatusChange}
          />
        </Table>
      </div>
    </div>
  );
};

export default DealershipRequest;
