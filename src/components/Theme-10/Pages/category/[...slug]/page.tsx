import React from 'react'
import { CompanyWiseMerchant } from '@/services/dataTypes'
import { apiMerchantDetailsByCategory } from '@/apis/merchant'
import Image from 'next/image'
import Link from 'next/link'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import { filterOfferBanners, getRandomCategoryCouponsTitle, getRandomCategorySeoTitle } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import { apiCategoryOfferBanners, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user'
import ScrollButtonLeft from '@/components/Theme-8/comp/ScrollButtonLeft'
import StoreCard from '@/components/Theme-8/comp/StoreCard'
import ScrollButtonRight from '@/components/Theme-8/comp/ScrollButtonRight'
import CategoryOffers from '@/components/Theme-8/comp/CategoryOffers'
import CategorySidebar from '@/components/Theme-8/comp/CategorySidebar'
import VerticalCategoryOfferBanner from '@/components/Theme-8/comp/VerticalCategoryOfferBanner'
import { notFound, redirect } from 'next/navigation'
import CategoryMerchantPageSchema from '@/components/shared/SchemaScripts/CategoryMerchantPageSchema'

interface Props {
  params: Promise<{ slug: string[] }>;
}

const CategoryMerchantPage = async ({ params }: Props) => {
  const { slug } = await params;
  const companyDomain = await cookieService.get("domain");
  if (slug?.length > 4 || slug[0] === 'category') notFound();
  
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
  const catRes = (await apiGetCategoryUniqueId(cleanSlug, c_data?.unique_id)).data;

  if (!isPaginated && slug.length == 1 && catRes?.parent_category_id != null) {
    return redirect(`/${catRes?.url}`);
  }

  const categoryId = catRes?.unique_id;
  if (!categoryId) return notFound();

  const [merchants, bannerResponse, categories] = await Promise.all([
    apiMerchantDetailsByCategory(categoryId, c_data?.unique_id).then(res => res.data),
    apiCategoryOfferBanners(categoryId, c_data?.unique_id, 1).then(res => res.data),
    apiSuggestedCategory(categoryId).then(res => res.data),
  ]);

  const initialFiltered = filterOfferBanners(bannerResponse?.offers || [], 50, 2000, 65, 2000);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#1a212e] border-b border-white/5 py-16 md:py-24 rounded-b-[3rem]">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
           <svg width="400" height="400" fill="currentColor"><circle cx="200" cy="200" r="200" /></svg>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-7/12 space-y-6">
              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 text-sm text-blue-100/80 mb-4">
                <Link href="/" className="no-underline hover:text-white transition-colors">Home</Link>
                <FontAwesomeIcon icon={faGreaterThan} className="w-2 h-2" />
                <Link href="/category" className="no-underline hover:text-white transition-colors">Category</Link>
                <FontAwesomeIcon icon={faGreaterThan} className="w-2 h-2" />
                <span className="text-white font-semibold truncate">{catRes?.name}</span>
              </nav>

              <h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
                {getRandomCategorySeoTitle(catRes?.name)}
              </h1>
              <p className="text-lg text-blue-50 max-w-xl opacity-90 leading-relaxed">
                Save big with our hand-picked deals and verified promo codes for top brands in {catRes?.name}.
              </p>
            </div>

            <div className="lg:w-4/12 flex justify-center">
              <div className="relative p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
                <Image 
                  src="/themes/Theme_3/images/banner-illus-10.png" 
                  alt="category illustration" 
                  width={320} 
                  height={280} 
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRENDING MERCHANTS SECTION --- */}
        <section className="relative -mt-20 z-30 pb-10">
          <div className="container mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_70px_-20px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-white">
              
              {/* Header with Badge */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2 bg-blue-50 px-3 py-1 rounded-full">
                    Top Partnerships
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    Trending <span className="text-blue-600">Brands</span>
                  </h3>
                </div>
                
                {/* Optional: Navigation count or simple 'View All' */}
                <div className="hidden md:block">
                  <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-1/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Scrollable Container */}
              <div className="relative group">
                <ScrollButtonLeft sectionType="merchant" />
                
                <div className="horizontal-scroll horizontal-scroll-merchant flex gap-8 overflow-x-auto pb-10 scroll-smooth snap-x scrollbar-hide">
                  {merchants?.merchants?.length > 0 ? (
                    merchants?.merchants.map((merchant: CompanyWiseMerchant, i: number) => (
                      <div key={i} className="min-w-[180px] md:min-w-[220px] snap-center">
                        <StoreCard 
                          merchant={merchant} 
                          mer_slug={c_data?.store_slug} 
                          mer_slug_type={c_data?.slug_type} 
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-full py-20 text-center flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full mb-4 flex items-center justify-center text-slate-300">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      </div>
                      <p className="text-slate-400 font-bold tracking-tight">No premium brands found.</p>
                    </div>
                  )}
                </div>
                
                <ScrollButtonRight sectionType="merchant" />
              </div>
            </div>
          </div>
        </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Content: Coupons */}
            <div className="lg:w-2/3 xl:w-3/4 order-2 lg:order-1">
              <div className="mb-8">
                 <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">
                    {getRandomCategoryCouponsTitle(catRes?.name)}
                 </h2>
                 <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
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
            <aside className="lg:w-1/3 xl:w-1/4 order-1 lg:order-2 space-y-8">
              {categories?.categories?.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-50 border-t-4 border-t-blue-600">
                  <CategorySidebar 
                    categories={categories?.categories} 
                    cat_slug='category' 
                    slug_type={c_data?.slug_type} 
                    parentCategory={categories?.parent_category} 
                  />
                </div>
              )}

              {bannerResponse?.offers?.length > 0 && initialFiltered.length > 0 && (
                <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                    <span className="w-1 h-5 bg-blue-500"></span>
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
  )
}

export default CategoryMerchantPage