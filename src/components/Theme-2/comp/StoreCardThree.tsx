import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import Image from "next/image";
import Link from "next/link";

interface StoreCardTwoProps {
    merchant: Merchant | CompanyWiseMerchant;
    mer_slug: string;
    mer_slug_type: string;
}

export default async function StoreCardThree({ merchant, mer_slug, mer_slug_type }: StoreCardTwoProps) {
    const companyDomain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)}>
            <div className="store-card-two">
                <div className="store-card-header">
                    <Image
                        src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")}
                        alt={merchant?.merchant_name}
                        className="store-card-logo"
                        height={100}
                        width={100}
                    />
                </div>

                <div className="store-card-body">
                    <h5 className="store-card-title">{discardHTMLTags(heading ? heading : getRandomStoreSeoTitle(merchant?.merchant_name))}</h5>
                </div>

                <div className="store-card-footer">
                    <span className="itg-btn box-btn deal-btn">
                        View Deals
                    </span>
                </div>
            </div>
        </Link>
    );
}
