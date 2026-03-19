import { apiGetProductCategories } from "@/apis/page_optimization";
import { getRandomCategorySeoTitle } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
    company_id: string;
    category_id?: string;
    categoryName?: string;
    categoryUrl?: string;
}

export default async function AllProductsSchema({ company_id, category_id, categoryName, categoryUrl }: Props) {
    const categories = (await apiGetProductCategories(company_id, category_id)).data;
    const companyDomain = (await cookieService.get("domain")).domain;

    const baseUrl = `https://${companyDomain}/all-products`;

    const breadcrumbItems: any[] = [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://${companyDomain}`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "All Products",
            item: baseUrl,
        },
    ];

    if (categoryName && categoryUrl) {
        breadcrumbItems.push({
            "@type": "ListItem",
            position: 3,
            name: getRandomCategorySeoTitle(categoryName),
            item: `${baseUrl}/${categoryUrl}`,
        });
    }

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["WebPage", "CollectionPage"],
                "@id": `${baseUrl}#webpage`,
                url: baseUrl,
                name: categoryName
                    ? `${categoryName} — Coupons & Deals | GetTopDiscounts`
                    : "All Products — Coupons & Deals by Category | GetTopDiscounts",
                description: categoryName
                    ? `Browse verified coupons and deals from ${categoryName} on GetTopDiscounts.`
                    : "Browse verified coupons and deals across categories like Electronics, Fashion, Beauty, Business and more.",
                isPartOf: { "@id": `https://${companyDomain}/#website` },
                breadcrumb: { "@id": `${baseUrl}#breadcrumb` },
            },
            {
                "@type": "ItemList",
                "@id": `${baseUrl}#itemlist`,
                name: "All Product Categories",
                itemListOrder: "http://schema.org/ItemListUnordered",
                numberOfItems: categories.length,
                itemListElement: categories.map((cat: any, index: number) => {
                    const cleanedUrl = cat.url.replace(/^\/?category\//, "");
                    return {
                        "@type": "ListItem",
                        position: index + 1,
                        url: `${baseUrl}/${cleanedUrl}`,
                    };
                }),
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${baseUrl}#breadcrumb`,
                itemListElement: breadcrumbItems,
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
