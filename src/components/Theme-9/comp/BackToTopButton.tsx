"use client";

import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 group transition-all duration-700 ease-in-out ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-50 translate-y-20 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <div className="absolute inset-[-4px] rounded-full bg-gradient-to-t from-[#800000] to-transparent opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500" />

      {/* Main Button Body */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#800000] border border-white/10 shadow-[0_20px_40px_rgba(128,0,0,0.4)] transition-all duration-500 group-hover:bg-[#1A1A1A] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] group-hover:-translate-y-3">
        <div className="absolute inset-[3px] rounded-full border border-white/5 pointer-events-none" />

        <div className="relative overflow-hidden h-6 w-6">
          <div className="flex flex-col transition-transform duration-500 ease-in-out group-hover:-translate-y-6">
            <svg
              className="w-6 h-6 text-[#FDFBE7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <svg
              className="w-6 h-6 text-[#FDFBE7] mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-1 w-1/2 h-[2px] bg-white/20 blur-[1px] rounded-full opacity-50 group-hover:opacity-0 transition-opacity" />
      </div>

      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-[#FDFBE7] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap border border-white/10">
        Go Up
      </span>
    </button>
  );
};

export default BackToTopButton;
