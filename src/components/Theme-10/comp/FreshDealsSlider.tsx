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
    <div className="w-full bg-white/5 backdrop-blur-xl p-4 md:p-5 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
  
  {/* Background Decorative Glow */}
  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#800000]/20 blur-[60px] rounded-full pointer-events-none" />

  <div className="relative z-10">
    {/* Header Section */}
    <div className="mb-3 text-center md:text-left">
      <h3 className="text-2xl md:text-3xl font-black text-[#FFFDF5] italic uppercase tracking-tighter leading-none pl-8">
        Fresh <span className="text-[#800000]">Deals</span>
      </h3>
      <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
        <span className="h-[1px] w-6 bg-[#800000]/40"></span>
        <p className="text-white/40 font-medium text-[9px] uppercase tracking-[0.2em]">
          Swipe to explore premium stores
        </p>
      </div>
    </div>

    {/* --- MAIN SLIDER AREA --- */}
    <div className="relative flex items-center justify-center group/slider mt-2">
      
      {/* --- Navigation Arrows (Perfectly Centered with Cards) --- */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-6 hover:bg-[#800000] transition-all duration-500 hidden md:flex items-center justify-center shadow-2xl"
      >
        <ArrowLeft size={22} className="stroke-[2.5px]" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-40 p-3.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover/slider:opacity-100 group-hover/slider:-translate-x-6 hover:bg-[#800000] transition-all duration-500 hidden md:flex items-center justify-center shadow-2xl"
      >
        <ArrowRight size={22} className="stroke-[2.5px]" />
      </button>

      {/* --- Slider Track (Strictly 2 Cards Width) --- */}
      <div className="w-full max-w-[580px] md:max-w-[620px] mx-auto overflow-hidden"> 
          <div
            ref={sliderRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4 snap-x snap-mandatory items-center justify-start"
          >
            {React.Children.map(children, (child) => (
              /* snap-start used to keep pairs together, w-[calc(50%-gap)] ensures only 2 fit */
              <div className="flex-shrink-0 snap-start w-[calc(100%-16px)] md:w-[calc(50%-12px)]">
                {child}
              </div>
            ))}
          </div>
      </div>
    </div>

    {/* Mobile View Indicators */}
    <div className="md:hidden flex justify-center gap-8 mt-4">
         <button onClick={() => scroll("left")} className="p-2 text-white/40 active:text-[#800000]"><ArrowLeft size={22}/></button>
         <button onClick={() => scroll("right")} className="p-2 text-white/40 active:text-[#800000]"><ArrowRight size={22}/></button>
    </div>

    {/* View All Button */}
    <div className="flex justify-center mt-5">
      <button className="group relative px-7 py-2 overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all hover:border-[#800000]/50 shadow-lg">
        <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white">
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