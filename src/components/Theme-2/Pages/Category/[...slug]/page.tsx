import { apiMerchantDetailsByCategory } from '@/apis/merchant';
import { apiCategoryOfferBanners, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user';
import CategoryMerchantPageSchema from '@/components/shared/SchemaScripts/CategoryMerchantPageSchema'
import cookieService from '@/services/CookiesService';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import { filterOfferBanners, generateBreadcrumbs, getRandomCategorySeoTitle } from '@/constants/hooks';
import StoreCard from '@/components/Theme-2/comp/StoreCard';
import { CompanyWiseMerchant } from '@/services/dataTypes';
import CategorySidebar from '@/components/Theme-2/comp/CategorySidebar';
import SidebarBanners from '@/components/Theme-2/comp/SidebarBanners';
import OffersListing from '@/components/Theme-2/comp/OffersListing';
import BreadcrumbSection from '@/components/Theme-2/comp/BreadcrumbSection';

interface Props {
  params: Promise<{ slug: string[] }>;
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const companyDomain = await cookieService.get("domain");
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

  // --- Parallel API calls ---
  const catRes = (await apiGetCategoryUniqueId(cleanSlug, c_data?.unique_id)).data;

  if (!isPaginated && CategoryCheck.length == 1 && catRes?.parent_category_id != null) return notFound();
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
  const breadcrumbs = generateBreadcrumbs(categorySlug, "/category", "Category");
  return (
    <>
      <BreadcrumbSection
          title={getRandomCategorySeoTitle(catRes?.name)}
          breadcrumbs={breadcrumbs}
          imageSrc="/themes/Theme_3/img/website.png"
      />
      <div className="contact-section bg pt-4">
        <div className="container">
          <div className="d-grid gap-4 gap-md-6 position-relative">
            <h3 className="display-four n17-color f-30 m-0">Trending Merchants in {getRandomCategorySeoTitle(catRes?.name)}</h3>
          </div>
          <div className="position-relative mt-2 mb-4">
            <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-3" style={{ scrollBehavior: 'smooth' }}>
              {merchants?.merchants?.length > 0 ? (
                merchants?.merchants.map((merchant: CompanyWiseMerchant, i) => {
                  return (
                    <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-2 flex-shrink-0 px-2">
                      <StoreCard key={i} merchant={merchant} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />
                    </div>
                  )
                })) : (
                <section className="product-shop-full-grid">
                  <div className="container">
                    <div className="row">
                      <div className="section-title-center text-center mt-5">
                        <div className="col-12">
                          <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                            <h3 className="fs-three n17-color text-danger">No Merchants Found</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section bg pt-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-9 col-xl-9">
              <OffersListing category_id={categoryId} url_slug={categorySlug?.split("/")} page={page?.toString()} company_id={c_data?.unique_id} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} baseUrl="category" />
            </div>
            <div className="col-12 col-lg-3 col-xl-3 gap-3 d-flex flex-column mb-3">
              <CategorySidebar categories={categories?.categories} parentCategory={categories?.parent_category} />
              {bannerResponse?.offers?.length > 0 && initialFiltered.length > 0 && (
                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3">
                  <h4 className='text-capitalize'>Banner Offers</h4>
                  {/* <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span> */}
                  <SidebarBanners bannerResponse={bannerResponse?.offers} domain={companyDomain.domain} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} categoryId={categoryId} companyId={c_data?.unique_id} pageType='category' />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CategoryMerchantPageSchema category_id={categoryId} category_name={catRes?.name} company_id={c_data?.unique_id} company_name={c_data?.company_name} currentPage={page} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} slug={slug} />
    </>
  )
}

export default page
