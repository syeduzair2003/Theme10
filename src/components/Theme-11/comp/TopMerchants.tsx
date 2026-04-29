import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    discardHTMLTags,
    getBaseImageUrl,
    getMerchantHref,
    getRandomStoreSeoTitle,
    splitHeadingFromDetails,
} from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { Merchant } from '@/services/dataTypes';

interface Props {
    merchantData: Merchant[];
    mer_slug: string;
    mer_slug_type: string;
}

const TopMerchants = async ({ merchantData, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = await cookieService.get('domain');

    // Cap at 12 merchants
    const displayMerchants = merchantData?.slice(0, 12) ?? [];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
            {displayMerchants.map((merchant, index) => {
                const [heading] = splitHeadingFromDetails(merchant?.merchant_detail);
                const displayTitle = heading
                    ? discardHTMLTags(heading)
                    : getRandomStoreSeoTitle(merchant?.merchant_name);
                const logoSrc = getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, '');
                const href = getMerchantHref(merchant, mer_slug, mer_slug_type);
                const offerCount = merchant.total_offers ?? 0;
                const offerLabel =
                    offerCount > 0 ? `${offerCount}+ DEALS` : 'VIEW DEALS';

                return (
                    <Link
                        key={merchant.unique_id ?? index}
                        href={href}
                        className="group flex flex-col items-center rounded-xl bg-white no-underline transition-all duration-300 hover:-translate-y-1"
                        style={{
                            border: '1px solid #f0f0f0',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                        }}
                        onMouseEnter={undefined}
                    >
                        {/* Coloured top stripe — visible on hover via CSS trick with group */}
                        <div
                            className="w-full h-[3px] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: '#ff912f',
                            }}
                            aria-hidden="true"
                        />

                        {/* Logo container */}
                        <div className="w-full flex items-center justify-center px-4 pt-5 pb-2 relative">
                            {/* Discount badge */}
                            {merchant.discount_tag && (
                                <span
                                    className="absolute top-3 right-3 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10 leading-none"
                                    style={{ background: '#ff912f' }}
                                >
                                    {merchant.discount_tag}
                                </span>
                            )}

                            <div className="relative w-[72px] h-[48px]">
                                <Image
                                    src={logoSrc}
                                    alt={`${merchant.merchant_name} coupons and deals`}
                                    fill
                                    sizes="90px"
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Thin separator */}
                        <div
                            className="w-8 h-px mx-auto mb-2"
                            style={{ background: '#f0f0f0' }}
                        />

                        {/* Merchant name */}
                        <p
                            className="text-[12px] font-semibold text-gray-700 text-center px-3 leading-snug line-clamp-1 mb-1 transition-colors duration-200 group-hover:text-[#4e9e1a]"
                            style={{ margin: 0 }}
                        >
                            {merchant.merchant_name}
                        </p>

                        {/* Offer count */}
                        <div className="pb-3 pt-1 flex items-center justify-center">
                            <span
                                className="text-[9px] font-bold tracking-widest uppercase"
                                style={{ color: '#8bc94a' }}
                            >
                                {offerLabel}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default TopMerchants;