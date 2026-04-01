import { HomeMultiProductData, OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { getBaseImageUrl, getMerchantHref, getProductDetailHref, splitSentence } from '@/constants/hooks';
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

    const renderSection = (sectionData: HomeMultiProductData, isFirst: boolean) => {
        if (!sectionData?.offers?.length) return null;

        const [headingFirst, headingSecond] = splitSentence(sectionData?.home_page_widget?.widget_heading);

        return (
            <div className={`relative ${!isFirst ? 'mt-24' : ''}`}>
                {/* --- MODERN HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
                    
                    <div className="flex items-center gap-5">
                        {/* Merchant Logo with Glow */}
                        {sectionData?.merchant?.merchant_logo && (
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#161b22] rounded-full p-3 border border-slate-800 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={getBaseImageUrl(companyDomain, sectionData?.merchant?.merchant_logo, "")}
                                        alt="Merchant Logo"
                                        fill
                                        className="object-contain p-3 scale-90 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
                                <span className="text-slate-500 not-italic font-medium block text-xs tracking-[0.3em] mb-2 uppercase">Official Partner</span>
                                {headingFirst} <span className="text-blue-500">{headingSecond}</span>
                            </h2>
                        </div>
                    </div>

                    {/* View More - Desktop & Mobile Friendly */}
                    <Link 
                        href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)} 
                        className="inline-flex items-center gap-3 bg-white/5 hover:bg-blue-600 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group active:scale-95"
                    >
                        Explore All Deals
                        <FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* --- SLIDER SECTION --- */}
                <div className="relative group">
                    {/* Background Decorative Gradient for Slider */}
                    <div className="absolute -inset-x-20 top-0 h-full bg-blue-600/5 blur-[120px] pointer-events-none rounded-full"></div>
                    
                    <OfferSlider>
                        {sectionData.offers.slice(0, count).map((item: OffersOffer, i: number) => (
                            <div key={i} className="px-2">
                                <ProductCard
                                    offer={item}
                                    mer_slug_type={mer_slug_type}
                                    mer_slug={mer_slug}
                                    type={item?.offer?.offer_type?.name}
                                    merchant={sectionData?.merchant}
                                    productDetailUrl={item?.offer?.slug ? getProductDetailHref(sectionData?.merchant, mer_slug_type, item?.offer?.slug) : null}
                                />
                            </div>
                        ))}
                    </OfferSlider>
                </div>
            </div>
        );
    };

    if (!responseData?.first && !responseData?.second) return null;

    return (
        <section className="bg-[#020617] py-24 px-6 lg:px-20 overflow-hidden relative">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Render First Section */}
                {responseData?.first && renderSection(responseData?.first, true)}

                {/* Styled Divider */}
                {responseData?.first && responseData?.second && (
                    <div className="my-24 flex items-center justify-center gap-4 opacity-20">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-500"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-500"></div>
                    </div>
                )}

                {/* Render Second Section */}
                {responseData?.second && renderSection(responseData?.second, false)}
            </div>
        </section>
    );
}

export default TrendingProducts;