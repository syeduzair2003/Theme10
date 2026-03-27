"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const MerchantFaqsAccordion = ({ faq, index }: { faq: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div
      className={`group border-2 transition-all duration-500 rounded-[2.5rem] ${
        isOpen
          ? "border-[#800000] bg-[#800000]/10 backdrop-blur-xl shadow-[0_0_30px_rgba(128,0,0,0.2)]"
          : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 backdrop-blur-md"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-7 text-left"
      >
        <span
          className={`text-xl font-bold transition-colors duration-300 ${
            isOpen
              ? "text-[#D1C7A7]"
              : "text-gray-400 group-hover:text-[#D1C7A7]"
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`p-2 rounded-full transition-all duration-500 shadow-sm ${
            isOpen
              ? "bg-[#800000] text-[#FFFDF5] rotate-180 shadow-[0_0_15px_rgba(128,0,0,0.4)]"
              : "bg-white/10 text-[#D1C7A7]/60 hover:bg-[#800000]/20 hover:text-[#D1C7A7] border border-white/5"
          }`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-7 pb-8 text-[#D1C7A7]/80 text-lg leading-relaxed antialiased">
          {/* Divider Line: Matte Black ke liye subtle glass line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#800000]/30 to-transparent mb-7"></div>

          {/* Answer Text */}
          <div className="pl-2 border-l border-[#800000]/20">{faq.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default MerchantFaqsAccordion;
