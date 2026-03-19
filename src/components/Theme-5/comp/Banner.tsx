import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks';
import { OffersMerchant, OffersOffer } from '@/services/dataTypes';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

const Banner = ({ data, height, offerLink, mer_slug, slug_type, domain, unoptimized = false, width }: Props) => {
    const { offer_title, offer_detail, banner_image, url } = data?.offer ?? {};

    return (
        <div className="p-3 mb-4">
            <div className="w-full flex items-center justify-center relative bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                {mer_slug && slug_type ?
                    <OfferOutUrl outUrl={offerLink || url} unique_id={data.offer.unique_id} merchantHref={getMerchantHref(data?.merchant, mer_slug, slug_type)} domain={domain}>
                        <Image
                            src={getBaseImageUrl(domain, banner_image, "")}
                            alt={`${data.merchant.merchant_name} discount coupons and deals`}
                            className="object-contain"
                            loading='lazy'
                            height={height || 200}
                            width={width || 300}
                            unoptimized={unoptimized}
                        />
                    </OfferOutUrl>
                    :
                    <Link href={offerLink || url} rel="nofollow sponsored noopener noreferrer" className='flex items-center justify-center w-full'>
                        <Image
                            src={getBaseImageUrl(domain, banner_image, "")}
                            alt={offer_detail || offer_title}
                            className="object-contain"
                            loading='lazy'
                            height={height || 200}
                            width={width || 300}
                            unoptimized={unoptimized}
                        />
                    </Link>
                }
            </div>
        </div>
    )
};

export default Banner