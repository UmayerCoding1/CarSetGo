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

  // Filtering state
  const [search, setSearch] = React.useState("");
  const [bodyType, setBodyType] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // Filtering UI
  const handleFilter = (e) => {
    e.preventDefault();
    // You may want to update useCars to accept these filters
    // For now, just log or pass to your hook if supported
    // setPage(1); // Optionally reset page
  };

  return (
    <div className="max-h-screen overflow-auto scrollbar-hide p-10 bg-gradient-to-br from-[#19223a] via-[#1e2a3a] to-[#2ec4f1] ">
      {/* Filtering Section */}
      <form onSubmit={handleFilter} className="mb-8 flex flex-wrap gap-4 items-end bg-white/10 backdrop-blur rounded-2xl p-4 shadow-lg border border-cyan-900">
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-cyan-100 mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Car name, model, seller..."
            className="px-3 py-2 rounded bg-white/80 text-cyan-900 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm min-w-[180px]"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-cyan-100 mb-1">Body Type</label>
          <select
            value={bodyType}
            onChange={e => setBodyType(e.target.value)}
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
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-cyan-100 mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            placeholder="$ Min"
            className="px-3 py-2 rounded bg-white/80 text-cyan-900 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm min-w-[100px]"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-cyan-100 mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="$ Max"
            className="px-3 py-2 rounded bg-white/80 text-cyan-900 border border-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm min-w-[100px]"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold shadow hover:from-cyan-700 hover:to-blue-800 transition border border-cyan-700 mt-2"
        >
          Filter
        </button>
      </form>
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
