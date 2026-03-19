import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization';
import { apiCompanyUpdatedData } from '@/apis/user';
import { cleanHtmlContent, extractFirstSentences, getBaseImageUrl, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer, SubPromotion } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';
import { stripHtml } from 'string-strip-html';
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
import OfferCardThree from './OfferCardThree';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import Image from 'next/image';

const ParentPromotionPage = async ({ params }: { params: string }) => {
    const slug = params;
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain);
    const companyData = response?.data;

    const [promotion, subPromotions] = await Promise.all([
        apiGetPromotionOffers(companyData?.unique_id, slug).then(res => res.data),
        apiGetSubPromotion(companyData?.unique_id, slug).then(res => res.data),
    ]);

    const allOffers = promotion?.merchants?.flatMap((merchant) =>
        (merchant?.offers || []).map((offer) => ({ offer, merchant }))
    ) || [];

    const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '');
    const plainDesc = stripHtml(cleanDesc).result;
    const shortDesc = extractFirstSentences(plainDesc);
    const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5);

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-20">
            {/* --- PREMIUM HERO SECTION --- */}
            <section className="pt-10 pb-12 px-0 md:px-0">
                <div className="w-full mx-auto bg-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-900/20">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-40 -mt-40"></div>
                    
                    <div className="relative z-10 p-8 md:p-16 lg:p-20">
                        <nav className="inline-flex items-center bg-white/5 backdrop-blur-md px-5 py-2 rounded-full mb-10 border border-white/10">
                            <ol className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-slate-300 list-none m-0 p-0">
                                <li><Link href="/" className="no-underline hover:text-white transition-colors">Home</Link></li>
                                <li className="opacity-40">/</li>
                                <li><Link href={`/${companyData?.promotion_slug}`} className="no-underline hover:text-white transition-colors">Promotions</Link></li>
                                <li className="opacity-40">/</li>
                                <li className="text-blue-400">{promotion?.promotion?.name}</li>
                            </ol>
                        </nav>

                        <div className="max-w-4xl">
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                                {promotion?.promotion?.name}
                            </h1>
                            {promotion?.promotion?.description && (
                                <div className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                                    <MerchantDetailsShort details={promotion?.promotion?.description} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 space-y-24">
                {/* --- BENTO GRID CATEGORIES --- */}
                {subPromotions?.length > 0 && (
                    <section>
                        <div className="flex flex-col mb-12">
                            <span className="text-blue-600 font-black text-[11px] uppercase tracking-[0.3em] mb-2">Curated Collections</span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Explore Sub-Promotions</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {subPromotions.map((item: SubPromotion, index: number) => (
                                <Link key={index} href={getPromotionHref(item, companyData?.promotion_slug)} className="group relative h-[300px] overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700">
                                    <Image
                                        src={getBaseImageUrl(companyDomain?.domain, item?.category_image, "")}
                                        alt={item?.category_name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-10 flex flex-col justify-end">
                                        <h3 className="text-white text-3xl font-black tracking-tight mb-2 group-hover:-translate-y-2 transition-transform duration-500">{item.category_name}</h3>
                                        <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            <span>View Offers</span>
                                            <span>→</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* --- OFFERS GRID --- */}
                <section>
                    <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-200">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center">Top Rated Deals</h2>
                        <div className="hidden md:flex gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Offers</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {allOffers?.map((item, index) => (
                            <OfferCardThree 
                                key={index} 
                                product={item?.offer} 
                                merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)} 
                                domain={companyDomain.domain} 
                                merchant_name={item.merchant?.merchant_name} 
                                merchant_logo={item.merchant?.merchant_logo} 
                            />
                        ))}
                    </div>
                </section>

                {/* --- MERCHANTS SECTION --- */}
                <section className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
                    <h2 className="text-2xl font-black text-slate-900 text-center mb-16 uppercase tracking-[0.2em]">Featured Brands</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8">
                        {allOffers?.map((item, index) => (
                            <SidebarRoundMerchantCard 
                                key={index} 
                                merSlug={companyData?.store_slug} 
                                slugType={companyData?.slug_type} 
                                merchant={item?.merchant} 
                            />
                        ))}
                    </div>
                </section>

                {showFullDetailsSection && (
                    <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                        <MerchantDetailsFull details={promotion?.promotion?.description} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParentPromotionPage;