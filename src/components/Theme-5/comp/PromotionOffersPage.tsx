import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetPromotionCategories } from '@/apis/user';
import { cleanHtmlContent, extractAllOffers, extractFirstSentences, filterOfferBanners, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import EventBanner from './EventBanner';
import MerchantDetailsShort from './MerchantDetailsShort';
import Banner from './Banner';
import MerchantDetailsFull from './MerchantDetailsFull';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import VerticalEventOfferBanner from './VerticalEventOfferBanner';
import CouponCard from './CouponCard';
import { stripHtml } from 'string-strip-html';
import { apiGetPromoOfferBanners, apiGetPromotionOffers, apiGetSubPromoBanners, apiGetSubPromoSuggestedMerchant } from '@/apis/page_optimization';
import PromotionOffersSchema from '@/components/shared/SchemaScripts/PromotionOffersSchema';
import Footer from './Footer';

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};


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
    const suggestedCategories = promoCategories?.selected_categories;

    const suggestedPromotions = suggestedPromo?.filter(promo => promo.slug !== slug);

    if (!promotion) {
        return notFound();
    }
    // const eventOfferBanners = (await apiGetEventOfferBanners(companyData?.unique_id, event?.event?.slug))?.data
    const offerBanners = extractAllOffers(promoOfferBanners);
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);

    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);

    const allOffers: MerchantOfferItem[] =
        promotion?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];

    const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '');
    const plainDesc = stripHtml(cleanDesc).result;
    const shortDesc = extractFirstSentences(plainDesc);

    const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5);

    return (
        <>
            {banners?.length > 0 && (
                <EventBanner domain={companyDomain.domain} banners={banners} eventName={promotion?.promotion?.name} />
            )}
            <section className="bg-gradient-to-br from-indigo-50 to-slate-50 py-8 rounded-3xl mx-4 mt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="inline-flex max-w-full overflow-x-auto whitespace-nowrap items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs md:text-sm font-medium shadow-lg backdrop-blur-md scrollbar-hide">
                        <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
                        <span className='opacity-50'>/</span>
                        <Link href={`/${companyData?.promotion_slug}`} className="hover:text-indigo-400 transition-colors">Promotions</Link>
                        <span className='opacity-50'>/</span>
                        <span className=" text-indigo-600">{promotion?.promotion?.name}</span>
                    </nav>
                </div>
            </section>
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-start flex-wrap mb-4">
                        {promotion?.promotion?.description?.length > 15 ? (
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {promotion?.promotion?.name}
                            </h1>
                        ) : (
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                {promotion?.promotion?.name}
                            </h1>
                        )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                            {promotion?.promotion?.description !== null && (
                                <div className="mb-6">
                                    <MerchantDetailsShort details={promotion?.promotion?.description} />
                                </div>
                            )}

                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {allOffers?.map((item, index) => {
                                        const isSixthItem = (index + 1) % 6 === 0
                                        const isTwelfthItem = (index + 1) % 12 === 0
                                        const merchantStart = Math.floor(index / 12) * 4
                                        const merchantEnd = merchantStart + 4
                                        const currentMerchants = eventMerchants?.slice(merchantStart, merchantEnd)

                                        return (
                                            <React.Fragment key={index}>
                                                <div className="overflow-hidden">
                                                    <CouponCard
                                                        product={item?.offer}
                                                        merchantHref={getMerchantHref(
                                                            item.merchant,
                                                            companyData?.store_slug,
                                                            companyData?.slug_type
                                                        )}
                                                        domain={companyDomain.domain}
                                                        merchant_name={item.merchant?.merchant_name}
                                                        merchant_logo={item.merchant?.merchant_logo}
                                                    />
                                                </div>

                                                {isSixthItem && !isTwelfthItem && currentMerchants?.length > 0 && (
                                                    <div className="col-span-full my-4">
                                                        <div className="w-full rounded-2xl p-6 bg-white shadow-sm">
                                                            <h4 className="font-bold text-gray-900 mb-4">Suggested Brands</h4>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                {currentMerchants.map((merchant, i) => (
                                                                    <div className="flex justify-center" key={i}>
                                                                        <SidebarRoundMerchantCard
                                                                            merchant={merchant}
                                                                            merSlug={companyData?.store_slug}
                                                                            slugType={companyData?.slug_type}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {isTwelfthItem &&
                                                    filteredOfferBanners.length > 0 &&
                                                    filteredOfferBanners[Math.floor(index / 12)] && (
                                                        <div className="col-span-full mt-4 mb-4" key={`banner-${Math.floor(index / 12)}`}>
                                                            <Banner
                                                                data={filteredOfferBanners[Math.floor(index / 12)]}
                                                                height={100}
                                                                offerLink={null}
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

                                {(() => {
                                    const totalOffers = allOffers?.length || 0
                                    const batchesShown = Math.floor((totalOffers + 6) / 12)
                                    const merchantsAlreadyShown = batchesShown * 4
                                    const remainingMerchants = eventMerchants?.slice(merchantsAlreadyShown) || []

                                    if (remainingMerchants.length > 0) {
                                        return (
                                            <div className="w-full rounded-2xl p-6 mt-6 bg-white shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="font-bold text-gray-900">
                                                        {merchantsAlreadyShown === 0 ? "Suggested Brands" : "More Brands"}
                                                    </h4>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {remainingMerchants.map((merchant, i) => (
                                                        <div className="flex justify-center" key={i}>
                                                            <SidebarRoundMerchantCard
                                                                merchant={merchant}
                                                                merSlug={companyData?.store_slug}
                                                                slugType={companyData?.slug_type}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                })()}

                            </div>
                            {showFullDetailsSection && (
                                <div className="my-6">
                                    <MerchantDetailsFull details={promotion?.promotion?.description} />
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-1 mt-10 lg:mt-0">
                            {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="space-y-6">
                                        {suggestedCategories?.length > 0 && (
                                            <div>
                                                <h4 className="text-gray-900 font-bold mb-4">Suggested Categories for Promotions</h4>
                                                <div className="border-b border-gray-200 mb-4"></div>
                                                <ul className="space-y-2">
                                                    {suggestedCategories?.map((cat, i) => (
                                                        <li key={i}>
                                                            <Link href={`/${cat?.url}`} className="text-gray-600 hover:text-indigo-600 transition-colors">
                                                                {cat?.category_name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                            <div>
                                                <h4 className="text-gray-900 font-bold mb-4">Banner Offers</h4>
                                                <div className="border-b border-gray-200 mb-4"></div>
                                                <VerticalEventOfferBanner bannerResponse={filteredVerticalBanners} domain={companyDomain.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} />
                                            </div>
                                        )}
                                        {suggestedPromotions?.length > 0 && (
                                            <div>
                                                <h4 className="text-gray-900 font-bold mb-4">You May Also Like These Promotions</h4>
                                                <div className="border-b border-gray-200 mb-4"></div>
                                                <div className="space-y-3">
                                                    {suggestedPromotions?.map((suggestedPromotion, i) => (
                                                        <Link key={i} href={getPromotionHref(suggestedPromotion, companyData?.promotion_slug)} className="block">
                                                            <div className="bg-gray-50 hover:bg-indigo-50 rounded-full py-2 px-4 transition-colors">
                                                                <span className="text-sm text-gray-700 hover:text-indigo-600">
                                                                    {suggestedPromotion?.name}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <PromotionOffersSchema companyId={companyData?.unique_id} slug={slug} promotionName={promotion?.promotion?.name} promoSlug={companyData?.promotion_slug} slugType={companyData?.slug_type} merSlug={companyData?.store_slug} />
        </>
    )
}

export default PromotionOffersPage
