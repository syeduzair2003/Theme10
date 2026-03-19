import React from 'react'
// import Image from "next/image";
import { getBaseImageUrl } from '@/constants/hooks';
import { notFound } from 'next/navigation';
import { Merchant } from '@/services/dataTypes';
import RenderRating from './RenderRating';
import cookieService from '@/services/CookiesService';
import Image from 'next/image'
interface Props {
    merchant: Merchant
}

const OfferMerchantDetailsSidebar = async ({ merchant }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    if (merchant !== null || undefined) {
        return (
            <div className="common-sidebar-wrapper mb-3 sidebar-bg">
                <div className="common-sidebar">
                    <div className="common-sidebar__item">
                        <h2 className="common-sidebar__title f-25" style={{ textAlign: "center", marginBottom: "5px" }}>About {merchant.merchant_name}</h2>
                        <div className="author-details p-0 border-0 mt-0">
                            <div className="d-flex align-items-center gap-2">
                                <div className="author-details__content">
                                    <div className="advisor__thumb image-wrapper-mer-details mx-auto">
                                        <Image
                                            src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
                                            width={150}
                                            height={140}
                                            alt={`${merchant?.merchant_name} logo`}
                                            className="merchant-logo-details"
                                            layout='responsive'
                                        />
                                    </div>
                                    <div className='font-14 mb-2 text-heading fw-500' dangerouslySetInnerHTML={{ __html: merchant?.merchant_detail || '' }} />
                                    <RenderRating rating={merchant.rating} />
                                </div>
                            </div>
                            Total Offers ({merchant.total_offers})
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        notFound();
    }

}

export default OfferMerchantDetailsSidebar
