import { apiCompanyUpdatedData, apiGetProductMerchants } from '@/apis/user';
import { getProductMerchantHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import React from 'react'
import MerchantForProduct from '../../comp/MerchantForProduct';


const page = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    const merchants = (await apiGetProductMerchants(companyData?.unique_id)).data;

    return (
        <>
            <section className="breadcrumb-green">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <ul className="flx-align gap-2 mb-2 justify-content-center">
                                <li className="font-14 text-body">
                                    <a href={"/"} className="text-body hover-text-main">
                                        Home
                                    </a>
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
                                    <span className="text-white">Products</span>
                                </li>
                            </ul>

                            <h1 className="mb-0 text-capitalize">Our Trending Products</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <div className="container">
                    <h2 className='n17-color my-3' style={{fontSize:"30px"}}>Browse Discounted Products from All Leading Brands</h2>
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
