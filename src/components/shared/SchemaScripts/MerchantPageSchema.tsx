import { apiGetMerchantsAlphabetically } from '@/apis/merchant';
import { getMerchantHref } from '@/constants/hooks';
import { MerchantResponse } from '@/services/dataTypes';
import React from 'react'
interface Props {
    domain: string;
    mer_slug: string;
    slug_type: string;
    company_id: string, 
    apiSlug: string, 
    PAGE_SIZE: number, 
    currentPage: number,
}
const MerchantPageSchema = async ({domain, mer_slug, slug_type, company_id, apiSlug, PAGE_SIZE, currentPage}: Props) => {
    const stores: MerchantResponse = (await apiGetMerchantsAlphabetically(company_id, apiSlug, PAGE_SIZE, currentPage))?.data;
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Stores Starting with ${apiSlug} | Coupons & Deals`,
    "url": `https://${domain}/all-stores/${apiSlug.toUpperCase()}/`,
    "description": `Browse our A-Z list of stores starting with ${apiSlug}. Get verified coupon codes and exclusive deals for top brands.`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": stores?.merchants?.map((store, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": store.merchant_name,
          "url": `https://${domain}${getMerchantHref(store, mer_slug, slug_type)}`
        }
      }))
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

export default MerchantPageSchema
