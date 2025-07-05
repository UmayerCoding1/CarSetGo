import React, { useState } from "react";
import useCars from "../../hooks/useCars";
import CarCard from "../../components/admin/CarCard";
import { X } from "lucide-react";
import { callGetApis } from "../../api/api";
import { useEffect } from "react";
import Loading from "../../components/ui/Loading";
const Cars = () => {
  const [cars, setCars] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filtersQuery, setFiltersQuery] = useState({
    search: "",
    bodyType: "",
    minPrice: "",
    maxPrice: "",
  });
  const [openClearFilters, setOpenClearFilters] = useState(false);
  const carsPerPage = 10;
  const DEBOUNCE_DELAY = 500;
 

  const changerHandler = async (e) => {
    const { name, value } = e.target;

    setFiltersQuery((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    setOpenClearFilters(true);
  };

  // todo : ---
  useEffect(() => {
  const controller = new AbortController(); 
  const signal = controller.signal;

  const debounceTimer = setTimeout(() => {
    const handleCars = async () => {
      setIsLoading(true);
      try {
        const res = await callGetApis(
          `/cars?page=${page}&limit=${carsPerPage}&make=${filtersQuery.search}&bodyType=${filtersQuery.bodyType}`,
          { signal } // Optional
        );
        if (res) {
          setCars(res.data);
          setTotalPages(res.pagination.totalPages);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("API error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleCars();
  }, DEBOUNCE_DELAY);

  return () => {
    clearTimeout(debounceTimer);
    controller.abort(); // Cancel previous requests
  };
}, [page, carsPerPage, filtersQuery.search, filtersQuery.bodyType]);

  return (
    <div className="max-h-screen overflow-auto scrollbar-hide p-10 bg-gradient-to-br from-[#19223a] via-[#1e2a3a] to-[#2ec4f1] ">
      {/* Filtering Section */}
      <form className="mb-8 flex flex-wrap gap-4 items-end bg-white/10 backdrop-blur rounded-2xl p-4 shadow-lg border border-cyan-900">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-cyan-100 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filtersQuery.search}
            name="search"
            onChange={changerHandler}
            placeholder="Car name, model, seller..."
            className="px-3 py-2 rounded bg-white/80 text-cyan-900 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm min-w-[180px]"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-cyan-100 mb-1">
            Body Type
          </label>
          <select
            value={filtersQuery.bodyType}
            name="bodyType"
            onChange={changerHandler}
            className="px-3 py-2 rounded bg-white/80 text-cyan-900 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm min-w-[120px]"
          >
            <option value="">All</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Minivan">Minivan</option>
            <option value="Pickup Truck">Pickup Truck</option>
            <option value="Crossover">Crossover</option>
            <option value="MPV">MPV</option>
          </select>
        </div>

        {openClearFilters && (
          <button
            onClick={() => {
              setFiltersQuery({
                search: "",
                bodyType: "",
                minPrice: "",
                maxPrice: "",
              });
              setOpenClearFilters(false);
            }}
            type="button"
            className="px-5 py-1 rounded-xl bg-gradient-to-r from-red-600 to-red-400 text-white font-bold shadow hover:from-red-400 hover:to-red-600 transition border border-cyan-700 mt-2 flex items-center gap-2"
          >
            <X size={20} /> Clear
          </button>
        )}
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {isLoading ? <Loading /> : cars?.map((car, idx) => (
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
