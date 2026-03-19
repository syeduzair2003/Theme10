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
    <div className="relative">
      {/* ARROWS */}
      <div className="absolute -top-16 right-0 flex gap-2 z-10">
        {/* <button
          onClick={() => scroll("left")}
          className="p-3 rounded-xl bg-[#151b28] border border-white/10 
          text-white hover:bg-blue-600 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-3 rounded-xl bg-[#151b28] border border-white/10 
          text-white hover:bg-blue-600 transition"
        >
          <ArrowRight size={18} />
        </button> */}
      </div>

      {/* TRACK */}
      <div
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseMove={onMouseMove}
        className="flex gap-6 overflow-x-scroll no-scrollbar 
        cursor-grab active:cursor-grabbing py-6"
      >
        {children}
      </div>
    </div>
  );
}
