import React, { useState } from "react";
import CarCard from "../../components/ui/CarCard";
import "./carlist.css";
import Filter from "../../components/ui/filter/Filter";
import useCars from "../../hooks/useCars";
import { useSearchParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";

const CarLists = () => {
  const [page, setPage] = useState(1);
  const limit = 9;
  const [searchParams] = useSearchParams();

  const price = searchParams.get("price") || "";
  const make = searchParams.get("make") || "";
  const bodyType = searchParams.get("bodyType") || "";
  const fuelType = searchParams.get("fuelType") || "";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const {
    cars,
    totalPages,
    currentPage,
    totalCars,
    isLoadingCars,
    isRefetchingCars,
  } = useCars(page, limit, price, make, bodyType, fuelType, search, category);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
console.log(cars);
  return (
    <div className="py-3">
      <div>
        <h2
          style={{
            backgroundImage: `linear-gradient(to right, #3399ff, #0055aa, #3399ff, #66ccff, #ccf2ff)`,
          }}
          className="text-7xl font-semibold font-DM-MONO bg-clip-text text-transparent"
        >
          Future Cars
        </h2>
      </div>

      <div className="flex flex-col md:flex-col lg:flex-row mt-10">
        <Filter />

        <div>
          {isLoadingCars || isRefetchingCars ? (
            <Loading />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars?.map((car, inx) => (
                  <CarCard key={inx} car={car} />
                ))}
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 rounded bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Prev
                </button>

                {[...Array(totalPages || 0)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === idx + 1
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === (totalPages || 0)}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 rounded bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarLists;
