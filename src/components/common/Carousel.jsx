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
