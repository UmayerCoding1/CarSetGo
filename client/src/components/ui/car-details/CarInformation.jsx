import {
  Calendar,
  Car,
  DollarSign,
  Fuel,
  Gauge,
  Palette,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import React, { useState } from "react";

const CarInformation = ({ car }) => {
  const [showFull, setShowFull] = useState(false);
  const maxLength = 150;

  const toggleShow = () => setShowFull(!showFull);
  const isLong = car.description.length > maxLength;
  const displayedText = showFull
    ? car.description
    : car.description.slice(0, maxLength) + (isLong ? "..." : "");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Car Information</h2>

      {/* Basic Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoItem icon={<Car size={15} />} label="Make & Model" value={`${car.make} ${car.model}`} />
          <InfoItem icon={<Calendar size={15} />} label="Year" value={car.year} />
          <InfoItem icon={<Tag size={15} />} label="Category" value={car.category} />
          <InfoItem icon={<DollarSign size={15} />} label="Price" value={`$${car.price.toLocaleString()}`} />
        </div>
      </div>

      {/* Specifications */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoItem icon={<Settings size={15} />} label="Transmission" value={car.transmission} />
          <InfoItem icon={<Fuel size={15} />} label="Fuel Type" value={car.fuelType} />
          <InfoItem icon={<Gauge size={15} />} label="Mileage" value={`${car.mileage.toLocaleString()} km`} />
          <InfoItem icon={<Users size={15} />} label="Seats" value={`${car.seats} seats`} />
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem icon={<Car size={15} />} label="Body Type" value={car.bodyType} />
          <InfoItem icon={<Palette size={15} />} label="Color" value={car.color} />
        </div>
      </div>

      {/* Description with Read More */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-gray-600">
          {displayedText}
          {isLong && (
            <button
              onClick={toggleShow}
              className="ml-2 text-blue-600 underline hover:text-blue-800 transition"
            >
              {showFull ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

// Reusable item component
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-black">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium capitalize">{value}</p>
    </div>
  </div>
);

export default CarInformation;
