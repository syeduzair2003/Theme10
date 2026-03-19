import cookieService from '@/services/CookiesService';
import { EventMerchant, Merchant, minimalMerchantData } from '@/services/dataTypes';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle } from '@/constants/hooks';

interface Props {
  merchant: EventMerchant | Merchant | minimalMerchantData;
  merSlug: string;
  slugType: string;
}

const SidebarRoundMerchantCard = async ({ merchant, merSlug, slugType }: Props) => {
  const domain = (await cookieService.get('domain')).domain;

  return (
    <Link
      href={getMerchantHref(merchant, merSlug, slugType)}
      className="mer-sidebar-item"
    >
      {/* Circle Wrapper */}
      <div className="mer-sidebar-circle">
        <Image
          src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
          alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
          height={80} // Adjusted for better fit in circle
          width={80}
          objectFit='contain'
          className="mer-sidebar-logo"
        />
      </div>

      {/* Merchant Name (Matches the text below circles in your image) */}
      <div className="mer-sidebar-content">
         <span className="mer-sidebar-title">
            {merchant?.merchant_name }
         </span>
         
         {/* Optional: Keep your promotional tag if needed, styled smaller */}
         {merchant?.promotional_tag && (
            <span className="mer-sidebar-tag">{merchant.promotional_tag}</span>
         )}
      </div>
    </Link>
  );
};

export default SidebarRoundMerchantCard;