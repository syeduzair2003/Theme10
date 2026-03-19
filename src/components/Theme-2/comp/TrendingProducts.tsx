import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeMultiProductData, OffersOffer } from '@/services/dataTypes';
import { apiGetMultiProductOffers } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import { getBaseImageUrl, getMerchantHref, splitHeading } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import OfferSlider from './OfferSlider';
import T2ProductCard from './T2ProductCard';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const TrendingProductsT2 = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const responseData = (await apiGetMultiProductOffers(companyId)).data;
    const companyDomain = (await cookieService.get("domain")).domain;

    const renderSection = (sectionData: HomeMultiProductData, index: number) => {
        if (!sectionData?.offers?.length) return null;

        const [headingFirst, headingSecond] = splitHeading(sectionData?.home_page_widget?.widget_heading);

        return (
            <div key={index} className="mb-5">
                <div className="row t2-header d-flex align-items-center justify-content-between mb-4">
                    <div className="col-md-9 d-flex align-items-center gap-3">
                        {/* Merchant Logo */}
                        {sectionData?.merchant?.merchant_logo && (
                            <Image
                                src={getBaseImageUrl(companyDomain, sectionData?.merchant?.merchant_logo, "")}
                                alt="Merchant Logo"
                                className="rounded-circle shadow-sm"
                                height={60}
                                width={60}
                                style={{ width: '75px', height: '75px', objectFit: 'contain', border: '1px solid #eee', padding: '7px', backgroundColor: '#fff' }}
                            />
                        )}
                        {/* Heading */}
                        <div className="d-flex flex-column">
                            <h2 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>
                                {headingFirst || `Trending`} <span style={{ color: '#6f2c91' }}>{headingSecond || `Products`}</span>
                            </h2>
                            <p className='fw-bold m-0' style={{ color: '#2c3e50' }}>
                                {sectionData?.merchant?.promotional_tag}
                            </p>
                        </div>
                    </div>
                    
                    {/* View All Link */}
                    <div className="col-md-3 text-end d-none d-md-block">
                        <Link href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)} className="d-inline-flex align-items-center gap-2 text-decoration-none">
                            <span className="fw-bold" style={{ color: '#6f2c91' }}>View All</span>
                            <FontAwesomeIcon icon={faArrowRight} style={{ color: '#6f2c91' }} />
                        </Link>
                    </div>
                </div>

                <div className="w-100">
                    <OfferSlider>
                        {sectionData.offers.map((item: OffersOffer, i: number) => (
                            <T2ProductCard 
                                key={i}
                                offer={item}
                                merchant={sectionData?.merchant}
                                mer_slug_type={mer_slug_type}
                                domain={companyDomain}
                                merchantHref={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)}
                            />
                        ))}
                    </OfferSlider>
                </div>
            </div>
        );
    };

    if (!responseData?.first && !responseData?.second) return null;

    return (
        <section className="t2-slider-section">
            <div className="container">
                {responseData?.first && renderSection(responseData?.first, 1)}
                {/* Add a divider if both exist */}
                {responseData?.first && responseData?.second && <hr className="my-5" style={{opacity: 0.1}}/>}
                {responseData?.second && renderSection(responseData?.second, 2)}
            </div>
        </section>
    );
};

export default TrendingProductsT2;