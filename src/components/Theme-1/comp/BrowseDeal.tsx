import React from 'react'
import { discardHTMLTags, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
import { Offer, OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import cookieService from '@/services/CookiesService'
// import Image from '@/components/shared/Image';
import { getRandomRating } from '@/constants/hooks';
import RenderRating from './RenderRating'

interface Props {
    item: Offer
    preloadedImage: string;
    merchant_name: string;
    merchantHref: string;
}

const BrowseDeal = async ({ item, preloadedImage, merchant_name, merchantHref }: Props) => {
    const domain = (await cookieService.get("domain")).domain;

    return (
        <div className="product-item product-item-coupon sidebar-bg product-item-coupon-custom-color h-100">
            <div className="row">
                <div className="col-xl-3 col-sm-3">
                    <Link href={merchantHref} className="link w-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="product-item__thumb custom-p-item-thumb h-100 w-100">
                            <Image
                                src={preloadedImage}
                                width={100}
                                height={100}
                                alt={`${merchant_name} deals and coupons`}
                                className="cover-img"
                                // layout="responsive"
                                objectFit='contain'
                            />
                        </div>
                        <span className="product-item__title f-14 text-center" style={{ margin: 0, flex: 1 }}>
                            {getRandomStoreSeoTitle(merchant_name)}
                        </span>
                    </Link>
                </div>
                <div className="col-xl-6 col-sm-6">
                    <div className="product-item__content">
                        <div className="product-item__container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h5 className="product-item__title f-16" style={{ margin: 0, flex: 1 }}>
                                <OfferOutUrl outUrl={item?.url} merchantHref={merchantHref} unique_id={item?.unique_id} customClass="link" domain={domain}>
                                    {item?.offer_title}
                                </OfferOutUrl>
                            </h5>
                        </div>
                        <div className="product-item__bottom flx-between gap-2 flex-column">
                            <div className="d-flex align-items-center gap-1">
                                <span className="product-item__prevPrice">
                                    {item?.end_date == null ? 'Lifetime' : `Expire at ${item?.end_date}`}
                                </span>
                            </div>
                            <div className="product-review__rating d-flex mt-2">
                                <RenderRating rating={getRandomRating(item?.rating)} />
                                <span className='f-14'>({getRandomRating(item?.rating)})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-3 d-flex align-items-center justify-content-center">
                    <div className="btn-get-deal">
                        <OfferOutUrl outUrl={item?.url} merchantHref={merchantHref} unique_id={item?.unique_id} customClass="f-15" domain={domain}>
                            {item?.offer_type.name.includes('Coupon') ? 'Show Code' : 'Get Deal'}
                        </OfferOutUrl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseDeal