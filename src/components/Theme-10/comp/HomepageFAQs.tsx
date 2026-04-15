import React from "react";
import MerchantFaqsAccordion from "./MerchantFaqsAccordion";
import StoreCardHorizontal from "./StoreCardHorizontal";
import { apiHomePageFaqs, apiRecentlyUpdatedStores } from "@/apis/user";
import cookieService from "@/services/CookiesService";

interface Props {
  slug_type: string;
  store_slug: string;
}

const HomepageFAQs = async ({ store_slug, slug_type }: Props) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;
  const faqs = (await apiHomePageFaqs(companyDomain)).data;

  return (
    <section className="bg-[#fffde0] py-16 px-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        {faqs?.length > 0 && (
          <div className="mb-16 flex flex-col items-start">
            <span className="bg-[#800000]/5 backdrop-blur-md text-[#800000] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.35em] border border-[#800000]/20 shadow-[0_5px_15px_rgba(128,0,0,0.05)] hover:bg-[#8f4848] hover:text-white transition-all duration-500 cursor-default inline-block">
              Support Center
            </span>

            <div className="w-full text-center mt-6">
              <h2 className="text-5xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[1.1] max-w-3xl mx-auto">
                Everything you <br />
                <span className="text-[#800000] drop-shadow-[0_0_10px_rgba(128,0,0,0.4)] brightness-125">
                  need to know.
                </span>
              </h2>
            </div>
          </div>
        )}

        {/* QUESTIONS GRID: 2 Columns */}
        {faqs?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 items-start">
            {/* Column 1: Left (First 3) */}
            <div className="space-y-4">
              {faqs.slice(0, 3).map((faq: any, idx: number) => (
                <MerchantFaqsAccordion
                  key={`left-${idx}`}
                  faq={faq}
                  index={idx}
                />
              ))}
            </div>

            {/* Column 2: Right (Next 3) */}
            <div className="space-y-4">
              {faqs.slice(3, 6).map((faq: any, idx: number) => (
                <MerchantFaqsAccordion
                  key={`right-${idx}`}
                  faq={faq}
                  index={idx + 3}
                />
              ))}
            </div>
          </div>
        )}

        {/* Button Section */}
        <div className="flex justify-center mt-12">
          <button className="w-80 py-5 bg-transparent border-2 border-[#800000]/30 text-[#800000] rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[#800000] hover:text-white hover:border-transparent hover:shadow-[0_20px_40px_rgba(128,0,0,0.25)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group">
            Show More Questions
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQs;
