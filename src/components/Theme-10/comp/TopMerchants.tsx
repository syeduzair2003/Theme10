import React from 'react'
import StoreCard from './StoreCard';
import { Merchant } from '@/services/dataTypes';

interface Props {
    merchantData: Merchant[];
    mer_slug: string;
    mer_slug_type: string;
}

const PremiumBrand = async ({ merchantData, mer_slug_type, mer_slug }: Props) => {
    // Slice only first 12 merchants to keep it strictly uniform (2 rows of 6 on desktop)
    const displayMerchants = merchantData?.slice(0, 12) || [];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {displayMerchants.map((merchant, index) => (
                <StoreCard 
                    key={index}
                    merchant={merchant}
                    mer_slug={mer_slug}
                    mer_slug_type={mer_slug_type}
                />
            ))}
        </div>
    );
};
export default PremiumBrand;