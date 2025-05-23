import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import  useCars  from "../../../../hooks/useCars";
import useAuth from "../../../../hooks/useAuth";
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
    const {cars} = useCars('','','','','','',''); 
    const {user} = useAuth();
    
    // const sellerCars = cars?.filter((car) => car.seller ===  user?._id);


    
    useEffect(() => {
         if(cars && user?._id){
            const filteredCars = cars.filter((car) => car.seller === user?._id);
            setSellerCars(filteredCars);
         }
    }, [cars]);

    console.log(sellerCars);
    
    
	return (
		<div style={{ display: "flex", gap: "32px", padding: "32px" }}>
			{/* Section 1: All Cars */}
			<div style={{ flex: 2 }}>
				<h2
					style={{
						fontSize: "2rem",
						fontWeight: "bold",
						marginBottom: 24,
					}}
				>
					All Cars
				</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns:
							"repeat(auto-fill, minmax(220px, 1fr))",
						gap: 24,
					}}
				>
					{demoCars.map((car) => (
						<div
							key={car.id}
							style={{
								background: "#fff",
								borderRadius: 12,
								boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
								padding: 16,
								cursor: "pointer",
								transition: "box-shadow 0.2s",
								border:
									selectedCar?.id === car.id
										? "2px solid #2563eb"
										: "1px solid #e5e7eb",
							}}
							onClick={() => setSelectedCar(car)}
						>
							<img
								src={car.img}
								alt={car.name}
								style={{
									width: "100%",
									height: 120,
									objectFit: "cover",
									borderRadius: 8,
									marginBottom: 12,
								}}
							/>
							<h3
								style={{
									fontSize: "1.1rem",
									fontWeight: 600,
								}}
							>
								{car.name}
							</h3>
							<div
								style={{
									fontSize: "0.95rem",
									color: "#6b7280",
									margin: "8px 0",
								}}
							>
								<span>Style: {car.style}</span> |{" "}
								<span>Type: {car.type}</span> |{" "}
								<span>Color: {car.color}</span>
							</div>
							<div
								style={{
									fontWeight: "bold",
									color: "#2563eb",
								}}
							>
								{car.price}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Section 2: Car Details (hidden until a car is clicked) */}
			<AnimatePresence>
				{selectedCar && (
					<>
						{/* Overlay for closing on click outside */}
						<motion.div
							key="overlay"
							variants={overlayVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							style={{
								position: "fixed",
								top: 0,
								left: 0,
								width: "100vw",
								height: "100vh",
								background: "rgba(0,0,0,0.2)",
								zIndex: 10,
							}}
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
							style={{
								position: "fixed",
								right: 40,
								top: 60,
								width: 350,
								background: "#fff",
								borderRadius: 16,
								boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
								zIndex: 20,
								padding: 32,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<button
								onClick={() => setSelectedCar(null)}
								style={{
									position: "absolute",
									top: 12,
									right: 16,
									background: "none",
									border: "none",
									fontSize: 22,
									cursor: "pointer",
									color: "#888",
								}}
								aria-label="Close"
							>
								&times;
							</button>
							<img
								src={selectedCar.img}
								alt={selectedCar.name}
								style={{
									width: "90%",
									borderRadius: 12,
									marginBottom: 16,
								}}
							/>
							<h2
								style={{
									fontSize: "1.5rem",
									fontWeight: 700,
								}}
							>
								{selectedCar.name}
							</h2>
							<div
								style={{
									color: "#2563eb",
									fontWeight: 600,
									fontSize: "1.2rem",
									margin: "8px 0",
								}}
							>
								{selectedCar.price}
							</div>
							<div style={{ marginBottom: 8 }}>
								<span style={{ marginRight: 8 }}>
									Style: {selectedCar.style}
								</span>
								<span style={{ marginRight: 8 }}>
									Type: {selectedCar.type}
								</span>
								<span>Color: {selectedCar.color}</span>
							</div>
							<p
								style={{
									color: "#444",
									textAlign: "center",
								}}
							>
								{selectedCar.description}
							</p>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AllCarLists;