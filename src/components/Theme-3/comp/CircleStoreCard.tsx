import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
    merchant: Merchant | CompanyWiseMerchant;
    mer_slug: string;
    mer_slug_type: string;
    className?: string;
}

const CircleStoreCard = async ({ merchant, mer_slug, mer_slug_type, className }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
    
 
    const headingToShow = heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(merchant?.merchant_name);

    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={`store-card-container d-flex flex-column align-items-center justify-content-start h-100 ${className || ''}`}>
                
                {/* 1. Circular Image Container */}
                <div 
                    className="logo-circle rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm"
                    style={{ 
                        width: '120px', 
                        height: '120px', 
                        backgroundColor: '#fff', // Default white, or dynamic if you have brand colors
                        border: '1px solid #eee',
                        overflow: 'hidden',
                        padding: '15px' // Padding ensures the logo doesn't touch the circle edges
                    }}
                >
                    <div style={{ width: '100%', position: 'relative' }}>
                        <Image
                            src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
                            alt={headingToShow}
                            width={100}
                            height={100}
                            layout="responsive"
                            objectFit="contain"
                        />
                    </div>
                </div>
            
                <div className="text-center">
                    <div className="d-flex align-items-center justify-content-center fw-bold" style={{ fontSize: '1.1rem' }}>
                        <span>{headingToShow}</span>
                    </div>
                    
                </div>
            </div>
        </Link>
    );
};

export default CircleStoreCard;