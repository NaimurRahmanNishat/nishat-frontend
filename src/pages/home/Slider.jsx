import { useEffect, useRef, useState } from "react";
import mobileImage from "../../assets/mobile.jpg";
import laptopImage from "../../assets/laptop.jpg";
import furnitureImage from "../../assets/furniture.jpg";
import { AnimatePresence, motion } from "framer-motion";

const sliders = [
  {
    id: 1,
    name: "I Phone",
    description: "New model I Phone here.",
    price: 1299.99,
    oldPrice: 1199.99,
    image: mobileImage,
  },
  {
    id: 2,
    name: "Asus",
    description: "Stylish Asus ROG Strix with ample storage space.",
    price: 1299.99,
    oldPrice: 1199.99,
    image: laptopImage,
  },
  {
    id: 3,
    name: "Furniture",
    description: "Stylish leather handbag with ample storage space.",
    price: 1299.99,
    oldPrice: 1199.99,
    image: furnitureImage,
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [ispaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-slide effect
  useEffect(() => {
    if (!ispaused) {
      timerRef.current = setTimeout(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [current, ispaused]);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative h-[calc(100vh-80px)] md:-top-9 -top-8 overflow-hidden"
    >
      {/* SLIDES CONTAINER */}
      <div className="w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={sliders[current].id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute"
          >
            <div className="w-screen h-full flex flex-col xl:flex-row">
              {/* IMAGE CONTAINER */}
              <div className="w-full h-full flex items-center justify-center relative">
                <img
                  src={sliders[current].image}
                  alt={sliders[current].name}
                  className="w-[1920px] h-[800px] object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                  <h1 className="text-7xl font-bold text-pink-700">
                    {sliders[current].name}
                  </h1>
                  <p className="text-5xl text-red-800">
                    {sliders[current].description}
                  </p>
                  <h1 className="text-5xl font-bold">
                    ${sliders[current].price} old price
                  </h1>
                  <p className="font-bold text-6xl text-pink-600">
                    ${sliders[current].oldPrice} new price
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CIRCLE INDICATORS */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2">
        {sliders.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              current === index ? "bg-pink-600 scale-150" : "bg-gray-600"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {/* NAVIGATION BUTTONS */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-400 text-pink-600 p-3 rounded-full cursor-pointer"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-400 text-pink-600 p-3 rounded-full cursor-pointer"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
