"use client";
import { faAngleRight, FontAwesomeIcon } from "@/constants/icons";
import React, { useEffect, useState } from "react";

const ScrollButtonRight = ({ sectionType }: { sectionType: string }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const container = document.querySelector(
        `.horizontal-scroll-${sectionType}`,
      ) as HTMLElement | null;

      if (container) {
        setVisible(container.scrollWidth > container.clientWidth + 5);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [sectionType]);

  if (!visible) return null;

  return (
    <button
      className="bg-[#800000] text-[#fffde0] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_10px_20px_rgba(128,0,0,0.3)] border border-[#fffde0]/10 hover:scale-110 hover:bg-[#1A1A1A] transition-all duration-300 cursor-pointer"
      onClick={() => {
        const container = document.querySelector(
          `.horizontal-scroll-${sectionType}`,
        );
        if (container) {
          const containerWidth = container.getBoundingClientRect().width;
          container.scrollBy({ left: containerWidth, behavior: "smooth" });
        }
      }}
      aria-label="Scroll Right"
    >
      <FontAwesomeIcon
        icon={faAngleRight}
        className="w-4 h-4 md:w-5 md:h-5"
        style={{ color: "currentColor" }}
      />
    </button>
  );
};

export default ScrollButtonRight;
