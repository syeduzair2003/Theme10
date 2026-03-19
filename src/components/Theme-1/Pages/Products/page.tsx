import { apiCompanyUpdatedData, apiGetProductMerchants } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getProductMerchantHref } from '@/constants/hooks'
import MerchantForProduct from '../../comp/MerchantForProduct'


const page = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    const merchants = (await apiGetProductMerchants(companyData?.unique_id)).data;

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
                                            <span className="breadcrumb-list__text">Products</span>
                                        </li>
                                    </ul>

                                    <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">Our Trending Products</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <div className="container">
                    <h2 className='display-four n17-color f-28'>Browse Discounted Products from All Leading Brands</h2>
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4">
                                {merchants?.length > 0 && merchants?.map((item, i) => (
                                    <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                        <MerchantForProduct
                                            merchant_name={item?.merchant_name}
                                            merchant_logo={item?.merchant_logo || ""}
                                            companyDomain={companyDomain.domain}
                                            merchant_href={getProductMerchantHref(item, companyData?.slug_type)}
                                            discountTag={item?.promotional_tag}
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

export default page
