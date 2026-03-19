import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
// import Image from "@/components/shared/Image";

interface Props {
    merchant: Merchant | CompanyWiseMerchant;
    mer_slug: string;
    mer_slug_type: string;
    className?: string;
}
const StoreCard = async ({ merchant, mer_slug, mer_slug_type, className }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
    const headingToShow = heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(merchant?.merchant_name)
    
    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)}>
            <div className="top-merchant-card d-flex flex-column justify-content-between h-100">
                <div className={`${className} d-flex align-items-center justify-content-center`}>
                    <Image
                        className="merchant-top-image merchant-top-image-height"
                        src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
                        alt={headingToShow}
                        style={{ height: 'auto', width: '80%' }}
                        width={100}
                        height={100}
                        objectFit="cover"
                        layout="responsive"
                    />
                </div>
                <div className="custom-container mt-2 text-center">
                    <span className="discount-text mx-auto">
                        {heading?.length > 28 ? (
                            <span className="discount-text f-13">
                                {headingToShow}
                            </span>
                        ) : (
                            <span className="discount-text">
                                {headingToShow}
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default StoreCard;
