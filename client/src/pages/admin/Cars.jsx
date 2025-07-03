import React from "react";
import Table from "../../components/ui/table/Table";
import { motion, AnimatePresence } from "motion/react";
import CarListTavleRow from "../../components/seller/CarListTavleRow";
import useCars from "../../hooks/useCars";
import ImageSlider from "../../components/admin/ImageSlider";
import { Link } from "react-router";
import CarCard from "../../components/admin/CarCard";
const Cars = () => {
  const [page, setPage] = React.useState(1);
  const carsPerPage = 10;
  const { cars, totalPages } = useCars(page, carsPerPage, "", "", "", "", "");
  console.log(cars);

  return (
    <div className="max-h-screen overflow-auto scrollbar-hide p-10  bg-gradient-to-br from-[#19223a] via-[#1e2a3a] to-[#2ec4f1] ">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {cars?.map((car, idx) => (
          <CarCard key={idx} car={car} idx={idx} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-cyan-900/90 border border-cyan-700 text-cyan-100 font-semibold hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed shadow"
        >
          Prev
        </button>
        {Array.from({ length: totalPages || 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded font-semibold border transition-all duration-150 ${
              page === i + 1
                ? "bg-cyan-500 text-white border-cyan-500 shadow"
                : "bg-cyan-900/90 text-cyan-100 border-cyan-700 hover:bg-cyan-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages || 1, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-cyan-900/90 border border-cyan-700 text-cyan-100 font-semibold hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed shadow"
        >
          Next
        </button>
      </div>

      <div className="mb-14"></div>
    </div>
  );
};

export default Cars;
