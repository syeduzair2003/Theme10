"use client";
import React, { useState } from "react";

const FAQList = ({ faqs }: { faqs: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Show only 4 items initially for a balanced 2-column layout
  const INITIAL_LIMIT = 4;
  const displayedFaqs = showAll ? faqs : faqs.slice(0, INITIAL_LIMIT);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {displayedFaqs.map((faq: any, index: number) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.id || index}
              className={`group relative bg-white rounded-2xl transition-all duration-300 ${isOpen
                  ? 'shadow-xl shadow-indigo-100 ring-1 ring-indigo-500'
                  : 'shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100'
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 h-full flex flex-col"
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className={`text-lg font-bold transition-colors duration-200 flex-1 ${isOpen ? 'text-indigo-600' : 'text-slate-800 group-hover:text-indigo-600'
                    }`}>
                    {faq.question}
                  </h3>

                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-600 text-white rotate-45' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                    }`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>

                <div
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {faqs.length > INITIAL_LIMIT && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5"
          >
            <span>{showAll ? 'Show Less' : `View All ${faqs.length} Questions`}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default FAQList;