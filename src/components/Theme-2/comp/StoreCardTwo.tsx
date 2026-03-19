import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { CompanyWiseMerchant, EventMerchant, Merchant } from '@/services/dataTypes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    merchant: Merchant | CompanyWiseMerchant | EventMerchant;
    mer_slug: string;
    mer_slug_type: string;
    className?: string;
}

const StoreCardTwo = async ({ merchant, mer_slug, mer_slug_type, className }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
    const headingToShow = heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(merchant?.merchant_name);
    return (
        <Link 
            href={getMerchantHref(merchant, mer_slug, mer_slug_type)} 
            className={`unique-merchant-card-circle d-block text-decoration-none ${className || ''}`}
        >
            <div className="store-circle-wrapper">
                <div className="store-circle-img-box shadow-sm">
                    <Image
                        src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")}
                        alt={`${headingToShow} logo`}
                        width={120}
                        height={120}
                        className="store-circle-img"
                    />
                </div>
            </div>
        </Link>
    )
}

export default StoreCardTwo
