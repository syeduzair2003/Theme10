import React from 'react'
import { CompanyWiseMerchant } from '@/services/dataTypes'
import { apiMerchantDetailsByCategory } from '@/apis/merchant'
import Image from 'next/image'
import Link from 'next/link'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import { filterOfferBanners, getRandomCategoryCouponsTitle, getRandomCategorySeoTitle } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import { apiCategoryOfferBanners, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user'
import ScrollButtonLeft from '@/components/Theme-3/comp/ScrollButtonLeft'
import StoreCard from '@/components/Theme-3/comp/StoreCard'
import ScrollButtonRight from '@/components/Theme-3/comp/ScrollButtonRight'
import CategoryOffers from '@/components/Theme-3/comp/CategoryOffers'
import CategorySidebar from '@/components/Theme-3/comp/CategorySidebar'
import VerticalCategoryOfferBanner from '@/components/Theme-3/comp/VerticalCategoryOfferBanner'
import { notFound, redirect } from 'next/navigation'
import CategoryMerchantPageSchema from '@/components/shared/SchemaScripts/CategoryMerchantPageSchema'

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
      <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
        <div className="container position-relative">
          <div className="row g-9 g-lg-0 align-items-center d-flex">
            <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
              <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                <h1 className="display-four n17-color f-35">{getRandomCategorySeoTitle(catRes?.name)}</h1>
                <div className="breadcrumb-area">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                      <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                        <Link href={`/`} className="n17-color">Home</Link>
                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }} />
                      </li>
                      <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                        <Link href={`/category`} className="n17-color">Category</Link>
                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }} />
                      </li>
                      {categorySlug?.split("/")?.slice(0, categorySlug?.split("/")?.length - 1)?.map((slug, index) => {
                        const href = `/category/${categorySlug?.split("/")?.slice(0, index + 1).join('/')}`;
                        return (
                          <li key={index} className="d-flex align-items-center fs-seven justify-content-center gap-2">
                            <Link href={href} className="n17-color text-capitalize">
                              {slug.replace(/-/g, ' ')}
                            </Link>
                            <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                          </li>
                        );
                      })}
                      <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color">{catRes?.name}</span></li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
              <div className="img-area d-flex justify-content-end align-items-end" style={{ width: '100%', height: '100%' }}>
                <Image src="/themes/Theme_3/images/banner-illus-10.png" alt="img" width={300} height={260} style={{ objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sidebar py-5">
        <div className="container mb-7">
          <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
            <h3 className="display-four n17-color f-30">Trending Merchants in {getRandomCategorySeoTitle(catRes?.name)}</h3>
          </div>
          <div className="position-relative my-4">
            <ScrollButtonLeft sectionType="merchant" />
            <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-2" style={{ scrollBehavior: 'smooth' }}>
              {merchants?.merchants?.length > 0 ? (
                merchants?.merchants.map((merchant: CompanyWiseMerchant, i) => {
                  return (
                    <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-2">
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
            <ScrollButtonRight sectionType="merchant" />
          </div>
        </div>
      </section>
      {/* <section className="section-sidebar" style={{ paddingTop: "20px", paddingBottom: "50px" }}>
                <div className="container mb-7">
                    <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
                        <h3 className="display-four n17-color f-30">Suggested Categories</h3>
                    </div>
                    <div className="position-relative my-4">
                        <ScrollButtonLeft sectionType='category' />
                        <div className="row horizontal-scroll horizontal-scroll-category flex-nowrap overflow-auto py-2" style={{ scrollBehavior: 'smooth' }}>
                            {categories?.length > 0 && categories?.map((category, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="col-6 col-sm-4 col-md-3 col-lg-2 flex-shrink-0 px-2"
                                        style={{ minWidth: "150px" }}
                                    >
                                        <CategoryCards category={category} domain={domain} />
                                    </div>
                                );
                            })}
                        </div>
                        <ScrollButtonRight sectionType='category' />
                    </div>
                </div>
            </section> */}
      <section className="section-sidebar py-5">
        <div className="container mb-7">
          <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
            <h3 className="display-four n17-color f-30">{getRandomCategoryCouponsTitle(catRes?.name)}</h3>
          </div>
          <div className="row">
            <div className="col-xl-8 col-xxl-8 cus-z1">
              <CategoryOffers category_id={categoryId} url_slug={categorySlug?.split("/")} page={page?.toString()} company_id={c_data?.unique_id} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />
            </div>
            <div className="col-xl-4 col-xxl-4 mt-10 mt-xl-0">
              <div className="sidebar-common cus-overflow sidebar-head primary-sidebar">
                <div className="side-wrapper bg-transparent rounded-4">
                  <div className="sidebar-wrapper pb-12 pb-lg-0 d-flex flex-column gap-6">
                    <div className="sidebar-area">
                      {categories?.categories?.length > 0 && (
                        <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth mb-3">
                          <CategorySidebar categories={categories?.categories} cat_slug='category' slug_type={c_data?.slug_type} parentCategory={categories?.parent_category} />
                          {/* <VerticalCategoryOfferBanner bannerResponse={bannerResponse.data?.offers} domain={domain} mer_slug={store_slug} slug_type={slug_type} categoryId={categoryId} companyId={company_id}/> */}
                        </div>
                      )}
                      {bannerResponse?.offers?.length > 0 && initialFiltered.length > 0 && (
                        <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                          <h4 className="n17-color mb-4 mb-md-6">Banner Offers</h4>
                          <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                          <VerticalCategoryOfferBanner bannerResponse={bannerResponse?.offers} domain={companyDomain.domain} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} categoryId={categoryId} companyId={c_data?.unique_id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CategoryMerchantPageSchema category_id={categoryId} category_name={catRes?.name} company_id={c_data?.unique_id} company_name={c_data?.company_name} currentPage={page} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} slug={slug} />
    </>
  )
}

export default CategoryMerchantPage
