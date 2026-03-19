import { apiCompanyUpdatedData, apiGetCategoryProducts, apiGetMerchantProducts } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getLastUpdateDate, getMerchantHref, getMerchantProductsSeo, getProductDetailHref } from '@/constants/hooks'
import { apiGetMerchantUniqueId } from '@/apis/merchant'
import EventsCard from './EventsCard'
import ScrollButtonLeft from './ScrollButtonLeft'
import ScrollButtonRight from './ScrollButtonRight'

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
            <section className="breadcrumb-green">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <ul className="flx-align gap-2 mb-2 justify-content-center">
                                    <li className="font-14 text-body">
                                        <a href={"/"} className="text-body hover-text-main">Home</a>
                                    </li>
                                    <li className="font-14 text-body">
                                        <span className="font-10">
                                            <FontAwesomeIcon
                                                icon={faGreaterThan}
                                                style={{ width: '10px', height: '10px', color: 'white' }}
                                            />
                                        </span>
                                    </li>
                                    <li className="font-14 text-body">
                                        <a href={`/products`} className="text-body hover-text-main">Products</a>
                                    </li>
                                    <li className="font-14 text-body">
                                        <span className="font-10">
                                            <FontAwesomeIcon
                                                icon={faGreaterThan}
                                                style={{ width: '10px', height: '10px', color: 'white' }}
                                            />
                                        </span>
                                    </li>
                                    <li className="font-14 text-body">
                                        <span className="text-white">{slug}</span>
                                    </li>
                                </ul>
                                <h1 className="mb-0 text-capitalize text-white">
                                    {merRes?.merchant_name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <div className="container">
                    {cat?.length > 0 && (
                        <> {/* <-- Added opening Fragment */}
                            <h2 className='n17-color my-2 mer-heading pt-4' style={{ fontSize: "30px" }}>
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
                                                        className="my-auto"
                                                        style={{ paddingLeft: '10px' }}
                                                    >
                                                        {/* (Your image/icon will go here) */}
                                                    </Link>

                                                    {/* Text & Details Area */}
                                                    <div className="category-main-text align-items-center">
                                                        <Link href={`/products/${slug}/${item.slug}`}>
                                                            <h4 className="brand-name fw-bold fw-5 mb-2 f-18">
                                                                {item.name}
                                                            </h4>
                                                        </Link>
                                                    </div>
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
                    <h2 className='n17-color my-2 mer-heading pt-4' style={{ fontSize: "30px" }}>{`Discover Quality Discount Products from ${merRes?.merchant_name}`}</h2>
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                                {products?.length > 0 && products.map((item, i) => (
                                    <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                        <EventsCard
                                            item={item}
                                            merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
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
        </>
    )
}

export default MerchantProductsPage
