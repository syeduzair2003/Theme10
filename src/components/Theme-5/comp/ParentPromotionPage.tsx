import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization';
import { apiCompanyUpdatedData } from '@/apis/user';
import { cleanHtmlContent, extractFirstSentences, getBaseImageUrl, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer, SubPromotion } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import { stripHtml } from 'string-strip-html';
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
import CouponCard from './CouponCard';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import Image from 'next/image';
import ParentPromotionSchema from '@/components/shared/SchemaScripts/ParentPromotionSchema';
import Footer from './Footer';
import Header from './Header';

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const ParentPromotionPage = async ({ params }: { params: string }) => {
    const slug = params;
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain);
    const companyData = response?.data;

    const [promotion, subPromotions] = await Promise.all([
        apiGetPromotionOffers(companyData?.unique_id, slug).then((res: any) => res.data),
        apiGetSubPromotion(companyData?.unique_id, slug).then((res: any) => res.data),
    ]);

    const allOffers: MerchantOfferItem[] =
        promotion?.merchants?.flatMap((merchant: any) =>
            (merchant?.offers || []).map((offer: any) => ({
                offer,
                merchant,
            }))
        ) || [];

    const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '');
    const plainDesc = stripHtml(cleanDesc).result;
    const shortDesc = extractFirstSentences(plainDesc);

    const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5);

    // console.log('=== ParentPromotionPage Debug ===');
    //     console.log('slug:', slug);
    //     console.log('subPromotions:', JSON.stringify(subPromotions, null, 2));
    //     console.log('subPromotions type:', typeof subPromotions);
    //     console.log('subPromotions is array:', Array.isArray(subPromotions));
    //     console.log('subPromotions length:', subPromotions?.length);
    //     console.log('promotion:', promotion?.promotion?.name);




    return (
        <>
            <Header
                title={promotion?.promotion?.name || 'Promotion'}
                subtitle="Deals"
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Promotions', href: `/${companyData?.promotion_slug}` },
                    { label: promotion?.promotion?.name || 'Promotion' }
                ]}
            />

            <div className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {promotion?.promotion?.description !== null && (
                        <div className="text-gray-600 leading-relaxed mb-8">
                            <MerchantDetailsShort details={promotion?.promotion?.description} />
                        </div>
                    )}
                </div>
            </div>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {subPromotions && subPromotions.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Suggested {promotion?.promotion?.name} by Categories
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {subPromotions.map((item: SubPromotion, index: number) => (
                                    <Link
                                        key={index}
                                        href={getPromotionHref(item, companyData?.promotion_slug)}
                                        className="group block"
                                    >
                                        <div className="relative h-64 overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl">
                                            <Image
                                                src={getBaseImageUrl(companyDomain?.domain, item?.category_image, "")}
                                                alt={item?.category_name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                height={250}
                                                width={400}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70  to-transparent" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-50 transition-opacity duration-500" />

                                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                                                {/* Decorative Indigo accent line that grows on hover */}
                                                <div className="w-1 group-hover:h-12 h-8 bg-indigo-500 transition-all duration-500 absolute left-0 bottom-10 rounded-r-full" />

                                                <div className="pl-4">
                                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-2 block opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                                                        Explore
                                                    </span>
                                                    <h3 className="text-white text-2xl font-black leading-none">
                                                        {item?.category_detail !== null ? item?.category_detail : item?.category_name}
                                                    </h3>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                                                        View Collection →
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Top Rated Deals
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {allOffers?.map((item, index) => (
                                <div key={index} className="">
                                    <CouponCard
                                        product={item?.offer}
                                        merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                                        domain={companyDomain.domain}
                                        merchant_name={item.merchant?.merchant_name}
                                        merchant_logo={item.merchant?.merchant_logo}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Top Rated Merchants in {promotion?.promotion?.name}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {allOffers?.map((item, index) => (
                                <div key={index} className="">
                                    <SidebarRoundMerchantCard
                                        merSlug={companyData?.store_slug}
                                        slugType={companyData?.slug_type}
                                        merchant={item?.merchant}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {showFullDetailsSection && (
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <MerchantDetailsFull details={promotion?.promotion?.description} />
                        </div>
                    )}
                </div>
            </section>

            <Footer />
            <ParentPromotionSchema companyId={companyData?.unique_id} company_name={companyData?.company_name} slug={slug} promotionName={promotion?.promotion?.name} promoSlug={companyData?.promotion_slug} />
        </>
    )
}

export default ParentPromotionPage