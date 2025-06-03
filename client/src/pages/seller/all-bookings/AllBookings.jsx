import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import BookingTable from "../../../components/seller/booking-table/BookingTableRow";
import Table from "../../../components/ui/table/Table";
import { useQuery } from "@tanstack/react-query";
import { callGetApis } from "../../../api/api";
import useAuth from "../../../hooks/useAuth";
import useSecureApi from "../../../hooks/useSecureApi";
import Loading from "../../../components/ui/Loading";

const AllBookings = () => {
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [searchBydate, setSearchByDate] = useState("");
  const {user} = useAuth();
  const secureApi = useSecureApi();
  const isProcessing = false;
  const {data: bookings= [], refetch, isLoading} = useQuery({
    queryKey: ['bookings',user?._id,page,limit,search,paymentStatus,bookingStatus,searchBydate],
    // enabled: !!user?._id,/
    queryFn: async() => {
      const response = await callGetApis(`/bookings/seller/${user?._id}?page=${page}&limit=${limit}&search=${search}&paymentStatus=${paymentStatus}&bookingStatus=${bookingStatus}&searchBydate=${searchBydate}`);
      setTotalPages(response.totalPages);
      return response.bookings;
    }
  })

  const isAllFiltered = search || paymentStatus || bookingStatus || searchBydate;

  console.log(isAllFiltered ? "filtered" : "not filtered");
  


 

const handleBookingStatus = (status) => {
        console.log(status);
        setUpdateStatus(status);
    }

  
  return (
    <div className="p-5">
      <div>
        <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <h1 className="text-2xl font-medium ">All Bookings</h1>

               {isAllFiltered && (
                 <button 
                 onClick={() => {
                   setSearch('');
                   setPaymentStatus('');
                   setBookingStatus('');
                   setSearchByDate('');
                 }}
                 className="bg-red-500 text-white px-2 py-1 rounded-lg flex items-center gap-2 cursor-pointer"><X size={15}/> <span>Clear filters </span></button>
               )}
             </div>


            <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">View in one page:</h3>
                <div>
                <select
                  name="status"
                  id="status"
                  className="p-2  outline-none rounded-lg font-medium text-sm border"
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  <option value={10}>Defualt</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
        </div>

        <div className="lg:flex items-center justify-between my-10">
          {/* filter section */}
          <div className="lg:flex items-center gap-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearch(e.target[0].value);
              }}
              className="flex items-center justify-between gap-2 border border-gray-400 rounded-lg lg:w-80 h-10"
            >
              <input
                type="text"
                className="p-2  outline-none rounded-lg font-medium text-sm"
                placeholder="Search transactions ID"
                defaultValue={search}
              />
              <button className="w-16 h-10">
                <Search
                  type="submit"
                  sixe={10}
                  className="bg-black text-white p-2  rounded-tr-lg rounded-br-lg text-lg cursor-pointer h-full w-16 "
                />
              </button>
            </form>

            <div className="flex items-center  gap-2 my-4 lg:my-0">
              <div>
                <select
                  name="status"
                  id="status"
                  className="p-2  outline-none rounded-lg font-medium text-sm border"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="">Sort by payment status</option>
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                </select>
              </div>

              <div>
                <select
                  name="status"
                  id="status"
                  className="p-2  outline-none rounded-lg font-medium text-sm border"
                  onChange={(e) => setBookingStatus(e.target.value)}
                >
                  <option value="">Sort by booking status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="border border-gray-400 rounded-lg p-2 font-medium">
                <input
                  onChange={(e) => setSearchByDate(e.target.value)}
                  type="date"
                  className="outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/*pagination section  */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={15} />
            </motion.button>

            {[...Array(totalPages || 0)].map((_, inx) => (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setPage(inx + 1)}
                className={`w-7 h-7 flex items-center justify-center rounded-full cursor-pointer ${
                  page === inx + 1
                    ? "bg-black text-white"
                    : "border border-gray-400"
                }`}
                key={inx}
              >
                {inx + 1}
              </motion.button>
            ))}
            <motion.button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <ChevronRight size={15} />
            </motion.button>
          </div>
        </div>
      </div>



      <div className="mt-10 overflow-x-auto">
        {isLoading ? <Loading /> : <Table 
         thValue={[
                '#',
                "Customer",
                "phone number",
                'Created At',
                "Booking stat date",
                "Booking end date",
                "Car Details",
                "total days",
                'Pickup Location',
                "payment Id",
                "payment status",
                "booking status",
                
              ]}
        >
          
           
            <BookingTable data={bookings} handleBookingStatus={handleBookingStatus} isProcessing={isProcessing}/>
          
        </Table>}
        
      </div>
    </div>
  );
};

export default AllBookings;
