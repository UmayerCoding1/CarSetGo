import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { asset } from '../../../assets/asser';
import CarTypeCard from './CarTypeCard';
import './carTypes.css'
const carCategoriesTypes = [
    {
        title: 'Suv',
        image: asset.suvcar
    },
    {
        title: 'Crossover',
        image: asset.crossovercar
    },
    {
        title: 'MPV',
        image: asset.mpvcar
    },
    {
        title: 'Pickup Truck',
        image: asset.PickupTruck
    },
    {
        title: 'Suv',
        image: asset.suvcar
    },
    {
        title: 'Crossover',
        image: asset.crossovercar
    },
    {
        title: 'MPV',
        image: asset.mpvcar
    },
    {
        title: 'Pickup Truck',
        image: asset.PickupTruck
    }
];


const CarCategories = () => {
    const sliderRef = useRef(null);
  const scrollLeft = () => {
    if (sliderRef.current) {
        sliderRef.current.scrollLeft -= 500   
     }
  }
  const scrollRight = () => {
    if (sliderRef.current) {
        sliderRef.current.scrollLeft += 500   
     }
  }
    return (
        <div className='p-5 my-10'>
        <div>
           <div className='flex items-center justify-between '>
              <h1 className='text-2xl font-medium'>Browse by type</h1>

              <div className='flex items-center gap-2 '>
                <ChevronLeft  onClick={scrollLeft} size={30}  className='border border-gray-400 rounded-full p-2 cursor-pointer'/>
                <ChevronRight onClick={scrollRight}  size={30} className='border border-gray-400 rounded-full p-2 cursor-pointer'/>
              </div>
           </div>

           <div className='slider ' ref={sliderRef}>
              {carCategoriesTypes.map((type,inx) => (
                <CarTypeCard key={inx} type={type}/>
              ))}
           </div>
        </div>
     </div>
    );
};

export default CarCategories;