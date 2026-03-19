import React from 'react'
import BestOffersSSR from './BestOffersSSR'
import { apiGetPopularDeals } from '@/apis/page_optimization'
import cookieService from '@/services/CookiesService'

interface Props {
    companyId: string
    mer_slug_type: string
    mer_slug: string
}

const BestOffersWrapper = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularDeals(companyId)
    const bestOffers = response.data
    const companyDomain = (await cookieService.get("domain")).domain

    return (
        <BestOffersSSR
            companyId={companyId}
            mer_slug_type={mer_slug_type}
            mer_slug={mer_slug}
            bestOffers={bestOffers}
            companyDomain={companyDomain}
        />
    )
}

export default BestOffersWrapper
