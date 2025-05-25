import React from 'react';

const CarListTavleRow = ({datas,setSelectedCar,selectedCar}) => {
    return (
        <>
        
        {datas.map((car) => (
            <tr
            key={car.id}
                    className={` hover:bg-gray-50 transition font-medium text-gray-500 ${
                      selectedCar?._id === car._id ? "border-l-2 border-blue-500" : "border-b border-gray-200"
                    }`}
                  >
                    <td className="py-2 px-4">
                      <div className='lg:flex items-center gap-2'>
                        <img
                        src={car?.images ? car?.images[0] : car.img}
                        alt={car.name}
                        className="w-20 h-14 object-cover rounded"
                      />
 
                     <div>
                        <p className='text-lg font-medium'>{car.make} {car.model} {car.year}</p>
                     </div>

                      </div>
                    </td>

                    <td className='text-center '>
                        <p>{car?.mileage}</p>
                    </td>
                    <td className='text-center '>
                        <p>{car?.postType}</p>
                    </td>
                    <td className='text-center '>
                        <p>${car?.price}</p>
                    </td>
                    <td className='text-center '>
                        <p>{car?.color}</p>
                    </td>
                    
                    
                    
                    <td className="py-2 px-4 text-center">
                      <button
                        className="px-3 py-1 bg-black text-white rounded hover:bg-gray-700 transition  cursor-pointer"
                        onClick={() => setSelectedCar(car)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                </>
    );
};

export default CarListTavleRow;