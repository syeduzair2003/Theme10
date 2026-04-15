"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const MerchantFaqsAccordion = ({ faq, index }: { faq: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div
      className={`group border-2 transition-all duration-500 rounded-[2.5rem] overflow-hidden ${
        isOpen
          ? "border-[#800000] bg-[#800000]/5 backdrop-blur-xl shadow-[0_20px_40px_rgba(128,0,0,0.1)]"
          : "border-[#1A1A1A]/5 bg-white/40 hover:bg-white/80 hover:border-[#800000]/20 hover:shadow-lg backdrop-blur-md"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-7 text-left"
      >
        <span
          className={`text-lg font-bold transition-colors duration-500 tracking-tight ${
            isOpen
              ? "text-[#800000]"
              : "text-[#1A1A1A]/50 group-hover:text-[#1A1A1A]"
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`p-2 rounded-full transition-all duration-500 shadow-sm ${
            isOpen
              ? "bg-[#800000] text-white rotate-180 shadow-[0_10px_20px_rgba(128,0,0,0.3)]"
              : "bg-[#1A1A1A]/5 text-[#1A1A1A]/40 group-hover:bg-[#800000]/10 group-hover:text-[#800000] border border-[#1A1A1A]/5"
          }`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-7 pb-8 text-[#1A1A1A]/70 text-lg leading-relaxed antialiased">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#800000]/20 via-[#800000]/40 via-[#800000]/20 to-transparent mb-7"></div>

          <div className="pl-5 border-l-2 border-[#800000]/30 font-medium italic italic-none tracking-tight">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantFaqsAccordion;
