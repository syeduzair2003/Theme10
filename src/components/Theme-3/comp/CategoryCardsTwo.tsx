import React from 'react'
import Image from 'next/image'
import { CompanyWiseMerchant } from '@services/dataTypes'
import Link from 'next/link'
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons'
// import Image from "@/components/shared/Image";

interface CategoryCardsTwoProps {
    merchant: CompanyWiseMerchant
    merchantSlug: string
    slugType: string
}

const MerchantOffStyle = async ({ merchant, merchantSlug, slugType }: CategoryCardsTwoProps) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
    return (
        <div className="col-8 col-sm-6 col-md-6 col-xl-4">
            <div className="single-box d-grid transition justify-content-start n1-bg-color p-3 p-md-5 border rounded-2 flex-column mt-9 h-100 align-items-center">
                <div className="d-center justify-content-start gap-4 gap-md-8">
                    <div className="d-center thumb-area rounded-3 border overflow-hidden" style={{ width: '120px', height: '70px', background: 'white' }}>
                        <Image
                            className="w-100"
                            src={getBaseImageUrl(companyDomain, merchant.merchant_logo, "")}
                            alt={`${merchant.merchant_name} logo`}
                            width={100}
                            height={100}
                            objectFit="cover"
                            layout='responsive'
                            style={{ padding: '10px' }}
                        />
                    </div>
                </div>
                <div className="bottom-area d-grid align-items-center">
                    <Link href={getMerchantHref(merchant, merchantSlug, slugType)} className="d-center justify-content-start gap-2 gap-md-3">
                        <p className="fs-five n17-color fw-mid">{heading ? discardHTMLTags(heading): getRandomStoreSeoTitle(merchant?.merchant_name)}</p>
                    </Link>
                    <Link href={getMerchantHref(merchant, merchantSlug, slugType)} className="d-center justify-content-start gap-2 gap-md-3">
                        <span className="p2-color fw-bold">View Merchant</span>
                        <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MerchantOffStyle
