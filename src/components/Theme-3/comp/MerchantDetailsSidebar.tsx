import { apiMerchantDetails } from '@/apis/merchant';
import { getMerchantHref } from '@/constants/hooks';
import { Merchant } from '@/services/dataTypes';
import React from 'react'
import RenderRating from './RenderRating';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    merchant_id: string
    company_id: string
    mer_slug: string
    slug_type: string
}
const MerchantDetailsSidebar = async ({ merchant_id, company_id, mer_slug, slug_type }: Props) => {
    const merchantDetails = await apiMerchantDetails(merchant_id, company_id);
    return (
        <div className="side-bar sidebar-review-box" style={{ borderRadius: "8px" }}>
            <div className="coupon-sin-sidebar">
                <h2 className="title">Merchant Details</h2>
                <div className="product-box-img mt-4">
                    <Link href={getMerchantHref<Merchant>(merchantDetails.data, mer_slug, slug_type)}>
                        <Image src={merchantDetails.data.merchant_logo} layout='responsive' height={100} width={100} className="figure-img img-fluid" alt="Product Img" />
                    </Link>
                </div>
                <figure className="figure merchant-detail-box row">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12 p0 text-center">
                        <div className="price-start mt-3">
                            <h3 className='merchant-heading'>{merchantDetails.data?.merchant_name}</h3>
                        </div>
                        <div className="content-excerpt justify-center">
                            <p>
                                {merchantDetails?.data?.merchant_detail
                                    ?.replace(/<\/?[^>]+(>|$)/g, "")
                                    ?.replace(/&nbsp;/g, " ")}
                            </p>
                        </div>
                        <div className="rating">
                            <RenderRating rating={merchantDetails?.data?.rating ? merchantDetails?.data?.rating : 5} />
                        </div>
                        <div className="compare-btn text-center">
                            <Link
                                className="btn btn-sm"
                                href={getMerchantHref<Merchant>(merchantDetails.data, mer_slug, slug_type)}
                            >Visit Now</Link>
                        </div>
                    </div>
                </figure>
            </div>
        </div>
    )
}

export default MerchantDetailsSidebar
