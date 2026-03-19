import React from "react";
import { apiCategoryOffers } from "@/apis/user";
import { getBaseImageUrl, getMerchantHref, getRandomCategorySeoTitle } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { apiMerchantDetailsByCategory } from "@/apis/merchant";
import { OffersOffer } from "@/services/dataTypes";

interface Props {
    company_name: string;
    company_id: string;
    category_id: string;
    slug: string[];
    currentPage: number;
    slug_type: string;
    mer_slug: string;
    category_name: string;
}

const CategoryMerchantPageSchema = async ({
    company_name,
    company_id,
    category_id,
    slug,
    currentPage,
    slug_type,
    mer_slug,
    category_name,
}: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const websiteUrl = `https://${companyDomain}`;
    const categoryUrl = `${websiteUrl}/category/${slug.join("/")}`;

    const [ offers, merchants ] = await Promise.all([
        apiCategoryOffers(category_id, company_id, currentPage).then(res => res.data),
        apiMerchantDetailsByCategory(category_id, company_id).then(res => res.data),
    ])

    const buildOfferItems = (offers: OffersOffer[]) => {
        return offers?.map((offer: OffersOffer, index: number) => {
            const merchant = offer?.merchant || {};
            const merchantDetail = merchants?.merchants?.find((m: any) => m.id === merchant.id);

            return {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Offer",
                    "name": offer?.offer?.offer_title,
                    "url": `${companyDomain}${getMerchantHref(offer?.merchant, mer_slug, slug_type)}`,
                    "offeredBy": {
                        "@type": "Organization",
                        "name": merchant.merchant_name,
                        ...(merchantDetail?.merchant_logo
                            ? {
                                logo: {
                                    "@type": "ImageObject",
                                    "url": getBaseImageUrl(companyDomain, merchantDetail.merchant_logo, ""),
                                },
                            }
                            : {}),
                    },
                    "category": category_name,
                },
            };
        });
    };

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": categoryUrl,
                "url": categoryUrl,
                "name": getRandomCategorySeoTitle(category_name),
                "isPartOf": { "@id": `${websiteUrl}/#website` },
                "description": getRandomCategorySeoTitle(category_name),
                "breadcrumb": { "@id": `${categoryUrl}#breadcrumb` },
                "inLanguage": "en-US",
                "mainEntity": {
                    "@type": "ItemList",
                    "name": getRandomCategorySeoTitle(category_name),
                    "numberOfItems": offers?.offers?.length,
                    "itemListElement": buildOfferItems(offers?.offers),
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${categoryUrl}#breadcrumb`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": websiteUrl },
                    { "@type": "ListItem", "position": 2, "name": "Categories", "item": `${websiteUrl}/category` },
                    { "@type": "ListItem", "position": 3, "name": getRandomCategorySeoTitle(category_name), "item": categoryUrl },
                ],
            },
            {
                "@type": "WebSite",
                "@id": `${websiteUrl}/#website`,
                "url": websiteUrl,
                "name": company_name,
                "description": "Your trusted hub for smarter savings.",
                "publisher": { "@id": `${websiteUrl}/#organization` },
                "inLanguage": "en-US",
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default CategoryMerchantPageSchema;
