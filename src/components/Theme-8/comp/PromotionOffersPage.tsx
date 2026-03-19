import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetPromotionCategories } from '@/apis/user';
import { cleanHtmlContent, extractAllOffers, extractFirstSentences, filterOfferBanners, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import EventBanner from './EventBanner';
import { faChevronRight, faCompass, faFire, faTag } from '@/constants/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MerchantDetailsShort from './MerchantDetailsShort';
import Banner from './Banner';
import MerchantDetailsFull from './MerchantDetailsFull';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import VerticalEventOfferBanner from './VerticalEventOfferBanner';
import OfferCardThree from './OfferCardThree';
import { stripHtml } from 'string-strip-html';
import { apiGetPromoOfferBanners, apiGetPromotionOffers, apiGetSubPromoBanners, apiGetSubPromoSuggestedMerchant } from '@/apis/page_optimization';
import {faGreaterThan} from '@/constants/icons';
const PromotionOffersPage = async ({ params }: { params: string }) => {
    const slug = params;
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain);
    const companyData = response?.data;
    
    const [promotion, banners, eventMerchants, suggestedPromo, promoOfferBanners, promoCategories] = await Promise.all([
        apiGetPromotionOffers(companyData?.unique_id, slug).then(res => res.data),
        apiGetSubPromoBanners(companyData?.unique_id, slug).then(res => res.data),
        apiGetSubPromoSuggestedMerchant(companyData?.unique_id, slug).then(res => res.data),
        apiGetAllPromotion(companyDomain.domain).then(res => res.data),
        apiGetPromoOfferBanners(companyData?.unique_id, slug).then(res => res.data),
        apiGetPromotionCategories(companyData?.unique_id, slug).then(res => res.data),
    ]);
    
    if (!promotion) return notFound();

    const suggestedCategories = promoCategories?.selected_categories;
    const suggestedPromotions = suggestedPromo?.filter(promo => promo.slug !== slug);
    const offerBanners = extractAllOffers(promoOfferBanners);
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);
    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);

    const allOffers: { offer: Offer; merchant: MerchantWithOffers }[] = promotion?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({ offer, merchant }))
    ) || [];

    const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '');
    const plainDesc = stripHtml(cleanDesc).result;
    const shortDesc = extractFirstSentences(plainDesc);
    const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5);

    return (
        <main className="bg-[#fcfcfd] min-h-screen font-sans">
            {/* 1. Hero Section with Banner */}
            <div className="relative w-full bg-slate-900 overflow-hidden">
                {banners?.length > 0 && (
                    <div className="opacity-60 grayscale-[0.3]">
                        <EventBanner domain={companyDomain.domain} banners={banners} eventName={promotion?.promotion?.name} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                
                <div className="container mx-auto px-6 relative z-10 pt-20 pb-16">
                    <nav className="mb-8">
                        <ol className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <li>
                                <Link href="/" className="no-underline hover:text-indigo-400 transition-colors duration-300">
                                    Home
                                </Link>
                            </li>
                            
                            {/* Modern Separator: Chevron Right SVG */}
                            <li className="flex items-center justify-center opacity-40">
                                <svg 
                                    width="6" 
                                    height="10" 
                                    viewBox="0 0 6 10" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-current"
                                >
                                    <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </li>

                            <li>
                                <Link href={`/${companyData?.promotion_slug}`} className="no-underline hover:text-indigo-400 transition-colors duration-300">
                                    Promotions
                                </Link>
                            </li>

                            {/* Current Page Indicator (Optional) */}
                            <li className="flex items-center justify-center opacity-40">
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </li>
                            <li className="text-indigo-500 truncate max-w-[150px]">
                                {promotion?.promotion?.name}
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-4xl md:text-7xl font-black text-white leading-none mb-6 tracking-tighter">
                        {promotion?.promotion?.name}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-indigo-500/20">
                            Active Campaign
                        </span>
                        <div className="h-px w-20 bg-slate-700"></div>
                        <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">{allOffers.length} Live Deals Found</span>
                    </div>
                </div>
            </div>

            <section className="container mx-auto px-6 -mt-10 relative z-20 pb-24">
                <div className="flex flex-col xl:flex-row gap-12">
                    
                    {/* --- Left Content: Offers --- */}
                    <div className="xl:w-3/4 flex flex-col gap-12">
                        
                        {/* Header Info Card */}
                        {promotion?.promotion?.description && (
                            <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                                    <MerchantDetailsShort details={promotion?.promotion?.description} />
                                </div>
                            </div>
                        )}

                        {/* Offers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {allOffers?.map((item, index) => {
                                const isSixth = (index + 1) % 6 === 0;
                                const isTwelfth = (index + 1) % 12 === 0;
                                const merchantStart = Math.floor(index / 12) * 4;
                                const currentMerchants = eventMerchants?.slice(merchantStart, merchantStart + 4);

                                return (
                                    <React.Fragment key={index}>
                                        <div className="transform transition-all duration-500 hover:scale-[1.02]">
                                            <OfferCardThree
                                                product={item?.offer}
                                                merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                                                domain={companyDomain.domain}
                                                merchant_name={item.merchant?.merchant_name}
                                                merchant_logo={item.merchant?.merchant_logo}
                                            />
                                        </div>

                                        {/* Injected: Partner Brands */}
                                        {isSixth && !isTwelfth && currentMerchants?.length > 0 && (
                                            <div className="col-span-full py-12 px-10 bg-indigo-50/50 rounded-[3.5rem] border border-indigo-100/50">
                                                <div className="flex items-center justify-between mb-10">
                                                    <h4 className="text-slate-900 font-black text-xl uppercase tracking-tighter">Premium Partners</h4>
                                                    <FontAwesomeIcon icon={faFire} className="text-indigo-600 animate-pulse" />
                                                </div>
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                                    {currentMerchants.map((m, i) => (
                                                        <SidebarRoundMerchantCard key={i} merchant={m} merSlug={companyData?.store_slug} slugType={companyData?.slug_type} />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Injected: Ads Banner */}
                                        {isTwelfth && filteredOfferBanners[Math.floor(index / 12)] && (
                                            <div className="col-span-full rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100 my-6">
                                                <Banner 
                                                    data={filteredOfferBanners[Math.floor(index / 12)]} 
                                                    height={120} 
                                                    domain={companyDomain.domain} 
                                                    mer_slug={companyData?.store_slug} 
                                                    slug_type={companyData?.slug_type} 
                                                />
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* SEO/Details Bottom Section */}
                        {showFullDetailsSection && (
                            <div className="bg-slate-900 text-slate-300 p-12 md:p-16 rounded-[4rem] shadow-2xl">
                                <h2 className="text-white text-3xl font-black mb-8">About this Campaign</h2>
                                <div className="opacity-80">
                                    <MerchantDetailsFull details={promotion?.promotion?.description} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- Right Sidebar --- */}
                    <aside className="xl:w-1/4">
                        <div className="sticky top-10 space-y-10">
                                              
                            {/* Categories Card - Modern Interactive Style */}
                            {suggestedCategories?.length > 0 && (
                                <div className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                                    {/* Header with Gradient Underline */}
                                    <div className="px-8 py-6 relative">
                                        <h4 className="text-slate-900 font-black text-[13px] uppercase tracking-[0.2em]">
                                            Explore Categories
                                        </h4>
                                        <div className="absolute bottom-0 left-8 w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-full"></div>
                                    </div>

                                    {/* List with Floating Effect */}
                                    <div className="p-4 space-y-2">
                                        {suggestedCategories.map((cat, i) => (
                                            <Link 
                                                key={i} 
                                                href={`/${cat?.url}`} 
                                                className="no-underline group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_10px_25px_-5px_rgba(79,70,229,0.1)] hover:-translate-y-1 border border-transparent hover:border-indigo-50"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* Bullet point that grows on hover */}
                                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-600 group-hover:scale-150 transition-all duration-300"></div>
                                                    
                                                    <span className="text-slate-600 group-hover:text-slate-900 text-[14px] font-bold transition-colors">
                                                        {cat?.category_name}
                                                    </span>
                                                </div>
                                                
                                                {/* Floating Circle Arrow */}
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-indigo-600 transition-all duration-500">
                                                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-400 group-hover:text-white" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Vertical Banners Area */}
                            {filteredVerticalBanners?.length > 0 && (
                                <div className="group rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl">
                                    {/* Header with Gradient Underline */}
                                    <div className="px-8 py-6 relative">
                                        <h4 className="text-slate-900 font-black text-[13px] uppercase tracking-[0.2em]">
                                            Explore Categories
                                        </h4>
                                        <div className="absolute bottom-0 left-8 w-12 h-1 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-full"></div>
                                    </div>

                                    <VerticalEventOfferBanner 
                                        bannerResponse={filteredVerticalBanners} 
                                        domain={companyDomain.domain} 
                                        mer_slug={companyData?.store_slug} 
                                        slug_type={companyData?.slug_type} 
                                    />
                                </div>
                            )}

                            {/* Suggested Promos Card */}
                           {suggestedPromotions?.length > 0 && (
                                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200 overflow-hidden relative group">
                                    {/* Background Decorative Icon - Spins slowly on hover */}
                                    <FontAwesomeIcon 
                                        icon={faCompass} 
                                        className="absolute -top-6 -right-6 text-9xl text-white/5 group-hover:text-indigo-500/10 group-hover:rotate-[30deg] transition-all duration-1000 ease-in-out" 
                                    />
                                    
                                    <h4 className="text-xl font-black mb-8 relative z-10 leading-tight tracking-tight">
                                        Handpicked <br/>
                                        <span className="text-indigo-400">Promotions</span>
                                    </h4>

                                    <div className="space-y-3 relative z-10">
                                        {suggestedPromotions.map((promo, i) => (
                                            <Link 
                                                key={i} 
                                                href={getPromotionHref(promo, companyData?.promotion_slug)} 
                                                className="no-underline group/item relative flex items-center justify-between p-4 bg-white/5 rounded-2xl transition-all duration-300 overflow-hidden border border-white/5 hover:border-white/20"
                                            >
                                                {/* Hover Slide Effect: Yeh piche se white layer layega */}
                                                <div className="absolute inset-0 bg-white translate-y-full group-hover/item:translate-y-0 transition-transform duration-300 ease-out"></div>

                                                <div className="flex items-center gap-4 relative z-10">
                                                    {/* Status Dot: Pulsates on hover */}
                                                    <div className="relative">
                                                        <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover/item:bg-indigo-600 transition-colors"></div>
                                                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-indigo-400 animate-ping opacity-0 group-hover/item:opacity-40"></div>
                                                    </div>

                                                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 group-hover/item:text-slate-900 transition-colors duration-300 truncate max-w-[180px]">
                                                        {promo?.name}
                                                    </span>
                                                </div>

                                                {/* Arrow: Slides in from left */}
                                                <div className="relative z-10 opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">
                                                    <FontAwesomeIcon icon={faGreaterThan} className="text-[8px] text-indigo-600" />
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}

export default PromotionOffersPage;