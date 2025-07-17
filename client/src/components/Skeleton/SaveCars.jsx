import React from 'react';

const SaveCarsSkeleton = () => {
    return (
        <div>
            <div className="flex justify-evenly gap-4 animate-pulse">
      <div className="h-60 bg-gray-300 rounded w-80"></div>

      <div className="flex flex-col gap-4">
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="h-6 bg-gray-300 rounded w-44"></div>
        <div className="h-6 bg-gray-300 rounded w-44"></div>
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="h-6 bg-gray-300 rounded w-32"></div>
      </div>
        </div>
        </div>
    );
};

export default SaveCarsSkeleton;