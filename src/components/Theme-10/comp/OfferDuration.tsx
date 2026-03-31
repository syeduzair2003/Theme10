import { calculateOfferDuration } from "@/constants/hooks";
import React from "react";
import { CalendarDays, Clock } from "lucide-react";

interface Props {
  endDate: string | null;
  className?: string;
}

const OfferDuration = ({ endDate, className }: Props) => {
  const durationText = calculateOfferDuration(endDate);
  const isPermanent = endDate === null || endDate === undefined;

  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <span
        // Style attribute ko Maroon aur Cream ke hisaab se update kiya gaya hai
        style={{ color: isPermanent ? "#FFFDF5" : "#FFFDF5" }}
        className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
            transition-all duration-300 border
            ${
              isPermanent
                ? "bg-[#800000] border-[#800000]/20 !text-[#FFFDF5] shadow-[0_0_15px_rgba(128,0,0,0.3)]"
                : "bg-black/40 border-[#800000]/30 !text-[#FFFDF5]/80 animate-pulse backdrop-blur-md"
            }
        `}
      >
        {isPermanent ? (
          <CalendarDays size={14} className="opacity-90 !text-[#FFFDF5]" />
        ) : (
          <Clock size={14} className="!text-[#800000]" />
        )}

        {/* Cream aur Maroon ka touch diya hai */}
        <span
          className={`whitespace-nowrap ${isPermanent ? "!text-[#FFFDF5]" : "!text-[#FFFDF5]/90"}`}
        >
          {durationText}
        </span>
      </span>
    </div>
  );
};

export default OfferDuration;
