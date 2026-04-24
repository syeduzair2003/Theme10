import { apiGetMetaData, apiTemplate } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import P1 from '@/components/Theme-1/Pages/do-not-sell-my-personal-information/page';
import P3 from '@/components/Theme-3/Pages/do-not-sell-my-personal-information/page';
import P2 from '@/components/Theme-2/Pages/do-not-sell-my-personal-information/page';
import P4 from '@/components/Theme-4/Pages/Do-Not-Sell-My-Personal-Information/page';
import P5 from '@/components/Theme-5/Pages/do-not-sell-my-personal-information/page';
import P6 from '@/components/Theme-6/Pages/do-not-sell-my-personal-information/page';
import P8 from '@/components/Theme-8/Pages/do-not-sell-my-personal-information/page';
import P9 from '@/components/Theme-9/Pages/do-not-sell-my-personal-information/page';

import { Metadata } from 'next';
import { getBaseImageUrl } from '@/constants/hooks';
export async function generateMetadata(): Promise<Metadata> {
    const companyDomain = await cookieService.get("domain");
    const formattedData = JSON.stringify(["do-not-sell-my-personal-information"]);
    const meta = (
        await apiGetMetaData(formattedData, companyDomain.domain)
    ).data;
    const twitterHandle = `@${meta?.company_data?.company_name.replace(/\s+/g, "")}`;

    const companyIcon = getBaseImageUrl(companyDomain.domain, meta?.company_data?.site_icon, "/themes/Theme_3/images/logo.png");
    const companyLogo = getBaseImageUrl(companyDomain.domain, meta?.company_data?.company_logo, "/themes/Theme_3/images/logo.png");

    return {
        title: meta?.meta_title,
        description: meta?.meta_description,
        keywords: meta?.meta_keywords,
        icons: [
            {rel: 'icon', url: companyIcon, sizes:'48x48', type:'image/png'}
        ],
        openGraph: {
            title: meta?.og_title ?? meta?.meta_title,
            description: meta?.meta_description,
            images: companyLogo
        },
        alternates: {
            canonical: `https://${companyDomain.domain}/do-not-sell-my-personal-information`,
        },
        twitter: {
            card: "summary_large_image",
            title: meta?.twitter_title || meta?.meta_title,
            description: meta?.twitter_description || meta?.meta_description,
            site: twitterHandle,
            creator: twitterHandle,
            images: companyLogo
        },
    };
}
const page = async () => {
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
    return (
        <>
            <SelectedPage />
        </>

    );
}

export default page
