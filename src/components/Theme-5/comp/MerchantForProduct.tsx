import { getBaseImageUrl, parseDiscountTag } from '@/constants/hooks';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    merchant_name: string;
    merchant_logo: string;
    companyDomain: string;
    merchant_href: string;
    discountTag?: string | null;
}

const MerchantForProduct = async ({ merchant_name, merchant_logo, companyDomain, merchant_href, discountTag }: Props) => {
    const parsedDiscount = parseDiscountTag(discountTag)

    return (
        <Link href={merchant_href}>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                <div className="relative aspect-square w-full bg-slate-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                    <Image
                        src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                        alt={`${merchant_name} logo`}
                        width={100}
                        height={100}
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    {parsedDiscount && (
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-[10px] font-extrabold">
                            {parsedDiscount.value}
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {merchant_name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        View All Products →
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default MerchantForProduct
