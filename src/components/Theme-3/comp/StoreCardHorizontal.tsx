import { discardHTMLTags, getBaseImageUrl, getMerchantHref, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { minimalMerchantData } from '@/services/dataTypes';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    merchant: minimalMerchantData;
    mer_slug: string;
    mer_slug_type: string;
}
const StoreCardHorizontal = async ({ merchant, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const [heading, details] = splitHeadingFromDetails(merchant?.details);
    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)}>
            <div
                className="row n1-bg-color cus-border border b-eighth rounded-2 mb-2 mx-0"
                style={{
                    height: "100px",      
                    overflow: "hidden",   
                    display: "flex",
                    alignItems: "center"
                }}
            >
                {/* Image Column */}
                <div
                    className="col-4 d-flex align-items-center justify-content-center p-2"
                    style={{ height: "100%" }}
                >
                    <div
                        className="recently-mer-img d-flex align-items-center justify-content-center"
                        style={{
                            height: "100%",
                            width: "100%",
                            position: "relative"
                        }}
                    >
                        <Image
                            src={getBaseImageUrl(companyDomain.domain, merchant?.merchant_logo, "")}
                            alt={`${merchant?.merchant_name} logo`}
                            width={70}
                            height={70}
                            style={{
                                objectFit: "contain", 
                                maxWidth: "100%",
                                maxHeight: "100%"
                            }}
                        />
                    </div>
                </div>

                {/* Text Column */}
                <div className="col-8 d-flex align-items-center justify-content-start">
                    <div className="w-100 pe-2">
                        <h2
                            className="f-18 n17-color fw-mid mb-0"
                        >
                            {discardHTMLTags(heading ? heading : merchant?.merchant_name)}
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default StoreCardHorizontal
