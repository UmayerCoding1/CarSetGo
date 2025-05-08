import React from 'react';
import CarCard from './CarCard';
import {Link} from 'react-router-dom';
import useCars from '../../hooks/useCars';
const OurVehicle = () => {
    const {cars,isLoadingCars,isRefetchingCars} = useCars(1,6,'','','','');
    return (
        <div className='flex flex-col items-center justify-center my-14 relative'>
                <div>
                    <h1 className='text-center text-3xl font-medium'>Our Vehicle Fleet</h1>
                    <p className='text-center text-gray-600'>Driving your dreams to reality with an exquisite fleet of versatile vehicles for unforgettable journeys.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-10 lg:p-10 '>
                    {cars?.map((car,inx) => (
                        <CarCard key={inx} car={car}/>
                    ))}
                </div>

                <div className='absolute top-24 md:top-[60px] lg:top-28 right-3  lg:right-24'>
                    <Link to={'/future-cars'} className='text-blue-500 font-semibold'>View More</Link>
                </div>
        </div>
    );
};

export default OurVehicle;