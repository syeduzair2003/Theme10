import { HomeMultiProductData, OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularProducts } from '@/apis/page_optimization';
import { getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import Link from 'next/link';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import { apiGetMultiProductOffers } from '@/apis/user';
import OfferSlider from './OfferSlider';
import TrendingProductsCard from './TrendingProductCard';


interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const TrendingProducts = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    // const response = await apiGetPopularProducts(companyId); // Unused in active logic
    const count = 8;
    const responseData = (await apiGetMultiProductOffers(companyId)).data;


    const renderSection = (sectionData: HomeMultiProductData) => {
        if (!sectionData?.offers?.length) {
            return null;
        }

        const [headingFirst, headingSecond] = splitHeading(sectionData?.home_page_widget?.widget_heading);
        return (
            <>
                <div className="section-head trv-head-title-wrap text-center mb-5">
                    {/* Heading Logic merged with trv-head-title classes */}
                    <h2 className="trv-head-title">
                        <span className="site-text-yellow">
                            {headingFirst ? headingFirst : "Trending"}
                        </span>{" "}
                        <span className='text-white'>
                            {headingSecond ? headingSecond : "Products"}
                        </span>
                    </h2>

                    {/* Conditional Description Logic wrapped in trv-head-discription */}
                    {sectionData?.home_page_widget?.widget_text && (
                        <div className="trv-head-discription">
                            {sectionData.home_page_widget.widget_text}
                        </div>
                    )}

                    {/* Button Logic using siteButton class and centered layout */}
                    <div className="mt-4 d-flex justify-content-center">
                        <Link
                            href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)}
                            className="siteButton"
                        >
                            View More
                        </Link>
                    </div>
                </div>
                <div className="w-100">
                    <OfferSlider>
                        {sectionData.offers.slice(0, count).map((item: OffersOffer, i: number) => (
                            <TrendingProductsCard
                                key={i}
                                item={item}
                                merchantHref={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)}
                                merchant_logo={item?.merchant?.merchant_logo}
                                productDetailUrl={item?.offer?.slug ? getProductDetailHref(sectionData?.merchant, mer_slug_type, item?.offer?.slug) : null}
                            />
                        ))}
                    </OfferSlider>
                </div>
            </>
        );
    };

    return (
        <section style={{ background: "rgb(224, 242, 241)", padding: "20px" }}>
            <div className="cuscontainer">
                <div className='dest-main-wrapper'>
                    {renderSection(responseData?.first)}
                    {renderSection(responseData?.second)}
                </div>
            </div>
        </section>
    );
}

export default TrendingProducts;