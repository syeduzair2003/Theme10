import React from "react";
import { apiGetProductDetails } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import { getBaseImageUrl, getProductDetailHref, getProductMerchantHref } from "@/constants/hooks";

interface Props {
    company_id: string;
    product_id: string;
    current_merchant_slug: string;
    slug_type: string;
}

const SpecificProductSchema = async ({
    company_id,
    product_id,
    current_merchant_slug,
    slug_type,
}: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const websiteUrl = `https://${companyDomain}`;

    const response = (
        await apiGetProductDetails(company_id, product_id, current_merchant_slug)
    ).data;

    if (!response) return null;

    let productUrl = websiteUrl;
    if (response?.slug) {
        productUrl = `${websiteUrl}${getProductDetailHref(response?.merchant, slug_type, response?.slug)}`;
    }
    const productImage = response.product_image
        ? getBaseImageUrl(companyDomain, response.product_image, "")
        : "";

    const merchantHref = getProductMerchantHref(
        response?.merchant,
        slug_type
    );

    /* ---------------- Product Schema ---------------- */

    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: response?.offer_title,
        image: productImage,
        description:
            response?.offer_detail ||
            response?.offer_title ||
            "Find the best deal on this product.",
        brand: {
            "@type": "Brand",
            name: response?.merchant?.merchant_name,
        },
        offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: response?.currency || "USD",
            price: response?.sale_price,
            availability:
                response?.status === 1
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
            ...(response?.start_date ? { validFrom: response?.start_date } : {}),
            ...(response?.end_date
                ? { priceValidUntil: response?.end_date }
                : {}),
        },
    };

    /* ---------------- Breadcrumb Schema ---------------- */

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: websiteUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${websiteUrl}/products`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: response?.merchant?.merchant_name,
                item: `${websiteUrl}${merchantHref}`,
            },
            {
                "@type": "ListItem",
                position: 4,
                name: response?.offer_title,
                item: productUrl,
            },
        ],
    };

    return (
        <>
            {/* Product Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                id="breadcrumbSchema"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
};

export default SpecificProductSchema;
