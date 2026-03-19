import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { minimalMerchantData } from "@/services/dataTypes";
import Image from "next/image";
import Link from "next/link";

interface Props {
    merchant: minimalMerchantData;
    mer_slug: string;
    mer_slug_type: string;
}

export default async function StoreCardHorizontal({ merchant, mer_slug, mer_slug_type }: Props) {
    const companyDomain = (await cookieService.get("domain")).domain;
    const cashBackText = merchant?.promotional_tag;
    return (
        <Link
            href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
            className="store-horizontal-card d-flex align-items-center justify-content-between text-decoration-none"
        >
            <div className="d-flex align-items-center flex-grow-1 gap-3">
                <div className="store-horizontal-logo-wrapper">
                    <Image
                        src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")}
                        alt={`${merchant?.merchant_name} logo`}
                        width={80}
                        height={40}
                        className="store-horizontal-logo"
                    />
                </div>

                <div className="store-horizontal-info">
                    <h4 className="store-horizontal-name mb-1">
                       {discardHTMLTags(merchant?.details || merchant?.merchant_name)}
                    </h4>
                    <p className="store-horizontal-meta mb-0">
                        {cashBackText}
                    </p>
                </div>
            </div>

            <div className="store-horizontal-action ms-3">
                <span className="btn-store-action">
                    {"Shop Now"}
                </span>
            </div>
        </Link>
    );
}
