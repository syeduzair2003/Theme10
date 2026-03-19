import { apiGetMetaData, apiOutUrl } from '@/apis/user';
import OutRedirect from '@/components/shared/OutRedirect';
import { getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'
type DynamicProps = Promise<{ slug: string }>;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const companyDomain = await cookieService.get("domain");

    const { slug } = await params;

    const fixedSlug = [...slug];

    // replace first element if it's "O"
    if (fixedSlug[0] === 'O') {
        fixedSlug[0] = 'out';
    }

    const meta = (await apiGetMetaData(JSON.stringify(fixedSlug), companyDomain.domain)).data;
    const twitterHandle = `@${meta?.company_data?.company_name.replace(/\s+/g, "")}`;
    const companyLogo = getBaseImageUrl(companyDomain.domain, meta?.company_data?.site_icon, "/themes/Theme_3/images/logo.png");
    const ogImage = meta?.og_image ? getBaseImageUrl(companyDomain.domain, meta?.og_image, companyLogo) : companyLogo;

    return {
        title: meta?.meta_title,
        description: meta?.meta_description,
        keywords: meta?.meta_keywords,
        icons: [
            {rel: 'icon', url: companyLogo, sizes:'48x48', type:'image/png'}
        ],
        openGraph: {
            title: meta?.og_title ?? meta?.meta_title,
            description: meta?.twitter_description ?? meta?.meta_description,
            images: [
                {
                    url: ogImage,
                    width: 1200,   // ✅ Standard OG image width
                    height: 630,   // ✅ Standard OG image height
                    alt: meta?.og_title || meta?.meta_title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: meta?.twitter_title || meta?.meta_title,
            description: meta?.twitter_description || meta?.meta_description,
            site: twitterHandle,
            creator: twitterHandle,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: meta?.twitter_title || meta?.meta_title,
                },
            ],
        },
    };
}

const page = async ({
    params
}: {
    params: DynamicProps;
}) => {
    const { slug } = await params;
    const companyDomain = (await cookieService.get("domain")).domain;
    const offerId = slug[1];
    try {
        const apiDataUrl = await apiOutUrl(companyDomain, offerId)
        if (!apiDataUrl.status === false) {
            return (
                <OutRedirect redirectUrl={apiDataUrl.data} />
            )
        } else {
            return notFound();
        }
    } catch (error) {
        return notFound();
    }
}

export default page
