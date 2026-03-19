import { apiGetPopularOffers } from '@/apis/page_optimization';
import { getBaseImageUrl, getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { OffersOffer } from '@/services/dataTypes';
import React from 'react';
import CouponCard from './CouponCard';

interface Props {
    companyId: string;
    slugType: string;
    merSlug: string;
}

const DealsSectionHome = async ({ companyId, merSlug, slugType }: Props) => {
    const response = (await apiGetPopularOffers(companyId)).data;
    const companyDomain = (await cookieService.get('domain')).domain;
    const [firstHalf, secondHalf] = splitHeading(response?.popular_offer_widget?.widget_heading);

    const content = response?.popular_offer_widget?.widget_text;
    const couponData = response?.offers || [];
    const heading = response?.popular_offer_widget?.widget_heading ? response?.popular_offer_widget?.widget_heading : "Popular Deals"
    if (!response?.offers?.length) return null;
    const count = 8;
    return (
        <div className="popular-stores bg padTB60">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 mb-3">
                        <div className="section-box rounded-3 shadow-sm">
                            <div className="box-bg">
                                <h2 className='opacity-80 f-25'>
                                    {heading}
                                </h2>
                                {response?.popular_offer_widget?.widget_text && (
                                    <p className="pt-2">{content}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="coupon-scroller-wrapper">
                    <div className="row g-3">
                        {couponData?.length > 0 && couponData?.slice(0, count)?.map((offer: OffersOffer, i: number) => (
                            <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3">
                                <CouponCard offer={offer?.offer} merchant_logo={getBaseImageUrl(companyDomain, offer?.merchant?.merchant_logo, "")} merchantHref={getMerchantHref(offer?.merchant, merSlug, slugType)} merchant_name={offer?.merchant?.merchant_name} productDetailUrl={offer?.offer?.slug ? getProductDetailHref(offer?.merchant, slugType, offer?.offer?.slug, offer?.offer?.category?.slug): null} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DealsSectionHome;
