import React, { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

const CarBookingForm = ({ carId, userId, sellerId, price }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingStartDate: "",
    pickupLocation: "",
    numberOfPassengers: "",
    durationType: "hour", 
    duration: "1", 
    carId: carId,
    userId: userId,
    sellerId: sellerId,
  });

  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateEndDate = (startDate, duration, type) => {
    if (!startDate) return "";
    const date = new Date(startDate);
    switch (type) {
      case "hour":
        date.setHours(date.getHours() + parseInt(duration));
        break;
      case "day":
        date.setDate(date.getDate() + parseInt(duration));
        break;
      case "week":
        date.setDate(date.getDate() + parseInt(duration) * 7);
        break;
      default:
        return "";
    }
    return date.toISOString().slice(0, 16);
  };

  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      // Update end date based on new duration
      if (prev.bookingStartDate) {
        newData.bookingEndDate = calculateEndDate(
          prev.bookingStartDate,
          name === "duration" ? value : prev.duration,
          name === "durationType" ? value : prev.durationType
        );
      }
      return newData;
    });
  };

  const handleStartDateChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      bookingStartDate: value,
      bookingEndDate: calculateEndDate(value, prev.duration, prev.durationType),
    }));
  };

  const calculateTotalPrice = () => {
    const hourlyRate = price / 720; // Assuming price is monthly rate
    let total = 0;

    switch (formData.durationType) {
      case "hour":
        total = hourlyRate * parseInt(formData.duration);
        break;
      case "day":
        total = (hourlyRate * 24) * parseInt(formData.duration);
        break;
      case "week":
        total = (hourlyRate * 24 * 7) * parseInt(formData.duration);
        break;
      default:
        total = 0;
    }

    return total.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedPrice = calculateTotalPrice();
    setTotalPrice(calculatedPrice);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleConfirmBooking = () => {
    console.log("Booking Confirmed:", { ...formData, totalPrice });
    setShowModal(false);
    document.body.style.overflow = 'auto';
    // Here you can add your API call to confirm the booking
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-8 border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Book the Car</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Your phone number"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleDurationChange}
                className="w-full p-2 border rounded-md"
                min="1"
                max={
                  formData.durationType === "hour"
                    ? "24"
                    : formData.durationType === "day"
                    ? "30"
                    : "4"
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Duration Type
              </label>
              <select
                name="durationType"
                value={formData.durationType}
                onChange={handleDurationChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="hour">Hours</option>
                <option value="day">Days</option>
                <option value="week">Weeks</option>
              </select>
            </div>
          </div>

          <div className="">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                name="bookingStartDate"
                value={formData.bookingStartDate}
                onChange={handleStartDateChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Passengers
              </label>
              <input
                type="number"
                name="numberOfPassengers"
                value={formData.numberOfPassengers}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Number of passengers"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Pickup location"
                required
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="bg-black w-full text-white px-6 py-2 rounded-md transition-colors cursor-pointer"
          >
            Book Now
          </motion.button>
        </form>
      </div>

      {/* Booking Summary Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Booking Summary</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Booking Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-medium">{formData.duration} {formData.durationType}s</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{new Date(formData.bookingStartDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Passengers</p>
                    <p className="font-medium">{formData.numberOfPassengers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pickup Location</p>
                    <p className="font-medium">{formData.pickupLocation}</p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Price Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Rate</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>${(parseFloat(totalPrice) + parseFloat(totalPrice) * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarBookingForm;
