import { apiGetCategoryProductsOffer } from "@/apis/user";
import { getBaseImageUrl } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
    company_id: string;
    merchantSlug: string;
    merchantName: string;
    categorySlug: string;
    categoryName: string;
}

export default async function ProductCategorySchema({
    company_id,
    merchantSlug,
    merchantName,
    categorySlug,
    categoryName,
}: Props) {
    const offers = (await apiGetCategoryProductsOffer(company_id, merchantSlug, categorySlug))?.data ?? [];
    const companyDomain = (await cookieService.get("domain")).domain;

    const merchantUrl = `https://${companyDomain}/products/${merchantSlug}`;
    const pageUrl = `${merchantUrl}/${categorySlug}/`;

    // ── Breadcrumb ────────────────────────────────────────────────────────────
    // Home → Products → Amazon → Clothing Shoes Jewelry
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
            item: `https://${companyDomain}/products`,
        },
        {
            "@type": "ListItem",
            position: 3,
            name: merchantName,
            item: merchantUrl,
        },
        {
            "@type": "ListItem",
            position: 4,
            name: categoryName,
            item: pageUrl,
        },
    ];

    // ── Product ItemList ──────────────────────────────────────────────────────
    // All offer URLs capped at: /products/amazon.com/clothing-shoes-jewelry/
    const itemListElements = offers.map((offer, index) => {
        const offerBlock: Record<string, any> = {
            "@type": "Offer",
            url: pageUrl,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        };

        if (offer?.sale_price !== undefined && offer?.sale_price !== null) {
            offerBlock.price = offer.sale_price;
        }
       
        if (offer?.end_date) {
            offerBlock.priceValidUntil = offer?.end_date;
        }

        return {
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Product",
                name: offer?.offer_title,
                url: pageUrl,
                ...(offer?.product_image && {
                    image: getBaseImageUrl(companyDomain, offer.product_image, "")
                }),
                offers: offerBlock,
            },
        };
    });

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["WebPage", "CollectionPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: `${categoryName} from ${merchantName} — Deals & Discounts | ${companyDomain}`,
                description: `Discover ${categoryName} products from ${merchantName} with verified deals and discount offers at ${companyDomain}.`,
                isPartOf: { "@id": `https://${companyDomain}/#website` },
                breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
                mainEntity: { "@id": `${pageUrl}#itemlist` },
            },
            {
                "@type": "ItemList",
                "@id": `${pageUrl}#itemlist`,
                name: `${categoryName} — ${merchantName} Deals`,
                itemListOrder: "https://schema.org/ItemListUnordered",
                numberOfItems: offers.length,
                itemListElement: itemListElements,
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${pageUrl}#breadcrumb`,
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