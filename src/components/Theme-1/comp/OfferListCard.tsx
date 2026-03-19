import { getMerchantHref } from '@/constants/hooks';
import { Offer, OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import OfferOutUrl from './OfferOutUrl';
import RenderRating from './RenderRating';
import OfferOutUrl from '@/components/shared/OfferOutUrl';

interface Props {
    item: OffersOffer;
    slug_type: string;
    mer_slug: string;
    preloadedImage: string;
    domain: string;
}
const OfferListCard = ({ item, mer_slug, slug_type, preloadedImage, domain }: Props) => {
    return (
        <div className="col-xl-6 col-sm-12">
            <div className="product-item product-item-custom product-item-coupon shadow h-100">
                {/* <div className="d-flex align-items-center justify-content-center"> */}
                <div className="row">
                    <div className="col-lg-4 col-xl-4">
                        <div className="custom-mer-off-container">
                            <Link href={getMerchantHref(item.merchant, mer_slug, slug_type)} className="link w-100">
                                <Image
                                    src={preloadedImage}
                                    alt={`${item.merchant.merchant_name} discount offers`}
                                    className="cover-img"
                                    width={500}
                                    height={200}
                                    // layout='responsive'
                                    objectFit='contain'
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8 col-xl-8">

                        <div className="product-item__content overflow-hidden">
                            <h6 className="product-item__title custom-heading-animation f-16">
                                <OfferOutUrl outUrl={item.offer.url} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} unique_id={item.offer.unique_id} customClass='link' domain={domain}>
                                    {item?.offer?.offer_title}
                                </OfferOutUrl>
                            </h6>

                            <div className="product-item__info flx-between gap-2 f-13">
                                <span className="product-item__author f-13">
                                    by{" "}
                                    <Link href={getMerchantHref(item.merchant, mer_slug, slug_type)} className="link f-13">
                                        {item?.merchant?.merchant_name}
                                    </Link>
                                </span>
                            </div>
                            <div className="product-item__bottom flx-between gap-2">
                                <div>
                                    <div className="d-flex align-items-center gap-1">
                                        <RenderRating rating={item.rating ? item.rating : 4.5} />
                                    </div>
                                </div>
                                <OfferOutUrl outUrl={item.offer.url} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} unique_id={item.offer.unique_id} customClass='custom-btn-dark f-15' domain={domain}>
                                    Avail Offer
                                </OfferOutUrl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* </div> */}
            </div>
        </div>
    )
}

export default OfferListCard
