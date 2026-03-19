import React from 'react'
import { CompanyWiseMerchant } from '@/services/dataTypes'
import { apiMerchantDetailsByCategory } from '@/apis/merchant'
import Link from 'next/link'
import { filterOfferBanners, getRandomCategoryCouponsTitle, getRandomCategorySeoTitle, splitHeading } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import { apiCategoryOfferBanners, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user'
import { notFound, redirect } from 'next/navigation'
import Footer from '../../../comp/Footer'
import CategoryOffers from '../../../comp/CategoryOffers'
import CategorySidebar from '../../../comp/CategorySidebar'
import VerticalCategoryOfferBanner from '../../../comp/VerticalCategoryOfferBanner'
import StoreCard from '../../../comp/StoreCard'

interface Props {
  params: Promise<{ slug: string[] }>
}


const CategorySlugPage = async ({ params }: Props) => {
  const { slug } = await params
  const companyDomain = await cookieService.get("domain")

  if (slug?.length > 4 || slug[0] === 'category') {
    notFound()
  }

  if (slug[slug.length - 1] === "page") {
    const cleanUrl = `/category/${slug.slice(0, slug.length - 1).join("/")}`
    redirect(cleanUrl)
  }

  const c_data = (await apiCompanyUpdatedData(companyDomain)).data

  let page = 1
  const isPaginated = slug.length >= 2 && slug[slug.length - 2] === "page"

  if (isPaginated) {
    page = parseInt(slug[slug.length - 1], 10) || 1
    if (page === 1) {
      const cleanUrl = `/category/${slug.slice(0, -2).join("/")}`
      redirect(cleanUrl)
    }
  }

  const cleanSlug = isPaginated
    ? slug[slug.length - 3]
    : slug[slug.length - 1]

  const categorySlug = slug
    .slice(0, isPaginated ? -2 : undefined)
    .join("/")

  const CategoryCheck = slug
    .slice(0, isPaginated ? -2 : undefined)

  const catRes = (await apiGetCategoryUniqueId(cleanSlug, c_data?.unique_id)).data

  if (!isPaginated && CategoryCheck.length == 1 && catRes?.parent_category_id != null) {
    return redirect(`/${catRes?.url}`)
  }

  const categoryId = catRes?.unique_id
  if (!categoryId) return notFound()

  const [merchants, bannerResponse, categories] = await Promise.all([
    apiMerchantDetailsByCategory(categoryId, c_data?.unique_id).then(res => res.data),
    apiCategoryOfferBanners(categoryId, c_data?.unique_id, 1).then(res => res.data),
    apiSuggestedCategory(categoryId).then(res => res.data),
  ])

  const initialFiltered = filterOfferBanners(bannerResponse?.offers || [], 50, 2000, 65, 2000)
  const categoryTitle = getRandomCategorySeoTitle(catRes?.name)
  const [firstHalf, secondHalf] = splitHeading(categoryTitle)

  return (
    <>
      {/* Hero Banner Section - Adjusted padding and text alignment for mobile */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-indigo-600/10 lg:skew-x-12 lg:translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
            <div className="w-full lg:w-3/5 space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl capitalize font-black text-white tracking-tight leading-tight md:leading-[1.05]">
                {firstHalf} <span className="text-indigo-400">{secondHalf}</span>
              </h1>

              {/* Breadcrumbs - made scrollable on very small screens to prevent wrapping */}
              <nav className="inline-flex max-w-full overflow-x-auto whitespace-nowrap items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-slate-400 backdrop-blur-md scrollbar-hide">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-2 md:mx-3 opacity-30">/</span>
                <Link href="/category" className="hover:text-white transition-colors">Category</Link>
                {categorySlug?.split("/")?.slice(0, categorySlug?.split("/")?.length - 1)?.map((slugPart, index) => {
                  const href = `/category/${categorySlug?.split("/")?.slice(0, index + 1).join('/')}`
                  return (
                    <React.Fragment key={index}>
                      <span className="mx-2 md:mx-3 opacity-30">/</span>
                      <Link href={href} className="hover:text-white transition-colors capitalize">
                        {slugPart.replace(/-/g, ' ')}
                      </Link>
                    </React.Fragment>
                  )
                })}
                <span className="mx-2 md:mx-3 opacity-30">/</span>
                <span className="text-indigo-400">{catRes?.name}</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Merchants Section - Improved mobile scroll */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Trending <span className="text-indigo-600">Merchants</span>
            </h3>
          </div>
          <div className="relative">
            {/* Added -mx-4 and px-4 to allow scroll to touch screen edges */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollBehavior: 'smooth' }}>
              {merchants?.merchants?.length > 0 ? (
                merchants?.merchants.map((merchant: CompanyWiseMerchant, i) => (
                  <div key={i} className="flex-shrink-0 w-64 md:w-80">
                    <StoreCard merchant={merchant} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-16">
                  <h3 className="text-xl font-bold text-red-600">No Merchants Found</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Offers Section - Sidebar stacks on mobile */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight text-center md:text-left">
              {getRandomCategoryCouponsTitle(catRes?.name)}
            </h3>
          </div>

          {/* flex-col on mobile, flex-row on lg screens */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content - Takes full width on mobile */}
            <div className="w-full lg:flex-1 order-1">
              <CategoryOffers
                category_id={categoryId}
                url_slug={categorySlug?.split("/")}
                page={page?.toString()}
                company_id={c_data?.unique_id}
                mer_slug={c_data?.store_slug}
                mer_slug_type={c_data?.slug_type}
              />
            </div>
            {/* Sidebar - Stacks underneath on mobile (order-2) */}
            <aside className="w-full lg:w-80 space-y-8 order-2">
              {categories?.categories?.length > 0 && (
                <div className="bg-slate-50 lg:bg-transparent p-4 lg:p-0 rounded-2xl">
                  <CategorySidebar
                    categories={categories?.categories}
                    cat_slug='category'
                    slug_type={c_data?.slug_type}
                    parentCategory={categories?.parent_category}
                  />
                </div>
              )}

              {bannerResponse?.offers?.length > 0 && initialFiltered.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h4 className="text-xl font-bold text-slate-900">Banner Offers</h4>
                  </div>
                  <div className="p-2">
                    <VerticalCategoryOfferBanner
                      bannerResponse={bannerResponse?.offers}
                      domain={companyDomain.domain}
                      mer_slug={c_data?.store_slug}
                      slug_type={c_data?.slug_type}
                      categoryId={categoryId}
                      companyId={c_data?.unique_id}
                    />
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <Footer />

      {/* ... (Keep Schema Scripts) */}
    </>
  )
}

export default CategorySlugPage