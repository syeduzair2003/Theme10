import { apiGetCategoryProducts, apiGetMerchantProducts } from "@/apis/user";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import cookieService from "@/services/CookiesService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  getMerchantHref,
  getMerchantProductsSeo,
  getProductDetailHref,
} from "@/constants/hooks";
import EventOfferCard from "@/components/Theme-10/comp/EventOfferCard";
import { apiGetMerchantUniqueId } from "@/apis/merchant";
import ScrollButtonLeft from "./ScrollButtonLeft";
import ScrollButtonRight from "./ScrollButtonRight";
import MerchantProductsSchema from "@/components/shared/SchemaScripts/ProductsMerchantSchema";
import { ChevronRight } from "lucide-react"; // Replacing FA for cleaner look if you want

interface Props {
  slug: string;
  companyId: string;
  storeSlug: string;
  slugType: string;
}

const MerchantProductsPage = async ({
  slug,
  companyId,
  storeSlug,
  slugType,
}: Props) => {
  const cookieData = await cookieService.get("domain");
  const companyDomain = cookieData?.domain;

  const [products, merRes, cat] = await Promise.all([
    apiGetMerchantProducts(companyId, slug).then((res) => res.data),
    apiGetMerchantUniqueId(slug, companyId).then((res) => res.data),
    apiGetCategoryProducts(companyId, slug).then((res) => res.data),
  ]);

  return (
    <>
      {/* Banner Secition */}
      <section className="relative mx-4 lg:mx-20 mt-10">
        {/* Main Container */}
        <div className="relative overflow-hidden bg-[#FDFCF0] rounded-[4rem] border border-[#800000]/10 p-12 lg:p-24 min-h-[440px] flex items-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(128,0,0,0.02),transparent_70%)]"></div>

          <div className="container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Left Content */}
              <div className="w-full lg:w-3/5 space-y-10">
                <nav aria-label="Breadcrumb">
                  <ol className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                    <li className="flex items-center gap-4">
                      <Link
                        href="/"
                        className="text-slate-400 hover:text-[#800000] transition-all"
                      >
                        Home
                      </Link>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
                    </li>
                    <li className="flex items-center gap-4">
                      <Link
                        href="/products"
                        className="text-slate-400 hover:text-[#800000] transition-all"
                      >
                        Products
                      </Link>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
                    </li>
                    <li className="text-[#800000] tracking-[0.5em]">{slug}</li>
                  </ol>
                </nav>

                {/* Heading */}
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-[1.15] tracking-tight uppercase max-w-2xl">
                    {getMerchantProductsSeo(merRes?.merchant_name)}
                    <span className="block mt-2 text-[#800000] italic font-serif lowercase tracking-normal">
                      handpicked for excellence
                    </span>
                  </h1>
                  <div className="h-[1px] w-20 bg-[#800000]"></div>
                </div>
              </div>

              {/* Right Section: Image */}
              <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[380px] h-[380px] flex items-center justify-center group/imgBox">
                  <div className="absolute inset-0 border border-[#800000]/5 rounded-full scale-100 group-hover/imgBox:scale-110 transition-transform duration-1000 ease-out"></div>
                  <div className="absolute inset-8 border border-[#800000]/10 rounded-full scale-100 group-hover/imgBox:rotate-45 transition-transform duration-1000 ease-out"></div>

                  <div className="relative w-full h-full flex items-center justify-center p-10 transform transition-all duration-700 hover:-translate-y-6 cursor-pointer">
                    <Image
                      src="/shared-assets/BANNER.png"
                      alt="Collection"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_50px_50px_rgba(128,0,0,0.12)] transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>

                  <div className="absolute -bottom-2 -right-2 w-24 h-24 border border-[#F5F5DC] bg-white rounded-full flex flex-col items-center justify-center shadow-xl rotate-12 transition-transform duration-500 group-hover/imgBox:rotate-0">
                    <span className="text-[8px] font-black text-[#800000] uppercase tracking-tighter">
                      Verified
                    </span>
                    <span className="text-[10px] font-black text-black uppercase">
                      2026
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#800000] mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STORE CARD */}
        <div className="max-w-3xl mx-auto -mt-12 relative z-20 px-6">
          {/* Main Card Container */}
          <div className="relative bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(128,0,0,0.1)]">
            <div className="flex items-center gap-6">
              {/* Logo Container */}
              <div className="relative shrink-0 group/logo">
                <div className="absolute inset-0 bg-[#800000]/5 rounded-2xl blur-lg opacity-0 group-hover/logo:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 bg-[#FDFCF0] rounded-2xl p-4 flex items-center justify-center border border-slate-100 relative z-10 transition-all duration-500 hover:border-[#800000]/20 hover:-translate-y-1">
                  {merRes?.merchant_logo ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={merRes.merchant_logo}
                        alt={merRes?.merchant_name || "Store"}
                        fill
                        className="object-contain"
                        sizes="80px"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <span className="text-[#1A1A1A] font-black text-2xl italic">
                      {merRes?.merchant_name?.charAt(0) || "S"}
                    </span>
                  )}
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#800000] border-4 border-white rounded-full z-20 flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Info Content */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-[#800000] font-black text-[9px] uppercase tracking-[0.25em] bg-[#800000]/5 px-2.5 py-1 rounded-md">
                    Verified Partner
                  </span>
                  <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                  <span className="text-slate-400 font-bold text-[8px] uppercase tracking-widest">
                    Active 2026
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tighter m-0 leading-tight">
                  {merRes?.merchant_name || slug || "Premium Store"}
                </h3>

                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 m-0">
                  Official Products
                  <span className="w-4 h-[1px] bg-[#800000]/30"></span>
                </p>
              </div>
            </div>

            <div className="shrink-0 group/btnContainer">
              <Link
                href={getMerchantHref(merRes, storeSlug, slugType)}
                className="group/btn relative inline-flex items-center justify-between min-w-[160px] px-6 py-4 bg-[#1A1A1A] rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_20px_40px_-10px_rgba(128,0,0,0.3)] active:scale-95"
              >
                <div className="absolute inset-0 bg-[#800000] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>

                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 group-hover/btn:text-white transition-colors duration-300">
                    Visit Store
                  </span>

                  <div className="relative flex items-center justify-center w-6 h-6 ml-2 overflow-hidden">
                    <div className="absolute transition-all duration-500 transform group-hover/btn:translate-x-10 group-hover/btn:-translate-y-10">
                      <FontAwesomeIcon
                        icon={faGreaterThan}
                        className="w-2.5 h-2.5 text-white/50"
                      />
                    </div>
                    <div className="absolute transition-all duration-500 transform -translate-x-10 translate-y-10 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0">
                      <FontAwesomeIcon
                        icon={faGreaterThan}
                        className="w-2.5 h-2.5 text-white"
                      />
                    </div>
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover/btn:scale-100 transition-transform duration-500"></div>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 group-hover/btn:bg-white/20"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 lg:px-20 bg-white">
        {/* Categories Section */}
        {cat?.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase">
                  Browse <span className="text-[#800000]">Categories</span>
                </h2>
                <div className="h-1 w-12 bg-[#800000] rounded-full"></div>
              </div>
              <p className="hidden md:block text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Store Departments
              </p>
            </div>

            <div className="relative group px-2">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ScrollButtonLeft sectionType="category" />
              </div>

              <div className="horizontal-scroll-category flex flex-nowrap overflow-x-auto scroll-smooth gap-3 py-6 no-scrollbar">
                {cat.map(
                  (
                    item: { id: number; name: string; slug: string },
                    i: number,
                  ) => (
                    <Link
                      key={item.id || i}
                      href={`/products/${slug}/${item.slug}`}
                      className="flex-shrink-0 group/cat"
                    >
                      <div className="px-8 py-4 bg-white border border-slate-100 rounded-full flex items-center justify-center gap-3 shadow-sm transition-all duration-500 hover:border-[#800000]/30 hover:bg-[#FDFCF0] hover:shadow-[0_10px_30px_-10px_rgba(128,0,0,0.1)] hover:-translate-y-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#800000] opacity-0 group-hover/cat:opacity-100 transition-opacity"></div>
                        <span className="text-[11px] md:text-xs font-black text-[#1A1A1A] uppercase tracking-widest group-hover/cat:text-[#800000]">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  ),
                )}
              </div>

              <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ScrollButtonRight sectionType="category" />
              </div>
            </div>
          </div>
        )}

        {/* Products Grid Section */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
            <div className="space-y-4">
              <span className="text-[#800000] font-black text-[10px] uppercase tracking-[0.4em] italic">
                Exclusive Deals
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase leading-none max-w-2xl">
                Discover{" "}
                <span className="text-[#800000]">Premium Selection</span> from{" "}
                {merRes?.merchant_name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                Live Feed
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {products?.length > 0 ? (
              products.map((item, i) => (
                <div
                  key={i}
                  className="w-full h-full transform transition-all duration-500 hover:-translate-y-2 hover:z-10"
                >
                  <EventOfferCard
                    product={item}
                    merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                    domain={companyDomain}
                    merchant_name={merRes?.merchant_name}
                    merchant_logo={merRes?.merchant_logo}
                    productDetailUrl={getProductDetailHref(
                      merRes,
                      slugType,
                      item.slug,
                      item?.category?.slug,
                    )}
                  />
                </div>
              ))
            ) : (
              /* Empty State */
              <div className="col-span-full py-32 rounded-[3rem] bg-slate-50/50 border border-dashed border-slate-200 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                  <i className="fas fa-box-open text-2xl"></i>
                </div>
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                  No products available right now.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <MerchantProductsSchema
        company_id={companyId}
        merchantSlug={slug}
        merchantName={merRes?.merchant_name}
      />
    </>
  );
};

export default MerchantProductsPage;
