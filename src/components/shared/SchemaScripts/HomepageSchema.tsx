import { apiGetDisclaimer, apiHomePageFaqs } from '@/apis/user';
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
    domain: string;
}
const HomePageSchema = async ({ domain, socialLinks, companyLogo, companyName }: Props) => {

    const [ faqs ] = await Promise.all([
        apiHomePageFaqs(domain).then(res => res.data),
    ]);

    return (
        <>
            {/* WebSite Schema */}
            <script
                type="application/ld+json"
                id="WebSiteSchema"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": `https://${domain}/#website`,
                        "url": `https://${domain}`,
                        "name": companyName,
                        "description": `Save on everything you buy online. ${companyName} finds and verifies the latest promo codes, coupons, and deals for thousands of stores worldwide. Start saving now!`,
                        "publisher": {
                            "@id": `https://${domain}/#organization`
                        },
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": `https://${domain}/?s={search_term_string}`
                            },
                            "query-input": "required name=search_term_string"
                        }
                    }),
                }}
            />
            {/* BreadcrumbList Schema */}
            <script
                type="application/ld+json"
                id="BreadcrumbSchema"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "@id": `https://${domain}/#breadcrumb`,
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": `https://${domain}`
                            }
                        ]
                    }),
                }}
            />
            <script
                type="application/ld+json"
                id='faqSchema'
                dangerouslySetInnerHTML={{
                    "__html": JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs?.map((faq: any) => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />
        </>
    )
}

export default HomePageSchema
