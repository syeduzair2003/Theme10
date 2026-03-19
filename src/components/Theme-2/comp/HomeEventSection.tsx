
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer, OffersOffer } from '@/services/dataTypes';
import React from 'react';
import CouponCard from './CouponCard';
import { apiGetHomeEventDetails } from '@/apis/user';
import EventOfferCard from './EventOfferCard';

interface Props {
    companyId: string;
    slugType: string;
    merSlug: string;
}

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const HomeEventSection = async ({ companyId, merSlug, slugType }: Props) => {
    const eventMerchants = (await apiGetHomeEventDetails(companyId)).data;
    const companyDomain = (await cookieService.get('domain')).domain;
    const count = 8
    const firstHalf = "Recent Event: ";
    const secondHalf = eventMerchants?.event?.name;
    const content = eventMerchants?.event?.description
    
    const allOffers: MerchantOfferItem[] =
        eventMerchants?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];

    if (allOffers?.length > 0) {
    return (
        <div className="popular-stores bg padTB60">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12 mb-3">
                        <div className="section-box rounded-3 shadow-sm">
                            <div className="box-bg">
                                <h2 className='opacity-80 f-25'>
                                    {firstHalf} - {secondHalf}
                                </h2>
                                {content && (
                                    <p>
                                        {discardHTMLTags(content)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="coupon-scroller-wrapper">
                    <div className="row g-3">
                        {allOffers?.length > 0 && allOffers?.slice(0, count)?.map((offer, i) => (
                            <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3">
                                <EventOfferCard offer={offer?.offer} merchant_logo={getBaseImageUrl(companyDomain, offer?.merchant?.merchant_logo, "")} merchantHref={getMerchantHref(offer?.merchant, merSlug, slugType)} merchant_name={offer?.merchant?.merchant_name} productDetailUrl={offer?.offer?.slug ? getProductDetailHref(offer?.merchant, slugType, offer?.offer?.slug, offer?.offer?.category?.slug): null} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
    }
};

export default HomeEventSection
