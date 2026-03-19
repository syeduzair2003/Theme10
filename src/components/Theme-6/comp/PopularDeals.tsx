import Image from 'next/image';
import React from 'react'
import { apiGetPopularDeals } from '@/apis/page_optimization';
import cookieService from '@/services/CookiesService';
import { getBaseImageUrl, getEventsHref, getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import Link from 'next/link';
import BrowseDeal from './BrowseDeal';

interface Props {
    companyId: string;
    slug_type: string;
    mer_slug: string;
}
const PopularDeals = async ({ companyId, slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularDeals(companyId);
    const best_offers = response?.data?.offers;
    const domain = (await cookieService.get("domain")).domain;
    const [firstHalf, secondHalf] = splitHeading(response?.data?.popular_deals_widget?.widget_heading);
    const cleanedText = response?.data?.popular_deals_widget?.widget_heading?.trim();
    const wordCount = cleanedText?.split(/\s+/)?.filter(Boolean).length;

    let count = 0;
    if (best_offers?.length > 0) {
        return (
            <section className='mb-3 pb-4' style={{backgroundColor:"#e0f2f1"}}>
                <div className="container">
                    <div className="section-head trv-head-title-wrap text-center pt-4">

                        <h2 className={`trv-head-title ${wordCount > 20 ? 'f-25' : 'f-40'}`}>
                            <span className="site-text-yellow">
                                {firstHalf || "Browse Our"}
                            </span>{" "}
                            {secondHalf || "Top Deals"}
                        </h2>

                        <div className="trv-head-discription">
                            {response?.data?.popular_deals_widget?.widget_text ? (
                                response.data.popular_deals_widget.widget_text
                            ) : (
                                "Check out the hottest deals handpicked just for you! From limited-time discounts to trending offers, these top deals are updated regularly to ensure you never miss a chance to save big on your favorite brands."
                            )}
                        </div>

                    </div>
                    <div className="row g-4">
                        {best_offers?.length > 0 && best_offers?.map((item, i) => {
                            if (count <= 7) {
                                count += 1;
                                return (
                                    <div key={i} className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                        <BrowseDeal
                                            item={item?.offer}
                                            merchantHref={getMerchantHref(item?.merchant, mer_slug, slug_type)}
                                            merchant_name={item?.merchant?.merchant_name}
                                            merchant_logo={item?.merchant?.merchant_logo}
                                            productDetailUrl={item?.offer.slug ? getProductDetailHref(item?.merchant, slug_type, item?.offer.slug) : null}
                                        />
                                    </div>
                                )
                            }
                        })
                        }
                        </div>
                    </div>
            </section >
        )
    }
}

export default PopularDeals
