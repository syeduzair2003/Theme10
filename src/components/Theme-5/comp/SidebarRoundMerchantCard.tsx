import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { EventMerchant, Merchant, minimalMerchantData } from '@/services/dataTypes'
import { getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'

interface Props {
    merchant: EventMerchant | Merchant | minimalMerchantData
    merSlug: string
    slugType: string
}

const SidebarRoundMerchantCard = async ({ merchant, merSlug, slugType }: Props) => {
    const companyDomain = await cookieService.get("domain")
    const merchantHref = getMerchantHref(merchant, merSlug, slugType)
    const imageUrl = getBaseImageUrl(companyDomain.domain, merchant?.merchant_logo, '')

    return (
        <Link
            href={merchantHref}
            className="group block p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
        >
            <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-20 h-20 rounded-full border-2 border-slate-500 group-hover:border-indigo-300 overflow-hidden bg-white flex items-center justify-center transition-colors">
                    {merchant?.merchant_logo ? (
                        <Image
                            src={imageUrl}
                            alt={merchant?.merchant_name || 'Merchant'}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain p-1"
                        />
                    ) : (
                        <span className="text-indigo-600 font-bold text-sm">
                            {merchant?.merchant_name?.charAt(0) || 'M'}
                        </span>
                    )}
                </div>
                <div className="space-y-1">
                    <h5 className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {getRandomStoreSeoTitle(merchant?.merchant_name)}
                    </h5>
                    {merchant?.promotional_tag && (
                        <div className="text-xs font-bold text-gray-900">
                            {merchant.promotional_tag}
                        </div>
                    )}
                    <p className="text-xs font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2">
                        View Offers
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default SidebarRoundMerchantCard