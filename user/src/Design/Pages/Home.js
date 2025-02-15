import React from "react";
import NavBar from "../Layouts/NavBar";
import HeroSection from "../Layouts/HeroSection";
import CatogeryScroll from "../Components/CatogeryScroll";
import Products from "../Components/Products";

export default function Home() {
  return (
    <div>
      <NavBar />
      <CatogeryScroll />
      <HeroSection />
      <Products />
    </div>
  );
}
