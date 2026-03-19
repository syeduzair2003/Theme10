import { Offer } from '@/services/dataTypes'
import React from 'react'
import OfferDuration from './OfferDuration'
import RenderRating from './RenderRating'
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomRating } from '@/constants/hooks'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
// import Image from "@/components/shared/Image";
import Link from 'next/link'
import Image from "next/image";

interface Props {
    product: Offer,
    mer_slug_type: string,
    mer_slug: string,
    domain: string,
    merchant_name: string,
    merchant_logo: string,
    mer_unique: string,
    mer_id: number,
    c_mer_slug: string,
}

const EventOffer = ({ product, mer_slug_type, mer_slug, domain, merchant_name, merchant_logo, mer_unique, mer_id, c_mer_slug }: Props) => {
    const merchant = {
        unique_id : mer_unique,
        id: mer_id,
        slug: c_mer_slug
    }
    const merchantHref = getMerchantHref(merchant, mer_slug, mer_slug_type);

    return (
        <div className="single-box transition h-100 rounded-4 n1-bg-color cus-border border b-eighth p-2 p-md-3 d-center align-items-center flex-column flex-xl-row">
            <div className="start-area w-100 d-flex flex-column flex-sm-column gap-3 gap-md-4 p-3">
                <OfferDuration endDate={product?.end_date}/>
                <h4 className="n17-color f-18 truncate-2-lines fw-bold">{discardHTMLTags(product?.offer_title)}</h4>
                <div className="w-100 my-2 cus-border border-top border-bottom b-seventh py-2 py-md-3">
                    <div className="d-center justify-content-between gap-1">
                        <div className="rating w-50">
                            <RenderRating rating={getRandomRating(product?.rating)} /> ({getRandomRating(product?.rating)})
                        </div>
                        {product?.coupon_code ? (
                            <OfferOutUrl unique_id={product?.unique_id}
                                outUrl={product?.url}
                                merchantHref={merchantHref}
                                domain={domain}
                                customClass='cmn-btn btn-overlay border-dash rounded-pill px-4 px-md-6 py-2 py-md-3 w-50 position-relative d-center'
                            >
                                <span className="f5-color fw-semibold coupon-code w-100 d-center">{product?.coupon_code}</span>
                                <span className="position-absolute show transition n1-color">Show Coupon</span>
                            </OfferOutUrl>
                        ) : (
                            <OfferOutUrl unique_id={product?.unique_id}
                                outUrl={product?.url}
                                merchantHref={merchantHref}
                                domain={domain}
                                customClass='box-style box-second gap-2 gap-md-3 rounded-pill py-2 py-md-3 px-5 px-md-7 w-50 d-center d-inline-flex'
                            >
                                <span className="f5-color fw-semibold f-14">Get Deal</span>
                            </OfferOutUrl>
                        )}
                    </div>
                </div>
            </div>
            <div className="end-area border-left-button-cus d-flex align-items-center justify-content-center flex-column gap-3 gap-md-4 custom-card-width" style={{ padding: '15px 20px' }}>
                <div className="d-center thumb-area" style={{width: '100% !important', height: 'auto'}}>
                    <Image
                        src={getBaseImageUrl(domain, merchant_logo, "")}
                        height={70} width={80}
                        alt={`${merchant_name}`}
                        layout='responsive'
                        objectFit='cover'
                        className='w-100 h-100'
                        loading='lazy'
                    />
                </div>
                <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)}>
                    <span className='n15-color fs-eight fw-semibold text-center'>{merchant_name}</span>
                </Link>
            </div>
        </div>
    )
}

export default EventOffer
