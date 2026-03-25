"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const MerchantFaqsAccordion = ({ faq, index }: { faq: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div
      className={`group border-2 transition-all duration-500 rounded-[2.5rem] ${
        isOpen
          ? "border-[#800000] bg-[#FFFDF5] shadow-[0_20px_50px_rgba(128,0,0,0.08)]"
          : "border-transparent bg-[#F5F2E8] hover:bg-[#EDE9DB] hover:shadow-md"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-7 text-left"
      >
        <span
          className={`text-xl font-bold transition-colors duration-300 ${isOpen ? "text-gray-900" : "text-gray-600"}`}
        >
          {faq.question}
        </span>
        <div
          className={`p-2 rounded-full transition-all duration-500 shadow-sm ${
            isOpen
              ? "bg-[#800000] text-[#FFFDF5] rotate-180 shadow-[#800000]/20"
              : "bg-[#F5F2E8] text-[#1A1A1A]/40 hover:bg-[#EDE9DB] hover:text-[#1A1A1A]"
          }`}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-7 pb-7 text-gray-500 text-lg leading-relaxed">
          <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default MerchantFaqsAccordion;
