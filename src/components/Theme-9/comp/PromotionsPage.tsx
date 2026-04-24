import { apiGetAllPromotion } from "@/apis/user";
import { getPromotionHref } from "@/constants/hooks";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import cookieService from "@/services/CookiesService";
import { Promotion } from "@/services/dataTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PromotionsPage = async ({ promotionSlug }: { promotionSlug: string }) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const promotions = (await apiGetAllPromotion(companyDomain)).data;

  return (
    <div className="min-h-screen bg-[#fffde0]">
      {/* Hero/Banner Section */}
      <section className="relative mx-4 md:mx-8 lg:mx-12 mt-12 overflow-hidden rounded-[2.5rem] bg-[#FDFBE7] py-10 md:py-12 shadow-md border border-[#EADDCA]">
        <div className="container mx-auto px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Side Content */}
            <div className="w-full lg:w-[55%] text-center lg:text-left">
              {/* Breadcrumb */}
              <nav className="mb-4 flex justify-center lg:justify-start items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em]">
                <Link
                  href="/"
                  className="text-slate-400 hover:text-[#800000] transition-colors"
                >
                  Home
                </Link>
                <span className="w-1.5 h-1.5 rounded-full bg-[#800000]"></span>
                <span className="text-[#800000]">Promotion</span>
              </nav>

              {/* Heading */}
              <h1 className="text-3xl md:text-5xl lg:text-[3.2rem] font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
                Big <span className="text-[#800000]">Savings.</span> <br />
                Exclusive Deals.
              </h1>

              <div className="mt-6 flex items-start gap-4 max-w-lg mx-auto lg:mx-0">
                {/* Vertical Line */}
                <div className="w-[4px] h-16 bg-[#800000] rounded-full shrink-0" />
                <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed text-left">
                  Experience the next level of shopping with our handpicked
                  daily promotions and trending brand offers. Save big with our
                  verified exclusive discounts.
                </p>
              </div>
            </div>

            {/* Right Side Illustration */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-end mt-4">
              <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-[#800000]/5 rounded-[3rem] rotate-6 scale-95" />
                <div className="absolute inset-0 bg-[#EADDCA]/30 rounded-[3rem] -rotate-3 transition-transform group-hover:-rotate-6 duration-700 shadow-sm" />

                {/* Main Image Container */}
                <div className="relative z-10 w-[80%] h-[80%] flex items-center justify-center">
                  <Image
                    src="/themes/Theme_3/images/banner-illus-5.png"
                    alt="Trending Events"
                    width={310}
                    height={270}
                    className="object-contain transition-all duration-700 hover:scale-105 drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONS GRID */}
      <section className="relative bg-[#FDFBE7]/30 py-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#800000 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="px-4 py-1.5 rounded-full border border-[#800000]/20 bg-white mb-6">
              <span className="text-[#800000] text-[10px] font-black uppercase tracking-[0.3em]">
                Special Promotions
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter mb-4">
              Our Trending <span className="text-[#800000]">Events</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base">
              Discover handpicked premium offers and seasonal events tailored
              for your lifestyle. Showing {promotions?.length || 0} active
              campaigns.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {promotions?.length > 0 ? (
              promotions.map((promotion: Promotion, index: number) => (
                <Link
                  key={index}
                  href={getPromotionHref(promotion, promotionSlug)}
                  className="no-underline group relative block h-full"
                >
                  {/* Main Card Wrapper */}
                  <div className="relative bg-white border border-[#EADDCA] rounded-tl-[3rem] rounded-br-[3rem] p-10 h-full min-h-[380px] flex flex-col transition-all duration-700 ease-in-out group-hover:border-[#800000] group-hover:shadow-[15px_15px_0px_rgba(128,0,0,0.05)] overflow-hidden">
                    <span className="absolute top-4 right-8 text-8xl font-black text-[#FDFBE7] group-hover:text-[#800000]/5 transition-colors duration-700 select-none">
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </span>

                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#800000] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-tl-[3rem]"></div>

                    {/* Card Content */}
                    <div className="relative z-10 flex-grow pt-4">
                      <p className="text-[#800000] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        Verified Deal
                      </p>
                      <h3 className="text-2xl font-black text-[#1A1A1A] leading-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">
                        {promotion?.name}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-slate-900 transition-colors duration-500">
                        Unlocking exclusive membership rewards and premium
                        discounts for{" "}
                        <span className="text-[#800000] font-bold">
                          {promotion?.name}
                        </span>{" "}
                        subscribers.
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="relative z-10 mt-12 pt-8 border-t border-[#EADDCA] flex items-center justify-between">
                      <div className="overflow-hidden h-4">
                        <div className="flex flex-col transition-transform duration-500 group-hover:-translate-y-4">
                          <span className="text-[#1A1A1A] text-[11px] font-black uppercase tracking-[0.25em]">
                            Explore Now
                          </span>
                          <span className="text-[#800000] text-[11px] font-black uppercase tracking-[0.25em]">
                            View Deals
                          </span>
                        </div>
                      </div>

                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#800000] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="relative z-10 text-[#1A1A1A] group-hover:text-white transition-colors duration-500"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              /* Minimal Empty State */
              <div className="col-span-full py-32 flex flex-col items-center justify-center border border-dashed border-[#EADDCA] rounded-3xl bg-white/50">
                <div className="w-16 h-16 rounded-full bg-[#FDFBE7] flex items-center justify-center mb-6">
                  <span className="text-2xl opacity-50">✨</span>
                </div>
                <h3 className="text-[#1A1A1A] font-black uppercase tracking-widest text-sm">
                  No Active Events
                </h3>
                <p className="text-slate-400 text-xs mt-2">
                  New promotions are coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionsPage;
