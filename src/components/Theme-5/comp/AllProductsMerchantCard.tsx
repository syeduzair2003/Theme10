import React from 'react';
import Link from 'next/link';
import { getBaseImageUrl, getProductMerchantHref } from '@/constants/hooks';
import { Merchant } from '@/services/dataTypes';
import Image from 'next/image';

interface AllProductsMerchantCardProps {
    merchant: Merchant;
    domain: string;
    slugType: string;
}

const AllProductsMerchantCard = ({ merchant, domain, slugType }: AllProductsMerchantCardProps) => {
    const imageSrc = getBaseImageUrl(domain, merchant.merchant_logo, "")
    return (
        <Link href={getProductMerchantHref(merchant, slugType)} className="min-w-[300px] group">
            <div className="relative shrink-0 aspect-[16/9] w-48 rounded-2xl overflow-hidden border border-white shadow-sm bg-indigo-50 group mx-auto">
                <Image
                    src={imageSrc}
                    alt={merchant.merchant_name}
                    fill
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h4 className="font-bold text-slate-900 text-center">{merchant.merchant_name}</h4>
        </Link>
    );
};

export default AllProductsMerchantCard; 