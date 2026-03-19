import { apiCompanyUpdatedData, apiGetProductMerchants } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getProductMerchantHref } from '@/constants/hooks'
import MerchantForProduct from '../../comp/MerchantForProduct'
import ProductsSchema from '@/components/shared/SchemaScripts/ProductsSchema'

const page = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    const merchants = (await apiGetProductMerchants(companyData?.unique_id)).data;

    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-35">
                                    {'Get Top Discounts on Popular brand Products'}
                                </h1>
                                {/* Breadcrumbs */}
                                <div className="breadcrumb-area">
                                    <div className="breadcrumb-area">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                                <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                    <Link href={`/`} className="n17-color">Home</Link>
                                                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                                </li>
                                                <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">Products</span></li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div
                                className="img-area d-flex justify-content-end align-items-end position-relative"
                                style={{ width: '100%', minHeight: '350px' }}  // ✅ define height
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
                    <h2 className='display-four n17-color f-28 py-5'>Browse Discounted Products from All Leading Brands</h2>
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                                {merchants?.length > 0 && merchants?.map((item, i) => (
                                    <div key={i} className="col-8 col-sm-6 col-md-4 col-xl-3">
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
            <ProductsSchema company_id={companyData.unique_id}/>
        </>
    )
}

export default page
