"use client";
import React, { useState } from "react";
import MerchantFaqsAccordion from "./MerchantFaqsAccordion";

const FaqListClient = ({ faqs }: { faqs: any[] }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6);
  
  const midPoint = Math.ceil(visibleFaqs.length / 2);
  const leftColumn = visibleFaqs.slice(0, midPoint);
  const rightColumn = visibleFaqs.slice(midPoint);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 items-start">
        {/* Column 1 */}
        <div className="space-y-4">
          {leftColumn.map((faq: any, idx: number) => (
            <MerchantFaqsAccordion key={`left-${idx}`} faq={faq} index={idx} />
          ))}
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          {rightColumn.map((faq: any, idx: number) => (
            <MerchantFaqsAccordion key={`right-${idx}`} faq={faq} index={idx + midPoint} />
          ))}
        </div>
      </div>

      {/* Button Section */}
      {faqs.length > 6 && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-80 py-5 bg-transparent border-2 border-[#800000]/30 text-[#800000] rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[#800000] hover:text-white hover:border-transparent hover:shadow-[0_20px_40px_rgba(128,0,0,0.25)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group"
          >
            {showAll ? "Show Less Questions" : "Show More Questions"}
          </button>
        </div>
      )}
    </>
  );
};

export default FaqListClient;