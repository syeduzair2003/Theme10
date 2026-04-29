'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks';

interface Props {
    merchants: any[];
    companyDomain: string;
    mer_slug: string;
    mer_slug_type: string;
}

const RoundedMerchantSlider: React.FC<Props> = ({ merchants, companyDomain, mer_slug, mer_slug_type }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showSliders, setShowSliders] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (scrollContainerRef.current) {
                const { scrollWidth, clientWidth } = scrollContainerRef.current;
                setShowSliders(scrollWidth > clientWidth);
            }
        };

        checkScroll();
        // Allow images to load and layout to stabilize
        const timeout = setTimeout(checkScroll, 500); 
        window.addEventListener('resize', checkScroll);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', checkScroll);
        }
    }, [merchants]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of container width
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const getRandomCashback = () => {
        const amount = Math.floor(Math.random() * 15) + 1;
        return `${amount}%`;
    };

    if (!merchants || merchants.length === 0) return null;

    return (
        <div className="relative group/slider w-full px-12 sm:px-14 md:px-16">
            <style jsx>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            {/* Slider Buttons */}
            {showSliders && (
                <>
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 sm:left-1 top-[40%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 text-[#ff912f] hover:bg-[#8bc94a] hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 sm:right-1 top-[40%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 text-[#ff912f] hover:bg-[#8bc94a] hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </>
            )}

            {/* Scrollable Container */}
            <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 sm:gap-8 md:gap-10 lg:gap-12 pb-6 px-4 -mx-4 hide-scroll scroll-smooth snap-x snap-mandatory"
            >
                {merchants.map((merchant, i) => {
                    const merchantName = merchant.merchant_name;
                    const merchantLogo = merchant.merchant_logo;
                    const cashbackAmount = merchant?.discount_tag;
                    const href = getMerchantHref(merchant, mer_slug, mer_slug_type);

                    return (
                        <Link
                            key={i}
                            href={href}
                            className="group flex flex-col items-center w-[100px] sm:w-[110px] md:w-[130px] no-underline shrink-0 snap-start"
                        >
                            {/* Circle Container */}
                            <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] rounded-full border border-gray-200 bg-white flex items-center justify-center p-4 sm:p-5 mb-4 group-hover:border-[#8bc94a] group-hover:shadow-[0_0_20px_rgba(139,201,74,0.25)] transition-all duration-300 relative overflow-hidden">
                                {merchantLogo ? (
                                    <Image
                                        src={getBaseImageUrl(companyDomain, merchantLogo, '')}
                                        alt={merchantName || 'Merchant'}
                                        fill
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100px, 130px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#8bc94a] font-bold text-2xl uppercase">
                                        {merchantName?.[0]}
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-center gap-1 mb-1 w-full px-1">
                                <span className="text-gray-500 font-medium text-xs sm:text-sm text-center line-clamp-2 leading-tight group-hover:text-gray-900 transition-colors duration-300">
                                    {merchantName}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default RoundedMerchantSlider;
