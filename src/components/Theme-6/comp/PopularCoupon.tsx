import Image from 'next/image'
import React from 'react'
import { apiGetPopularOffers } from '@/apis/page_optimization'
import cookieService from '@/services/CookiesService'
import { discardHTMLTags, getBaseImageUrl, getProductDetailHref, splitHeading } from '@/constants/hooks'
import PopularCouponCard from './PopularCouponCard'
// import Image from '@/components/shared/Image';

interface Props {
    companyId: string;
    slug_type: string;
    mer_slug: string;
}
const PopularCoupons = async ({ companyId, slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularOffers(companyId);
    const couponData = response?.data?.offers;
    const domain = (await cookieService.get("domain")).domain;
    const [firstHalf, secondHalf] = splitHeading(response?.data?.popular_offer_widget?.widget_heading);
    const cleanedText = response?.data?.popular_offer_widget?.widget_heading?.trim();
    const wordCount = cleanedText?.split(/\s+/)?.filter(Boolean).length;
    let count = 0;
    if (couponData?.length > 0) {
        return (
            <section className=" position-relative z-index-1 overflow-hidden py-5"  >
                <div className="container">
                    <div className="section-head trv-head-title-wrap text-center mb-5">

                        <h2 className="trv-head-title">
                            <span className="site-text-yellow">
                                {firstHalf || "Popular"}
                            </span>{" "}
                            {secondHalf || "Coupons"}
                        </h2>

                        <div className="trv-head-discription">
                            {response?.data?.popular_offer_widget?.widget_text
                                ? discardHTMLTags(response.data.popular_offer_widget.widget_text)
                                : "Save big with our most popular coupons, updated daily to bring you the latest promo codes and exclusive offers."}
                        </div>

                    </div>

                    <div className="row g-3">
                        {couponData.length > 0 && couponData.map((couponDataItem, index) => {
                            const titleCondition: boolean = couponDataItem.offer.offer_title.split(' ').join('').length > 30;
                            const imgSrc = couponDataItem?.offer?.offer_type?.name == "product" ? couponDataItem?.offer?.product_image : couponDataItem?.merchant?.merchant_logo
                            if (count <= 7) {
                                count += 1;
                                return (
                                    <div key={index} className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <PopularCouponCard
                                            item={couponDataItem}
                                            mer_slug={mer_slug}
                                            slug_type={slug_type}
                                            merchant_logo={imgSrc}
                                            productDetailUrl={couponDataItem?.offer.slug ? getProductDetailHref(couponDataItem?.merchant, slug_type, couponDataItem?.offer.slug) : null}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </section >
        )
    }
}

const styles = {
    element: {
        position: 'absolute' as const,
        left: '50%',
        bottom: '70%',
        animation: 'upDownRotate 15s linear infinite',
        zIndex: -1,
    },
}
export default PopularCoupons
