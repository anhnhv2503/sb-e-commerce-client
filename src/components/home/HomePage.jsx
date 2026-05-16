import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDocumentTitle } from "@uidotdev/usehooks";

import HeroSection from "@/components/home/HeroSection";
import CategoryStrip from "@/components/home/CategoryStrip";
import FeatureStats from "@/components/home/FeatureStats";
import NewArrivals from "@/components/products/NewArrivals";

/**
 * HomePage
 * Orchestrates the redesigned homepage sections in order:
 *  1. HeroSection     — full-viewport cinematic hero with slide carousel
 *  2. CategoryStrip   — quick-access category pills
 *  3. NewArrivals     — fetched products from API
 *  4. FeatureStats    — animated counter bar
 *
 * AOS is initialised here so all child components can use data-aos-* attributes.
 * SKILL.md: accessibility-first, no redundant decorative motion.
 */
const HomePage = () => {
  useDocumentTitle("VA SHOP — Thời Trang Cao Cấp");

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  return (
    <main id="main-content" tabIndex={-1} aria-label="Homepage">
      {/* 1 ── Hero */}
      <HeroSection />

      {/* 2 ── Category navigation strip */}
      <CategoryStrip />

      {/* 3 ── New arrivals product grid */}
      <NewArrivals />

      {/* 4 ── Trust / stats bar */}
      <FeatureStats />
    </main>
  );
};

export default HomePage;
