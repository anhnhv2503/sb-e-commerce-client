import { useDocumentTitle } from "@uidotdev/usehooks";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import HeroSection from "@/components/home/HeroSection";
import NewArrivals from "@/components/products/NewArrivals";
import VietnamReunionHero from "@/components/common/VietnamHero";

const HomePage = () => {
  useDocumentTitle("VA SHOP — Thời Trang Cao Cấp");

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  return (
    <main id="main-content" tabIndex={-1} aria-label="Homepage">
      <VietnamReunionHero />
      {/* 1 ── Hero */}
      <HeroSection />

      {/* 3 ── New arrivals product grid */}
      <NewArrivals />
    </main>
  );
};

export default HomePage;
