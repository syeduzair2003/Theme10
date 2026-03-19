import { apiMerchantDetailsByCategory } from '@/apis/merchant';
import { apiCategoryOfferBanners, apiCompanyUpdatedData, apiGetCategoryUniqueId, apiSuggestedCategory } from '@/apis/user';
import notFound from '@/app/not-found';
import ScrollButtonLeft from '@/components/Theme-6/comp/ScrollButtonLeft';
import ScrollButtonRight from '@/components/Theme-6/comp/ScrollButtonRight';
import { filterOfferBanners, getBaseImageUrl, getMerchantHref, getRandomCategoryCouponsTitle, getRandomCategorySeoTitle } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { redirect } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import CategoryOfferCard from '@/components/Theme-6/comp/CategoryOfferCard';
import CategoryPageSidebar from '@/components/Theme-6/comp/CategoryPageSidebar';
import VerticalCategoryOfferBanner from '@/components/Theme-6/comp/VerticalCategoryOfferBanner';


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
            <section className="breadcrumb-green">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className=" text-center">
                            <ul className=" flx-align gap-2 mb-2 justify-content-center">

                                {/* Home */}
                                <li className="font-14 text-body">
                                    <a href={"/"} className="text-body hover-text-main">Home</a>
                                </li>

                                {/* Category root */}
                                <li className="font-14 text-body">
                                    <span className="font-10">
                                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} />
                                    </span>
                                    <a href={"/category"} className="text-body hover-text-main">
                                        Category
                                    </a>
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
                                            <li key={index} className="font-14 text-body">
                                                <span className="font-10">
                                                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} />
                                                </span>
                                                <a
                                                    href={href}
                                                    className="text-body hover-text-main text-capitalize"
                                                >
                                                    {slug.replace(/-/g, " ")}
                                                </a>
                                            </li>
                                        );
                                    })}

                                {/* Final active breadcrumb */}
                                <li className="font-14 text-body">
                                    <span className="font-10">
                                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} />
                                    </span>
                                    <span className="text-capitalize text-white">
                                        {catRes?.name}
                                    </span>
                                </li>
                            </ul>
                            <h1 className=" mb-0 text-capitalize">
                                {getRandomCategorySeoTitle(catRes?.name)}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="mer-heading pt-4">
                        <h3>Trending Merchants in {getRandomCategorySeoTitle(catRes?.name)}
                        </h3>
                    </div>
                    <div className="position-relative my-4">
                        <ScrollButtonLeft sectionType="merchant" />
                        <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-2" style={{ scrollBehavior: 'smooth' }}>
                            {merchants?.merchants?.length > 0 && merchants?.merchants?.map((mer, i) => {
                                return (
                                    <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-2">
                                        <Link href={getMerchantHref(mer, c_data?.store_slug, c_data?.slug_type)} className="text-decoration-none">
                                            <div className={`store-card d-flex flex-column h-100 `}>

                                                {/* Top Section: Logo */}
                                                <div className="store-card-img-wrapper d-flex align-items-center justify-content-center flex-grow-1">
                                                    <Image
                                                        className="merchant-logo"
                                                        src={getBaseImageUrl(companyDomain?.domain, mer?.merchant_logo, "")}
                                                        alt={mer?.merchant_name}
                                                        width={150} // Base width for aspect ratio
                                                        height={80} // Base height for aspect ratio
                                                        style={{
                                                            width: 'auto',
                                                            maxWidth: '80%',
                                                            height: 'auto',
                                                            maxHeight: '80px',
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                </div>

                                                {/* Bottom Section: Grey Footer */}
                                                <div className="store-card-footer d-flex align-items-center justify-content-center w-100">
                                                    <span className={`store-card-text text-center `}>
                                                        {mer?.merchant_name}
                                                    </span>
                                                </div>

                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <ScrollButtonRight sectionType="merchant" />
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="mer-heading pt-2">
                            <p> {getRandomCategoryCouponsTitle(catRes?.name)}
                            </p>
                        </div>
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
                            <div className="modern-sidebar p-4 rounded-4 shadow-sm mb-3">
                                <CategoryPageSidebar categories={categories?.categories} cat_slug='category' slug_type={c_data?.slug_type} parentCategory={categories?.parent_category} />
                            </div>
                            )}
                            {bannerResponse?.offers?.length > 0 && initialFiltered.length > 0 && (
                                <div className="modern-sidebar p-4 rounded-4 shadow-sm mb-3">
                                    <h4 className="n17-color mb-4 mb-md-6">Banner Offers</h4>
                                    <VerticalCategoryOfferBanner bannerResponse={bannerResponse?.offers} domain={companyDomain.domain} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} categoryId={categoryId} companyId={c_data?.unique_id} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default SubCategoryPage
