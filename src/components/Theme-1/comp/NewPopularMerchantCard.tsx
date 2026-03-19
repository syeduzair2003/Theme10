import { Merchant } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';

interface Props {
    merchant: Merchant;
    mer_slug: string;
    slug_type: string;
    preloadedImage: string;
}
const NewPopularMerchantCard = async ({ merchant, mer_slug, slug_type, preloadedImage }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);

    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-xs-6 ">
            <div className="contributor-item product-item-custom h-100 w-100">
                <div className="contributor-item__content">
                    <Link className='d-flex align-items-center justify-content-center flex-column' href={getMerchantHref(merchant, mer_slug, slug_type)}>
                        <div className="cashback-merchant ">
                            <div className="cashback-logo-wrapper mx-auto">
                                <Image
                                    height={100}
                                    width={100}
                                    src={getBaseImageUrl(domain, preloadedImage, "")}
                                    alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
                                    className="cashback-logo"
                                />
                            </div>
                            <div className="cashback-rate mt-1">
                                <p className="cashback-label f-14 d-inline fw-bold">
                                    {heading ? discardHTMLTags(heading) :
                                        merchant?.merchant_name
                                    }
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default NewPopularMerchantCard