import React from 'react'
import OffersCard from './OffersCard';
import { apiGetPopularDeals } from '@/apis/page_optimization';
import { getLastUpdateDate, getProductDetailHref, splitHeading } from '@/constants/hooks';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}
const BestOffersSSR = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularDeals(companyId);
    const bestOffers = response.data;
    const [firstHalf, secondHalf] = splitHeading(response?.data?.popular_deals_widget?.widget_heading);

    const content = response?.data?.popular_deals_widget?.widget_text

    const count = 8
    if (bestOffers?.offers?.length > 0) {
        return (
            <section className="merchant-carousel-section" style={{ padding: "5% 8%" }}>
                <div className="container">
                    <div className="section-header d-flex align-items-center justify-content-between mb-3">
                        <div className="section-title-center mb-3 no-before">
                            <h2 className="top-stores-heading animate-heading">
                                <span className="top-text">{firstHalf ? firstHalf : `Popular`} </span>
                                <span className="stores-text"> {secondHalf ? secondHalf : `Deals`}</span>
                            </h2>
                            <div className="d-inline">
                            <p className="m-0">
                                {content}
                            </p>
                            <p className="fw-bold">
                                This Week’s Hottest Deals — Verified on {getLastUpdateDate(1)} by Our Team.
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="row cus-row gy-5 gy-xxl-6 justify-content-center justify-content-md-start d-flex align-items-stretch">
                        {bestOffers?.offers?.slice(0, count)?.map((item, i) => {
                            return (
                                <OffersCard 
                                    key={i} 
                                    offer={item} 
                                    mer_slug_type={mer_slug_type} 
                                    mer_slug={mer_slug} 
                                    productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug,item?.offer?.category?.slug) : null}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

export default BestOffersSSR
