import React from 'react'
import cookieService from '@/services/CookiesService'
import { apiCategoryOfferBanners, apiCategoryOffers, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user'
import MerchantsCarousel from '@/components/Theme-4/comp/MerchantsCarousel'
import { notFound, redirect } from 'next/navigation'
import { getLastUpdateDate, getRandomRating, getRandomStoreSeoTitle } from '@/constants/hooks'
import Link from 'next/link'
import { apiGetProductCategoryMerchant } from '@/apis/page_optimization'
import PageBanner from '@/components/Theme-4/comp/PageBanner'
import OfferCard from '@/components/Theme-4/comp/OfferCard'
import Pagination from '@/components/Theme-4/comp/Pagination'
import VerticalBanner from '@/components/Theme-4/comp/VerticalBanner'
import Image from "next/image";

// interface Props {
//   params: Promise<{ slug: string[] }>;
// }
interface Props {
  params: { slug: string[] };
}



const CategoryMerchantPage = async ({ params }: Props) => {
  const { slug } = await params;
  // const { slug } = params;
  const companyDomain = await cookieService.get("domain");
  // First get company data (needed for everything else)
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
  const merchants = (await apiGetProductCategoryMerchant(c_data.unique_id)).data;


  const socialLinks = {
    facebook: c_data?.facebook,
    twitter: c_data?.twitter,
    instagram: c_data?.instagram,
    linkedin: c_data?.linkedin,
    pinterest: c_data?.pinterest,
    youtube: c_data?.youtube,
    flipboard: c_data?.flipboard,
    tiktok: c_data?.tiktok,
    threads: c_data?.threads,
  };

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

  // --- Parallel API calls ---
  const catRes = (await apiGetCategoryUniqueId(cleanSlug, c_data?.unique_id))?.data;

  // ✅ Extract categoryId AFTER catRes resolves
  const categoryId = catRes?.unique_id;
  if (!categoryId) return notFound();

  const categoryDataRes = (await apiCategoryOffers(categoryId, c_data?.unique_id, page))?.data;
  const categoryData = categoryDataRes?.offers;
  const suggestedCategories = (await apiSuggestedCategory(categoryId))?.data?.categories;
  const bannerOffers = (await apiCategoryOfferBanners(categoryId, c_data?.unique_id, page))?.data?.offers;
  const categorySegments = categorySlug.split("/");
  const offersPerPage = categoryDataRes?.pagination?.per_page;

  return (
    <>
      <section className="pb-16 bg-gray-50">
        <PageBanner
          title={catRes.name}
          image="/themes/Theme_3/images/banner-illus-10.png"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/category" },
            ...categorySegments?.map((part, idx) => {
              const path = `/category/${categorySegments.slice(0, idx + 1).join("/")}`;
              return {
                label: decodeURIComponent(part.replace(/-/g, " ")),
                href: idx < categorySegments.length - 1 ? path : undefined, // last one = current page
              };
            }) || [],
          ]}
        />

        <div className="max-w-[1400px] mx-auto px-4 mt-6">
          {/* Heading */}
          <h2
            className="stores-heading text-center text-2xl md:text-3xl font-extrabold 
              text-transparent bg-clip-text 
              bg-gradient-to-r from-[var(--primary-color)] to-orange-500 
              leading-tight pb-4 md:pb-10"
          >
            Trending Merchants in {getRandomStoreSeoTitle(catRes.name)}
          </h2>

          {/* Carousel */}
          <MerchantsCarousel merchants={merchants} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-[1400px] mx-auto px-2 md:px-0 md:pl-8">
          {/* Left Column (Main Content) */}
          <div className="mt-6 lg:col-span-3 space-y-12">
            {/* Offers Section */}
            <div>
              {categoryData?.length ? (
                <>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    Top {catRes.name} vouchers to help you save
                  </h2>
                  <p className="text-left text-gray-600 text-base md:text-lg font-medium italic mb-6">
                    All deals in this category are hand-tested.
                    Last verified on: {getLastUpdateDate(1)}.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {categoryData.map((item, index) => (
                      <OfferCard
                        key={index}
                        image={`/${item?.merchant?.merchant_logo}`}
                        title={item?.offer?.offer_title}
                        expiry={item?.offer?.end_date}
                        href={item?.offer?.url}
                        unique_id={item?.offer?.unique_id}
                        domain={c_data?.permanent_domain}
                        mer_slug={c_data?.store_slug}
                        slug_type={c_data?.slug_type}
                        id={item?.offer?.id}
                        merchant={item?.merchant}
                      />
                    ))}
                  </div>

                  {categoryDataRes?.pagination?.last_page > 1 && (
                    <Pagination
                      page={page.toString()}
                      pagination={categoryDataRes?.pagination}
                      basePath={`/category/${categorySlug}`}
                    />
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-center italic mt-8">
                  No deals available for this category at the moment.
                </p>
              )}
            </div>
          </div>

          {/* Right Column (Sidebar Banners) */}
          <div className="space-y-6">
            {/* Related Categories Section */}
            {suggestedCategories.length ? (
              <div className="mt-12 bg-white rounded-xl shadow-md p-3">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-left">
                  Explore Related {catRes?.name} Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                  {suggestedCategories?.map((cat, idx) => (
                    
                    <Link
                      key={idx}
                      href={`/${cat.url}`}
                      className="no-underline px-3 py-2 rounded-full border border-gray-200 bg-gray-50 
                      text-gray-700 font-medium text-sm
                      hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-orange-500 
                    hover:text-white hover:shadow-md transition-all"
                    >
                      {cat?.name}
                      
                    </Link>
                    
                  ))}
                </div>
              </div>
            ) : null
            }
            {bannerOffers?.length ? (

              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="text-2xl font-bold text-gray-800 text-left">
                  Banner Offers
                </h3>
                {bannerOffers?.map((banner, idx: number) => (
                  <VerticalBanner key={idx} url={banner?.offer?.url} image={banner?.offer?.banner_image} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}

export default CategoryMerchantPage
