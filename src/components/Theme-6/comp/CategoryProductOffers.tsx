import { apiGetCategoryProductsOffer } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getMerchantHref, getProductDetailHref } from '@/constants/hooks'
import { apiGetMerchantUniqueId } from '@/apis/merchant'
import EventsCard from './EventsCard'

interface Props {
    slug: string;        // merchant slug e.g. "amazon.com"
    companyId: string;
    storeSlug: string;
    slugType: string;
    category: string;    // category slug e.g. "healthcare"
}

const CategoryOffersPage = async ({ slug, companyId, storeSlug, slugType, category }: Props) => {
    const companyDomain = await cookieService.get("domain");

    const [products, merRes] = await Promise.all([
        apiGetCategoryProductsOffer(companyId, slug, category).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data),
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
                                        <span className="text-white">{merRes?.merchant_name}</span>
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
                                        <span className="text-white">{category}</span>
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
                    <h2 className='n17-color my-2 mer-heading pt-4' style={{ fontSize: "30px" }}>
                        {`Discover ${category} Products from ${merRes?.merchant_name}`}
                    </h2>
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

export default CategoryOffersPage