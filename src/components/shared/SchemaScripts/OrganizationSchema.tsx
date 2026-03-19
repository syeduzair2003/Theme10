import { apiGetDisclaimer } from '@/apis/user';
import { getBaseImageUrl } from '@/constants/hooks';
import React from 'react'

interface Props {
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
    companyLogo: string | null;
    companyName: string;
    legalName: string | null;
    alternateName: string | null;
    domain: string;
}

const OrganizationSchema = async ({ domain, socialLinks, companyLogo, companyName, legalName, alternateName }: Props) => {
    const sameAsLinks = [
        socialLinks?.facebook,
        socialLinks?.twitter,
        socialLinks?.instagram,
        socialLinks?.linkedin,
        socialLinks?.pinterest,
        socialLinks?.youtube,
        socialLinks?.flipboard,
        socialLinks?.threads,
        socialLinks?.tiktok,
    ].filter(Boolean);

    const contacts = (await apiGetDisclaimer(domain)).data;

    return (
        <script
            type="application/ld+json"
            id="OrganizationSchema"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": companyName,
                    "legalName": legalName,
                    "alternateName": alternateName,
                    "url": `https://${domain}`,
                    "sameAs": sameAsLinks,
                    "logo": {
                        "@type": "ImageObject",
                        "url": getBaseImageUrl(domain, companyLogo, ""),
                        "width": 200,
                        "height": 100
                    },
                    contactPoint: {
                        "@type": "ContactPoint",
                        telephone: `${contacts?.CompanyContactUs?.phone_no || ""}`,
                        contactType: "customer support",
                        email: contacts?.CompanyContactUs?.email || "",
                        areaServed: "US",
                        availableLanguage: "en",
                    },
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: contacts?.CompanyContactUs?.address?.split(",")[0]?.trim() || "",
                        addressLocality: contacts?.CompanyContactUs?.address?.split(",")[1]?.trim() || "",
                        addressRegion: contacts?.CompanyContactUs?.address?.match(/\b[A-Z]{2}\b/)?.[0] || "",
                        postalCode: contacts?.CompanyContactUs?.address?.match(/\d{5}/)?.[0] || "",
                        addressCountry: "US",
                    },
                }),
            }}
        />
    )
}

export default OrganizationSchema
