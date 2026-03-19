"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks'
import { OffersOffer, OffersMerchant } from '@/services/dataTypes'

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
    const { banner_image, url } = data?.offer ?? {};

    return (
        <div className="w-full flex items-center justify-center p-2 bg-white">
            <div className="relative w-full overflow-hidden rounded-xl shadow-sm">
                {mer_slug && slug_type ? (
                    <OfferOutUrl 
                        outUrl={offerLink || url} 
                        unique_id={data.offer.unique_id} 
                        merchantHref={getMerchantHref(data?.merchant, mer_slug, slug_type)} 
                        domain={domain}
                        customClass="flex justify-center"
                    >
                        <Image
                            src={getBaseImageUrl(domain, banner_image, "")}
                            alt="Merchant advertisement banner"
                            height={height || 200}
                            width={width || 800}
                            className="w-full h-auto object-contain rounded-lg hover:scale-[1.01] transition-transform duration-500"
                            loading='lazy'
                            unoptimized={unoptimized}
                        />
                    </OfferOutUrl>
                ) : (
                    <Link href={offerLink || url} rel="nofollow sponsored noopener noreferrer" className="flex justify-center">
                        <Image
                            src={getBaseImageUrl(domain, banner_image, "")}
                            alt="Promo banner"
                            height={height || 200}
                            width={width || 800}
                            className="w-full h-auto object-contain rounded-lg"
                            loading='lazy'
                            unoptimized={unoptimized}
                        />
                    </Link>
                )}
            </div>
        </div>
    )
};

export default Banner;