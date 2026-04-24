"use client";
import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OfferSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (sliderRef.current) sliderRef.current.style.scrollSnapType = "none";
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = sliderRef.current?.scrollLeft || 0;
  };

  const stopDrag = () => {
    setIsDown(false);
    if (sliderRef.current)
      sliderRef.current.style.scrollSnapType = "x mandatory";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="relative group/slider px-2">
      {/* Desktop Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white transition-all duration-500 shadow-lg hidden xl:flex items-center justify-center active:scale-90 group"
        aria-label="Scroll Left"
      >
        <ArrowLeft
          size={24}
          strokeWidth={3}
          className="transition-transform group-hover:-translate-x-1"
        />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white transition-all duration-500 shadow-lg hidden xl:flex items-center justify-center active:scale-90 group"
        aria-label="Scroll Right"
      >
        <ArrowRight
          size={24}
          strokeWidth={3}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      {/* Main Slider Container */}
      <div
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={onMouseMove}
        className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar select-none py-6 px-1 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {React.Children.map(children, (child) => (
          <div className="flex-none w-[85%] md:w-[45%] lg:w-[calc((100%-72px)/4)] snap-start">
            {child}
          </div>
        ))}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
