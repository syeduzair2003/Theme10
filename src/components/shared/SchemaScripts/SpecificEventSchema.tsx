import { apiGetEventDetails } from '@/apis/user';
import { getBaseImageUrl, getMerchantHref, getRandomEventSeoTitle } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers } from '@/services/dataTypes';
import React from 'react'

interface Props {
    company_name: string;
    company_id: string;
    slug: string;
    slug_type: string;
    mer_slug: string;
    eventName: string;
}

const SpecificEventSchema = async ({ company_name, company_id, slug, slug_type, mer_slug, eventName }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const websiteUrl = `https://${companyDomain}`;
    const EventUrl = `${websiteUrl}/events/${slug}`;
    const event = (await apiGetEventDetails(company_id, slug)).data;
    const merchants = event?.merchants;

    const buildOfferItems = (merchants: MerchantWithOffers[]) => {
        return merchants?.flatMap((merchant: MerchantWithOffers, index: number) => {
            return merchant?.offers?.map((offer, i) => {
                return {
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "Product",
                        "name": offer?.offer_title,
                        "url": `${websiteUrl}${getMerchantHref(merchant, mer_slug, slug_type)}`,
                        "brand": {
                            "@type": "Organization",
                            "name": merchant.merchant_name,
                            ...(merchant?.merchant_logo
                                ? {
                                    logo: {
                                        "@type": "ImageObject",
                                        "url": getBaseImageUrl(companyDomain, merchant.merchant_logo, ""),
                                    },
                                }
                                : {}),
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "priceCurrency": "USD",
                            "lowPrice": offer?.sale_price || 0,
                            "highPrice": offer?.original_price || 0,
                        },
                    },
                };
            });
        });
    };

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": EventUrl,
                "url": EventUrl,
                "name": getRandomEventSeoTitle(eventName),
                "description": getRandomEventSeoTitle(eventName),
                "isPartOf": { "@id": `${websiteUrl}/#website` },
                "breadcrumb": { "@id": `${EventUrl}#breadcrumb` },
            },
            {
                "@type": "Event",
                "@id": `${EventUrl}#event`,
                "name": getRandomEventSeoTitle(eventName),
                "description": getRandomEventSeoTitle(eventName),
                "startDate": event?.event?.start_date,
                "endDate": event?.event?.end_date || "2025-10-31",
                "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "url": EventUrl,
                "organizer": {
                    "@type": "Organization",
                    "@id": `${websiteUrl}/#organization`,
                    "name": company_name,
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "url": EventUrl,
                    "priceCurrency": "USD",
                    "offerCount": merchants?.length || "0",
                    "availability": "https://schema.org/InStock",
                    "validFrom": event?.event?.start_date || "2025-09-15",
                },
                "location": {
                    "@type": "VirtualLocation",
                    "url": EventUrl,
                },
            },
            {
                "@type": "CollectionPage",
                "@id": EventUrl,
                "url": EventUrl,
                "name": getRandomEventSeoTitle(eventName),
                "isPartOf": { "@id": `${websiteUrl}/#website` },
                "description": getRandomEventSeoTitle(eventName),
                "breadcrumb": { "@id": `${EventUrl}#breadcrumb` },
                "inLanguage": "en-US",
                "mainEntity": {
                    "@type": "ItemList",
                    "name": getRandomEventSeoTitle(eventName),
                    "itemListElement": buildOfferItems(merchants),
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${EventUrl}#breadcrumb`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": websiteUrl },
                    { "@type": "ListItem", "position": 2, "name": "Events", "item": `${websiteUrl}/events` },
                    { "@type": "ListItem", "position": 3, "name": getRandomEventSeoTitle(eventName), "item": EventUrl },
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


export default SpecificEventSchema
