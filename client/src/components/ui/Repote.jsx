import { Triangle, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { callPostApis } from "../../api/api";
import { toast } from "sonner";


const reportReasons = [
  "Spam",
  "Inappropriate Content",
  "Harassment",
  "Fake Information",
  "Other",
];


const Repote = ({ onClose,userId,carId,sellerId }) => {
  const [reason, setReason] = useState(reportReasons[0]);
  const [description, setDescription] = useState("");


  const submitHandler =async (e) => {
    e.preventDefault();

    const reportData = {
        userId,
        carId,
        sellerId,
         reason,
        reportDescription: description,
    };

    try {
        const response = await callPostApis('/report', reportData);
        if (response.success) {
            toast.success(response.message, {duration: 1000});
            onClose();
        }
    } catch (error) {
        console.log(error);
        
        // throw new Error(error);
    }
    console.log(reportData);
    
    }
    

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[200] bg-black/70 flex items-center justify-center animate-fadeInUp">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative animate-fadeInUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl font-bold focus:outline-none"
          aria-label="Close report section"
        >
          &times;
        </button>
        <div className="flex items-center gap-2 mb-4">
          <TriangleAlert className="text-yellow-300" size={24} />
          <h2 className="text-lg font-bold text-gray-800">Report an Issue</h2>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Reason</label>
            <select
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-100"
              value={reason}
              onChange={e => setReason(e.target.value)}
            >
              {reportReasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-100 min-h-[60px]"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the issue..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black  text-white font-semibold py-2 rounded transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Repote;
