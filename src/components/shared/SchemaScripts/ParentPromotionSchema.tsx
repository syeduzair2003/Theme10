import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization';
import { getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import React from 'react'

const ParentPromotionSchema = async ({
  company_name,
  companyId,
  slug,
  promotionName,
  promoSlug,
}: {
  company_name: string;
  companyId: string;
  slug: string;
  promotionName: string;
  promoSlug: string;
}) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const [promotion, subPromotions] = await Promise.all([
    apiGetPromotionOffers(companyId, slug).then(res => res.data),
    apiGetSubPromotion(companyId, slug).then(res => res.data),
  ]);

  const websiteUrl = `https://${companyDomain}`;
  const pageUrl = getPromotionHref(promotion?.promotion, promoSlug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${websiteUrl}${pageUrl}`,
        "url": `${websiteUrl}${pageUrl}`,
        "name": promotionName,
        "description": promotionName,
        "isPartOf": { "@id": `${websiteUrl}/#website` },
        "breadcrumb": { "@id": `${websiteUrl}${pageUrl}#breadcrumb` },
      },
      {
        "@type": "CollectionPage",
        "@id": `${websiteUrl}${pageUrl}#collection`,
        "url": `${websiteUrl}${pageUrl}`,
        "name": promotionName,
        "description": promotionName,
        "mainEntity": {
          "@type": "ItemList",
          "name": promotionName,
          "numberOfItems": subPromotions?.length || 0,
          "itemListElement": subPromotions?.map((sub, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "WebPage",
              "name": sub.category_name,
              "url": `${websiteUrl}${getPromotionHref(sub, promoSlug)}`,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": websiteUrl },
          { "@type": "ListItem", "position": 2, "name": "Promotions", "item": `${websiteUrl}/${promoSlug}` },
          { "@type": "ListItem", "position": 3, "name": promotionName, "item": `${websiteUrl}${pageUrl}` },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${websiteUrl}/#website`,
        "url": websiteUrl,
        "name": company_name,
        "publisher": { "@id": `${websiteUrl}/#organization` },
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

export default ParentPromotionSchema;