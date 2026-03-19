import cookieService from '@/services/CookiesService';
import { Offer } from '@/services/dataTypes';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getRandomRating, getRandomStoreSeoTitle } from '@/constants/hooks';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import RenderRating from './RenderRating';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    item: Offer
    merchant_name: string;
    merchantHref: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}


const ProductCard = async ({ item, merchant_name, merchantHref, merchant_logo, productDetailUrl }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const type = item?.offer_type?.name
    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, item?.product_image, "")
            : getBaseImageUrl(domain, item?.merchant?.merchant_logo, "");



    const daysLeft = calculateOfferDuration(item?.end_date)

    return (
        <div className='prod-card h-100'>
            <span className="prod-item__title f-14 text-center" style={{ margin: 0, flex: 1 }}>
                <Link href={merchantHref}>
                    {merchant_name}
                </Link>
            </span>
            <div className="prod-duration-badge ">
                <span className="product-item__prevPrice">
                    {daysLeft}
                </span>
            </div>
            <div className="row h-100">
                <div className="col-4 d-flex align-items-center justify-content-between flex-column">
                    {/* <div className="prod-img-sec custom-p-item-thumb h-100 w-100"> */}
                    <div className="prod-img-sec w-100">
                        <Image
                            src={imageSrc}
                            width={100}
                            height={100}
                            alt={`${merchant_name}`}
                            className="cover-img"
                            objectFit='contain'
                        />

                    </div>
                    <div className=' mb-4'>
                        <OfferDetailsToggle domain={domain} imageSrc={item?.product_image} merchantHref={imageSrc} offer={item} type='anchor' />
                    </div>

                </div>
                <div className="col-8">
                    <div className="prod-content">
                        {/* <div className="product-item__container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,flexDirection:'column'}}> }}> */}
                        <div className="product-item__container d-flex justify-content-between align-items-center flex-column h-100" >
                            {item?.is_detail === 1 ? (
                                (productDetailUrl && (
                                    <Link href={productDetailUrl} className="truncate-3-lines fs-six f-16 n17-color fw-bold mb-2">
                                        {discardHTMLTags(item?.offer_title)}
                                    </Link>
                                ))
                            ) : (
                                <p className="truncate-3-lines fs-six f-16 n17-color fw-bold mb-2">
                                    {discardHTMLTags(item?.offer_title)}
                                </p>
                            )}

                            <div className="bottom-card-area d-flex flex-column justify-content-between">
                                {/* <div className="product-review__rating d-flex mt-2">
                                    <RenderRating rating={getRandomRating(item?.rating)} />
                                    <span className='f-14'>({getRandomRating(item?.rating)})</span>
                                </div> */}

                                <div className='mb-2'>
                                    {type === "product" && item?.sale_price && (
                                        <div className="price-info d-flex flex-row align-items-center gap-2 justify-content-center">
                                            {item?.original_price && (
                                                <span className="text-decoration-line-through f-14 text-muted">
                                                    {getCurrencySymbol(item?.currency)}
                                                    {item?.original_price}
                                                </span>
                                            )}

                                            <span className="fw-bold text-success f-15">
                                                {getCurrencySymbol(item?.currency)}
                                                {item?.sale_price}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="custom-btn-dark-new">
                                    <OfferOutUrl outUrl={item?.url} merchantHref={merchantHref} unique_id={item?.unique_id} customClass="f-17" domain={domain}>
                                        {item?.offer_type.name.includes('Coupon') ? 'Show Code' : 'Get Deal'}
                                    </OfferOutUrl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductCard
