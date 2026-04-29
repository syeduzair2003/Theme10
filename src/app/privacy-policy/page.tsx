import { apiGetMetaData, apiTemplate } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import P1 from '@theme1/Pages/Privacy-Policy/page';
import P2 from '@theme2/Pages/Privacy-Policy/page';
import P3 from '@theme3/Pages/Privacy-Policy/page';
import P4 from '@theme4/Pages/Privacy-Policy/page';
import P5 from '@theme5/Pages/Privacy-Policy/page';
import P6 from '@theme6/Pages/Privacy-Policy/page';
import P8 from '@theme8/Pages/Privacy-Policy/page';
import P9 from '@theme9/Pages/Privacy-Policy/page';
import P11 from '@theme11/Pages/Privacy-Policy/page';
import P17 from '@theme17/Pages/Privacy-Policy/page';

import { getBaseImageUrl } from '@/constants/hooks';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
  const companyDomain = await cookieService.get("domain");
  const formattedData = JSON.stringify(["privacy-policy"]);
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
    alternates: {
      canonical: `https://${companyDomain.domain}/privacy-policy`,
    },
    openGraph: {
      title: meta?.og_title ?? meta?.meta_title,
      description: meta?.meta_description,
      images: companyLogo
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
      case 'theme 11':
        return P11;
      case 'theme 17':
        return P17;
      default:
        return P3;
    }
  }
  const SelectedPage = selector("theme 17");
  return (
    <>
      <SelectedPage />
    </>

  );
}

export default page
