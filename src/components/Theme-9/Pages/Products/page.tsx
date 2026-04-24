import { apiCompanyUpdatedData, apiGetProductMerchants } from "@/apis/user";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import cookieService from "@/services/CookiesService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getProductMerchantHref } from "@/constants/hooks";
import MerchantForProduct from "@/components/Theme-10/comp/MerchantForProduct";

const page = async () => {
  const companyDomain = await cookieService.get("domain");
  const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
  const merchants = (await apiGetProductMerchants(companyData?.unique_id)).data;

  return (
    <main className="min-h-screen bg-[#fffde0]">
      {/* HERO SECTION */}
      <section className="w-full flex justify-center pt-8 pb-16 bg-[#FDFCF0]">
        <div className="w-[92%] mx-auto bg-white rounded-b-[4rem] overflow-hidden relative shadow-[0_15px_45px_-20px_rgba(128,0,0,0.1)] border-x border-b border-slate-100">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#800000]/5 blur-[100px] rounded-full"></div>

          <div className="flex flex-col lg:flex-row items-center relative z-10">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 p-12 md:p-16 lg:pl-24">
              <nav className="flex items-center gap-3 mb-6">
                <Link
                  href="/"
                  className="text-slate-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  Home
                </Link>
                <span className="w-1.5 h-1.5 rounded-full bg-[#800000]" />
                <span className="text-[#800000] text-[10px] font-black uppercase tracking-[0.2em]">
                  Branded Products
                </span>
              </nav>

              {/* Solid Bold Heading */}
              <h1 className="text-4xl md:text-5xl font-black text-black leading-[1.1] mb-6 tracking-tighter">
                Premium <span className="text-[#800000]">Brands</span> <br />
                <span className="text-slate-900">& Deals</span>
              </h1>

              <div className="max-w-sm mb-10">
                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-semibold opacity-90">
                  Access hand-picked premium products and verified discount
                  codes from world-renowned merchants.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-black">80%</span>
                  <span className="text-[#800000] text-xs font-black uppercase tracking-tighter">
                    Off
                  </span>
                </div>
                <div className="h-8 w-[2px] bg-slate-200"></div>
                <span className="text-slate-400 text-[11px] uppercase font-black tracking-widest">
                  Verified by Experts
                </span>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="w-full lg:w-1/2 relative h-[450px] lg:h-[580px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center p-10">
                <div className="absolute w-[75%] h-[75%] bg-[#FDFCF0] rounded-full blur-3xl opacity-60"></div>

                <div className="absolute w-[60%] h-[70%] border-2 border-[#800000]/10 rounded-[3rem] -rotate-3 transition-transform duration-1000"></div>

                {/* Main Image Wrapper */}
                <div className="relative w-[85%] h-[85%] z-20">
                  <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-[1.03]">
                    <Image
                      src="/shared-assets/BANNER.png"
                      alt="Premium Brands Showcase"
                      fill
                      className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.15)]"
                      priority
                    />
                  </div>
                </div>

                {/* Info Card */}
                <div className="absolute bottom-[12%] left-[10%] z-30 bg-white/95 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-xl hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#800000] flex items-center justify-center shadow-lg shadow-[#800000]/20">
                      <span className="text-white text-[10px]">★</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-black font-black text-[10px] uppercase leading-none">
                        Top Rated
                      </span>
                      <span className="text-slate-400 text-[9px] uppercase tracking-tighter font-bold">
                        Collections 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#800000]/[0.02] rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FDFCF0] rounded-full blur-[80px] -z-10"></div>

        <div className="text-center mb-24 space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#800000]/5 border border-[#800000]/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#800000] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#800000]"></span>
            </span>
            <span className="text-[#800000] font-black text-[10px] uppercase tracking-[0.3em]">
              Curated Partners
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-[#0f172a] tracking-tight leading-[0.9] uppercase">
            The Elite <br />
            <span className="text-[#800000] italic font-serif lowercase tracking-normal">
              Brand Selection
            </span>
          </h2>

          <div className="flex flex-col items-center gap-6">
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              Access an exclusive directory of premium global merchants.
              Verified, hand-picked, and elite collections only.
            </p>

            <div className="flex items-center gap-4 w-full justify-center">
              <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#800000]/20"></div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {merchants?.length || 0} Leading Brands
              </div>
              <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#800000]/20"></div>
            </div>
          </div>
        </div>

        {/* The Grid: Merchant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {merchants && merchants.length > 0 ? (
            merchants.map((item, i) => (
              <div
                key={i}
                className="group relative h-full transition-all duration-700"
              >
                <div className="absolute -inset-4 bg-gradient-to-b from-[#800000]/5 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                <MerchantForProduct
                  merchant_name={item?.merchant_name}
                  merchant_logo={item?.merchant_logo || ""}
                  companyDomain={companyDomain?.domain || ""}
                  merchant_href={getProductMerchantHref(
                    item,
                    companyData?.slug_type,
                  )}
                  discountTag={item?.promotional_tag}
                />

                <span className="absolute -top-4 -left-2 text-[4rem] font-black text-black/[0.03] pointer-events-none group-hover:text-[#800000]/5 transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-[#F5F5DC] rounded-[4rem]">
              <div className="w-16 h-16 border-4 border-[#800000]/10 border-t-[#800000] rounded-full animate-spin mb-6"></div>
              <p className="text-[#800000] font-black text-xs uppercase tracking-[0.4em] animate-pulse">
                Syncing Partner Network...
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default page;
