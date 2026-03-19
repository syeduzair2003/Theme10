import React from 'react';
import { apiCategoryWithSub, apiGetDisclaimer } from '@/apis/user';
import { getBaseImageUrl } from '@/constants/hooks';
import { CategoryChild, CategoryWithSub } from '@/services/dataTypes';
import cookieService from '@/services/CookiesService';

interface Props {
    company_name: string;
    company_logo: string | null;
    company_id: string;
    socialLinks?: {
        facebook?: string | undefined | null;
        twitter?: string | undefined | null;
        instagram?: string | undefined | null;
        linkedin?: string | undefined | null;
        pinterest?: string | undefined | null;
        youtube?: string | undefined | null;
        flipboard?: string | undefined | null;
        tiktok?: string | undefined | null;
        threads?: string | undefined | null;
    };
}

const CategoryPageSchema = async ({ company_name, company_logo, company_id, socialLinks }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;

    const [categories, contacts] = await Promise.all([
        apiCategoryWithSub(company_id).then(res => res.data),
        apiGetDisclaimer(companyDomain).then(res => res.data)
    ])

    const websiteUrl = `https://${companyDomain}`;
    const categoryUrl = `${websiteUrl}/category/`;

    // change the function signature so it accepts plain CategoryChild[] too
    const buildCategoryItems = (
        cats: (CategoryChild | CategoryWithSub["category"])[],
        positionStart = 1
    ): any[] => {
        return cats?.flatMap((cat: any, idx: number) => {
            const position = positionStart + idx;
            const itemUrl = `${websiteUrl}/${cat.url}`;

            const currentItem = {
                "@type": "ListItem",
                "position": position,
                "item": {
                    "@type": "Thing",
                    "name": cat.name,
                    "url": itemUrl,
                },
            };

            // ✅ If has children, flatten them too
            const children = cat.child ? buildCategoryItems(cat.child, position + 1) : [];

            return [currentItem, ...children];
        });
    };


    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": categoryUrl,
                "url": categoryUrl,
                "name": `All Coupon Categories | ${company_name}`,
                "isPartOf": { "@id": `${websiteUrl}/#website` },
                "description": `Browse all shopping categories at ${company_name}. Find verified coupon codes and exclusive deals for every category, from Travel and Electronics to Fashion and Home Goods.`,
                "breadcrumb": { "@id": `${categoryUrl}#breadcrumb` },
                "inLanguage": "en-US",
                "mainEntity": {
                    "@type": "ItemList",
                    "name": "Shopping Categories",
                    "itemListElement": buildCategoryItems(categories?.map(c => c.category)),
                },
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${categoryUrl}#breadcrumb`,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": websiteUrl },
                    { "@type": "ListItem", "position": 2, "name": "Categories", "item": categoryUrl },
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

export default CategoryPageSchema;
