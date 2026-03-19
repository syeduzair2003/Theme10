import { apiGetTopCashbackMerchants } from '@/apis/page_optimization';
import { getBaseImageUrl, getMerchantHref, splitHeading } from '@/constants/hooks';
import { faArrowRight, faBolt, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

const RoundedMerchantHome = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const merchants = await apiGetTopCashbackMerchants(companyId);
    const heading = merchants?.data?.cashback_merchants_widget?.widget_heading ? merchants?.data?.cashback_merchants_widget?.widget_heading : "Our Discounted Stores";

    const getRandomCashback = () => {
        const amount = Math.floor(Math.random() * 15) + 1;
        return `${amount}%`;
    };

    // Note: To match the image exactly (which shows 7 items), you can change this to slice(0, 7) if you'd like.
    const displayMerchants = merchants.data?.merchants?.slice(0, 7) || [];

    if (displayMerchants?.length > 0) {
        return (
            <>
                {/* Reduced padding for a tighter, more modern section */}
                <section className="merchant-carousel-section py-5">
                    <div className="container">

                        {/* Modernized Header: Flexbox to push title left and button right */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                            <div className="section-title-left">
                                <h2 className="top-stores-heading animate-heading fw-bold mb-0" style={{ fontSize: '1.75rem', color: '#000' }}>
                                    <span className="stores-text">{heading}</span>
                                </h2>
                                {/* Preserved your dynamic text description if it exists */}
                                {merchants?.data?.cashback_merchants_widget?.widget_text && (
                                    <p className="mt-2 mb-0 text-muted">
                                        {merchants?.data?.cashback_merchants_widget?.widget_text}
                                    </p>
                                )}
                            </div>

                            <div className="view-all-merchants">
                                <Link href={`/all-stores/A`} className="d-center gap-1" target='_blank'>
                                    <span className="p2-color fw-bold">View All</span>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                                </Link>
                            </div>
                        </div>

                        {/* Tightly packed Flex container instead of wide Bootstrap columns */}
                        <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4">
                            {displayMerchants?.map((merchant, index) => (
                                <div key={index} className="d-flex flex-column align-items-center text-center" style={{ width: '130px' }}>

                                    {/* Circle Container */}
                                    <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className="text-decoration-none">
                                        <div
                                            className="bg-white mer-circular-card rounded-circle d-flex align-items-center justify-content-center mb-3 position-relative hover-scale overflow-hidden"
                                            style={{
                                                width: '120px',
                                                height: '120px',
                                                border: '1px solid #e0e0e0',
                                                transition: 'transform 0.2s ease'
                                            }}
                                        >
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

                                    {/* Updated Text Underneath to stack */}
                                    {merchant?.discount_tag && (
                                        <div className="cashback-details d-flex flex-column align-items-center">
                                            <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                                                <FontAwesomeIcon
                                                    icon={faBolt}
                                                    style={{ width: '12px', height: '12px', color: '#0dcaf0' }}
                                                />
                                                <span className="fw-bold" style={{ fontSize: '1rem', color: '#000' }}>
                                                    {merchant?.discount_tag}
                                                </span>
                                            </div>
                                            <span style={{ fontSize: '0.85rem', color: '#555' }}>
                                                Cash Back
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            </>
        )
    }
}

export default RoundedMerchantHome;