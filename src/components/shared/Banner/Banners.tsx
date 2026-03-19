import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks';
import { OffersMerchant, OffersOffer } from '@/services/dataTypes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    data: OffersOffer;
    merchant?: OffersMerchant;
    height?: number,
    offerLink?: string | null;
    mer_slug?: string;
    slug_type?: string;
    domain: string;
    width?: number;
    unoptimized?: boolean;
}

const Banner = ({ data, height, offerLink, mer_slug, slug_type, domain, unoptimized = false, width }: Props) => {
    const { offer_title, offer_detail, banner_image, url } = data?.offer ?? {};

    return (
        <>
            <div className="latest-blog">
                <div className="latest-blog__thumb d-center" style={{ width: '100%', height: height, position: 'relative', maxWidth: '210px', maxHeight: '400px' }}>
                    {mer_slug && slug_type ?
                        <OfferOutUrl outUrl={offerLink || url} unique_id={data.offer.unique_id} merchantHref={getMerchantHref(data?.merchant, mer_slug, slug_type)} domain={domain}>
                            <Image
                                src={getBaseImageUrl(domain, banner_image, "")}
                                alt={`${data.merchant.merchant_name} discount coupons and deals`}
                                // layout='fill'
                                objectFit="contain"
                                style={{ margin: '0 auto', objectFit: 'contain'}}
                                loading='lazy'
                                height={height || 100}
                                width={width || 100}
                                unoptimized={unoptimized}
                            />
                        </OfferOutUrl>
                        :
                        <Link href={offerLink || url}>
                            {" "}
                            <Image
                                src={getBaseImageUrl(domain, banner_image, '')}
                                style={{ overflow: 'none !important', objectFit: 'contain' }}
                                alt={offer_detail || offer_title}
                                height={100}
                                width={100}
                                objectFit="contain"
                            />
                        </Link>
                    }
                </div>
            </div>
        </>
    )
};

export default Banner
