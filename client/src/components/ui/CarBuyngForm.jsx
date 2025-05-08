import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Calculator } from "lucide-react";

const CarBuyngForm = ({ carId, userId, sellerId, price }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    carId: carId,
    userId: userId,
    sellerId: sellerId,
  });

  const [showEmiModal, setShowEmiModal] = useState(false);
  const [emiData, setEmiData] = useState({
    downPayment: "",
    loanTerm: "36",
    interestRate: "8.5",
  });
  const [emiResult, setEmiResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEmiChange = (e) => {
    const { name, value } = e.target;
    setEmiData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateEMI = () => {
    const principal = price - parseFloat(emiData.downPayment);
    const monthlyRate = parseFloat(emiData.interestRate) / 100 / 12;
    const numberOfPayments = parseInt(emiData.loanTerm);

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    console.log(numberOfPayments);

    const totalAmount = emi * numberOfPayments;
    const totalInterest = totalAmount - principal;

    setEmiResult({
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal.toFixed(2),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-8 border border-gray-300 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Buy the car</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => {
              setShowEmiModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-black text-white rounded-md  transition-colors cursor-pointer"
          >
            <Calculator size={20} />
            Calculate EMI
          </motion.button>
        </div>

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

          <div className="w-full">
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="address.zip"
                  value={formData.address.zip}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="ZIP Code"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Country"
                  required
                />
              </div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="bg-black w-full text-white px-6 py-2 rounded-md transition-colors cursor-pointer"
          >
            Submit
          </motion.button>
        </form>
      </div>

      {/* EMI Calculator Modal */}
      {showEmiModal && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">EMI Calculator</h3>
              <button
                onClick={() => {
                  setShowEmiModal(false);
                  document.body.style.overflow = "auto";
                }}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Car Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    value={price.toLocaleString()}
                    disabled
                    className="w-full pl-8 pr-4 py-2 border rounded-md bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Down Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="downPayment"
                    value={emiData.downPayment}
                    onChange={handleEmiChange}
                    className="w-full pl-8 pr-4 py-2 border rounded-md outline-none"
                    placeholder="Enter down payment"
                    min="0"
                    max={price}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Loan Term (months)
                </label>
                <select
                  name="loanTerm"
                  value={emiData.loanTerm}
                  onChange={handleEmiChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="interestRate"
                    value={emiData.interestRate}
                    onChange={handleEmiChange}
                    className="w-full pl-8 pr-4 py-2 border rounded-md outline-none"
                    placeholder="Enter interest rate"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>

              <button
                onClick={calculateEMI}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Calculate EMI
              </button>

              {emiResult && (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal Amount</span>
                    <span className="font-medium">${emiResult.principal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly EMI</span>
                    <span className="font-medium">${emiResult.emi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-medium">
                      ${emiResult.totalInterest}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-bold">Total Amount</span>
                    <span className="font-bold">${emiResult.totalAmount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarBuyngForm;
