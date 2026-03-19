import { apiGetPromotionOffers } from '@/apis/page_optimization';
import { getMerchantHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import React from 'react'

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const buildOfferItems = (allOffers: MerchantOfferItem[], websiteUrl: string, merSlug: string, slugType: string) =>
    allOffers.map(({ offer, merchant }, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Product",
            "name": offer.offer_title,
            "url": `${websiteUrl}${getMerchantHref(merchant, merSlug, slugType)}`,
            "brand": {
                "@type": "Organization",
                "name": merchant.merchant_name,
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": offer.sale_price || 0,
                "highPrice": offer.original_price || 0,
                "availability": "https://schema.org/InStock",
            },
        },
    }));

interface Props {
    companyId: string;
    slug: string;
    promotionName: string;
    merSlug: string;
    slugType: string;
    promoSlug: string;
}

const PromotionOffersSchema = async ({ companyId, slug, promotionName, merSlug, slugType, promoSlug }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const websiteUrl = `https://${companyDomain}`;
    const response = (await apiGetPromotionOffers(companyId, slug))?.data;
    const promoUrl = getPromotionHref(response?.promotion, promoSlug)
    const pageUrl = `${websiteUrl}/${promoUrl}`;

    const allOffers: MerchantOfferItem[] =
        response?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": pageUrl,
                "url": pageUrl,
                "name": promotionName,
                "description": promotionName,
            },
            {
                "@type": "CollectionPage",
                "@id": `${pageUrl}#collection`,
                "url": pageUrl,
                "name": promotionName,
                "mainEntity": {
                    "@type": "ItemList",
                    "name": promotionName,
                    "itemListElement": buildOfferItems(allOffers, websiteUrl, merSlug, slugType),
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": websiteUrl },
                    { "@type": "ListItem", "position": 2, "name": "Promotions", "item": `${websiteUrl}/promotions` },
                    { "@type": "ListItem", "position": 3, "name": promotionName, "item": pageUrl },
                ],
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default PromotionOffersSchema
