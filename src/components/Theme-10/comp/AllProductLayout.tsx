import React from "react";
import {
  faArrowRight,
  faGreaterThan,
  FontAwesomeIcon,
} from "@/constants/icons";
import Link from "next/link";
import Image from "next/image";
import ProductOffers from "./ProductOffers";
import { getLastUpdateDate } from "@/constants/hooks";
import ScrollButtonLeft from "./ScrollButtonLeft";
import ScrollButtonRight from "./ScrollButtonRight";
import { Merchant } from "@/services/dataTypes";
import StoreCard from "./StoreCard";
import {
  apiGetProductCategories,
  apiGetProductCategoryMerchant,
  apiGetProductSuggestedMerchant,
} from "@/apis/page_optimization";
import CategorySidebarProduct from "./CategorySidebarProduct";
import AllProductsSchema from "@/components/shared/SchemaScripts/AllProductSchema";
import SidebarRoundMerchantCard from "./SidebarRoundMerchantCard";

interface Props {
  page?: string;
  companyId: string;
  storeSlug: string;
  slugType: string;
  categoryId?: string;
  slug?: string[];
  categoryName?: string;
}

const AllProductLayout = async ({
  page,
  companyId,
  storeSlug,
  slugType,
  categoryId,
  slug,
  categoryName,
}: Props) => {
  const [categories, merchants, suggestedMerchants] = await Promise.all([
    apiGetProductCategories(companyId, categoryId).then((res) => res.data),
    apiGetProductCategoryMerchant(companyId, categoryId).then(
      (res) => res.data,
    ),
    apiGetProductSuggestedMerchant(companyId, categoryId).then(
      (res) => res.data,
    ),
  ]);
  const safeSlug = slug ?? [];

  const cleanedSlug = safeSlug?.filter(
    (s, i) =>
      !(s === "page" || (!isNaN(Number(s)) && safeSlug[i - 1] === "page")),
  );

  const paths: { href: string; label: string }[] = cleanedSlug?.map(
    (segment, index) => {
      const href = `/all-products/${cleanedSlug?.slice(0, index + 1).join("/")}`;
      const label = segment.replace(/-/g, " ");
      return { href, label };
    },
  );

  return (
    <div className="bg-[#fffde0] min-h-screen font-sans">
      <section className="relative overflow-hidden bg-[#FDFBE7] border-b border-[#EADDCA] pt-20 pb-10">
        {/* Background Decorative Glow */}
        <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-[#800000]/5 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-7/12">
              {/* Breadcrumb Modern Badge Style */}
              <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex items-center justify-center lg:justify-start gap-3 list-none p-0 m-0">
                  <li className="flex items-center gap-3">
                    <Link
                      href="/"
                      className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-[#800000] transition-colors no-underline"
                    >
                      Home
                    </Link>
                    {/* Minimalist Dot Separator */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#800000]" />
                  </li>

                  <li className="flex items-center gap-3">
                    <Link
                      href="/all-products"
                      className={`text-[11px] font-bold tracking-[0.2em] uppercase no-underline transition-colors ${
                        !paths || paths.length === 0
                          ? "text-[#800000]"
                          : "text-slate-400 hover:text-[#800000]"
                      }`}
                    >
                      All Products
                    </Link>
                    {paths && paths.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#800000]" />
                    )}
                  </li>

                  {paths?.map((p, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-bold tracking-[0.2em] uppercase ${
                          i === paths.length - 1
                            ? "text-[#800000]"
                            : "text-slate-400"
                        }`}
                      >
                        {i < paths.length - 1 ? (
                          <Link
                            href={p.href}
                            className="text-inherit hover:text-[#800000] no-underline"
                          >
                            {p.label}
                          </Link>
                        ) : (
                          p.label
                        )}
                      </span>
                      {i < paths.length - 1 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#800000]" />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-[#1A1A1A] leading-[1.1] mb-6 tracking-tight">
                {categoryName ? (
                  <>
                    Best Deals on{" "}
                    <span className="text-[#800000]">{categoryName}</span>
                  </>
                ) : (
                  <>
                    Explore{" "}
                    <span className="text-[#800000]">Premium Products</span>
                  </>
                )}
              </h1>

              <p className="text-[#4A4A4A] text-lg md:text-xl max-w-xl leading-relaxed border-l-4 border-[#800000] pl-6 py-2">
                Save more with our hand-picked discounts and verified offers
                from top international brands.
              </p>
            </div>

            {/* Right side Shape */}
            <div className="hidden lg:block w-full lg:w-5/12 relative mt-8">
              <div className="relative w-full max-w-[380px] aspect-square mx-auto">
                <div className="absolute inset-0 bg-[#EADDCA]/40 rounded-[2.5rem] rotate-6 transform transition-transform duration-500 hover:rotate-3" />
                <div className="absolute inset-0 border-2 border-[#800000]/5 rounded-[2.5rem] -rotate-3" />

                <div className="relative h-full w-full flex items-center justify-center transform hover:scale-105 transition-transform duration-700">
                  <Image
                    src="/shared-assets/BANNER.png"
                    alt="shopping banner"
                    fill
                    className="object-contain drop-shadow-[0_25px_45px_rgba(128,0,0,0.12)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {merchants?.length > 0 && (
        <section className="py-12 bg-white/90 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mb-10 gap-4">
              <div>
                <span className="px-5 py-1.5 rounded-full border border-[#800000]/20 bg-[#800000]/5 text-[11px] font-bold tracking-[0.3em] uppercase text-[#800000] inline-block mb-3">
                  Top Rated Partners
                </span>

                <h3 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight flex items-center flex-wrap gap-x-2">
                  <span className="text-[#1A1A1A]">Trending</span>
                  <span className="text-[#800000]">Stores</span>
                </h3>

                <div className="w-16 h-1.5 bg-[#800000] rounded-full mt-4"></div>
              </div>
            </div>

            {/* Carousel Section */}
            <div className="relative group/scroll">
              <ScrollButtonLeft sectionType="merchant" />

              <div className="flex overflow-x-auto gap-8 py-4 scrollbar-hide scroll-smooth">
                {merchants.map((merchant: Merchant, i: number) => (
                  <div
                    key={i}
                    className="min-w-[150px] md:min-w-[180px] flex-shrink-0 group/card"
                  >
                    <div className="transition-transform duration-500 group-hover/card:-translate-y-2">
                      <StoreCard
                        merchant={merchant}
                        mer_slug={storeSlug}
                        mer_slug_type={slugType}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <ScrollButtonRight sectionType="merchant" />
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-[#FDFBE7]/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Info Bar */}
          <div className="bg-white border border-[#EADDCA] rounded-2xl p-4 mb-10 flex items-center justify-between shadow-[0_4px_20px_rgba(128,0,0,0.03)]">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <p className="text-[#4A4A4A] font-medium m-0 text-sm">
                Verified Deals:{" "}
                <span className="text-[#1A1A1A] font-bold">
                  {getLastUpdateDate(1)}
                </span>
              </p>
            </div>
            <div className="hidden md:block text-[10px] text-[#A52A2A]/50 font-bold uppercase tracking-[0.2em]">
              Secure Shopping Experience
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Section */}
            <aside className="w-full lg:w-[350px] shrink-0">
              <div className="sticky top-8 flex flex-col gap-8">
                {categories?.length > 0 && (
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(128,0,0,0.03)] border border-[#EADDCA]/50">
                    <CategorySidebarProduct
                      categories={categories}
                      pageSlug="all-products"
                      categoryName={categoryName}
                    />
                  </div>
                )}

                {suggestedMerchants?.length > 0 && (
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(128,0,0,0.04)] border border-[#EADDCA]/50 relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#800000]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                    <h4 className="text-[#1A1A1A] text-xl font-bold mb-8 flex items-center gap-2 relative">
                      Popular <span className="text-[#800000]">Stores</span>
                    </h4>

                    <div className="flex flex-col gap-4 mb-8 relative">
                      {suggestedMerchants
                        .slice(0, 6)
                        .map((merchant: Merchant) => (
                          <SidebarRoundMerchantCard
                            key={merchant.unique_id}
                            merchant={merchant}
                            merSlug={storeSlug}
                            slugType={slugType}
                          />
                        ))}
                    </div>
                    
                    <div className="flex justify-center w-full mt-4">
                      <Link
                        href={`/all-stores/A`}
                        className="group no-underline flex items-center justify-center gap-3 py-2.5 px-8 rounded-full border-2 border-[#800000] bg-transparent hover:bg-[#800000] transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-[#800000]/20"
                      >
                        
                        <span className="relative z-10 text-[#800000] group-hover:text-white font-black text-[10px] uppercase tracking-[0.15em] transition-colors duration-500 whitespace-nowrap">
                          View All Stores
                        </span>

                        <div className="relative z-10 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-[#800000] group-hover:text-white text-[10px] group-hover:translate-x-1 transition-all duration-500"
                          />
                        </div>

                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <div className="bg-white p-4 md:p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(128,0,0,0.02)] border border-[#EADDCA]/50">
                <ProductOffers
                  category_id={categoryId}
                  page={page}
                  company_id={companyId}
                  mer_slug={storeSlug}
                  mer_slug_type={slugType}
                  slug={slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {page !== "1" && (
        <AllProductsSchema
          company_id={companyId}
          categoryName={categoryName}
          category_id={categoryId}
          categoryUrl={cleanedSlug.join("/")}
        />
      )}
    </div>
  );
};

export default AllProductLayout;
