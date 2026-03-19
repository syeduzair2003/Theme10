import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularOffers } from '@/apis/page_optimization';
import { getBaseImageUrl, getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import OfferListCard from './OfferListCard';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const CouponSectionHome = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularOffers(companyId);
    const [firstHalf, secondHalf] = splitHeading(response?.data?.popular_offer_widget?.widget_heading);
    const content = response?.data?.popular_offer_widget?.widget_text
    const couponData = response?.data?.offers;
    const domain = (await cookieService.get("domain")).domain;
    const heading = response?.data?.popular_offer_widget?.widget_heading ? response?.data?.popular_offer_widget?.widget_heading : "Popular Coupons"
    const count = 6;
    if (couponData?.length > 0) {
        return (
            <div className="couponnav padTB60">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="section-box rounded-3 shadow-sm">
                                <div className="box-bg">
                                    <h2 className='opacity-80 f-25'>
                                        {heading}
                                    </h2>
                                    {response?.data?.popular_offer_widget?.widget_text && (
                                        <p className="pt-2">{content}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {couponData
                            ?.slice(0, count)
                            ?.map((offer: OffersOffer, i: number) => {
                                    return (

                                        <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-4">
                                            <OfferListCard
                                                offer={offer?.offer}
                                                merchant_logo={getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "")}
                                                merchantHref={getMerchantHref(offer?.merchant, mer_slug, mer_slug_type)}
                                                merchant_name={offer?.merchant?.merchant_name}
                                                // type={offer?.offer?.offer_type?.name}
                                                productDetailUrl={offer?.offer?.slug ? getProductDetailHref(offer?.merchant, mer_slug_type, offer?.offer?.slug, offer?.offer?.category?.slug): null}
                                            />
                                        </div>
                                    )
                            })}
                    </div>
                </div>
            </div>
        )
    }
}

export default CouponSectionHome
