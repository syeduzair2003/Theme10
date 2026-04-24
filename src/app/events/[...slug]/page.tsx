import { apiGetMetaData, apiTemplate } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import P1 from '@theme1/Pages/Events/[...slug]/page';
import P2 from '@theme2/Pages/Events/[...slug]/page';
import P3 from '@theme3/Pages/Events/[...slug]/page';
import P4 from '@theme4/Pages/Events/[...slug]/page';
import P5 from '@theme5/Pages/Events/[...slug]/page';
import P6 from '@theme6/Pages/Events/[...slug]/page';
import P8 from '@theme8/Pages/Events/[...slug]/page';
import P9 from '@theme9/Pages/Events/[...slug]/page';
import { discardHTMLTags, getBaseImageUrl } from '@/constants/hooks';
import { Metadata } from "next";

type PageProps = {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<any>;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const companyDomain = await cookieService.get("domain");
    const { slug } = await params;

    const metaSlug = ["events", slug];
    const formattedData = JSON.stringify(metaSlug);

    const meta = (
        await apiGetMetaData(formattedData, companyDomain.domain)
    ).data;
    const twitterHandle = `@${meta?.company_data?.company_name.replace(/\s+/g, "")}`;

    const companyIcon = getBaseImageUrl(companyDomain.domain, meta?.company_data?.site_icon, "/themes/Theme_3/images/logo.png");
    const companyLogo = getBaseImageUrl(companyDomain.domain, meta?.company_data?.company_logo, "/themes/Theme_3/images/logo.png");

    let ogImage = meta?.company_data?.company_logo;
    if (slug[0] === 'halloween-deals') {
        ogImage = '/shared-assets/og-image.jpg';
    } else if (slug[0] === 'thanksgiving-coupons-deals') {
        ogImage = '/shared-assets/og-image-thanks-giving.jpg';
    } else if (slug[0] === 'black-friday-coupons-deals') {
        ogImage = '/shared-assets/og-black-friday-coupons-deals.jpg';
    } else if (slug[0] === 'christmas-coupons-deals') {
        ogImage = '/shared-assets/og-christmas-coupons-deals.png';
    } else if (slug[0] === 'cyber-monday-deals') {
        ogImage = '/shared-assets/og-cyber-monday-deals.jpg';
    } else if (slug[0] === 'new-year-deals') {
        ogImage = '/shared-assets/new-year-deals-og-image.png';
    }

    const canonicalData = `https://${companyDomain.domain}/events/${slug[0]}`;
    return {
        title: discardHTMLTags(meta?.meta_title),
        description: discardHTMLTags(meta?.meta_description),
        keywords: meta?.meta_keywords,
        alternates: {
            canonical: `${canonicalData}`,
        },
        icons: [
            {rel: 'icon', url: companyIcon, sizes:'48x48', type:'image/png'}
        ],
        openGraph: {
            title: meta?.og_title ?? meta?.meta_title,
            description: discardHTMLTags(meta?.twitter_description ?? meta?.meta_description),
            images: [
                {
                    url: getBaseImageUrl(companyDomain.domain, ogImage, ''),
                    width: 1200,   // ✅ Standard OG image width
                    height: 630,   // ✅ Standard OG image height
                    alt: meta?.og_title || meta?.meta_title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: meta?.twitter_title || meta?.meta_title,
            description: discardHTMLTags(meta?.twitter_description || meta?.meta_description),
            site: twitterHandle,
            creator: twitterHandle,
            images: [
                {
                    url: getBaseImageUrl(companyDomain.domain, ogImage, ''),
                    width: 1200,
                    height: 630,
                    alt: meta?.twitter_title || meta?.meta_title,
                },
            ],
        },
    };
}

const page = async ({ params, searchParams }: PageProps) => {
    const companyDomain = await cookieService.get("domain");
    const template = (await apiTemplate(companyDomain.domain)).data
    const selector = (theme: string): any => {
        switch (theme?.trim()?.toLowerCase()) {
            case 'theme 1':
                return P1;
            case 'theme 2':
                return P2;
            case 'theme 3':
                return P3;
            case 'theme 4':
                return P4;
            case 'theme 5':
                return P5;
            case 'theme 6':
                return P6;
            case 'theme 8':
                return P8;    
            case 'theme 9':
                return P9;    
            default:
                return P3;
        }
    }
    const SelectedPage = selector("theme 9");
    return <SelectedPage params={params} searchParams={searchParams} />
}

export default page
