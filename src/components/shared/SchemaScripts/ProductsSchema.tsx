import { apiGetProductMerchants } from "@/apis/user";
import { getBaseImageUrl, getMerchantHref } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
    company_id: string;
}

export default async function ProductsSchema({ company_id }: Props) {

    const merchants = (await apiGetProductMerchants(company_id))?.data ?? [];
    const companyDomain = (await cookieService.get("domain")).domain;

    const baseUrl = `https://${companyDomain}/products`;

    const breadcrumbItems = [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://${companyDomain}`,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: baseUrl,
        },
    ];

    const itemListElements = merchants?.map((merchant, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
            "@type": "Product",
            name: merchant?.merchant_name,
            url: `https://${companyDomain}/products/${merchant?.slug}`,
            image: getBaseImageUrl(companyDomain, merchant?.merchant_logo, ""),
            offers: {
                "@type": "Offer",
                url: `https://${companyDomain}/products/${merchant?.slug}`,
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
            },
        },
    }));

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["WebPage", "CollectionPage"],
                "@id": `${baseUrl}#webpage`,
                url: baseUrl,
                name: `Products — Coupons & Deals | ${companyDomain}`,
                description:
                    `Browse verified coupons and deals for thousands of products at ${companyDomain}.`,
                isPartOf: {
                    "@id": `https://${companyDomain}/#website`,
                },
                breadcrumb: {
                    "@id": `${baseUrl}#breadcrumb`,
                },
                mainEntity: {
                    "@id": `${baseUrl}#itemlist`,
                },
            },
            {
                "@type": "ItemList",
                "@id": `${baseUrl}#itemlist`,
                name: "Products",
                itemListOrder: "https://schema.org/ItemListOrderAscending",
                numberOfItems: merchants?.length,
                itemListElement: itemListElements,
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