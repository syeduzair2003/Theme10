"use client";
import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FreshDealsSlider({ children }: { children: React.ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (sliderRef.current && sliderRef.current.children.length > 0) {
      const container = sliderRef.current;
      
      // 1. Pehle card ki width aur gap nikalna
      const firstChild = container.children[0] as HTMLElement;
      const cardWidth = firstChild.offsetWidth;
      const gap = window.innerWidth >= 768 ? 32 : 16; // md:gap-8 (32px) else gap-4 (16px)

      // 2. Exact 2 cards ka scroll amount (Desktop par 2, Mobile par 1)
      const cardsToScroll = window.innerWidth >= 768 ? 2 : 1;
      const scrollAmount = (cardWidth + gap) * cardsToScroll;
      
      if (dir === "right" && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      container.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-xl p-4 md:p-10 rounded-[3rem] border border-white/10 shadow-2xl relative group overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#800000]/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Header Section - Clean and Simple */}
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-3xl md:text-4xl font-black text-[#FFFDF5] italic uppercase tracking-tighter">
            Fresh <span className="text-[#800000]">Deals</span>
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
            <span className="h-[1px] w-8 bg-[#800000]/40"></span>
            <p className="text-white/40 font-medium text-[10px] uppercase tracking-[0.3em]">
              Swipe to explore premium stores
            </p>
          </div>
        </div>

        {/* --- Floating Navigation Arrows (Left & Right) --- */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[55%] -translate-y-1/2 z-30 p-4 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 hover:bg-[#800000] transition-all duration-500 hidden md:flex items-center justify-center shadow-xl"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[55%] -translate-y-1/2 z-30 p-4 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 hover:bg-[#800000] transition-all duration-500 hidden md:flex items-center justify-center shadow-xl"
        >
          <ArrowRight size={20} />
        </button>

        {/* Slider Track - Snap classes preserved as requested */}
        <div
          ref={sliderRef}
          className="flex gap-4 md:gap-8 overflow-x-auto scroll-smooth no-scrollbar py-6 px-4 snap-x snap-mandatory justify-start md:justify-center items-center min-h-[300px]"
        >
          {React.Children.map(children, (child) => (
            <div className="flex-shrink-0 snap-start">
              {child}
            </div>
          ))}
        </div>

        {/* Mobile View Indicators (Dots or Small Arrows) */}
        <div className="md:hidden flex justify-center gap-6 mt-6">
             <button onClick={() => scroll("left")} className="p-2 text-white/40 active:text-[#800000]"><ArrowLeft size={20}/></button>
             <button onClick={() => scroll("right")} className="p-2 text-white/40 active:text-[#800000]"><ArrowRight size={20}/></button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <button className="group relative px-10 py-3.5 overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-[#800000]/50 shadow-lg">
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white">
                View All Deals
            </span>
            <div className="absolute inset-0 bg-[#800000] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}