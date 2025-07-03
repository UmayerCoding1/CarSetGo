import React, { useState } from "react";

const ImageSlider = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
      setIsAnimating(false);
    }, 50);
  };
  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setIsAnimating(false);
    }, 100);
  };

  // Animation classes
  const animationClass = isAnimating
    ? direction === 1
      ? "animate-slide-next"
      : "animate-slide-prev"
    : "";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <img
          src={images[current] || "/default-car.png"}
          alt={"car.model"}
          loading="lazy"
          className={`w-60 h-40 object-contain drop-shadow-xl transition-transform duration-75 ${animationClass}`}
          style={{ zIndex: 1 }}
        />
        {/* Circle under car */}
        {/* <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-40 h-6 bg-blue-200 rounded-full blur-[2px] opacity-60 -z-10"></span> */}
      </div>
      {/* Prev/Next Buttons */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={handlePrev}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-300 text-blue-700 shadow transition disabled:opacity-40"
          disabled={isAnimating || images.length <= 1}
          aria-label="Previous image"
        >
          <span className="text-xl">&#60;</span>
        </button>
        <button
          onClick={handleNext}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-300 text-blue-700 shadow transition disabled:opacity-40"
          disabled={isAnimating || images.length <= 1}
          aria-label="Next image"
        >
          <span className="text-xl">&#62;</span>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
