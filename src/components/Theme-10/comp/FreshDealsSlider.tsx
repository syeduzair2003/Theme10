"use client"; // Ye line zaroori hai browser features ke liye
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FreshDealsSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      // Desktop par 2 cards hain isliye width/2, mobile pe full width
      const cardWidth =
        window.innerWidth < 768
          ? container.clientWidth
          : container.clientWidth / 2;

      container.scrollBy({
        left: dir === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full lg:w-8/12 bg-[#F5F2E8]/10 p-6 md:p-10 rounded-[3rem] border border-[#E0DBCF] shadow-2xl relative group">
      <div className="relative group max-w-7xl mx-auto px-4 md:px-12">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-4xl font-black text-[#FFFDF5] italic uppercase tracking-[-0.05em] drop-shadow-[0_0_15px_rgba(255,253,245,0.1)]">
            Fresh{" "}
            <span className="text-[#A50000] drop-shadow-[0_0_15px_rgba(165,0,0,0.4)]">
              Deals
            </span>
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
            <span className="h-[1px] w-8 bg-[#A50000]/40"></span>
            <p className="text-white/40 font-medium text-xs uppercase tracking-[0.3em]">
              Swipe to explore premium stores
            </p>
          </div>
        </div>

        {/* Navigation Arrows - Floating on sides */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[50%] -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 backdrop-blur-xl text-white shadow-[0_0_20px_rgba(0,0,0,0.4)] opacity-0 group-hover:opacity-100 group-hover:translate-x-4 hover:bg-[#800000] hover:text-[#FFFDF5] hover:shadow-[0_0_25px_rgba(128,0,0,0.5)] border border-white/10 transition-all duration-500 active:scale-90"
        >
          <ArrowLeft
            size={24}
            className="transition-transform group-active:-translate-x-1"
          />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[50%] -translate-y-1/2 z-20 p-4 rounded-full bg-white/5 backdrop-blur-xl text-white shadow-[0_0_20px_rgba(0,0,0,0.4)] opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 hover:bg-[#800000] hover:text-[#FFFDF5] hover:shadow-[0_0_25px_rgba(128,0,0,0.5)] border border-white/10 transition-all duration-500 active:scale-90"
        >
          <ArrowRight
            size={24}
            className="transition-transform group-active:translate-x-1"
          />
        </button>

        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4 px-2"
        >
          {/* Note: Aapke Card component (children) ke andar ye classes honi chaiye:
      "min-w-[260px] w-[260px] h-full flex-shrink-0" 
      Isse wo bilkul vertical portrait shape mein aayenge.
    */}
          {children}
        </div>

        {/* View All Stores Button - Centered and Smaller */}
        <div className="flex justify-center mt-10 pb-3">
          <button className="px-12 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white/60 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#800000] hover:text-[#FFFDF5] hover:border-[#800000] hover:shadow-[0_0_30px_rgba(128,0,0,0.4)] transition-all duration-500 active:scale-95 group flex items-center gap-3">
            <span>View All Deals</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#800000] group-hover:bg-white animate-pulse" />
          </button>
        </div>
      </div>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
