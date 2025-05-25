import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCars from "../../../../hooks/useCars";
import useAuth from "../../../../hooks/useAuth";
import { Car, Delete, Edit, Plus, Trash } from "lucide-react";
import Table from "../../../../components/ui/table/Table";
import CarListTavleRow from "../../../../components/seller/CarListTavleRow";
import ImageSlider from "../../../../components/ui/image-slider/ImageSlider";
import CarInformation from "../../../../components/ui/car-details/CarInformation";
import { Link } from "react-router-dom";

// Demo car data
const demoCars = [
  {
    id: 1,
    name: "Audi R8 Green",
    style: "Audi",
    type: "Auto",
    color: "Green",
    price: "$285,892",
    img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/audi-1957037_1280.jpg",
    description:
      "A luxury sports car with a powerful engine and stylish design.",
  },
  {
    id: 2,
    name: "Bentley Flying Spur",
    style: "Bentley",
    type: "Petrol",
    color: "Brown",
    price: "$358,174",
    img: "https://cdn.pixabay.com/photo/2016/12/27/15/57/bentley-1930654_1280.jpg",
    description: "A premium sedan offering comfort and performance.",
  },
  {
    id: 3,
    name: "Lamborghini Aventador",
    style: "Lamborghini",
    type: "Auto",
    color: "Orange",
    price: "$547,174",
    img: "https://cdn.pixabay.com/photo/2017/01/06/19/15/lamborghini-1957036_1280.jpg",
    description: "A supercar with breathtaking speed and design.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const AllCarLists = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [sellerCars, setSellerCars] = useState(null);
  const [selectStatus, setSelectStatus] = useState("");
  const { cars } = useCars("", "", "", "", "", "", "");
  const { user } = useAuth();

  useEffect(() => {
    if (cars && user?._id) {
      const filteredCars = cars.filter((car) => car.seller === user?._id);
      setSellerCars(filteredCars);
    }
  }, [cars, user]);

  // Fallback to demoCars if sellerCars is not available
  const displayCars =
    sellerCars && sellerCars.length > 0 ? sellerCars : demoCars;

  if (!displayCars) {
    return (
      <div className="p-8 text-center">
        <h2>Loading Cars...</h2>
      </div>
    );
  }
  console.log(displayCars);



  const handleEiditCar = async (id) => {
	console.log(id);
  } 

  const handleDeleteCar = async(id)  => {
	console.log(id);
  }

  useEffect(() => {
    if (selectedCar) {
      document.body.style.overflow = "hiddin";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedCar]);




  return (
    <div className="flex gap-8 p-8">
      {/* Section 1: All Cars */}
      <div className="flex-2 w-full">
        <div className="lg:flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold mb-6">All Cars <span className="text-xs text-gray-600 font-medium">( {displayCars.length} Total car in the table )</span></h2>

          <div className="flex items-center gap-4">
            <form>
              <div className="border border-gray-300 p-2 rounded-lg flex items-center lg:w-80">
                <input
                  type="search"
                  className="w-full h-full   outline-none"
                  placeholder="Search a car...."
                />
              </div>
            </form>

            <div>
              <select
                className="border border-gray-300 rounded px-5 font-medium py-2 outline-none focus:ring-2 focus:ring-blue-200"
                defaultValue={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
              >
                <option value="">Status</option>
                <option value="">All</option>
                <option value="approve">Approve</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <Link to={'/seller-dashboard/add-cars'} className="flex items-center  gap-2 bg-black text-white w-24 p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors duration-300">
              <Plus size={15} />
              <span className="font-medium">Create</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-between  mb-4 w-full gap-2 ">
          {/* Table view for cars */}
          <div className="overflow-x-auto flex-1 max-h-[430px] ">
            <Table
              thValue={[
                "Vahical",
                "Mileage",
                "Type",
                "price",
                "Color",
                "Action",
              ]}
            >
              <CarListTavleRow
                datas={displayCars}
                setSelectedCar={setSelectedCar}
                selectedCar={selectedCar}
              />
            </Table>
          </div>

          {selectedCar && (
            <div className="w-full h-screen  bg-black/50 absolute top-0 left-0 z-50 flex items-center justify-center">
              <AnimatePresence>
                <>
                  {/* Overlay for closing on click outside */}
                  <motion.div
                    key="overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className=" bg-black/50 bg-opacity-20 z-10 "
                    onClick={() => setSelectedCar(null)}
                  />
                  <motion.div
                    key="details"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="relative w-[900px]  rounded-xl  border-gray-300 z-20 p-8 flex flex-col items-center"
                  >
                    <button
                      onClick={() => setSelectedCar(null)}
                      className="absolute -top-2 right-4 text-3xl text-gray-400 bg-white w-10 h-10 rounded-full  hover:text-gray-700 cursor-pointer transition-colors duration-200"
                      aria-label="Close"
                    >
                      &times;
                    </button>

                    <div className="bg-white p-4 rounded-lg">
						<div className="flex items-center justify-end gap-2 mb-10 rounded-b-lg">
							<motion.div
							   onClick={() => handleEiditCar(selectedCar._id)}
							   whileTap={{scale: 0.9}}
							   className="flex items-center gap-2 bg-blue-500 p-2 rounded-xl text-white font-medium cursor-pointer">
								<Edit size={15}/>
								<span>Edit</span>
							</motion.div>

							<motion.div 
							  onClick={() => handleDeleteCar(selectedCar._id)}
							  whileTap={{scale: 0.9}} 
							  className="flex items-center gap-2 bg-red-500 p-2 rounded-xl text-white font-medium cursor-pointer">
								<Trash size={15}/>
								<span>Delete</span>
							</motion.div>
						</div>
						<div className=" rounded-xl lg:flex gap-5">
                      <div className="lg:w-1/2 h-full">
                        <ImageSlider images={selectedCar.images} />
                      </div>

                      <div>
						<CarInformation car={selectedCar}/>
					  </div>
                    </div>
					</div>
                  </motion.div>
                </>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Car Details (hidden until a car is clicked) */}
    </div>
  );
};

export default AllCarLists;
