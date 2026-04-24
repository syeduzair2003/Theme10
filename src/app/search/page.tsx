import { apiTemplate } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import P1 from '@theme1/Pages/Search/page'
import P2 from '@theme2/Pages/Search/page'
import P3 from '@theme3/Pages/Search/page';
import P4 from '@theme4/Pages/Search/page';
import P5 from '@theme5/Pages/Search/page';
import P6 from '@theme6/Pages/Search/page';
import P8 from '@theme8/Pages/Search/page';
import P9 from '@theme9/Pages/Search/page';

interface Props {
    searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: Props) => {
    // const queryParams: any = await searchParams;
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
        <SelectedPage searchParams={searchParams} />
    )
}

export default page
