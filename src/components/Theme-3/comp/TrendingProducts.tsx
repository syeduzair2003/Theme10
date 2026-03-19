import { HomeMultiProductData, OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { getBaseImageUrl, getMerchantHref, getProductDetailHref, splitHeading, splitSentence } from '@/constants/hooks';
import Link from 'next/link';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import ProductCard from './ProductCard';
import OfferSlider from './OfferSlider';
import { apiGetMultiProductOffers } from '@/apis/user';
import Image from 'next/image';
import cookieService from '@/services/CookiesService';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const TrendingProducts = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const count = 8;
    const responseData = (await apiGetMultiProductOffers(companyId)).data;
    const companyDomain = (await cookieService.get("domain")).domain;

    const renderSection = (sectionData: HomeMultiProductData) => {
        if (!sectionData?.offers?.length) {
            return null;
        }

        const [headingFirst, headingSecond] = splitSentence(sectionData?.home_page_widget?.widget_heading);

        return (
            <div className="mb-4 mb-md-5"> {/* Added spacing between sections */}

                {/* --- HEADER SECTION --- */}
                {/* Flex container: Column on Mobile, Row on Desktop */}
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 gap-3">

                    {/* 1. Logo & Link (Top row on Mobile) */}
                    <div className="d-flex align-items-center justify-content-between w-md-auto gap-3">
                        {sectionData?.merchant?.merchant_logo && (
                            <div className="flex-shrink-0">
                                <Image
                                    src={getBaseImageUrl(companyDomain, sectionData?.merchant?.merchant_logo, "")}
                                    alt="Merchant Logo"
                                    className="rounded-circle shadow-sm bg-white"
                                    height={100}
                                    width={100}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'contain',
                                        padding: '10px',
                                    }}
                                />
                            </div>
                        )}

                        {/* Mobile: Show "View More" next to logo. Desktop: Hide here, show on right. */}
                        <div className="d-md-none">
                            <Link href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)} className="d-flex align-items-center gap-1 text-decoration-none">
                                <span className="p2-color fw-bold small">View All</span>
                                <FontAwesomeIcon icon={faArrowRight} style={{ width: '12px', height: '12px', color: 'black' }} />
                            </Link>
                        </div>
                    </div>

                    {/* 2. Details / Heading (Middle row on Mobile) */}
                    <div className="text-start flex-grow-1 ms-md-3">
                        <h2 className="top-stores-heading animate-heading mb-0 flex-column">
                            <span className="product-heading-section d-block d-md-inline me-md-2">
                                {headingFirst}
                            </span>
                            <span className="product-sub-heading-section d-block d-md-inline me-md-2">
                                {headingSecond}
                            </span>
                            {/* <span className="stores-text f-18">
                                {sectionData?.merchant?.promotional_tag}
                            </span> */}
                        </h2>
                    </div>

                    {/* 3. View More Link (Desktop Only - Far Right) */}
                    <div className="d-none d-md-block flex-shrink-0">
                        <Link href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)} className="d-flex align-items-center gap-1 text-decoration-none">
                            <span className="p2-color fw-bold">View More Deals</span>
                            <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                        </Link>
                    </div>
                </div>

                {/* --- SLIDER SECTION --- */}
                <div className="w-100">
                    <OfferSlider>
                        {sectionData.offers.slice(0, count).map((item: OffersOffer, i: number) => (
                            <ProductCard
                                key={i}
                                offer={item}
                                mer_slug_type={mer_slug_type}
                                mer_slug={mer_slug}
                                type={item?.offer?.offer_type?.name}
                                merchant={sectionData?.merchant}
                                productDetailUrl={item?.offer?.slug ? getProductDetailHref(sectionData?.merchant, mer_slug_type, item?.offer?.slug) : null}
                            />
                        ))}
                    </OfferSlider>
                </div>
            </div>
        );
    };

    if (!responseData?.first && !responseData?.second) {
        return null;
    }

    return (
        // Optimized Padding: px-3 (mobile) -> px-lg-5 (desktop)
        <section className="s1-2nd-bg-color px-3 py-4 px-lg-5 py-lg-5">
            <div className="container p-0">
                {/* Render First Section */}
                {responseData?.first && renderSection(responseData?.first)}

                {/* Divider for visual separation if both exist */}
                {responseData?.first && responseData?.second && <hr className="my-5 opacity-25" />}

                {/* Render Second Section */}
                {responseData?.second && renderSection(responseData?.second)}
            </div>
        </section>
    );
}

export default TrendingProducts;