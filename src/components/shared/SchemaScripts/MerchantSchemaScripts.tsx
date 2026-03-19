import { getMerchantHref, getRandomStoreSeoTitle } from '@/constants/hooks';
import { Merchant } from '@/services/dataTypes';
import React from 'react'

interface MerchantDetailProps {
    mer_meta_title: string;
    mer_meta_desc: string;
    data: Merchant;
}

interface Props {
    domain: string;
    mer_slug: string;
    slug_type: string;
    merchant_detail: MerchantDetailProps;
}
const MerchantSchemaScripts = async ({ domain, mer_slug, slug_type, merchant_detail }: Props) => {
    const merchantHref = getMerchantHref(merchant_detail.data, mer_slug, slug_type);

    return (
        <>
            <script
                type="application/ld+json"
                id='merchantSchema'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        url: `https://${domain}${merchantHref}`,
                        name: `${getRandomStoreSeoTitle(merchant_detail?.mer_meta_title)}`,
                        description: `${merchant_detail?.mer_meta_desc}`,
                    }),
                }}
            />
            <script
                type="application/ld+json"
                id='breadcrumbSchema'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": `https://${domain}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": `${mer_slug}`,
                                "item": `https://${domain}/${mer_slug}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": `${merchant_detail?.mer_meta_title}`,
                                "item": `https://${domain}${merchantHref}`
                            }
                        ]
                    }),
                }}
            />
            {merchant_detail?.data?.faqs?.length > 0 && (
                <script
                    type="application/ld+json"
                    id='faqSchema'
                    dangerouslySetInnerHTML={{
                        "__html": JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": merchant_detail?.data?.faqs.map((faq: any) => ({
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
            )}
        </>
    )
}

export default MerchantSchemaScripts
