import React from "react";
import { ArrowRight, Mail } from "lucide-react"; // Mail icon add kiya
import StoreCardHorizontal from "./StoreCardHorizontal";
import { apiRecentlyUpdatedStores } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import FreshDealsSlider from "./FreshDealsSlider";

interface Props {
  slug_type: string;
  store_slug: string;
}

const Subscribe = async ({ store_slug, slug_type }: Props) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;

  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#1A1A1A]">
      {/* Background Glows - Optimized for better depth */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#800000]/10 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D1C7A7]/5 blur-[120px] rounded-full z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT SIDE: Subscribe Content */}
        <div className="w-full lg:w-5/12 text-left space-y-6">
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-black text-[#D1C7A7] tracking-tighter leading-[0.9] uppercase">
              Never miss <br />
              <span className="text-[#800000]">a deal.</span>
            </h2>
            <div className="h-1.5 w-20 bg-[#800000] rounded-full" />{" "}
            {/* Decorative line */}
          </div>

          <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
            Get the world's best coupon codes and elite deals delivered straight
            to your inbox daily.
          </p>

          <form className="relative flex flex-col gap-4 max-w-md group">
            <div className="relative">
              <Mail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#800000] transition-colors"
                size={20}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-[65px] bg-white/5 backdrop-blur-md border border-white/10 text-white pl-14 pr-6 rounded-2xl outline-none focus:border-[#800000]/50 focus:ring-1 focus:ring-[#800000]/50 transition-all shadow-2xl"
              />
            </div>

            <button className="w-full h-[60px] rounded-2xl bg-[#800000] text-white font-black uppercase tracking-widest hover:bg-[#a00000] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#800000]/20 flex items-center justify-center gap-3 group">
              Subscribe Now
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center mt-2">
              No spam. Just pure savings.
            </p>
          </form>
        </div>

        {/* RIGHT SIDE: Slider Section - Adding a bit of "Lift" */}
        <div className="w-full lg:w-7/12 relative">
          {promoMerchants?.length > 0 && (
            <div className="relative p-4 rounded-[2.5rem] bg-white/5 border border-white/5 backdrop-blur-sm shadow-inner">
              <FreshDealsSlider>
                {promoMerchants.map((merchant: any, i: number) => (
                  <div key={i} className="px-2">
                    <StoreCardHorizontal
                      merchant={merchant}
                      mer_slug={store_slug}
                      mer_slug_type={slug_type}
                    />
                  </div>
                ))}
              </FreshDealsSlider>
            </div>
          )}

          {/* Premium Theme Badge */}
          <div className="absolute -top-5 -right-2 md:-right-6 z-30">
            <div className="relative group overflow-hidden bg-[#800000] text-[#D1C7A7] text-[10px] font-black px-6 py-2.5 rounded-full rotate-12 shadow-[0_10px_20px_rgba(128,0,0,0.3)] border border-[#D1C7A7]/20 uppercase tracking-[0.15em] flex items-center gap-2 transition-transform hover:rotate-0 hover:scale-110 duration-500 cursor-default">
              {/* Subtle Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Pulse Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D1C7A7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D1C7A7]"></span>
              </span>

              <span className="drop-shadow-md">Recently Updated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
