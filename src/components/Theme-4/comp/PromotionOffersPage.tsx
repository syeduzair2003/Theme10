import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetPromotionCategories } from '@/apis/user';
import { cleanHtmlContent, extractAllOffers, extractFirstSentences, filterOfferBanners, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import EventBanner from './EventBanner';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import MerchantDetailsShort from './MerchantDetailsShort';
import Banner from './Banner';
import MerchantDetailsFull from './MerchantDetailsFull';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import VerticalEventOfferBanner from './VerticalEventOfferBanner';
import OfferCardThree from './OfferCardThree';
import { stripHtml } from 'string-strip-html';
import { apiGetPromoOfferBanners, apiGetPromotionOffers, apiGetSubPromoBanners, apiGetSubPromoSuggestedMerchant } from '@/apis/page_optimization';

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
            <section className="w-full px-1 md:px-20 bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] text-white">
                <div className="max-w-7xl mx-auto relative">

                    <div className="flex flex-wrap items-center py-10 gap-9 lg:gap-0">

                    <div className="w-full lg:w-1/2 pr-4 md:pr-10">

                        <div className="grid gap-4 md:gap-6 mb-8 xl:mb-0">

                        {/* Breadcrumb */}
                        <div>
                            <nav aria-label="breadcrumb">
                            <ol className="flex flex-wrap items-center m-0 justify-start gap-2 md:gap-3 text-sm">

                                <li className="flex items-center gap-2">
                                <Link href="/" className="no-underline text-white font-medium ">
                                    Home
                                </Link>
                                <FontAwesomeIcon icon={faGreaterThan} className="w-3 h-3 text-white font-medium" />
                                </li>

                                <li className="flex items-center gap-2">
                                <Link href={`/${companyData?.promotion_slug}`} className="no-underline text-white font-medium capitalize">
                                    Promotions
                                </Link>
                                <FontAwesomeIcon icon={faGreaterThan} className="w-3 h-3 text-white font-medium" />
                                </li>

                                <li className="flex items-center text-white font-medium capitalize">
                                {promotion?.promotion?.name}
                                </li>

                            </ol>
                            </nav>
                        </div>

                        {/* Title */}
                        <div className="flex justify-between gap-3 flex-wrap">
                            {promotion?.promotion?.description?.length > 15 ? (
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
                                {promotion?.promotion?.name}
                            </h1>
                            ) : (
                            <h1 className="mt-4 text-2xl md:text-4xl font-bold">
                                {promotion?.promotion?.name}
                            </h1>
                            )}
                        </div>

                        </div>

                    </div>
                    </div>
                </div>
            </section>

        <section className="relative p-5">
            <div className="max-w-7xl mx-auto relative">

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

                {/* MAIN CONTENT */}
                <div className="xl:col-span-8 relative z-10">

                    {promotion?.promotion?.description && (
                    <div className="mb-3">
                        <MerchantDetailsShort details={promotion?.promotion?.description} />
                    </div>
                    )}

                    {/* Offers + Suggested Merchants */}
                    <div className="flex flex-col gap-6">
                        {Array.from({ length: Math.ceil(allOffers.length / 6) }).map((_, chunkIndex) => {
                            const start = chunkIndex * 6;
                            const end = start + 6;
                            const offerChunk = allOffers.slice(start, end);

                            // For suggested merchants after this chunk
                            const merchantStart = chunkIndex * 4;
                            const merchantEnd = merchantStart + 4;
                            const currentMerchants = eventMerchants?.slice(merchantStart, merchantEnd);

                            return (
                            <React.Fragment key={chunkIndex}>
                                {/* 1. Offers Chunk */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {offerChunk.map((item, index) => (
                                    <OfferCardThree
                                    key={start + index}
                                    product={item.offer}
                                    merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                                    domain={companyDomain.domain}
                                    merchant_name={item.merchant?.merchant_name}
                                    merchant_logo={item.merchant?.merchant_logo}
                                    />
                                ))}
                                </div>

                                {/* 2. Suggested Merchants (after 6 offers) */}
                                {currentMerchants?.length > 0 && (
                                <div className="w-full rounded-2xl p-4 md:p-6 bg-white shadow my-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                    {currentMerchants.map((merchant, i) => (
                                        <SidebarRoundMerchantCard
                                        key={i}
                                        merchant={merchant}
                                        merSlug={companyData?.store_slug}
                                        slugType={companyData?.slug_type}
                                        />
                                    ))}
                                    </div>
                                </div>
                                )}

                                {/* 3. Banner after 12 offers */}
                                {filteredOfferBanners.length > 0 &&
                                filteredOfferBanners[chunkIndex] &&
                                (chunkIndex + 1) % 2 === 0 && ( // every 12 offers
                                    <div className="my-6">
                                    <Banner
                                        data={filteredOfferBanners[chunkIndex]}
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


                    {showFullDetailsSection && (
                    <div className="my-3">
                        <MerchantDetailsFull details={promotion?.promotion?.description} />
                    </div>
                    )}
                    
                </div>

                {/* SIDEBAR */}
                <div className="xl:col-span-4 space-y-8">

                    <div className="bg-transparent rounded-2xl">

                    <div className="flex flex-col gap-6">

                        <div className="bg-white p-4 md:p-6 rounded-2xl border">

                        {/* Suggested Categories */}
                        {suggestedCategories?.length > 0 && (
                            <>
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                Suggested Categories for Promotions
                            </h4>
                            <div className="w-full h-px bg-gray-300 my-4" />

                            <ul className="space-y-2">
                                {suggestedCategories.map((cat, i) => (
                                <li key={i}>
                                    <Link
                                    href={`/${cat?.url}`}
                                    className="no-underline inline-block text-gray-900 font-medium hover:text-[#e71c17] hover:border-b-2 hover:border-[#e71c17] transition"
                                    >
                                    {cat?.category_name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                            </>
                        )}

                        {/* Suggested Promotions */}
                        {suggestedPromotions?.length > 0 && (
                            <>
                            <h4 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
                                You May Also Like These Promotions
                            </h4>
                            <div className="w-full h-px bg-gray-300 my-4" />

                            <ul className="space-y-2">
                                {suggestedPromotions.map((sp, i) => (
                                <li key={i}>
                                    <Link
                                    href={getPromotionHref(sp, companyData?.promotion_slug)}
                                    className="no-underline inline-block text-gray-900 font-medium hover:text-[#e71c17] hover:border-b-2 hover:border-[#e71c17] transition"
                                    >
                                    {sp?.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                            </>
                        )}

                        {/* Banner Offers */}
                        {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                            <>
                            <h4 className="text-lg font-semibold text-gray-800 mt-8 mb-3">
                                Banner Offers
                            </h4>
                            <div className="w-full h-px bg-gray-300 my-4" />

                            <VerticalEventOfferBanner
                                bannerResponse={filteredVerticalBanners}
                                domain={companyDomain.domain}
                                mer_slug={companyData?.store_slug}
                                slug_type={companyData?.slug_type}
                            />
                            </>
                        )}

                        </div>

                    </div>
                    </div>

                </div>

                </div>
            </div>
        </section>

        </>
    )
}

export default PromotionOffersPage
