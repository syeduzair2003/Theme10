import { apiGetEventDetails, apiGetHomeEventDetails } from '@/apis/user';
import { discardHTMLTags, getEventsHref, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import EventOfferCard from './EventOfferCard';

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
                    <div className="row section-header d-flex align-items-center">
                        <div className="col-9 col-md-9 col-sm-9 col-lg-10 col-xl-10 section-title-center no-before mb-3">
                            <h2 className="top-stores-heading animate-heading">
                                <span className="top-text">{firstHalf ? firstHalf : `Recent`} </span>
                                <span className="stores-text"> {secondHalf ? secondHalf : `Events`}</span>
                            </h2>
                        </div>
                        <div className="col-3 col-md-3 col-sm-3 col-lg-2 col-xl-2 view-all-merchants">
                            <Link href={getEventsHref(eventMerchants?.event, mer_slug_type)} className="d-center gap-1">
                                <span className="p2-color fw-bold">View All</span>
                                <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                            </Link>
                        </div>
                        <div className='col-lg-12 col-xl-12'>
                            <p>
                                {discardHTMLTags(content)}
                            </p>
                        </div>
                    </div>
                    <div className="row cus-row g-2 justify-content-md-start d-flex align-items-stretch">
                        {couponData?.length > 0 && couponData?.slice(0, count)?.map((item: MerchantOfferItem, i: number) => {
                            return (
                                <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                    <EventOfferCard
                                        product={item?.offer}
                                        merchantHref={getMerchantHref(item.merchant, mer_slug, mer_slug_type)}
                                        domain={companyDomain}
                                        merchant_name={item.merchant?.merchant_name}
                                        merchant_logo={item.merchant?.merchant_logo}
                                        productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug, item?.offer?.category?.slug) : null}
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
