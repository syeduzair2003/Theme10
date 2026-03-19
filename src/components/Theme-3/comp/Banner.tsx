import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks';
import { OffersMerchant, OffersOffer } from '@/services/dataTypes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import Image from "@/components/shared/Image";

interface Props {
    data: OffersOffer;
    merchant?: OffersMerchant;
    height?: number;
    offerLink?: string | null;
    mer_slug?: string;
    slug_type?: string;
    domain: string;
    unoptimized?: boolean;
    width?: number;
}

const Banner = ({ data, height, offerLink, mer_slug, slug_type, domain, unoptimized=false, width}: Props) => {
    const { offer_title, offer_detail, banner_image, url } = data?.offer ?? {};
    const bannerStyle = {
        margin: "0 auto"
    }
    return (
        <div className="latest-blog p-3">
            <div className="latest-blog__thumb d-flex align-items-center justify-content-center" style={{ width: '100%', position: 'relative' }}>
                {mer_slug && slug_type ?
                    <OfferOutUrl outUrl={offerLink || url} unique_id={data.offer.unique_id} merchantHref={getMerchantHref(data?.merchant, mer_slug, slug_type)} domain={domain}>
                        <Image
                            src={getBaseImageUrl(domain, banner_image, "")}
                            alt={`${data.merchant.merchant_name} discount coupons and deals`}
                            // layout='fill'
                            objectFit="contain"
                            style={bannerStyle}
                            loading='lazy'
                            height={height}
                            width={width}
                            unoptimized= {unoptimized}
                        />
                    </OfferOutUrl>
                    :
                    <Link href={offerLink || url} rel="nofollow sponsored noopener noreferrer" className='d-flex align-items-center justify-content-center'>
                        {" "}
                        <Image
                            src={getBaseImageUrl(domain, banner_image, "")}
                            style={{ overflow: 'none !important' }}
                            alt={offer_detail || offer_title}
                            layout='fill'
                            objectFit="contain"
                            loading='lazy'
                            unoptimized={unoptimized}
                        />
                    </Link>
                }
            </div>
        </div>
    )
};

export default Banner
