import { apiCategoryOfferBanners, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation';
import { apiMerchantDetailsByCategory } from '@/apis/merchant';
import { filterOfferBanners, getBaseImageUrl, getMerchantHref, getProductDetailHref, getRandomCategoryCouponsTitle, getRandomCategorySeoTitle } from '@/constants/hooks';
import BrowseDeal from '@/components/Theme-1/comp/BrowseDeal';
import CategorySidebar from '@/components/Theme-1/comp/CategorySidebar';
import VerticalCategoryOfferBanner from '@/components/Theme-1/comp/VerticalCategoryOfferBanner';
import CategoryMerchantPageSchema from '@/components/shared/SchemaScripts/CategoryMerchantPageSchema';
import NewBrowseDeal from '@/components/Theme-1/comp/NewBrowseDeal';
import CategoryOfferCard from '@/components/Theme-1/comp/CategoryOfferCard';


interface Props {
    params: Promise<{ slug: string[] }>;
}

const SubCategoryPage = async ({ params }: Props) => {

    const { slug } = await params;
    const companyDomain = await cookieService.get("domain");

    const c_data = (await apiCompanyUpdatedData(companyDomain))?.data;

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

    if (!isPaginated && CategoryCheck.length == 1 && catRes?.parent_category_id != null) {
        return redirect(`/${catRes?.url}`);
    }
    // ✅ Extract categoryId AFTER catRes resolves
    const categoryId = catRes?.unique_id;
    if (!categoryId) return notFound();

    const [merchants, bannerResponse, categories] = await Promise.all([
        apiMerchantDetailsByCategory(categoryId, c_data?.unique_id).then(res => res.data),
        apiCategoryOfferBanners(categoryId, c_data?.unique_id, 1).then(res => res.data),
        apiSuggestedCategory(categoryId).then(res => res.data),
    ]);

    const initialFiltered = filterOfferBanners(bannerResponse?.offers || [], 50, 2000, 65, 2000);

    return (
        <>
            <section className="breadcrumb border-bottom p-0 d-block section-bg position-relative z-index-1">
                <div className="breadcrumb-two">
                    <div className="container container-two">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="breadcrumb-two-content text-center">

                                    {/* Breadcrumb List */}
                                    <ul className="breadcrumb-list flx-align gap-2 mb-2 justify-content-center">
                                        {/* Home */}
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <Link href="/" className="breadcrumb-list__link text-body hover-text-main">
                                                Home
                                            </Link>
                                        </li>

                                        {/* Category root */}
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10">
                                                <i className="fas fa-chevron-right"></i>&nbsp;
                                            </span>
                                            <Link href="/category" className="breadcrumb-list__link text-body hover-text-main">
                                                Category
                                            </Link>
                                        </li>

                                        {/* Dynamic intermediate slugs */}
                                        {categorySlug
                                            ?.split("/")
                                            ?.slice(0, categorySlug?.split("/")?.length - 1)
                                            ?.map((slug, index) => {
                                                const href = `/category/${categorySlug
                                                    ?.split("/")
                                                    ?.slice(0, index + 1)
                                                    .join("/")}`;

                                                return (
                                                    <li key={index} className="breadcrumb-list__item font-14 text-body">
                                                        <span className="breadcrumb-list__icon font-10">
                                                            <i className="fas fa-chevron-right"></i>&nbsp;
                                                        </span>
                                                        <Link
                                                            href={href}
                                                            className="breadcrumb-list__link text-body hover-text-main text-capitalize"
                                                        >
                                                            {slug.replace(/-/g, " ")}
                                                        </Link>
                                                    </li>
                                                );
                                            })}

                                        {/* Final active breadcrumb */}
                                        <li
                                            className="breadcrumb-list__item font-14 text-body active"
                                            aria-current="page"
                                        >
                                            <span className="breadcrumb-list__icon font-10">
                                                <i className="fas fa-chevron-right"></i>&nbsp;
                                            </span>
                                            <span className="breadcrumb-list__text text-capitalize">
                                                {catRes?.name}
                                            </span>
                                        </li>
                                    </ul>

                                    {/* Page Title */}
                                    <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">
                                        {getRandomCategorySeoTitle(catRes?.name)}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="d-grid gap-2 gap-md-6 position-relative cus-z1 py-3 ">
                        <h3 className="display-four n17-color f-30">Trending Merchants in {getRandomCategorySeoTitle(catRes?.name)}</h3>
                    </div>
                    <div className="row horizontal-scroll horizontal-scroll-mer flex-nowrap overflow-auto bg-light py-3">
                        {merchants?.merchants?.length > 0 &&
                            merchants.merchants.map((mer, i) => (
                        <div
                            key={i}
                            className="col-6 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-3"
                        >
                            <div className="mer-card card border-0 shadow-sm text-center h-100">
                                <div className="card-body d-flex flex-column align-items-center justify-content-between gap-1">
                                    <div className="mer-logo">
                                        <Image
                                            src={getBaseImageUrl(companyDomain?.domain, mer?.merchant_logo, "")}
                                            alt={mer?.merchant_name}
                                            width={120}
                                            height={120}
                                            className="img-fluid"
                                            unoptimized
                                        />
                                    </div>
                                    <Link
                                        href={getMerchantHref(mer, c_data?.store_slug, c_data?.slug_type)}
                                        className="mer-btn text-decoration-none fw-semibold"
                                    >
                                        {mer?.merchant_name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                ))}
                    </div>
                </div>
            </section>
            <section className='bg-light'>
                <div className="container ">
                    <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-3">
                        <h3 className="display-four n17-color f-30">{getRandomCategoryCouponsTitle(catRes?.name)}</h3>
                    </div>
                    <div className="row flex-column flex-xl-row flex-lg-row flex-md-row">
                        <div className="col-12 col-sm-12 col-lg-8 col-xl-8 col-md-8">
                            {bannerResponse?.offers?.length > 0 &&
                                bannerResponse?.offers?.map((offer, index) => (
                                    <div key={index} className=" mb-3">
                                        <CategoryOfferCard
                                            item={offer.offer}
                                            merchantHref={getMerchantHref(offer, catRes?.slug, c_data?.slug_type)}
                                            merchant_name={offer?.merchant?.merchant_name}
                                            merchant_logo={getBaseImageUrl(companyDomain?.domain, offer?.offer?.product_image || offer?.merchant?.merchant_logo, "")}
                                            // productDetailUrl={offer?.offer.slug ? getProductDetailHref(offer?.merchant, slug_type, offer?.offer.slug) : null}
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="col-xs-12 col-lg-4 col-xl-4 col-md-4">
                            {categories?.categories?.length > 0 && (
                                <div className="modern-sidebar p-4 rounded-4 shadow-sm bg-white mb-3">
                                    <CategorySidebar categories={categories?.categories} cat_slug='category' slug_type={c_data?.slug_type} parentCategory={categories?.parent_category} />
                                </div>
                            )}
                            {bannerResponse?.offers?.length > 0 && initialFiltered.length > 0 && (
                                <div className="modern-sidebar p-4 rounded-4 shadow-sm bg-white mb-3">
                                    <h4 className="n17-color mb-4 mb-md-6">Banner Offers</h4>
                                    <VerticalCategoryOfferBanner bannerResponse={bannerResponse?.offers} domain={companyDomain.domain} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} categoryId={categoryId} companyId={c_data?.unique_id} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <CategoryMerchantPageSchema category_id={categoryId} category_name={catRes?.name} company_id={c_data?.unique_id} company_name={c_data?.company_name} currentPage={page} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} slug={slug} />
        </>
    )
}

export default SubCategoryPage
