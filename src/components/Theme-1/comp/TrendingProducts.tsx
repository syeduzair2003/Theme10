import { HomeMultiProductData, OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularProducts } from '@/apis/page_optimization';
import { getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import Link from 'next/link';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import ProductCard from './ProductCard';
// import OfferSlider from './OfferSlider';
import { apiGetMultiProductOffers } from '@/apis/user';
import TrendingProductsCard from './TrendingProductsCard';
import OfferSlider from './OfferSlider';

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
                <div className="row section-header d-flex align-items-center">
                    <div className="col-9 col-md-9 col-sm-9 col-lg-10 col-xl-10 section-title-center no-before">
                        <h2 className="top-stores-heading animate-heading">
                            <span className="top-text">{headingFirst ? headingFirst : `Trending`} </span>
                            <span className="stores-text"> {headingSecond ? headingSecond : `Products`}</span>
                        </h2>
                    </div>
                    <div className="col-3 col-md-3 col-sm-3 col-lg-2 col-xl-2 view-all-merchants">
                        <Link href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)} className="btn btn-main btn-lg pill" style={{ whiteSpace: "nowrap" }}>
                            View More
                        </Link>
                    </div>
                    {sectionData?.home_page_widget?.widget_text && (
                        <div className='col-lg-12 col-xl-12'>
                            <p className="m-0">
                                {sectionData?.home_page_widget?.widget_text}
                            </p>
                        </div>
                    )}
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
        <section className="s1-2nd-bg-color" style={{ padding: "5% 10%" }}>
            <div className="container">
                {/* Render First Section */}
                {renderSection(responseData?.first)}

                {/* Render Second Section */}
                {renderSection(responseData?.second)}
            </div>
        </section>
    );
}

export default TrendingProducts;