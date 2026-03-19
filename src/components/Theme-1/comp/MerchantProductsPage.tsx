import { apiCompanyUpdatedData, apiGetMerchantProducts } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getLastUpdateDate, getMerchantHref, getMerchantProductsSeo, getProductDetailHref } from '@/constants/hooks'
import { apiGetMerchantUniqueId } from '@/apis/merchant'
import EventsCardUpdated from './EventsCardUpdated'

interface Props {
    slug: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
}

const MerchantProductsPage = async ({slug, companyId, storeSlug, slugType}: Props) => {
    const companyDomain = (await cookieService.get("domain"));
    const [products, merRes] = await Promise.all([
        apiGetMerchantProducts(companyId, slug).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data)
    ]);
    return (
        <>
            <section className="breadcrumb border-bottom p-0 d-block section-bg position-relative z-index-1">
            
                            <div className="breadcrumb-two">
                                <Image
                                    src="/themes/Theme_1/images/gradients/breadcrumb-gradient-bg.png"
                                    alt="pattern" className="bg-pattern"
                                    width={1000} height={400}
                                />
                                <div className="container container-two">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-12">
                                            <div className="breadcrumb-two-content text-center">
            
                                                <ul className="breadcrumb-list flx-align gap-2 mb-2 justify-content-center">
                                                    <li className="breadcrumb-list__item font-14 text-body">
                                                        <a href={"/"} className="breadcrumb-list__link text-body hover-text-main">Home</a>
                                                    </li>
                                                    <li className="breadcrumb-list__item font-14 text-body">
                                                        <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                                                    </li>
                                                    <li className="breadcrumb-list__item font-14 text-body">
                                                        <a href={`/products`} className="breadcrumb-list__link text-body hover-text-main">Products</a>
                                                    </li>
                                                    <li className="breadcrumb-list__item font-14 text-body">
                                                        <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                                                    </li>
                                                     <li className="breadcrumb-list__item font-14 text-body">
                                                        <span className="breadcrumb-list__text">{slug}</span>
                                                    </li>
                                                </ul>
            
                                                <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">{getMerchantProductsSeo(merRes?.merchant_name)}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

            <section className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <div className="container">
                    <h2 className='display-four n17-color f-28'>{`Discover Quality Discount Products from ${merRes?.merchant_name}`}</h2>
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                                {products?.length > 0 && products.map((item, i) => (
                                    <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                        <EventsCardUpdated
                                            item={item}
                                            merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                                            merchant_name={merRes?.merchant_name}
                                            merchant_logo={merRes?.merchant_logo}
                                            productDetailUrl={getProductDetailHref(merRes, slugType, item.slug)}
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
