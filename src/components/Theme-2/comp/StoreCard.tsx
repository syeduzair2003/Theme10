import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { CompanyWiseMerchant, EventMerchant, Merchant } from '@/services/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    merchant: Merchant | CompanyWiseMerchant | EventMerchant;
    mer_slug: string;
    mer_slug_type: string;
    className?: string;
}

const StoreCard = async ({ merchant, mer_slug, mer_slug_type, className }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
    const headingToShow = heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(merchant?.merchant_name);

    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)}>
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
    );
};

export default StoreCard;
