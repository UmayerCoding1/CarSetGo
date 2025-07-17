import React from "react";

const CarDetailsSkeleton = () => {
  return (
    <div className="w-full">
      <div className="animate-pulse space-y-4 p-4 border rounded-md shadow w-full">
        <div className="flex gap-4 w-full">
          {/* Left Side Skeleton */}
          <div className="w-1/2">
            <div className="h-[350px] bg-gray-300 rounded w-full"></div>

            <div className="flex gap-2 items-center my-3 flex-wrap">
              <div className="h-32 bg-gray-300 rounded w-40"></div>
              <div className="h-32 bg-gray-300 rounded w-40"></div>
              <div className="h-32 bg-gray-300 rounded w-40"></div>
              <div className="h-32 bg-gray-300 rounded w-40"></div>
            </div>
          </div>

          {/* Right Side Skeleton */}
          <div className="w-1/2 space-y-4 p-20">
            <div className="flex gap-2 items-center my-3 justify-between">
              <div className="h-6 bg-gray-300 rounded w-40"></div>
              <div className="h-6 bg-gray-300 rounded w-40"></div>
            </div>
            <div className="flex gap-2 items-center my-3 justify-between mt-10">
              <div className="h-10 bg-gray-300 rounded w-60"></div>
              <div className="h-10 bg-gray-300 rounded w-60"></div>
            </div>
            <div className="flex gap-2 items-center my-3 justify-between mt-10">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>

            <div className="flex gap-2 items-center my-3 justify-between mt-10">
              <div className="h-10 bg-gray-300 rounded w-60"></div>
              <div className="h-10 bg-gray-300 rounded w-60"></div>
            </div>
            <div className="flex gap-2 items-center my-3 justify-between mt-10">
              <div className="h-10 bg-gray-300 rounded w-60"></div>
              <div className="h-10 bg-gray-300 rounded w-60"></div>
            </div>

            <div className="flex gap-2 items-center my-3 justify-between mt-10">
           <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="flex gap-2 items-center my-3 justify-between mt-10">
           <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsSkeleton;
