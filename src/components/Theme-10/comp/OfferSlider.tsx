"use client";
import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OfferSlider({ children }: { children: React.ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };

  const stopDrag = () => setIsDown(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };
  

  return (
    <div className="relative group/slider px-2">
      
      {/* LEFT FLOATING ARROW - Always Visible Now */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-[#151b28] border border-white/10 text-[#2ECC71] hover:bg-[#2ECC71] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(46,204,113,0.15)] hidden md:flex items-center justify-center active:scale-90"
        aria-label="Scroll Left"
      >
        <ArrowLeft size={24} strokeWidth={3} />
      </button>

      {/* RIGHT FLOATING ARROW - Always Visible Now */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-[#151b28] border border-white/10 text-[#2ECC71] hover:bg-[#2ECC71] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(46,204,113,0.15)] hidden md:flex items-center justify-center active:scale-90"
        aria-label="Scroll Right"
      >
        <ArrowRight size={24} strokeWidth={3} />
      </button>

      {/* SCROLLABLE TRACK */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar select-none py-4 px-1"
        style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
        }}
      >
        {children}
      </div>

      {/* Global CSS for hiding scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
