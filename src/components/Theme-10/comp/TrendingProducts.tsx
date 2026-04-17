import { HomeMultiProductData, OffersOffer } from '@/services/dataTypes';
import React from 'react';
import { getBaseImageUrl, getMerchantHref, getProductDetailHref, splitSentence } from '@/constants/hooks';
import Link from 'next/link';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import ProductCard from './ProductCard';
import OfferSlider from './OfferSlider';
import { apiGetMultiProductOffers } from '@/apis/user';
import Image from 'next/image';
import cookieService from '@/services/CookiesService';
import { ArrowRight } from "lucide-react";

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const TrendingProducts = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const count = 8;
    // Using the logic structure of fetching multi-product data and domain
    const responseData = (await apiGetMultiProductOffers(companyId)).data;
    const cookieData = await cookieService.get("domain");
    const companyDomain = cookieData?.domain;

const renderSection = (sectionData: HomeMultiProductData, isFirst: boolean) => {
    if (!sectionData?.offers?.length) return null;

    const [headingFirst, headingSecond] = splitSentence(sectionData?.home_page_widget?.widget_heading);
    const content = sectionData?.home_page_widget?.widget_text;
    
    const offers = sectionData.offers.slice(0, count);
    const offersCount = offers.length;

    return (
        <div className={`relative ${!isFirst ? 'mt-24' : ''}`}>
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-center gap-5">
                    {sectionData?.merchant?.merchant_logo && (
                        <div className="relative group">
                            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full p-2 border border-[#800000]/10 flex items-center justify-center overflow-hidden shadow-sm">
                                <Image
                                    src={getBaseImageUrl(companyDomain, sectionData?.merchant?.merchant_logo, "")}
                                    alt="Merchant Logo"
                                    fill
                                    className="object-contain p-2 scale-90 group-hover:scale-100 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2 text-left">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight">
                            {headingFirst}{" "} <br />
                            <span className="text-[#800000] drop-shadow-[0_0_15px_rgba(128,0,0,0.1)]">
                                {headingSecond}
                            </span>
                        </h2>
                        {content && (
                            <p className="text-[#1A1A1A]/50 max-w-2xl text-sm leading-relaxed">
                                {content}
                            </p>
                        )}
                    </div>
                </div>

                <Link 
                    href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)} 
                    className="group flex items-center gap-3 px-8 py-3.5 border border-[#800000]/40 rounded-full text-[#800000] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#800000] hover:text-white hover:border-transparent hover:shadow-[0_15px_30px_rgba(128,0,0,0.2)] no-underline h-fit shrink-0"
                >
                    Explore All Deals
                    <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                </Link>
            </div>

            {/* --- DYNAMIC DISPLAY SECTION --- */}
            <div className="max-w-7xl mx-auto">
                {offersCount > 4 ? (
                    <OfferSlider>
                        {offers.map((item: OffersOffer, i: number) => (
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
                ) : (
                    /* YAHAN HAI FIX: 
                       'w-full' aur 'justify-items-stretch' lagaya hai taaki cards chote na reh jayen 
                    */
                    <div className={`grid gap-8 justify-items-stretch ${
                        offersCount === 1 ? 'grid-cols-1' : 
                        offersCount === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                        offersCount === 3 ? 'grid-cols-1 md:grid-cols-3' : 
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                    }`}>
                        {offers.map((item: OffersOffer, i: number) => (
                            <div key={i} className="w-full flex">
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
                    </div>
                )}
            </div>
        </div>
    );
};

    if (!responseData?.first && !responseData?.second) return null;

    return (
        <section className="bg-[#fffde0] py-20 px-6 lg:px-20 overflow-hidden relative">
  {/* Preserving your Top Divider Line */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100" />

  <div className="max-w-7xl mx-auto relative z-10">
    {/* Render First Section */}
    {responseData?.first && renderSection(responseData?.first, true)}

    {/* Styled Divider (Logic from Code 1, Styled with Maroon from Code 2) */}
    {responseData?.first && responseData?.second && (
      <div className="my-24 flex items-center justify-center gap-4 opacity-30">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#800000]"></div>
        <div className="w-2 h-2 rounded-full bg-[#800000]"></div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#800000]"></div>
      </div>
    )}

    {/* Render Second Section */}
    {responseData?.second && renderSection(responseData?.second, false)}
  </div>
</section>
    );
}

export default TrendingProducts;