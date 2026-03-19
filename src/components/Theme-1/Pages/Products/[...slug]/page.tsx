import { apiCompanyUpdatedData } from '@/apis/user'
import cookieService from '@/services/CookiesService'
import React from 'react'
import MerchantProductsPage from '@/components/Theme-1/comp/MerchantProductsPage'
import OfferDetailsPage from '@/components/Theme-1/comp/OfferDetailsPage';
import { notFound } from 'next/navigation';
import { extractTrailingId } from '@/constants/hooks';
import { apiGetMerchantUniqueId } from '@/apis/merchant';

type Props = Promise<{ slug: string[] }>;

const page = async ({ params }: { params: Props }) => {
    const { slug } = await params;
    const companyDomain = (await cookieService.get("domain"));
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    if (slug.length === 1) {
        return <MerchantProductsPage slug={slug[0]} companyId={companyData?.unique_id} storeSlug={companyData?.store_slug} slugType={companyData?.slug_type} />
    }
    else if (slug.length === 2) {
        const merRes = await apiGetMerchantUniqueId(slug[0], companyData.unique_id);
        const merchantId = merRes?.data?.unique_id;
        if (!merchantId) return notFound();

        const productId = extractTrailingId(slug[1]);
        return <OfferDetailsPage store_slug={companyData.store_slug} slug_type={companyData.slug_type} company_id={companyData.unique_id} product_id={productId} current_merchant_slug={slug[0]} />;
    } else {
        return notFound();
    }
}

export default page

