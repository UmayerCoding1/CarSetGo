import { Calendar, Car, DollarSign, Fuel, Gauge, Palette, Settings, Tag, Users } from "lucide-react";
import React from "react";

const CarInformation = ({car}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Car Information</h2>

      {/* Basic Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Car className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Make & Model</p>
              <p className="font-medium">
                {car.make} {car.model}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-medium">{car.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tag className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium capitalize">{car.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">${car.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Settings className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Transmission</p>
              <p className="font-medium capitalize">{car.transmission}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Fuel className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Fuel Type</p>
              <p className="font-medium capitalize">{car.fuelType}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Gauge className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Mileage</p>
              <p className="font-medium">{car.mileage.toLocaleString()} km</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Seats</p>
              <p className="font-medium">{car.seats} seats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Car className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Body Type</p>
              <p className="font-medium capitalize">{car.bodyType}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Palette className="text-black" size={15} />
            <div>
              <p className="text-sm text-gray-500">Color</p>
              <p className="font-medium capitalize">{car.color}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-gray-600">{car.description} </p>
      </div>
    </div>
  );
};

export default CarInformation;
