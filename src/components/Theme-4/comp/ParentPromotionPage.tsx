import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization';
import { apiCompanyUpdatedData } from '@/apis/user';
import { cleanHtmlContent, extractFirstSentences, getBaseImageUrl, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer, SubPromotion } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import { stripHtml } from 'string-strip-html';
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
import OfferCardThree from './OfferCardThree';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import Image from 'next/image';

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
        apiGetPromotionOffers(companyData?.unique_id, slug).then(res => res.data),
        apiGetSubPromotion(companyData?.unique_id, slug).then(res => res.data),
    ]);

    const allOffers: MerchantOfferItem[] =
        promotion?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({ offer, merchant }))
        ) || [];

    const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '');
    const plainDesc = stripHtml(cleanDesc).result;
    const shortDesc = extractFirstSentences(plainDesc);
    const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5);

    return (
        <>
         
            <section className="w-full px-1 md:px-20 bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] text-white py-6">
                <div className="container">

                    <ol className="breadcrumb flex gap-3 text-sm">
                        <li><Link href="/">Home</Link></li>
                        <li><FontAwesomeIcon icon={faGreaterThan} /></li>
                        <li><Link href={`/${companyData?.promotion_slug}`}>Promotions</Link></li>
                        <li><FontAwesomeIcon icon={faGreaterThan} /></li>
                        <li>{promotion?.promotion?.name}</li>
                    </ol>

                    <h1 className="text-3xl font-bold mt-4">
                        {promotion?.promotion?.name}
                    </h1>

                    {promotion?.promotion?.description && (
                        <MerchantDetailsShort details={promotion?.promotion?.description} />
                    )}

                </div>
            </section>

         
            {subPromotions?.length > 0 && (
                <section className="container my-10">
                    <h2 className="text-2xl font-bold mb-4">Explore Sub Promotions</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {subPromotions.map((item: SubPromotion) => (
                            <div
                                key={item.id || item.category_name}
                                className="bg-white p-2 rounded-lg shadow-md hover:shadow-xl transition"
                            >
                                <Link href={getPromotionHref(item, companyData?.promotion_slug)} className='no-underline'>
                                    <div className="relative h-[220px] overflow-hidden rounded-lg">
                                        <Image
                                            src={getBaseImageUrl(companyDomain?.domain, item.category_image, "")}
                                            alt={item.category_name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* <div className="py-3 mt-3 text-center font-bold text-white rounded bg-gradient-to-r from-orange-500 to-red-500">
                                        {item.category_name}
                                    </div> */}
                                    {/* Category Name Below Image */}
                                    <div className="py-2 mt-3 border-t border-b border-dotted border-gray-400 rounded-3
                                                bg-gradient-to-r from-[var(--primary-color)] to-orange-500 hover:from-orange-500 hover:to-[var(--primary-color)] transition-all duration-300">

                                        <h3 className="text-center text-white font-bold mt-2 text-lg capitalize m-0">
                                            {item.category_name}
                                        </h3>

                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="container my-10">
                <h2 className="text-3xl font-bold mb-6">Top Rated Deals</h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allOffers.map(item => (
                        <OfferCardThree
                            key={item.offer.id}
                            product={item.offer}
                            merchantHref={getMerchantHref(
                                item.merchant,
                                companyData?.store_slug,
                                companyData?.slug_type
                            )}
                            domain={companyDomain.domain}
                            merchant_name={item.merchant.merchant_name}
                            merchant_logo={item.merchant.merchant_logo}
                        />
                    ))}
                </div>
            </section>

    
            <section className="container my-10">
                <h2 className="text-2xl font-bold mb-4">
                    Top Rated Merchants in {promotion?.promotion?.name}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                    {allOffers.map(item => (
                        <div key={item.merchant.id}>
                            <SidebarRoundMerchantCard
                                merSlug={companyData?.store_slug}
                                slugType={companyData?.slug_type}
                                merchant={item.merchant}
                            />
                        </div>
                    ))}
                </div>
            </section>

         
            {showFullDetailsSection && (
                <section className="container my-6">
                    <MerchantDetailsFull details={promotion?.promotion?.description} />
                </section>
            )}
        </>
    )
}

export default ParentPromotionPage;
