import { images } from "@/data/carouselData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nav = useNavigate();

  setTimeout(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, 5000);

  return (
    <div className="relative w-full mx-auto">
      <div className="w-full h-4/5 bg-gray-300 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-5 text-white p-4 rounded-md">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-700">
            Welcome to VA Shop
          </h1>
          <p className="text-lg text-center text-gray-800 font-bold">
            Discover amazing products and deals
          </p>
        </div>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-fill"
          onClick={() => nav("/shop")}
        />
      </div>
    </div>
  );
};

export default Carousel;
