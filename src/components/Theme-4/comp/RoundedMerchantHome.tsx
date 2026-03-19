import { apiGetTopCashbackMerchants } from '@/apis/page_optimization';
import { getBaseImageUrl, getMerchantHref, splitHeading } from '@/constants/hooks';
import { faArrowRight, faBolt, FontAwesomeIcon } from '@/constants/icons'; // Added faBolt
import cookieService from '@/services/CookiesService';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

const RoundedMerchantHome = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const merchants = await apiGetTopCashbackMerchants(companyId);
    const heading = merchants?.data?.cashback_merchants_widget?.widget_heading ? merchants?.data?.cashback_merchants_widget?.widget_heading : "Our Cashback Merchants"

    const getRandomCashback = () => {
        const amount = Math.floor(Math.random() * 15) + 1;
        return `${amount}%`;
    }

    const displayMerchants = merchants.data?.merchants?.slice(0, 6) || [];

    if (displayMerchants?.length > 0) {
        return (
            <>
                <section className="merchant-carousel-section" style={{ padding: "5% 8%" }}>
                    <div className="container">
                        <div className="section-header row mb-4">
                            <div className="col-9 col-md-9 col-sm-9 col-lg-10 col-xl-10 section-title-center mb-3 no-before">
                                <h1 className="top-stores-heading animate-heading d-inline">
                                    <span className="stores-text">{heading}</span>
                                </h1>
                            </div>
                            <div className="col-3 col-md-3 col-sm-3 col-lg-2 col-xl-2 view-all-merchants">
                                <Link href={`/all-stores/A`} className="d-center gap-1" target='_blank'>
                                    <span className="p2-color fw-bold">View All</span>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                                </Link>
                            </div>
                            <div className='col-lg-12 col-xl-12'>
                                <p>
                                    {merchants?.data?.cashback_merchants_widget?.widget_text}
                                </p>
                            </div>
                        </div>

                        {/* Rounded Grid Section */}
                        <div className="row gy-4 justify-content-center">
                            {displayMerchants?.map((merchant, index) => (
                                <div key={index} className="col-6 col-md-4 col-lg-2">
                                    <div className="d-flex flex-column align-items-center text-center h-100">
                                        
                                        {/* Circle Container */}
                                        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className="text-decoration-none">
                                            <div 
                                                className="bg-white mer-circular-card rounded-circle shadow-sm border d-flex align-items-center justify-content-center mb-3 position-relative hover-scale overflow-hidden"
                                                style={{ 
                                                    width: '120px', 
                                                    height: '120px', 
                                                    border: '1px solid #e0e0e0',
                                                    transition: 'transform 0.2s ease'
                                                }}
                                            >
                                                {/* Fallback image logic recommended here */}
                                                <Image
                                                    src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")} 
                                                    alt={merchant.merchant_name} 
                                                    height={100}
                                                    width={100}
                                                    objectFit='contain'
                                                    style={{ 
                                                        maxWidth: '80%', 
                                                        maxHeight: '80%', 
                                                    }}
                                                />
                                            </div>
                                        </Link>
                                        {merchant?.discount_tag && (
                                            <div className="cashback-details">
                                                <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                                                    {/* Bolt Icon with Teal Color similar to image */}
                                                    <FontAwesomeIcon 
                                                        icon={faBolt} 
                                                        style={{ width: '12px', height: '12px', color: '#17a2b8' }} 
                                                    />
                                                    <span className="fw-bold" style={{ fontSize: '1rem', color: '#000' }}>
                                                        {merchant?.discount_tag}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default RoundedMerchantHome