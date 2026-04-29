import { apiMerchantDetailsByCategory } from '@/apis/merchant';
import { apiCategoryOfferBanners, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user';
import BreadcrumbSection from '@/components/Theme-17/comp/BreadcrumbSection';
import CategoryOffers from '@/components/Theme-17/comp/CategoryOffers';
import CategorySidebar from '@/components/Theme-17/comp/CategorySidebar';
import OfferCard from '@/components/Theme-17/comp/offerCard';
import RoundedMerchant from '@/components/Theme-17/comp/RoundedMerchant';
import VerticalCategoryOfferBanner from '@/components/Theme-17/comp/VerticalCategoryOfferBanner';
import { filterOfferBanners } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

interface Props {
  params: Promise<{ slug: string[] }>;
}
const CategoryMerchantPage = async ({ params }: Props) => {
  const { slug } = await params;
  const companyDomain = await cookieService.get("domain");
  if (slug?.length > 4 || slug[0] === 'category'){
    notFound()
  }
  if (slug[slug.length-1] === "page") {
    const cleanUrl = `/category/${slug.slice(0, slug.length-1).join("/")}`;
    redirect(cleanUrl);
  }
  // First get company data (needed for everything else)
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data;

  // Figure out page & cleanSlug BEFORE API calls
  let page = 1;
  const isPaginated = slug.length >= 2 && slug[slug.length - 2] === "page";

  if (isPaginated) {
    page = parseInt(slug[slug.length - 1], 10) || 1;
    if (page === 1) {
      const cleanUrl = `/category/${slug.slice(0, -2).join("/")}`;
      redirect(cleanUrl);
    }
  }

  const cleanSlug = isPaginated
    ? slug[slug.length - 3] // the category slug before "page"
    : slug[slug.length - 1];

  const categorySlug = slug
    .slice(0, isPaginated ? -2 : undefined)
    .join("/");
  
  const CategoryCheck = slug
    .slice(0, isPaginated ? -2 : undefined)

  const catRes = (await apiGetCategoryUniqueId(cleanSlug, c_data?.unique_id)).data;

  if (!isPaginated && CategoryCheck.length == 1 && catRes?.parent_category_id != null){
    return redirect(`/${catRes?.url}`);
  }
  // ✅ Extract categoryId AFTER catRes resolves
  const categoryId = catRes?.unique_id;
  if (!categoryId) return notFound();

  // If merchants & banners need categoryId, refetch them here
  const [merchants, bannerResponse, categories] = await Promise.all([
    apiMerchantDetailsByCategory(categoryId, c_data?.unique_id).then(res => res.data),
    apiCategoryOfferBanners(categoryId, c_data?.unique_id, 1).then(res => res.data),
    apiSuggestedCategory(categoryId).then(res => res.data),
  ]);
  const initialFiltered = filterOfferBanners(bannerResponse?.offers || [], 50, 2000, 65, 2000);

  return (
    <>
    <BreadcrumbSection 
      title={catRes?.name} 
      breadcrumbs={[
        {label: 'Home', href: '/'}, 
        {label: 'Category', href: '/category'}, 
        {label: catRes?.name, href: `/category/${categorySlug}`}]}
    />

    {merchants?.merchants?.length > 0 && (
                <RoundedMerchant
                    merchants={merchants?.merchants}
                    storeSlug={c_data?.store_slug}
                    slugType={c_data?.slug_type}
                />
            )}

            <section className="py-12 relative w-full bg-gradient-to-b from-gray-50/80 via-[#8bc94a08] to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

                        
                        {/* Right Content Area: Product Offers */}
                        <div className="w-full lg:w-[70%]">
                            <CategoryOffers 
                            category_id={categoryId} 
                            url_slug={categorySlug?.split("/")} 
                            page={page?.toString()} 
                            company_id={c_data?.unique_id} 
                            mer_slug={c_data?.store_slug} 
                            mer_slug_type={c_data?.slug_type} />
                        </div>

                        {/* Left Sidebar Area */}
                        <div className="w-full lg:w-[30%] flex flex-col gap-10">
                            {/* ─── CATEGORY SIDEBAR ─── */}
                            {categories?.categories?.length > 0 && (
                                <CategorySidebar
                                    categories={categories?.categories}
                                    pageSlug="category"
                                    parentCategory={catRes?.name}
                                />
                            )}
                             <VerticalCategoryOfferBanner
                                bannerResponse={initialFiltered}
                                domain={companyDomain.domain}
                                mer_slug={c_data?.store_slug}
                                slug_type={c_data?.slug_type}
                                categoryId={categoryId}
                                companyId={c_data?.unique_id}
                            />
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default CategoryMerchantPage