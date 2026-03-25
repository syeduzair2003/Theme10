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
    <section className="bg-[#fffde0] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* FAQ SECTION (Left Side) */}
          {faqs?.length > 0 && (
            <div className="w-full lg:w-7/12">
              <div className="mb-12">
                <span className="bg-[#800000]/10 text-[#800000] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-[#800000]/20 shadow-sm">
                  Support Center
                </span>

                <h2 className="text-5xl font-black text-[#1A1A1A] mt-6 tracking-tight leading-tight">
                  Everything you <br />
                  <span className="text-[#800000] drop-shadow-sm">
                    need to know.
                  </span>
                </h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq: any, idx: number) => (
                  <MerchantFaqsAccordion key={idx} faq={faq} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* RECENTLY UPDATED (Right Side - Sticky) */}
          {promoMerchants?.length > 0 && (
            <div className="w-full lg:w-5/12">
              <div className="sticky top-10 bg-[#F5F2E8] p-8 rounded-[2.5rem] border border-[#E0DBCF] shadow-[0_20px_50px_rgba(128,0,0,0.03)] backdrop-blur-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    Fresh Deals
                  </h3>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  {promoMerchants
                    ?.slice(0, 6)
                    .map((merchant: any, i: number) => (
                      <StoreCardHorizontal
                        key={i}
                        merchant={merchant}
                        mer_slug={store_slug}
                        mer_slug_type={slug_type}
                      />
                    ))}
                </div>

                <button className="w-full mt-8 py-4 bg-[#1A1A1A] text-[#FFFDF5] rounded-2xl font-bold hover:bg-[#800000] hover:shadow-2xl hover:shadow-[#800000]/20 transition-all active:scale-95 shadow-xl">
                  Explore More Stores
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQs;
