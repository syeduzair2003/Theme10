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
    <section className="bg-[#1A1A1A] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* FAQ SECTION (Left Side) */}
          {faqs?.length > 0 && (
            <div className="w-full lg:w-7/12">
              <div className="mb-12">
                <span className="bg-[#800000]/20 backdrop-blur-md text-[#D1C7A7] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.30em] border border-[#800000]/40 shadow-[0_0_15px_rgba(128,0,0,0.2)] hover:bg-[#800000]/30 transition-all cursor-default">
                  Support Center
                </span>

                <h2 className="text-5xl md:text-6xl font-black text-[#D1C7A7] mt-6 tracking-tighter leading-[1.1]">
                  Everything you <br />
                  <span className="text-[#800000] drop-shadow-[0_0_10px_rgba(128,0,0,0.4)] brightness-125">
                    need to know.
                  </span>
                </h2>
              </div>
              <div className="space-y-3">
                {faqs?.slice(0, 6).map((faq: any, idx: number) => (
                  <MerchantFaqsAccordion key={idx} faq={faq} index={idx} />
                ))}
              </div>
              <div className="container flex justify-center">
                <button className="w-80 mt-8 py-5 bg-transparent text-[#FFFDF5] rounded-2xl font-black text-xs uppercase tracking-[0.25em] border border-[#800000]/50 hover:bg-[#800000] hover:text-[#FFFDF5] hover:border-[#800000] transition-all duration-500 shadow-[0_0_20px_rgba(128,0,0,0.1)] hover:shadow-[0_0_30px_rgba(128,0,0,0.3)] active:scale-95 flex items-center justify-center gap-3 group">
                  Show More Questions
                </button>
              </div>
            </div>
          )}

          {/* RECENTLY UPDATED (Right Side - Sticky) */}
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQs;
