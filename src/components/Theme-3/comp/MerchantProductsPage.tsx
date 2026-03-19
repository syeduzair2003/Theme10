import { apiCompanyUpdatedData, apiGetCategoryProducts, apiGetMerchantProducts } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getLastUpdateDate, getMerchantHref, getMerchantProductsSeo, getProductDetailHref } from '@/constants/hooks'
import EventOfferCard from '@/components/Theme-3/comp/EventOfferCard'
import { apiGetMerchantUniqueId } from '@/apis/merchant'
import ScrollButtonLeft from './ScrollButtonLeft'
import ScrollButtonRight from './ScrollButtonRight'
import MerchantProductsSchema from '@/components/shared/SchemaScripts/ProductsMerchantSchema'

interface Props {
    slug: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
}

const MerchantProductsPage = async ({ slug, companyId, storeSlug, slugType }: Props) => {
    const companyDomain = (await cookieService.get("domain"));
    const [products, merRes, cat] = await Promise.all([
        apiGetMerchantProducts(companyId, slug).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data),
        apiGetCategoryProducts(companyId, slug).then(res => res.data)
    ]);
    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-35">
                                    {getMerchantProductsSeo(merRes?.merchant_name)}
                                </h1>
                                <div className="breadcrumb-area">
                                    <div className="breadcrumb-area">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                                <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                    <Link href={`/`} className="n17-color">Home</Link>
                                                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                                </li>
                                                <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                    <Link href={`/products`} className="n17-color">Products</Link>
                                                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                                </li>
                                                <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">{slug}</span></li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div
                                className="img-area d-flex justify-content-end align-items-end position-relative"
                                style={{ width: '100%', minHeight: '350px' }}
                            >
                                <Image
                                    src="/shared-assets/BANNER.png"
                                    alt="img"
                                    fill
                                    style={{ objectFit: 'cover' }}  // ✅ cover fills entire box
                                    sizes="(max-width: 768px) 100vw, 50vw" // ✅ responsive optimization
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <div className="container">
                    {cat?.length > 0 && (
                        <>
                            <h2 className='display-four n17-color f-28 py-5 text-capitalize'>
                                {`Product Categories for ${merRes?.merchant_name}`}
                            </h2>

                            <div className="position-relative my-4 px-5">
                                <div className="position-absolute start-0 top-50 translate-middle-y" style={{ zIndex: 10 }}>
                                    <ScrollButtonLeft sectionType="category" />
                                </div>

                                <div
                                    className="horizontal-scroll-category d-flex flex-nowrap overflow-auto py-2"
                                    style={{
                                        scrollBehavior: "smooth",
                                        gap: "16px",
                                    }}
                                >
                                    {cat.map((item: { id: number; name: string; slug: string }, i: number) => (
                                        <div key={item.id || i} className="flex-shrink-0" style={{ width: "260px" }}>
                                            <div className="custom-col my-custom-ani">
                                                <div className="custom-card position-relative gap-3 rounded-3">
                                                    <Link
                                                        href={`/products/${slug}/${item.slug}`}
                                                        className="my-auto mx-auto"
                                                        style={{ paddingLeft: '10px' }}
                                                    >
                                                        <div className="category-main-text text-center">
                                                            <h4 className="brand-name fw-bold fw-5 mb-2 f-18">
                                                                {item.name}
                                                            </h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="position-absolute end-0 top-50 translate-middle-y" style={{ zIndex: 10 }}>
                                    <ScrollButtonRight sectionType="category" />
                                </div>
                            </div>
                        </>
                    )}
                    <h2 className='display-four n17-color f-28 py-5'>{`Discover Quality Discount Products from ${merRes?.merchant_name}`}</h2>
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                                {products?.length > 0 && products.map((item, i) => (
                                    <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                        <EventOfferCard
                                            product={item}
                                            merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                                            domain={companyDomain.domain}
                                            merchant_name={merRes?.merchant_name}
                                            merchant_logo={merRes?.merchant_logo}
                                            productDetailUrl={getProductDetailHref(merRes, slugType, item.slug, item?.category?.slug)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MerchantProductsSchema company_id={companyId} merchantSlug={slug} merchantName={merRes?.merchant_name} />
        </>
    )
}

export default MerchantProductsPage
