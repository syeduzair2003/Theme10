import React from "react";
import { ArrowRight } from "lucide-react";
import StoreCardHorizontal from "./StoreCardHorizontal";
import { apiRecentlyUpdatedStores } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import FreshDealsSlider from "./FreshDealsSlider"; // Naya slider import karein

interface Props {
  slug_type: string;
  store_slug: string;
}

const Subscribe = async ({ store_slug, slug_type }: Props) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#0a0a0c]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D1C7A7]/15 blur-[120px] rounded-full z-0" />
  <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#800000]/10 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT SIDE: Subscribe Content */}
        <div className="w-full lg:w-4/12 text-left">
          <h2 className="text-4xl md:text-6xl font-black text-[#D1C7A7] mb-4 tracking-tighter leading-[0.9]">
            Never miss <br /> a deal.
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xs">
            Join 100k+ shoppers. Exclusive deals to your inbox.
          </p>

          <form className="flex flex-col gap-3 max-w-sm">
            <input
              type="email"
              placeholder="Email address"
              className="h-[60px] bg-white/5 border border-white/10 text-white px-6 rounded-2xl outline-none focus:border-white/30 transition-all"
            />
            <button className="h-[60px] rounded-2xl bg-[#800000] text-white font-bold hover:bg-[#a00000] transition-all flex items-center justify-center gap-2">
              Subscribe <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: Slider Section */}
        {promoMerchants?.length > 0 && (
          <FreshDealsSlider>
            {promoMerchants.map((merchant: any, i: number) => (
              <div key={i} className="flex-shrink-0 w-full md:w-[calc(50%-8px)]">
                <StoreCardHorizontal
                  merchant={merchant}
                  mer_slug={store_slug}
                  mer_slug_type={slug_type}
                />
              </div>
            ))}
          </FreshDealsSlider>
        )}
      </div>
    </section>
  );
}

export default Subscribe;