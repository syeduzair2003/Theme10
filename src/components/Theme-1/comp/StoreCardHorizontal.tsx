import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { minimalMerchantData } from '@/services/dataTypes';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    merchant: minimalMerchantData;
    mer_slug: string;
    slug_type: string;
}
const StoreCardHorizontal = async ({ merchant, mer_slug, slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(merchant?.details);
    return (
        <div className="contributor-item product-item-custom h-100 w-100">
                <div className="contributor-item__content">
                    <Link href={getMerchantHref(merchant, mer_slug, slug_type)}>
                        <div className="cashback-merchant d-flex align-items-center justify-content-center flex-row gap-3">
                            <div className="cashback-logo-wrapper mx-auto">
                                <Image
                                    height={100}
                                    width={100}
                                    src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")}
                                    alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
                                    className="cashback-logo"
                                />
                            </div>
                            <div className="cashback-rate mt-1">
                                <p className="cashback-label f-14 d-inline fw-bold">
                                    {heading ? discardHTMLTags(heading) :
                                        getRandomStoreSeoTitle(merchant?.merchant_name)
                                    }
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        
    )
}

export default StoreCardHorizontal
