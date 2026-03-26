"use client"; // Ye line zaroori hai browser features ke liye
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FreshDealsSlider({ children }: { children: React.ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      // Desktop par 2 cards hain isliye width/2, mobile pe full width
      const cardWidth = window.innerWidth < 768 ? container.clientWidth : container.clientWidth / 2;

      container.scrollBy({
        left: dir === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full lg:w-8/12 bg-[#F5F2E8]/10 p-8 md:p-12 rounded-[3rem] border border-[#E0DBCF] shadow-2xl relative group">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-3xl font-black text-gray-900 italic uppercase">Fresh Deals</h3>
          <p className="text-gray-500 font-medium">Swipe to explore premium stores</p>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll("left")} 
            className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => scroll("right")} 
            className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-all active:scale-95"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Slider Track */}
      <div 
        ref={sliderRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth no-scrollbar py-2"
      >
        {children}
      </div>

      <button className="w-full mt-8 py-4 border-2 border-black text-black rounded-2xl font-black uppercase hover:bg-black hover:text-white transition-all">
        View All Stores
      </button>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}