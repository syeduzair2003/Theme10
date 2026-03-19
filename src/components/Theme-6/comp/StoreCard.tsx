import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import {
    discardHTMLTags,
    getBaseImageUrl,
    getMerchantHref,
    getRandomStoreSeoTitle,
    splitHeadingFromDetails
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
    merchant: Merchant | CompanyWiseMerchant;
    mer_slug: string;
    mer_slug_type: string;
    // className?: string;
}

const StoreCard = async ({ merchant, mer_slug, mer_slug_type,  }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
    const headingToShow = heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(merchant?.merchant_name);

    // Helper to determine text size class based on length
    const textSizeClass = heading?.length > 28 ? "f-13" : "";

    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className="text-decoration-none">
            <div className={`store-card d-flex flex-column h-100 `}>

                {/* Top Section: Logo */}
                <div className="store-card-img-wrapper d-flex align-items-center justify-content-center flex-grow-1">
                    <Image
                        className="merchant-logo"
                        src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
                        alt={headingToShow}
                        width={150} // Base width for aspect ratio
                        height={80} // Base height for aspect ratio
                        style={{
                            width: 'auto',
                            maxWidth: '80%',
                            height: 'auto',
                            maxHeight: '80px',
                            objectFit: "contain"
                        }}
                    />
                </div>

                {/* Bottom Section: Grey Footer */}
                <div className="store-card-footer d-flex align-items-center justify-content-center w-100">
                    <span className={`store-card-text text-center ${textSizeClass}`}>
                        {headingToShow}
                    </span>
                </div>

            </div>
        </Link>
    );
};

export default StoreCard;