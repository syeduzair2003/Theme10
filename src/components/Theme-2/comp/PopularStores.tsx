import { apiGetTopMerchants } from '@/apis/page_optimization';
import { getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeading } from '@/constants/hooks';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import StoreCard from './StoreCard';
import StoreCardThree from './StoreCardThree';
import cookieService from '@/services/CookiesService';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}
const PopularStores = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const merchants = (await apiGetTopMerchants(companyId)).data;
    const [firstHalf, secondHalf] = splitHeading(merchants?.top_merchants_widget?.widget_heading);
    const heading = merchants?.top_merchants_widget?.widget_heading ? merchants?.top_merchants_widget?.widget_heading : "Top Merchants"
    const companyDomain = (await cookieService.get("domain")).domain;
    const count = 12
    if (!merchants?.merchants?.length) return null;
    return (
        <div className="bg py-4">
            <div className="container">
                <div className="row g-2">
                    <div className="col-12 col-md-12 col-sm-12 col-xs-12 mb-3">
                        <div className="section-box rounded-3 shadow-sm">
                            <div className="row">
                                <div className="col-12 col-md-10 col-sm-9 col-xs-9">
                                    <div className="boxbg p-2 w-100">
                                        <h1 className='opacity-80 f-25 m-0'>{heading}</h1>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-3 col-xs-3">
                                    <div className="symbol">
                                        <Link href={`/all-stores/A`}>
                                            <h5 className='f-13 m-0'>View All
                                                <i className="flaticon-external-link-symbol" style={{ height: "20px", width: "20px" }}></i>
                                            </h5>
                                        </Link>
                                    </div>
                                </div>
                                {merchants?.top_merchants_widget?.widget_text && (
                                <div className="col-md-12 col-sm-12 col-xs-12 pt-2">
                                    <p>
                                        {merchants?.top_merchants_widget?.widget_text}
                                    </p>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                        {merchants?.merchants?.length > 0 &&
                            merchants?.merchants?.slice(0, count)?.map((merchant, i) => (                        
                        // <div key={i} className="col-md-3 col-sm-3 col-xs-6">
                        //     <StoreCardThree merchant={merchant} mer_slug={mer_slug} mer_slug_type={mer_slug_type}/>
                        // </div>
                        <div
                            key={i}
                            className="col-4 col-sm-3 col-md-2 col-lg-2 d-flex justify-content-center my-2"
                        >
                            <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className='w-100'>
                            <div className="merchant-logo-card">
                                <Image
                                    src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")}
                                    alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
                                    width={160}
                                    height={80}
                                    className="merchant-logo"
                                />
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PopularStores
