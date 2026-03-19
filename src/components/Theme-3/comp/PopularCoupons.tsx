import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularOffers } from '@/apis/page_optimization';
import cookieService from '@/services/CookiesService';
import CouponCard from './CouponCard';
import { getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}
const PopularCoupons = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularOffers(companyId);
    const companyDomain = (await cookieService.get("domain")).domain;
    const [firstHalf, secondHalf] = splitHeading(response?.data?.popular_offer_widget?.widget_heading);

    const content = response?.data?.popular_offer_widget?.widget_text
    const couponData = response?.data?.offers;
    const count = 6;
    if (couponData?.length > 0) {
        return (
            <section className="s1-2nd-bg-color" style={{ padding: "5% 10%" }}>
                <div className="container">
                    <div className="section-header d-flex align-items-center justify-content-between">
                        <div className="section-title-center no-before mb-3">
                            <h2 className="top-stores-heading animate-heading">
                                <span className="top-text">{firstHalf ? firstHalf : `Popular`}</span>
                                <span className="stores-text">{secondHalf ? secondHalf : `Coupon`}</span>
                            </h2>
                            <p>
                                {content}
                            </p>
                        </div>
                    </div>
                    <div className="coupon-list">
                        <div className="row">
                            {couponData?.length > 0 && couponData?.slice(0, count)?.map((item: OffersOffer, i: number) => {
                                return (
                                    <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-12 mb-3'>
                                        <CouponCard
                                            product={item?.offer}
                                            merchantHref={getMerchantHref(item?.merchant, mer_slug, mer_slug_type)}
                                            domain={companyDomain}
                                            merchant_logo={item?.merchant?.merchant_logo}
                                            merchant_name={item?.merchant?.merchant_name}
                                            productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug , item?.offer?.category?.slug) : null}
                                        />
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default PopularCoupons
