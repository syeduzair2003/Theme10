import { apiGetCategoryProductsOffer } from "@/apis/user";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import cookieService from "@/services/CookiesService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getMerchantHref, getProductDetailHref } from "@/constants/hooks";
import EventOfferCard from "@/components/Theme-10/comp/EventOfferCard";
import { apiGetMerchantUniqueId } from "@/apis/merchant";
import ProductCategorySchema from "@/components/shared/SchemaScripts/ProductCategorySchema";

interface Props {
  slug: string; // merchant slug e.g. "amazon.com"
  companyId: string;
  storeSlug: string;
  slugType: string;
  category: string; // category slug e.g. "healthcare"
}

const CategoryOffersPage = async ({
  slug,
  companyId,
  storeSlug,
  slugType,
  category,
}: Props) => {
  const domainData = await cookieService.get("domain");
  const companyDomain = domainData?.domain;

  const [products, merRes] = await Promise.all([
    apiGetCategoryProductsOffer(companyId, slug, category).then(
      (res) => res.data,
    ),
    apiGetMerchantUniqueId(slug, companyId).then((res) => res.data),
  ]);

  const formatCategoryName = (slug: string): string =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* Product CATEGORY */}
      <section className="relative mx-4 lg:mx-20 mt-10">
        {/* Main Wrapper */}
        <div className="relative overflow-hidden bg-[#FDFCF0] rounded-[3.5rem] border border-[#800000]/5 p-12 lg:p-20 min-h-[450px] flex items-center pb-10">
          <div className="absolute top-10 right-10 opacity-[0.03] select-none pointer-events-none hidden lg:block">
            <h2 className="text-[12rem] font-black text-[#800000] leading-none tracking-tighter italic">
              {category?.charAt(0)}
            </h2>
          </div>

          <div className="container mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Left Side */}
              <div className="w-full lg:w-1/2 space-y-10">
                <nav aria-label="breadcrumb">
                  <ol className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
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
                    <li className="flex items-center gap-4">
                      <Link
                        href={`/products/${slug}`}
                        className="text-slate-400 hover:text-[#800000] transition-all"
                      >
                        {merRes?.merchant_name || slug}
                      </Link>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
                    </li>
                    <li className="text-[#800000] tracking-[0.4em]">
                      {formatCategoryName(category)}
                    </li>
                  </ol>
                </nav>

                {/* Heading */}
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#800000]/5 border border-[#800000]/10">
                    <span className="text-[10px] font-black text-[#800000] uppercase tracking-widest">
                      Category Collection
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-[1.1] tracking-tighter uppercase">
                    {formatCategoryName(category)}
                    <span className="block mt-1 text-[#800000] italic font-serif lowercase tracking-normal text-3xl md:text-4xl opacity-80">
                      curated products for you
                    </span>
                  </h1>
                  <div className="h-[2px] w-24 bg-[#800000]"></div>
                </div>
              </div>

              {/* Right Side */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[400px] aspect-[16/10] group/imgBox">
                  <div className="absolute -inset-4 border border-[#800000]/10 rounded-[2.5rem] rotate-2 transition-transform duration-700 group-hover/imgBox:rotate-0"></div>

                  {/* Main Image Container */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] bg-white transform transition-all duration-700 group-hover/imgBox:-translate-y-3">
                    <Image
                      src="/shared-assets/BANNER.png"
                      alt="Category Banner"
                      fill
                      priority
                      className="object-cover transition-transform duration-1000 group-hover/imgBox:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>

                  {/* Image Badge */}
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full p-4 flex flex-col items-center justify-center shadow-[0_15px_35px_-10px_rgba(128,0,0,0.15)] border border-[#F5F5DC] transform rotate-[-15deg] group-hover/imgBox:rotate-0 group-hover/imgBox:scale-105 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <div className="absolute inset-2 border border-[#800000]/10 rounded-full"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                      <span className="text-[#800000] font-black text-[7px] uppercase tracking-[0.3em] leading-none mb-0.5">
                        Official
                      </span>
                      <span className="text-[#1A1A1A] font-serif italic text-xl leading-none">
                        Deals
                      </span>
                      <div className="w-1 h-1 bg-[#800000] rounded-full mt-1.5 opacity-60"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID SECTION */}
      <section className="py-20 px-4 lg:px-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#800000]/[0.02] via-transparent to-transparent pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-100 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#800000]"></div>
                <span className="text-[#800000] font-black text-[10px] uppercase tracking-[0.4em] italic">
                  Collection Overview
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-[0.9]">
                Discover <br />
                <span className="text-[#800000] inline-block mt-2">
                  {formatCategoryName(category)}
                </span>
              </h2>

              <p className="text-slate-600 text-sm md:text-lg font-medium italic max-w-md">
                Handpicked premium products curated exclusively from{" "}
                {merRes?.merchant_name || "the official store"}.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                  >
                    <div className="w-full h-full bg-[#800000]/10 flex items-center justify-center text-[8px] font-bold text-[#800000]">
                      ★
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">
                Top Rated Selection
              </span>
            </div>
          </div>

          {products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((item, i) => (
                <div
                  key={i}
                  className="w-full group/item transition-all duration-500 hover:-translate-y-3"
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
                      item?.slug,
                      item?.category?.slug,
                    )}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State: Premium Visual */
            <div className="py-32 flex flex-col items-center justify-center text-center bg-[#FDFCF0]/50 rounded-[3rem] border-2 border-dashed border-[#800000]/10">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6">
                <div className="w-10 h-10 border-2 border-[#800000]/20 rounded-lg rotate-45 flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#800000]/10 rounded-sm"></div>
                </div>
              </div>
              <h4 className="text-[#1A1A1A] font-black text-xl uppercase tracking-tighter">
                Inventory Update
              </h4>
              <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
                We are currently refreshing the collection for{" "}
                <span className="text-[#800000] font-bold">
                  {formatCategoryName(category)}
                </span>
                . Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
      <ProductCategorySchema
        company_id={companyId}
        merchantSlug={slug}
        merchantName={merRes?.merchant_name}
        categorySlug={category}
        categoryName={formatCategoryName(category)}
      />
    </>
  );
};

export default CategoryOffersPage;
