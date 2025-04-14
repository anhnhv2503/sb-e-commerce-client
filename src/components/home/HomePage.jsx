import { useDocumentTitle } from "@uidotdev/usehooks";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VietnamReunionHero from "@/components/common/VietnamHero";
import Carousel from "@/components/common/Carousel";
import NewArrivals from "@/components/products/NewArrivals";

const HomePage = () => {
  useDocumentTitle("VA SHOP");

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div data-aos="fade-down" data-aos-duration="1000">
        <VietnamReunionHero />
      </div>
      <div data-aos="fade-down" data-aos-duration="1000">
        <Carousel />
      </div>

      <div data-aos="fade-up" data-aos-duration="1000">
        <NewArrivals />
      </div>
    </div>
  );
};

export default HomePage;
