import React from "react";
import { CompanyWiseMerchant } from "@/services/dataTypes";
import { apiMerchantDetailsByCategory } from "@/apis/merchant";
import Image from "next/image";
import Link from "next/link";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import {
  filterOfferBanners,
  getRandomCategoryCouponsTitle,
  getRandomCategorySeoTitle,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import {
  apiCategoryOfferBanners,
  apiCompanyUpdatedData,
  apiGetCategoryUniqueId,
  apiSuggestedCategory,
} from "@/apis/user";
import ScrollButtonLeft from "@/components/Theme-10/comp/ScrollButtonLeft";
import StoreCard from "@/components/Theme-10/comp/StoreCard";
import ScrollButtonRight from "@/components/Theme-10/comp/ScrollButtonRight";
import CategoryOffers from "@/components/Theme-10/comp/CategoryOffers";
import CategorySidebar from "@/components/Theme-10/comp/CategorySidebar";
import VerticalCategoryOfferBanner from "@/components/Theme-10/comp/VerticalCategoryOfferBanner";
import { notFound, redirect } from "next/navigation";
import CategoryMerchantPageSchema from "@/components/shared/SchemaScripts/CategoryMerchantPageSchema";

interface Props {
  params: Promise<{ slug: string[] }>;
}

const CategoryMerchantPage = async ({ params }: Props) => {
  const { slug } = await params;
  const companyDomain = await cookieService.get("domain");
  if (slug?.length > 4 || slug[0] === "category") notFound();

  if (slug[slug.length - 1] === "page") {
    const cleanUrl = `/category/${slug.slice(0, slug.length - 1).join("/")}`;
    redirect(cleanUrl);
  }

  const c_data = (await apiCompanyUpdatedData(companyDomain)).data;

  let page = 1;
  const isPaginated = slug.length >= 2 && slug[slug.length - 2] === "page";

  if (isPaginated) {
    page = parseInt(slug[slug.length - 1], 10) || 1;
    if (page === 1) {
      const cleanUrl = `/category/${slug.slice(0, -2).join("/")}`;
      redirect(cleanUrl);
    }
  }

  const cleanSlug = isPaginated ? slug[slug.length - 3] : slug[slug.length - 1];
  const categorySlug = slug.slice(0, isPaginated ? -2 : undefined).join("/");
  const catRes = (await apiGetCategoryUniqueId(cleanSlug, c_data?.unique_id))
    .data;

  if (!isPaginated && slug.length == 1 && catRes?.parent_category_id != null) {
    return redirect(`/${catRes?.url}`);
  }

  const categoryId = catRes?.unique_id;
  if (!categoryId) return notFound();

  const [merchants, bannerResponse, categories] = await Promise.all([
    apiMerchantDetailsByCategory(categoryId, c_data?.unique_id).then(
      (res) => res.data,
    ),
    apiCategoryOfferBanners(categoryId, c_data?.unique_id, 1).then(
      (res) => res.data,
    ),
    apiSuggestedCategory(categoryId).then((res) => res.data),
  ]);

  const initialFiltered = filterOfferBanners(
    bannerResponse?.offers || [],
    50,
    2000,
    65,
    2000,
  );

  return (
    <div className="bg-[#fffde0] min-h-screen">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#800000] border-b border-[#800000]/20 py-16 md:py-24 rounded-b-[4rem] shadow-2xl">
        {/* Decorative Circle: Changed to Maroon Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20 text-[#fffde0]">
          <svg width="400" height="400" fill="currentColor">
            <circle cx="200" cy="200" r="200" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center h-[45vh] justify-between gap-10">
            <div className="lg:w-7/12 space-y-6">
              {/* Breadcrumbs: Updated to Creamy Tones */}
              <nav className="flex items-center space-x-2 text-[11px] font-black tracking-[0.2em] text-[#fffde0]/70 mb-4 uppercase">
                <Link
                  href="/"
                  className="no-underline hover:text-white transition-colors"
                >
                  Home
                </Link>
                <div className="w-1 h-1 rounded-full bg-[#fffde0]/40" />
                <Link
                  href="/category"
                  className="no-underline hover:text-white transition-colors"
                >
                  Category
                </Link>
                <div className="w-1 h-1 rounded-full bg-[#fffde0]/40" />
                <span className="text-white font-black truncate">
                  {catRes?.name}
                </span>
              </nav>

              <h1 className="text-4xl md:text-6xl font-black leading-[1.1] text-white tracking-tighter">
                {getRandomCategorySeoTitle(catRes?.name)}
              </h1>
              <p className="text-lg text-[#fffde0]/80 max-w-xl font-medium leading-relaxed">
                Save big with our hand-picked deals and verified promo codes for
                top brands in{" "}
                <span className="text-white underline decoration-[#fffde0]/30">
                  {catRes?.name}
                </span>
                .
              </p>
            </div>

            <div className="lg:w-4/12 flex justify-center">
              {/* Illustration Wrapper: Updated to Glassmorphism */}
              {/* <div className="relative p-6 bg-[#fffde0]/10 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-2xl group">
                <div className="absolute inset-0 bg-[#800000] blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity" />
                <Image 
                  src="/themes/Theme_3/images/banner-illus-10.png" 
                  alt="category illustration" 
                  width={340} 
                  height={300} 
                  className="relative z-10 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* --- TRENDING MERCHANTS SECTION --- */}
      <section className="relative -mt-24 z-30 pb-10">
        <div className="container mx-auto px-4">
          {/* Main Card: Updated to Pure White/Cream Glass */}
          <div className="bg-white/90 backdrop-blur-2xl rounded-[4rem] shadow-[0_30px_100px_-20px_rgba(128,0,0,0.15)] p-8 md:p-14 border border-white">
            {/* Header with Badge */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-[#800000] text-[10px] font-black uppercase tracking-[0.4em] mb-3 bg-[#800000]/5 px-4 py-1.5 rounded-full border border-[#800000]/10">
                  Top Partnerships
                </span>
                <h3 className="text-4xl font-black text-[#1A1A1A] tracking-tighter flex items-center gap-3">
                  Trending <span className="text-[#800000]">Brands</span>
                </h3>
              </div>

              <div className="hidden md:block">
                {/* <div className="h-1.5 w-24 bg-[#800000]/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#800000] w-1/3"></div>
                  </div> */}
              </div>
            </div>

            {/* Scrollable Container */}
            {/* --- SCROLL AREA WRAPPER --- */}
            <div className="relative px-4 md:px-10 group">
              {/* --- LEFT BUTTON POSITION --- */}
              {/* Sirf position set karni hai, circle button ke andar khud banega */}
              <div className="absolute top-[40%] -left-2 md:-left-5 z-[100] -translate-y-1/2">
                <ScrollButtonLeft sectionType="merchant" />
              </div>

              {/* --- SCROLL CONTAINER --- */}
              <div className="horizontal-scroll horizontal-scroll-merchant flex overflow-x-auto pb-10 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {merchants?.merchants?.length > 0 ? (
                  merchants?.merchants.map(
                    (merchant: CompanyWiseMerchant, i: number) => (
                      <div
                        key={i}
                        className="min-w-full sm:min-w-[50%] lg:min-w-[25%] px-2 snap-start flex justify-center hover:-translate-y-2 transition-transform duration-500 py-4"
                      >
                        <div className="w-full max-w-[220px] md:max-w-[250px]">
                          <StoreCard
                            merchant={merchant}
                            mer_slug={c_data?.store_slug}
                            mer_slug_type={c_data?.slug_type}
                          />
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div className="w-full py-24 text-center">
                    <p className="text-[#1A1A1A]/40 font-black uppercase tracking-widest text-xs">
                      No premium brands found.
                    </p>
                  </div>
                )}
              </div>

              {/* --- RIGHT BUTTON POSITION --- */}
              {/* Sirf position set karni hai, circle button ke andar khud banega */}
              <div className="absolute top-[40%] -right-2 md:-right-5 z-[100] -translate-y-1/2">
                <ScrollButtonRight sectionType="merchant" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-20 bg-[#fffde0]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content: Coupons */}
            <div className="lg:w-2/3 xl:w-3/4 order-2 lg:order-1">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-[#1A1A1A] mb-4 tracking-tighter leading-tight">
                  {getRandomCategoryCouponsTitle(catRes?.name)}
                </h2>
                <div className="w-24 h-[3px] bg-[#800000] rounded-full"></div>
              </div>
              <CategoryOffers
                category_id={categoryId}
                url_slug={categorySlug?.split("/")}
                page={page?.toString()}
                company_id={c_data?.unique_id}
                mer_slug={c_data?.store_slug}
                mer_slug_type={c_data?.slug_type}
              />
            </div>

            {/* Right Sidebar */}
            <aside className="lg:w-1/3 xl:w-1/4 order-1 lg:order-2 space-y-10">
              {categories?.categories?.length > 0 && (
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-[#800000]/5 border-t-[6px] border-t-[#800000]">
                  <CategorySidebar
                    categories={categories?.categories}
                    cat_slug="category"
                    slug_type={c_data?.slug_type}
                    parentCategory={categories?.parent_category}
                  />
                </div>
              )}

              {bannerResponse?.offers?.length > 0 &&
                initialFiltered.length > 0 && (
                  <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 shadow-2xl text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#800000]/40 blur-3xl rounded-full -mr-16 -mt-16"></div>
                    <h4 className="text-xl font-black mb-8 flex items-center gap-3 relative z-10 tracking-tight">
                      <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
                      Exclusive Deals
                    </h4>
                    <VerticalCategoryOfferBanner
                      bannerResponse={bannerResponse?.offers}
                      domain={companyDomain.domain}
                      mer_slug={c_data?.store_slug}
                      slug_type={c_data?.slug_type}
                      categoryId={categoryId}
                      companyId={c_data?.unique_id}
                    />
                  </div>
                )}
            </aside>
          </div>
        </div>
      </section>

      <CategoryMerchantPageSchema
        category_id={categoryId}
        category_name={catRes?.name}
        company_id={c_data?.unique_id}
        company_name={c_data?.company_name}
        currentPage={page}
        mer_slug={c_data?.store_slug}
        slug_type={c_data?.slug_type}
        slug={slug}
      />
    </div>
  );
};

export default CategoryMerchantPage;
