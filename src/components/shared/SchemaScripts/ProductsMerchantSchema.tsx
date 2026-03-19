import { apiGetMerchantProducts, apiGetCategoryProducts } from "@/apis/user";
import { getBaseImageUrl } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
    company_id: string;
    merchantSlug: string;   // e.g. "amazon.com"
    merchantName: string;   // e.g. "Amazon"
}

export default async function MerchantProductsSchema({
    company_id,
    merchantSlug,
    merchantName,
}: Props) {
    const [productsRes, categoriesRes] = await Promise.all([
        apiGetMerchantProducts(company_id, merchantSlug),
        apiGetCategoryProducts(company_id, merchantSlug),
    ]);

    const products = productsRes?.data ?? [];
    const categories = categoriesRes?.data ?? [];

    const companyDomain = (await cookieService.get("domain")).domain;

    const baseUrl = `https://${companyDomain}/products`;
    const pageUrl = `${baseUrl}/${merchantSlug}`;

    // ── 1. Breadcrumb ─────────────────────────────────────────────────────────
    // Home → Products → Amazon
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
        {
            "@type": "ListItem",
            position: 3,
            name: merchantName,
            item: pageUrl,
        },
    ];

    // ── 2. Category ItemList ──────────────────────────────────────────────────
    // Directly from apiGetCategoryProducts — { id, unique_id, name, slug }
    // URL: /products/amazon.com/home-saunas/
    const categoryListElements = categories.map((cat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: cat.name,
        item: `${pageUrl}/${cat.slug}/`,
    }));

    // ── 3. Product Offers ItemList ────────────────────────────────────────────
    const productListElements = products.map((offer, index) => {
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
            offerBlock.priceValidUntil = offer.end_date;
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


    // ── Schema @graph ─────────────────────────────────────────────────────────
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["WebPage", "CollectionPage"],
                "@id": `${pageUrl}#webpage`,
                url: pageUrl,
                name: `Top ${merchantName} Products on Sale — Deals & Discounts | ${companyDomain}`,
                description: `Browse discounted ${merchantName} products across all categories. Find verified deals and offers at ${companyDomain}.`,
                isPartOf: { "@id": `https://${companyDomain}/#website` },
                breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
                mainEntity: { "@id": `${pageUrl}#productlist` },
            },
            {
                "@type": "ItemList",
                "@id": `${pageUrl}#categorylist`,
                name: `Product Categories for ${merchantName}`,
                itemListOrder: "https://schema.org/ItemListUnordered",
                numberOfItems: categories.length,
                itemListElement: categoryListElements,
            },
            {
                "@type": "ItemList",
                "@id": `${pageUrl}#productlist`,
                name: `${merchantName} Product Deals`,
                itemListOrder: "https://schema.org/ItemListUnordered",
                numberOfItems: products.length,
                itemListElement: productListElements,
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
