import { apiGetEventDetails, apiGetHomeEventDetails } from '@/apis/user';
import { discardHTMLTags, getEventsHref, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import EventsCard from './EventsCard';
// import EventsCardUpdated from './EventsCardUpdated';
// import EventOfferCard from './EventOfferCard';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const HomeEventSection = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const eventMerchants = (await apiGetHomeEventDetails(companyId)).data;
    // console.log("eventMerchants",eventMerchants, "companyId", companyId)
    const allOffers: MerchantOfferItem[] =
        eventMerchants?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];
    const count = 8
    const firstHalf = "Recent Event: ";
    const secondHalf = eventMerchants?.event?.name;
    const content = eventMerchants?.event?.description
    const couponData = allOffers;
    // console.log("couponData",couponData)
    if (allOffers?.length > 0) {
        return (
            <section className="s1-2nd-bg-color" style={{ padding: "5% 10%" }}>
                <div className="container">
                    <div className="section-head trv-head-title-wrap text-center mb-5">

                        <h2 className="trv-head-title">
                            <span className="site-text-yellow">
                                {firstHalf || "Trending"}
                            </span>{" "}
                            {secondHalf || "Products"}
                        </h2>

                        <div className="trv-head-discription">
                            {discardHTMLTags(content)}
                        </div>

                        <div className="mt-4 d-flex justify-content-center">
                            <Link
                                href={getEventsHref(eventMerchants?.event, mer_slug_type)}
                                className="siteButton"
                            >
                                View All
                            </Link>
                        </div>

                    </div>

                    <div className="row cus-row g-2 justify-content-md-start d-flex align-items-stretch">
                        {couponData?.length > 0 && couponData?.slice(0, count)?.map((item: MerchantOfferItem, i: number) => {
                            return (
                                <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                    <EventsCard
                                        item={item.offer}
                                        merchantHref={getMerchantHref(item.merchant, mer_slug, mer_slug_type)}
                                        merchant_name={item.merchant?.merchant_name}
                                        merchant_logo={item.merchant?.merchant_logo}
                                        productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug) : null}
                                    />
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default HomeEventSection
